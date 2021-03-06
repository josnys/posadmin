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
import { can } from '../../../../utils';
import format from 'date-fns/format';

const Approve = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);
     const iconClasses = classNames('w-3 h-3 mr-1', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     const iconClassesBlue = classNames('w-3 h-3 mr-1', {
          'text-white fill-current': false,
          'text-blue-500 hover:text-white fill-current': true
     });

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          Inertia.post(route('purchase.post.approve', [data.store.id, data.purchase.id])).then((response) => {
               setSending(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Approve Purchase</title>
               </Helmet>
               <div className="w-full mt-3 bg-white shadow rounded p-4">
                    <form onSubmit={handleSubmit}>
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
                         <div className="w-full text-center uppercase font-semibold text-gray-600 mt-3">Purchase</div>
                         <div className="w-full grid grid-cols-2 gap-3">
                              <div className="justify-between">
                                   <p className="mt-3 text-gray-800 font-medium w-full">Purchase No. : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{data.purchase.code}</span></p>
                                   <p className="mt-3 text-gray-800 font-medium w-full">User : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{data.purchase.user}</span></p>
                                   <p className="mt-3 text-gray-800 font-medium w-full">Purchase Created : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{format(new Date(data.purchase.created), 'Pp')}</span></p>
                              </div>
                              <div className="justify-between">
                                   <p className="mt-3 text-gray-800 font-medium w-full">Sub Total. : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 text-right font-medium rounded float-right">{data.purchase.subtotal.toFixed(2)}</span></p>
                                   <p className="mt-3 text-gray-800 font-medium w-full">Tax & Transport : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 text-right font-medium rounded float-right">{data.purchase.tax.toFixed(2)} + {data.purchase.transport.toFixed(2)}</span></p>
                                   <p className="mt-3 text-gray-800 font-medium w-full">Total : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 text-right font-medium rounded float-right">{data.purchase.total.toFixed(2)}</span></p>
                              </div>
                         </div>
                         <div className="w-full mt-3 border-t pt-4">
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <InertiaLink href={route('purchase.index', data.store.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                        Cancel
                                   </InertiaLink>
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Approve Purchase
                                   </LoadingButton>
                              </div>
                              <table className="table-auto w-full">
                                   <thead className="bg-gray-400">
                                        <tr>
                                             <th className="px-4 py-2">Product</th>
                                             <th className="px-4 py-2">Quantity</th>
                                             <th className="px-4 py-2">Cost</th>
                                             <th className="px-4 py-2">Tax</th>
                                             <th className="px-4 py-2">Total</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {data.details.map(({name, quantity, cost, tax, total}, i) => {
                                             return <tr key={`prod-${i}`}>
                                                  <td className="border px-4 py-2">{name}</td>
                                                  <td className="border px-4 py-2 text-center">{quantity}</td>
                                                  <td className="border px-4 py-2 text-right">{cost.toFixed(2)}</td>
                                                  <td className="border px-4 py-2 text-right">{tax.toFixed(2)}</td>
                                                  <td className="border px-4 py-2 text-right">{total.toFixed(2)}</td>
                                             </tr>
                                        })}
                                        {!data.details.length && (<tr>
                                             <td colSpan="3" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                                        </tr>)}
                                   </tbody>
                              </table>
                         </div>
                         <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                              <InertiaLink href={route('purchase-order.index', data.store.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                   Cancel
                              </InertiaLink>
                              <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                   Approve Purchase
                              </LoadingButton>
                         </div>
                    </form>
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Approve.layout = page => <Layout children={page} header={'Approve Purchase'} />;

export default Approve;
