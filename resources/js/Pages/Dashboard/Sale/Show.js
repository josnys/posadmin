import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import POSLayout from '../../../Shared/POSLayout';
import Icon from '../../../Shared/Icon';
import {dateTimeFormat} from '../../../utils';


const Show = () => {
     const { app, auth, data } = usePage().props;

     return (
          <React.Fragment>
               <Helmet>
                    <title>POS Sale</title>
               </Helmet>
               <div className="w-full items-center p-4">
                    <InertiaLink className="mx-auto p-2 bg-blue-500 text-gray-200 font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600" href={route('sell.create', data.store.id)}>POS</InertiaLink>
               </div>
               <div className="flex w-full rounded">
                    <div className="sm:w-full md:w-2/3 h-auto md:mx-auto mt-2 p-4 bg-white">
                         <div className="flex w-full">
                              <div className="mx-auto w-1/2 border-b pb-2">
                                   <img src={data.store.image} className="w-20 mx-auto" />
                                   <h1 className="text-center text-2xl text-gray-700 font-medium">{data.store.name}</h1>
                                   <ul className="mx-auto">
                                        {data.store.contacts.map(({type, reference, link}, i)=>{
                                             return <li key={`cont${i}`} className="text-sm text-center text-gray-600">{reference}</li>
                                        })}
                                   </ul>
                              </div>
                         </div>
                         <div className="w-full mt-2">
                              <h1 className="text-center text-lg text-gray-700 font-medium">Reciept {data.type}</h1>
                         </div>
                         <div className="w-full md:flex mt-2">
                              <div className="sm:full mb-2 md:w-1/3 px-2 border">
                                   <p className="font-medium text-gray-700">Reciept :</p>
                                   <p className="text-sm text-gray-700">No.: <span className="font-medium text-right float-right pr-2">{data.code}</span></p>
                                   <p className="text-sm text-gray-700">Date <span className="font-medium text-right float-right pr-2">{dateTimeFormat(data.created)}</span></p>
                              </div>
                              <div className="sm:full mb-2 md:w-1/3 px-2 border">
                                   <p className="font-medium text-gray-700">Customer :</p>
                                   <p className="text-sm text-gray-700">Name <span className="font-medium text-right float-right pr-2">{data.customer.name}</span></p>
                                   <p className="text-sm text-gray-700">Code <span className="font-medium text-right float-right pr-2">{data.customer.code}</span></p>
                              </div>
                              <div className="sm:full mb-2 md:w-1/3 px-2 border">
                                   <p className="font-medium text-gray-700">Seller :</p>
                                   <p className="text-sm text-gray-700">Name <span className="font-medium text-right float-right pr-2">{data.user.name}</span></p>
                                   <p className="text-sm text-gray-700">Code <span className="font-medium text-right float-right pr-2">{data.user.code}</span></p>
                              </div>
                         </div>
                         <div className="w-full mt-2">
                              <table className="table-auto w-full">
                                   <thead className="bg-gray-400 text-sm">
                                        <tr>
                                             <th className="px-4 py-2">Item</th>
                                             <th className="px-4 py-2 text-center">Qty</th>
                                             <th className="px-4 py-2 text-right">Price</th>
                                             <th className="px-4 py-2 text-right">Tax</th>
                                             <th className="px-4 py-2 text-right">Disc.</th>
                                             <th className="px-4 py-2 text-right">Total</th>
                                        </tr>
                                   </thead>
                                   <tbody className="text-gray-800 text-sm">
                                        {data.details.map((product, i) => {
                                             return <tr key={`pr${i}`} className="border-b">
                                                  <td className="px-4 py-2">{product.name}</td>
                                                  <td className="px-4 py-2 text-center">{product.quantity.toFixed(2)}</td>
                                                  <td className="px-4 py-2 text-right">{product.price.toFixed(2)}</td>
                                                  <td className="px-4 py-2 text-right">{product.tax.toFixed(2)}</td>
                                                  <td className="px-4 py-2 text-right">{product.discount.toFixed(2)}</td>
                                                  <td className="px-4 py-2 text-right font-medium">{data.currency.code} {product.subtotal.toFixed(2)}</td>
                                             </tr>
                                        })}
                                   </tbody>
                                   <tfoot className="text-md">
                                        <tr className="font-medium text-gray-800">
                                             <td colSpan="5" className="text-right px-4 py-2">Total</td>
                                             <td className="text-right px-4 py-2">{data.currency.code} {data.amount.toFixed(2)}</td>
                                        </tr>
                                        <tr className="font-medium text-gray-800">
                                             <td colSpan="5" className="text-right px-4 py-2">Tax</td>
                                             <td className="text-right px-4 py-2">{data.currency.code} {data.tax.toFixed(2)}</td>
                                        </tr>
                                        <tr className="font-medium text-gray-800">
                                             <td colSpan="5" className="text-right px-4 py-2">Discount</td>
                                             <td className="text-right px-4 py-2">{data.currency.code} {data.discount.toFixed(2)}</td>
                                        </tr>
                                        <tr className="font-medium text-gray-800">
                                             <td colSpan="5" className="text-right px-4 py-2">Delivery</td>
                                             <td className="text-right px-4 py-2">{data.currency.code} {data.delivery.toFixed(2)}</td>
                                        </tr>
                                        <tr className="font-medium text-gray-800">
                                             <td colSpan="5" className="text-right px-4 py-2">Total to Pay</td>
                                             <td className="text-right px-4 py-2">{data.currency.code} {data.total.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                             <td colSpan="6" className="bg-gray-400 text-center px-4 py-2 font-medium">Payments</td>
                                        </tr>
                                        {data.payments.map(({method, currency, paid, paidEquivalent})=>{
                                             return <tr className="font-medium text-gray-800">
                                                  <td colSpan="4" className="text-right px-4 py-2">{method}</td>
                                                  <td className="text-right px-4 py-2">{currency} {paid.toFixed(2)}</td>
                                                  <td className="text-right px-4 py-2">{data.currency.code} {paidEquivalent.toFixed(2)}</td>
                                             </tr>
                                        })}
                                   </tfoot>
                              </table>
                         </div>
                    </div>
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Show.layout = page => <POSLayout children={page} header={'POS'} />;

export default Show;
