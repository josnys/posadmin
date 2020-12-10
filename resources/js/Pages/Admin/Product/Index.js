import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../Shared/Layout';
import DataContainer from '../../../Shared/DataContainer';
import DropdownButton from '../../../Shared/DropdownButton';
import Icon from '../../../Shared/Icon';
import { can } from '../../../utils';

const Index = () => {
     const { auth, errors, data } = usePage().props;
     return (
          <React.Fragment key="security-index">
               <Helmet>
                    <title>Products</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Products</span>
               </div>
               <DataContainer>
                    <div className="col-span-12">
                         {can(auth.user, 'create-product') && (<InertiaLink href={route('product.create')} className="bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'plus'} className={'fill-current w-4 h-4 mr-2'} />
                              Add Product
                         </InertiaLink>)}
                         {can(auth.user, 'read-category') && (<InertiaLink href={route('category.index')} className="float-right bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'category'} className={'fill-current w-4 h-4 mr-2'} />
                              Categories
                         </InertiaLink>)}
                    </div>
                    <table className="table-fixed col-span-12">
                         <thead className="bg-gray-400">
                              <tr>
                                   <th className="px-4 py-2"></th>
                                   <th className="px-4 py-2">Name</th>
                                   <th className="px-4 py-2">Category</th>
                                   <th className="px-4 py-2">Subcategory</th>
                                   <th className="px-4 py-2">Status</th>
                                   <th className="px-4 py-2"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {data.data.map(({id, name, category, subcategory, image, status, statusCaption}) => {
                                   return <tr key={id}>
                                        <td className="border px-4 py-2">{image && (<img src={image} alt={name} className="w-8 rounded mx-auto" />)}</td>
                                        <td className="border px-4 py-2">{name}</td>
                                        <td className="border px-4 py-2 text-center">{category}</td>
                                        <td className="border px-4 py-2 text-center">{subcategory}</td>
                                        <td className={`border px-4 py-2 text-center text-${status?'green':'red'}-600`}>{statusCaption}</td>
                                        <td className="border px-4 py-2">
                                             <DropdownButton caption="Actions" color="blue">
                                                  {can(auth.user, 'update-product') && (<InertiaLink href={route('product.edit', id)} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'edit'} className={'fill-current w-5 h-5 mr-2'} />
                                                       Edit
                                                  </InertiaLink>)}
                                                  {can(auth.user, 'read-product') && (<InertiaLink href={route('product.show', id)} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'eye'} className={'fill-current w-5 h-5 mr-2'} />
                                                       View
                                                  </InertiaLink>)}
                                                  {can(auth.user, 'read-product-configuration') && (<InertiaLink href={route('product.config.index', id)} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'cog'} className={'fill-current w-5 h-5 mr-2'} />
                                                       Configurations
                                                  </InertiaLink>)}
                                             </DropdownButton>
                                        </td>
                                   </tr>
                              })}
                              {!data.data.length && (<tr>
                                   <td colSpan="6" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                              </tr>)}
                         </tbody>
                    </table>
               </DataContainer>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Index.layout = page => <Layout children={page} header={'Products'} />;

export default Index;
