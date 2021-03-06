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
                    <title>View Purchase Order</title>
               </Helmet>
               <DataContainer>
                    <div className="col-span-12 text-right">
                         {(can(auth.user, 'update-purchase-order') && !data.purchase.approved) && (<InertiaLink href={route('purchase-order.edit', [data.store.id, data.purchase.id])} className="float-left bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                              <Icon name="edit" className={iconClasses} />
                              Edit
                         </InertiaLink>)}
                         {(can(auth.user, 'read-purchase-order') && data.purchase.approved) && (<InertiaLink href={route('purchase.create', [data.store.id, data.purchase.id])} className="float-left bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                              <Icon name="ticket" className={iconClasses} />
                              Create Purchase
                         </InertiaLink>)}
                         <InertiaLink href={route('purchase-order.index', data.store.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
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
                    <div className="w-full text-center uppercase font-semibold text-gray-600 mt-3">Purchase Order</div>
                    <div className="w-full grid grid-cols-2 gap-3">
                         <div className="justify-between">
                              <p className="mt-3 text-gray-800 font-medium w-full">Purchase Order No. : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{data.purchase.code}</span></p>
                              <p className="mt-3 text-gray-800 font-medium w-full">User : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{data.purchase.user}</span></p>
                              <p className="mt-3 text-gray-800 font-medium w-full">Purchase Created : <span className="w-1/2 ml-3 px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded float-right">{dateTimeFormat(data.purchase.created)}</span></p>
                         </div>
                    </div>
                    <div className="w-full mt-3 border-t pt-4">
                         <table className="table-fixed w-full">
                              <thead className="bg-gray-400">
                                   <tr>
                                        <th className="px-4 py-2 w-1/6">Code</th>
                                        <th className="px-4 py-2 w-4/6">Product</th>
                                        <th className="px-4 py-2 w-1/6">Quantity</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {data.details.map(({code, name, qty}, i) => {
                                        return <tr key={`prod-${i}`}>
                                             <td className="border px-4 py-2">{code}</td>
                                             <td className="border px-4 py-2">{name}</td>
                                             <td className="border px-4 py-2 text-center">{qty}</td>
                                        </tr>
                                   })}
                                   {!data.details.length && (<tr>
                                        <td colSpan="3" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                                   </tr>)}
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
