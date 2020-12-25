import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import DataContainer from '../../../../Shared/DataContainer';
import DropdownButton from '../../../../Shared/DropdownButton';
import Icon from '../../../../Shared/Icon';
import { can, dateFormat } from '../../../../utils';

const Index = () => {
     const { auth, errors, data } = usePage().props;

     return (
          <React.Fragment key="purchase-order-index">
               <Helmet>
                    <title>Inventory</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('store.show', data.store.id)}>{data.store.name}</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Purchases</span>
               </div>
               <DataContainer>
                    <div className="col-span-12">
                         <InertiaLink href={route('store.show', data.store.id)} className="float-right bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                              <Icon name="back" className={'fill-current w-4 h-4 mr-2'} />
                              Back
                         </InertiaLink>
                    </div>
                    <table className="table-fixed col-span-12 text-sm">
                         <thead className="bg-gray-400">
                              <tr>
                                   <th className="px-4 py-2">Product</th>
                                   <th className="px-4 py-2">Qty Av.</th>
                                   <th className="px-4 py-2">Qty Sold</th>
                                   <th className="px-4 py-2">Exp. Date</th>
                                   <th className="px-4 py-2">Lot</th>
                                   <th className="px-4 py-2">Price</th>
                                   <th className="px-4 py-2">Discount</th>
                              </tr>
                         </thead>
                         <tbody>
                              {data.inventory.data.map(({id, product, qty_available, qty_sold, expiration, lot, price, discount}) => {
                                   return <tr key={id}>
                                        <td className="border px-4 py-2">{product}</td>
                                        <td className="border px-4 py-2 text-center">{qty_available}</td>
                                        <td className="border px-4 py-2 text-center">{qty_sold}</td>
                                        <td className="border px-4 py-2 text-center">{expiration?dateFormat(expiration):'-'}</td>
                                        <td className="border px-4 py-2 text-center">{lot}</td>
                                        <td className="border px-4 py-2 text-right">{price.toFixed(2)}</td>
                                        <td className="border px-4 py-2 text-right">{discount.toFixed(2)}</td>
                                   </tr>
                              })}
                              {!data.inventory.data.length && (<tr>
                                   <td colSpan="7" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                              </tr>)}
                         </tbody>
                    </table>
               </DataContainer>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Index.layout = page => <Layout children={page} header={'Inventory'} />;

export default Index;
