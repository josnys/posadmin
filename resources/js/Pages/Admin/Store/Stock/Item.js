import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import TextInput from '../../../../Shared/TextInput';
import SelectInput from '../../../../Shared/SelectInput';
import FileInput from '../../../../Shared/FileInput';
import TextArea from '../../../../Shared/TextArea';
import DataContainer from '../../../../Shared/DataContainer';
import LoadingButton from '../../../../Shared/LoadingButton';
import Icon from '../../../../Shared/Icon';
import classNames from 'classnames';
import { can, dateFormat } from '../../../../utils';
import axios from 'axios';

const Item = () => {
     const { auth, data, errors } = usePage().props;
     const [sending, setSending] = useState(false);
     const [values, setValues] = useState({
          products: data.details
     });

     const iconClasses = classNames('w-3 h-3 mr-1', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     function handleQty(e, i){
          const value = parseFloat(e.target.value);
          let products = values.products;

          if(!Number.isNaN(value)){
               if(value <= products[i].qty_available && value != 0){
                    products[i].qty_send = value;
                    products[i].message = '';
                    setChange(products);
               }
          }else{
               products[i].qty_send = '';
               setChange(products);
          }
     }

     function setChange(products){
          setValues(values => ({
               ...values,
               products: products,
          }));
     }

     function addToInventory(e, i) {
          e.preventDefault();
          let products = values.products;
          if(Number.isNaN(products[i].qty_send) || (products[i].qty_send < 1)){
               products[i].message = 'Qty should be > 0';
               setChange(products);
          }else{
               let info = {
                    stock: products[i].id,
                    quantity: products[i].qty_send
               };
               setSending(true);
               axios.post(route('inventory.store', data.store.id), info).then((response) => {
                    setSending(false);
                    let resp = response.data;
                    products[i].qty_inv = resp.qty_inv;
                    products[i].qty_available = resp.qty_available;
                    products[i].qty_send = '';
                    setChange(products);
               }).catch((error) => {
                    console.log(error.response.data.errors);
               });
          }
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>View Stock Items</title>
               </Helmet>
               <DataContainer>
                    <div className="col-span-12">
                         <span className="font-semibold text-gray-700">{data.store.name} All Stock Items</span>
                         <InertiaLink href={route('stock.index', data.store.id)} className="float-right bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                              <Icon name="back" className={iconClasses} />
                              Back
                         </InertiaLink>
                    </div>
               </DataContainer>

               <div className="w-full mt-3 bg-white shadow rounded p-4">
                    <div className="flex w-full pt-5">
                         <table className="table-auto w-full">
                              <thead className="bg-gray-400 text-sm">
                                   <tr>
                                        <th className="px-4 py-2">Product</th>
                                        <th className="px-4 py-2">Qty / Qty Inv.</th>
                                        <th className="px-4 py-2">Qty Available</th>
                                        {can(auth.user, 'create-inventory') && (<th className="px-4 py-2">Qty Send</th>)}
                                        <th className="px-4 py-2">Exp. Date</th>
                                        <th className="px-4 py-2"># Lot</th>
                                        <th className="px-4 py-2">Cost</th>
                                        <th className="px-4 py-2">Price</th>
                                        {can(auth.user, 'create-inventory') && (<th className="px-4 py-2"></th>)}
                                   </tr>
                              </thead>
                              <tbody>
                                   {data.details.map(({product, quantity, qty_inv, qty_available, qty_send, expiration, lot, cost, price, message}, i) => {
                                        return <tr key={`stk${i}`} className={(qty_available == 0)?'bg-gray-200 text-gray-500':''}>
                                             <td className="border px-4 py-2">{product}</td>
                                             <td className="border px-4 py-2 text-center">{quantity} / {qty_inv}</td>
                                             <td className="border px-4 py-2 text-center">{qty_available}</td>
                                             {can(auth.user, 'create-inventory') && (<td className="border px-4 py-2 text-center">
                                                  {(qty_available > 0) && (<input type="text" name="qty_send" value={qty_send} onChange={(e)=>handleQty(e,i)} className="w-full bg-gray-200 rounded py-2 mx-auto focus:outline-none text-center leading-tight" />)}
                                                  {(message != '') && (<span className="w-full text-sm italic text-red-700">{message}</span>)}
                                             </td>)}
                                             <td className="border px-4 py-2 text-center">{expiration?dateFormat(expiration):'-'}</td>
                                             <td className="border px-4 py-2 text-center">{lot?lot:'-'}</td>
                                             <td className="border px-2 py-2 text-right">{cost.toFixed(2)}</td>
                                             <td className="border px-2 py-2 text-right">{price.toFixed(2)}</td>
                                             {can(auth.user, 'create-inventory') && (<td className="border px-2 py-2">
                                                  {(qty_available > 0)?<button disabled={sending} onClick={e=>addToInventory(e,i)} className="p-2 bg-green-600 text-white rounded">+ Inv.</button>:null}
                                             </td>)}
                                        </tr>
                                   })}
                              </tbody>
                         </table>
                    </div>
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Item.layout = page => <Layout children={page} header={'View Stock Items'} />;

export default Item;
