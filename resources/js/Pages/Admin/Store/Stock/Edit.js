import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import TextInput from '../../../../Shared/TextInput';
import SelectInput from '../../../../Shared/SelectInput';
import DataContainer from '../../../../Shared/DataContainer';
import LoadingButton from '../../../../Shared/LoadingButton';
import Icon from '../../../../Shared/Icon';
import classNames from 'classnames';
import { toFormData, dateTimeFormat } from '../../../../utils';
import axios from 'axios';

const Edit = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);

     const [values, setValues] = useState({
          products: data.details
     });

     const iconClasses = classNames('w-4 h-4 mr-2', {
          'text-red-700 fill-current': false,
          'text-red-700 hover:text-red-500 fill-current': true
     });

     function handleQty(e, i){
          const value = parseFloat(e.target.value);
          let products = values.products;
          let reference = products[i].reference;
          if(!Number.isNaN(value)){
               if(reference > -1){
                    products[i].message = '';
                    if(products[reference].qty_transfer >= products[reference].qty_init){
                         return false;
                    }
                    if((products[reference].qty_comfirm - value) == 0){
                         products[i].message = 'Total quantity can not equal to parent product.';
                         setChange(products);
                         return false;
                    }
                    products[reference].qty_comfirm = products[reference].qty_comfirm - value;
                    products[i].qty_comfirm = value;
               }
               products[reference].qty_transfer = (reference != -1)?(products[reference].qty_transfer + value):products[reference].qty_transfer;
          }else{
               if(products[i].qty_comfirm != ''){
                    products[reference].qty_comfirm = products[reference].qty_comfirm + parseFloat(products[i].qty_comfirm);
               }
               products[i].qty_comfirm = '';
          }
          setChange(products);
     }

     function handleExpiration(e, i){
          const value = e.target.value;
          if(value != ''){
               let products = values.products;
               products[i].message = '';
               products[i].expiration = value;
               setChange(products);
          }
     }

     function handleLot(e, i){
          const value = e.target.value;
          if(value != ''){
               let products = values.products;
               products[i].message = '';
               products[i].lot = value;
               setChange(products);
          }
     }

     function handlePrice(e, i){
          const value = e.target.value;
          if(value != ''){
               let products = values.products;
               products[i].message = '';
               products[i].price = value;
               setChange(products);
          }
     }

     function setChange(products){
          setValues(values => ({
               ...values,
               products: products,
          }));
     }

     function handleChange(e) {
          const key = e.target.name;
          const value = e.target.value;
          setValues(values => ({
               ...values,
               [key]: value
          }));
     }

     function addNewLine(e, i) {
          e.preventDefault();
          let products = [...values.products];
          if(products[i].qty_comfirm > 1){
               let index = i+1;
               let newprod = Object.assign({}, products[i]);
               if(products[i].qty_comfirm > 1){
                    // products[i].qty_comfirm = newprod.qty_comfirm - 1;
                    newprod.code = 0;
                    newprod.product = '';
                    newprod.quantity = '';
                    newprod.qty_comfirm = '';
                    newprod.expiration = '';
                    newprod.lot = '';
                    newprod.price = 0;
                    newprod.duplicate = false;
                    newprod.remove = true;
                    newprod.removed = false,
                    newprod.newLine = true;
                    newprod.reference = i;
                    products.splice(index, 0, newprod);
                    setChange(products);
               }else{
                    // show message
               }
          }
     }

     function removeLine(e, i){
          e.preventDefault();
          let products = [...values.products];
          let newprod = Object.assign({}, products[i]);
          if(!Number.isNaN(parseFloat(newprod.qty_comfirm))){
               products[newprod.reference].qty_comfirm = products[newprod.reference].qty_comfirm + newprod.qty_comfirm;
          }
          newprod.removed = true;
          products[i] = newprod;
          setChange(products);
     }

     function validateData(){
          let products = values.products;
          let error = false;
          for(var i = 0; i < products.length; i++){
               if(products[i].qty_comfirm == 0 || products[i].price == 0){
                    products[i].message = 'Verify quantity and/or price of this line is not zero';
               }
          }
          setChange(products);
          return error;
     }

     function handleSubmit(e) {
          e.preventDefault();
          let isError = validateData();
          if(!isError){
               setSending(true);
               Inertia.post(route('stock.update', [data.store.id, data.id]), values).then((response) => {
                    setSending(false);
               });
          }
          return false;
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Edit Stock</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('stock.show', [data.store.id, data.id])}>{data.store.name}</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Edit Stock</span>
               </div>

               <DataContainer>
                    <div className="col-span-12 text-right">
                         <InertiaLink href={route('stock.show', [data.store.id, data.id])} className="bg-white border border-gray-400 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'back'} className={'fill-current w-4 h-4 mr-2'} />
                              back
                         </InertiaLink>
                    </div>

                    <div className="grid grid-cols-3 gap-3 col-span-12">
                         <div className=""></div>
                         <div className="justify-center items-center text-center border-b pb-4">
                              <h1 className="text-gray-700 font-semibold text-lg">{data.store.name}</h1>
                         </div>
                         <div className=""></div>
                    </div>
                    <div className="col-span-12 text-center uppercase font-semibold text-gray-600 mt-3">Stock</div>
                    <div className="col-span-12">
                         <div className="w-full grid grid-cols-3 gap-4">
                              <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                   <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Stock Info</h2>
                                   <p>Code : <span className="float-right font-medium text-gray-700">{data.code}</span></p>
                                   <p>User : <span className="float-right font-medium text-gray-700">{data.user}</span></p>
                                   <p>Created : <span className="float-right font-medium text-gray-700">{dateTimeFormat(data.date)}</span></p>
                              </div>
                         </div>
                    </div>

                    <div className="col-span-12">
                         <form onSubmit={handleSubmit}>
                              <div className="flex w-full border-t pt-5">
                                   <table className="table-auto col-span-12">
                                        <thead className="bg-gray-400 text-sm">
                                             <tr>
                                                  <th className="px-4 py-2"></th>
                                                  <th className="px-4 py-2">Product</th>
                                                  <th className="px-4 py-2">Qty Init / Qty Stock</th>
                                                  <th className="px-4 py-2">Confirm Qty</th>
                                                  <th className="px-4 py-2">Expiration</th>
                                                  <th className="px-4 py-2">Num Lot</th>
                                                  <th className="px-4 py-2">Cost</th>
                                                  <th className="px-4 py-2">Price</th>
                                                  <th className="px-4 py-2"></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {values.products.map(({product, quantity, qty_init, reference, qty_comfirm, expiration, lot, cost, price, duplicate, remove, removed, message}, i) => {
                                                  return <tr key={`pop${i}`} className={`${message?'bg-red-200':''} ${removed?'bg-gray-200 text-gray-500':''}`}>
                                                       <td className="border px-4 py-2">{i+1}</td>
                                                       <td className="border px-4 py-2">
                                                            {(qty_init > 0)?product:''}
                                                            {message && (<span className="w-full text-xs italic text-red-500">{message}</span>)}
                                                       </td>
                                                       <td className="border px-4 py-2 text-center">{(reference==-1)?qty_init:''} / {quantity}</td>
                                                       <td className="border px-2 py-2">
                                                            <input type="text" name="qty_comfirm[]" value={qty_comfirm} onChange={(e)=>handleQty(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                       </td>
                                                       <td className="border px-2 py-2">
                                                            <input type="date" name="expiration[]" value={expiration} onChange={(e)=>handleExpiration(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                       </td>
                                                       <td className="border px-2 py-2">
                                                            <input type="text" name="lot[]" value={lot} onChange={(e)=>handleLot(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                       </td>
                                                       <td className="border px-4 py-2 text-center">{cost}</td>
                                                       <td className="border px-2 py-2">
                                                            <input type="text" name="price[]" value={price} onChange={(e)=>handlePrice(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                       </td>
                                                       <td className="border px-4 py-2 text-right">
                                                            {(duplicate && (qty_comfirm > 1)) && (<button onClick={e=>addNewLine(e,i)} className="p-2 bg-green-600 text-white rounded">+</button>)}
                                                            {remove && (<button onClick={e=>removeLine(e,i)} className="p-2 bg-red-600 text-white rounded">-</button>)}
                                                       </td>
                                                  </tr>
                                             })}
                                        </tbody>
                                   </table>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Edit Stock
                                   </LoadingButton>
                              </div>
                         </form>
                    </div>
               </DataContainer>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Edit.layout = page => <Layout children={page} header={'Edit Stock'} />;

export default Edit;
