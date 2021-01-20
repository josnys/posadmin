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
          Inertia.post(route('stock.post.approve', [data.store.id, data.id])).then((response) => {
               setSending(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Approve Stock</title>
               </Helmet>
               <div className="w-full mt-3 bg-white shadow rounded p-4">
                    <form onSubmit={handleSubmit}>
                         <div className="grid grid-cols-3 gap-3 w-full">
                              <div className=""></div>
                              <div className="justify-center items-center text-center border-b pb-4">
                                   <h1 className="text-gray-700 font-semibold text-lg">{data.store.name}</h1>
                              </div>
                              <div className=""></div>
                         </div>
                         <div className="w-full text-center uppercase font-semibold text-gray-600 mt-3">Stock</div>
                         <div className="w-full grid grid-cols-2 gap-3">
                              <div className="justify-between">
                                   <p className="mt-3 text-gray-800 font-medium w-full">Stock No. : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{data.code}</span></p>
                                   <p className="mt-3 text-gray-800 font-medium w-full">Stock Created : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{format(new Date(data.date), 'Pp')}</span></p>
                              </div>
                         </div>
                         <div className="w-full mt-3 border-t pt-4">
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <InertiaLink href={route('stock.index', data.store.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                        Cancel
                                   </InertiaLink>
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Approve Stock
                                   </LoadingButton>
                              </div>
                              <table className="table-fixed w-full">
                                   <thead className="bg-gray-400 text-sm">
                                        <tr>
                                             <th className="px-4 py-2">Product</th>
                                             <th className="px-4 py-2">Quantity</th>
                                             <th className="px-4 py-2">Qty Inventory</th>
                                             <th className="px-4 py-2">Exp. Date</th>
                                             <th className="px-4 py-2"># Lot</th>
                                             <th className="px-4 py-2">Cost</th>
                                             <th className="px-4 py-2">Price</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {data.details.map(({product, quantity, qty_inv, expiration, lot, cost, price}, i) => {
                                             return <tr key={`stk${i}`}>
                                                  <td className="border px-4 py-2">{product}</td>
                                                  <td className="border px-4 py-2 text-center">{quantity}</td>
                                                  <td className="border px-4 py-2 text-center">{qty_inv}</td>
                                                  <td className="border px-4 py-2 text-center">{expiration?dateFormat(expiration):'-'}</td>
                                                  <td className="border px-4 py-2 text-center">{lot?lot:'-'}</td>
                                                  <td className="border px-2 py-2 text-right">{cost.toFixed(2)}</td>
                                                  <td className="border px-2 py-2 text-right">{price.toFixed(2)}</td>
                                             </tr>
                                        })}
                                   </tbody>
                              </table>
                         </div>
                         <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                              <InertiaLink href={route('stock.index', data.store.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                   Cancel
                              </InertiaLink>
                              <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                   Approve Stock
                              </LoadingButton>
                         </div>
                    </form>
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Approve.layout = page => <Layout children={page} header={'Approve Stock'} />;

export default Approve;
