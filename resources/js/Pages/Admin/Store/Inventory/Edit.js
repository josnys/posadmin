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
          products: data.purchase.details || [],
          supplier: data.purchase.supplier || '',
          receipt: data.purchase.receipt || '',
          subtotal: data.purchase.subtotal || 0,
          tax: data.purchase.tax || 0,
          transport: data.purchase.transport || 0,
          total: data.purchase.total || 0
     });

     const iconClasses = classNames('w-4 h-4 mr-2', {
          'text-red-700 fill-current': false,
          'text-red-700 hover:text-red-500 fill-current': true
     });

     function handleQty(e, i){
          const value = e.target.value;
          if(value != ''){
               let products = values.products;
               setChange(parseInt(value), products[i].cost, products[i].tax, products, i);
          }
     }

     function handlePrice(e, i){
          const value = e.target.value;
          if(value != ''){
               let products = values.products;
               setChange(products[i].qty_recieve, parseFloat(value), products[i].tax, products, i);
          }
     }

     function handleTax(e, i){
          const value = e.target.value;
          if(value != ''){
               let products = values.products;
               setChange(products[i].qty_recieve, products[i].cost, parseFloat(value), products, i);
          }
     }

     function setChange(qty, cost, tax, products, i){
          products[i].tax = tax;
          products[i].qty_recieve = qty;
          products[i].cost = cost;
          products[i].total = ((cost+tax)*qty);
          let subtotal = 0;
          for(var a = 0; a < products.length; a++){
               subtotal += products[a].total;
          }
          let total = subtotal + parseFloat(values.transport) + parseFloat(values.tax);
          setValues(values => ({
               ...values,
               products: products,
               subtotal: subtotal,
               total: total
          }));
     }

     function handleNumber(e){
          const value = parseFloat(e.target.value);
          if(value != 0){
               const name = e.target.name;
               let subtotal = values.subtotal;
               let total = 0;
               switch(name){
                    case 'transport': total = (subtotal + value + parseFloat(values.tax)); break;
                    case 'tax': total = (subtotal + value + parseFloat(values.transport)); break;
               }

               setValues(values => ({
                    ...values,
                    [name]: value,
                    total: total
               }));
          }
     }

     function handleChange(e) {
          const key = e.target.name;
          const value = e.target.value;
          setValues(values => ({
               ...values,
               [key]: value
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          Inertia.post(route('purchase.update', [data.store.id, data.purchase.id]), values).then((response) => {
               console.log(response);
               setSending(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Create Purchase</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('store.show', data.store.id)}>{data.store.name}</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Edit Purchase</span>
               </div>

               <DataContainer>
                    <div className="col-span-12 text-right">
                         <InertiaLink href={route('store.show', data.store.id)} className="bg-white border border-gray-400 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'back'} className={'fill-current w-4 h-4 mr-2'} />
                              back
                         </InertiaLink>
                    </div>

                    <div className="col-span-12">
                         <form onSubmit={handleSubmit}>
                              <div className="w-full grid grid-cols-3 gap-4">
                                   <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                        <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Store Info</h2>
                                        <p>Store : <span className="float-right font-medium text-gray-700">{data.store.name}</span></p>
                                        <p>User : <span className="float-right font-medium text-gray-700">{data.purchase.user}</span></p>
                                        <p>Created : <span className="float-right font-medium text-gray-700">{dateTimeFormat(data.purchase.date)}</span></p>
                                   </div>
                                   <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                        <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Purchase Info</h2>
                                        <p>No : <span className="float-right font-medium text-gray-700">{data.purchase.code}</span></p>
                                        <p>Supplier :
                                             <select className={`float-right bg-gray-300 ${errors.supplier?'border border-red-500':''} font-medium text-gray-700 focus:outline-none`} value={values.supplier} name="supplier" onChange={handleChange}>
                                                  <option>Select Supplier</option>
                                                  {data.purchase.suppliers.map(({id, name}, i)=>{
                                                       return <option key={`sup${i}`} value={id}>{name}</option>
                                                  })}
                                             </select>
                                        </p>
                                        <p>Suppl. Rcpt No : <input name="receipt" className={`float-right bg-gray-300 ${errors.receipt?'border border-red-500':''} px-1 border-b font-medium text-gray-700 focus:outline-none`} type="text" value={values.receipt} onChange={handleChange}/></p>
                                   </div>
                                   <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                        <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Reciept Summary</h2>
                                        <p>Sub-Total : <span className="float-right font-medium text-gray-700">{values.subtotal.toFixed(2)}</span></p>
                                        <p>Transport : <input onChange={handleNumber} name="transport" className="float-right text-right bg-gray-300 font-medium text-gray-700 focus:outline-none" type="text" value={values.transport.toFixed(2)} /></p>
                                        <p>Tax : <input onChange={handleNumber} name="tax" className="float-right text-right bg-gray-300 font-medium text-gray-700 focus:outline-none" type="text" value={values.tax.toFixed(2)} /></p>
                                        <p className="mt-2 border-t font-semibold text-gray-700">Total : <span className="float-right">$ {(values.total.toFixed(2))}</span></p>
                                   </div>
                              </div>
                              <div className="flex w-full mt-5 border-t pt-5">
                                   <table className="table-auto col-span-12">
                                        <thead className="bg-gray-400 text-sm">
                                             <tr>
                                                  <th className="px-4 py-2"></th>
                                                  <th className="px-4 py-2">Product</th>
                                                  <th className="px-4 py-2">Recieved</th>
                                                  <th className="px-4 py-2">Cost</th>
                                                  <th className="px-4 py-2">Tax</th>
                                                  <th className="px-4 py-2">Total</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {values.products.map(({name, qty_order, qty_recieve, cost, tax, total}, i) => {
                                                  return <tr key={`pop${i}`}>
                                                       <td className="border px-4 py-2">{i+1}</td>
                                                       <td className="border px-4 py-2">{name}</td>
                                                       <td className="border px-2 py-2">
                                                            <input type="text" name="qty_recieve[]" value={qty_recieve} onChange={(e)=>handleQty(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                       </td>
                                                       <td className="border px-2 py-2">
                                                            <input type="text" name="cost[]" value={cost} onChange={(e)=>handlePrice(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                            {errors[`products.${i}.cost`] && (<div className="text-red-500 text-xs italic">{errors[`products.${i}.cost`]}</div>)}
                                                       </td>
                                                       <td className="border px-2 py-2">
                                                            <input type="text" name="tax" value={tax} onChange={(e)=>handleTax(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />
                                                       </td>
                                                       <td className="border px-4 py-2 text-right">$ {total.toFixed(2)}</td>
                                                  </tr>
                                             })}
                                        </tbody>
                                   </table>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Edit Purchase
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
Edit.layout = page => <Layout children={page} header={'Edit Purchase'} />;

export default Edit;
