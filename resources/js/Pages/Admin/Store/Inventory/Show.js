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
import { can, dateTimeFormat } from '../../../../utils';

const Show = () => {
     const { auth, data } = usePage().props;
     console.log(data);
     const iconClasses = classNames('w-3 h-3 mr-1', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     const iconClassesBlue = classNames('w-3 h-3 mr-1', {
          'text-white fill-current': false,
          'text-blue-500 hover:text-white fill-current': true
     });

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>View Purchase</title>
               </Helmet>
               <DataContainer>
                    <div className="col-span-12 text-right">
                         <InertiaLink href={route('purchase.index', data.store.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                              <Icon name="back" className={iconClasses} />
                              Back
                         </InertiaLink>
                    </div>
               </DataContainer>

               <div className="w-full mt-3 bg-white shadow rounded p-4">
                    <div className="grid grid-cols-3 gap-3 w-full">
                         <div className=""></div>
                         <div className="justify-center items-center text-center border-b pb-4">
                              <img src={data.store.logo} className="w-16 mx-auto" />
                              <h1 className="text-gray-700 font-semibold text-lg">{data.store.name}</h1>
                              <ul>
                                   {data.store.contacts.map(({type, reference, link}) => {
                                        return <li className="text-gray-500 text-sm font-medium">{reference}</li>
                                   })}
                              </ul>
                         </div>
                         <div className=""></div>
                    </div>
                    <div className="w-full justify-center justify-items-center items-center text-center font-medium text-gray-600 mt-3">
                         <div className="" dangerouslySetInnerHTML={{ __html: data.barcode }}></div>
                    </div>
                    <div className="w-full text-center uppercase font-semibold text-gray-600 mt-3">Purchase</div>
                    <div className="col-span-12">
                         <div className="w-full grid grid-cols-3 gap-4">
                              <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                   <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Purchase Info</h2>
                                   <p>Store : <span className="float-right font-medium text-gray-700">{data.store.name}</span></p>
                                   <p>User : <span className="float-right font-medium text-gray-700">{data.user}</span></p>
                                   <p>Created : <span className="float-right font-medium text-gray-700">{dateTimeFormat(data.date)}</span></p>
                              </div>
                              <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                   <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Purchase Info</h2>
                                   <p>No : <span className="float-right font-medium text-gray-700">{data.code}</span></p>
                                   <p>Supplier :<span className="float-right font-medium text-gray-700">{data.supplier}</span></p>
                                   <p>Suppl. Rcpt No : <span className="float-right font-medium text-gray-700">{data.reciept}</span></p>
                              </div>
                              <div className="p-2 bg-gray-100 text-sm text-gray-600">
                                   <h2 className="text-md text-gray-800 font-semibold border-b pb-1 mb-2">Reciept Summary</h2>
                                   <p>Sub-Total : <span className="float-right font-medium text-gray-700">{data.amount.toFixed(2)}</span></p>
                                   <p>Transport : <span className="float-right font-medium text-gray-700">{data.transport.toFixed(2)}</span></p>
                                   <p>Tax : <span className="float-right font-medium text-gray-700">{data.tax.toFixed(2)}</span></p>
                                   <p className="mt-2 border-t font-semibold text-gray-700">Total : <span className="float-right">$ {(data.total.toFixed(2))}</span></p>
                              </div>
                         </div>
                    </div>
                    <div className="flex w-full mt-5 border-t pt-5">
                         <table className="table-auto w-full">
                              <thead className="bg-gray-400 text-sm">
                                   <tr>
                                        <th className="px-4 py-2">Product</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Cost</th>
                                        <th className="px-4 py-2">Tax</th>
                                        <th className="px-4 py-2">Total</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {data.details.map(({product, quantity, cost, tax, total}, i) => {
                                        return <tr key={`pop${i}`}>
                                             <td className="border px-4 py-2">{product}</td>
                                             <td className="border px-4 py-2 text-center">{quantity}</td>
                                             <td className="border px-2 py-2 text-right">{cost.toFixed(2)}</td>
                                             <td className="border px-2 py-2 text-right">{tax.toFixed(2)}</td>
                                             <td className="border px-4 py-2 text-right">$ {total.toFixed(2)}</td>
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
Show.layout = page => <Layout children={page} header={'View Purchase Order'} />;

export default Show;
