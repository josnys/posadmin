import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import DataContainer from '../../../../Shared/DataContainer';
import DropdownButton from '../../../../Shared/DropdownButton';
import Icon from '../../../../Shared/Icon';
import { can, dateTimeFormat } from '../../../../utils';

const Index = () => {
     const { auth, errors, data } = usePage().props;
     return (
          <React.Fragment key="purchase-order-index">
               <Helmet>
                    <title>Purchase Orders</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('store.show', data.store.id)}>{data.store.name}</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Purchase Orders</span>
               </div>
               <DataContainer>
                    <div className="col-span-12">
                         {can(auth.user, 'create-purchase-order') && (<InertiaLink href={route('purchase-order.create', data.store.id)} className="bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'plus'} className={'fill-current w-4 h-4 mr-2'} />
                              Add Purchase Order
                         </InertiaLink>)}
                         <InertiaLink href={route('store.show', data.store.id)} className="float-right bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                              <Icon name="back" className={'fill-current w-4 h-4 mr-2'} />
                              Back
                         </InertiaLink>
                    </div>
                    <table className="table-fixed col-span-12">
                         <thead className="bg-gray-400">
                              <tr>
                                   <th className="px-4 py-2">Code</th>
                                   <th className="px-4 py-2">User</th>
                                   <th className="px-4 py-2">Merged</th>
                                   <th className="px-4 py-2">Approved</th>
                                   <th className="px-4 py-2">Purchased</th>
                                   <th className="px-4 py-2">Created</th>
                                   <th className="px-4 py-2"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {data.purchases.data.map(({id, code, user, date, merged, mergeCaption, approved, approveCaption, purchased, purchasedCaption}) => {
                                   return <tr key={id}>
                                        <td className="border px-4 py-2">{code}</td>
                                        <td className="border px-4 py-2">{user}</td>
                                        <td className={`border px-4 py-2 text-center text-${merged?'blue':'gray'}-600`}>{mergeCaption}</td>
                                        <td className={`border px-4 py-2 text-center text-${approved?'green':'gray'}-600`}>{approveCaption}</td>
                                        <td className={`border px-4 py-2 text-center text-${purchased?'blue':'gray'}-600`}>{purchasedCaption}</td>
                                        <td className="border px-4 py-2 text-center">{dateTimeFormat(date)}</td>
                                        <td className="border px-4 py-2">
                                             <DropdownButton caption="Actions" color="blue">
                                                  {(can(auth.user, 'update-purchase-order') && !approved) && (<InertiaLink href={route('purchase-order.edit', [data.store.id, id])} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'edit'} className={'fill-current w-5 h-5 mr-2'} />
                                                       Edit
                                                  </InertiaLink>)}
                                                  {can(auth.user, 'read-purchase-order') && (<InertiaLink href={route('purchase-order.show', [data.store.id, id])} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'eye'} className={'fill-current w-5 h-5 mr-2'} />
                                                       View
                                                  </InertiaLink>)}
                                                  {(can(auth.user, 'update-purchase-order') && approved) && (<InertiaLink href={route('purchase.create', [data.store.id, id])} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'ticket'} className={'fill-current w-5 h-5 mr-2'} />
                                                       Create Purchase
                                                  </InertiaLink>)}
                                                  {(can(auth.user, 'approve-purchase-order') && !approved) && (<InertiaLink href={route('purchase-order.get.approve', [data.store.id, id])} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'thumb-up'} className={'fill-current w-5 h-5 mr-2'} />
                                                       Approve
                                                  </InertiaLink>)}
                                             </DropdownButton>
                                        </td>
                                   </tr>
                              })}
                              {!data.purchases.data.length && (<tr>
                                   <td colSpan="8" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                              </tr>)}
                         </tbody>
                    </table>
               </DataContainer>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Index.layout = page => <Layout children={page} header={'Purchase Order'} />;

export default Index;
