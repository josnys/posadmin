import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import DataContainer from '../../../../Shared/DataContainer';
import DropdownButton from '../../../../Shared/DropdownButton';
import Icon from '../../../../Shared/Icon';
import { can } from '../../../../utils';

const Index = () => {
     const { auth, errors, data } = usePage().props;
     let title = data.name+"'s Configuration"
     return (
          <React.Fragment key="security-index">
               <Helmet>
                    <title>{title}</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('product.index')}>Products</InertiaLink> | <span className="text-md text-gray-700 leading-tight">{title}</span>
               </div>
               <DataContainer>
                    <div className="col-span-12">
                         {can(auth.user, 'create-product-configuration') && (<InertiaLink href={route('product.config.create', data.id)} className="bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'plus'} className={'fill-current w-4 h-4 mr-2'} />
                              Add Configuration
                         </InertiaLink>)}
                         {can(auth.user, 'read-presentation') && (<InertiaLink href={route('presentation.index')} className="float-right bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'presentation'} className={'fill-current w-4 h-4 mr-2'} />
                              Presentations
                         </InertiaLink>)}
                         {can(auth.user, 'read-agency') && (<InertiaLink href={route('agency.index')} className="float-right bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'clipboard'} className={'fill-current w-4 h-4 mr-2'} />
                              Agency
                         </InertiaLink>)}
                    </div>
                    <table className="table-fixed col-span-12">
                         <thead className="bg-gray-400">
                              <tr>
                                   <th className="px-4 py-2">Code</th>
                                   <th className="px-4 py-2">Agency</th>
                                   <th className="px-4 py-2">Presentation</th>
                                   <th className="px-4 py-2">Transformable</th>
                                   <th className="px-4 py-2">Status</th>
                                   <th className="px-4 py-2"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {data.config.map(({id, code, agency, presentation, transformable, transformableCaption, status, statusCaption}) => {
                                   return <tr key={id}>
                                        <td className="border px-4 py-2">{code}</td>
                                        <td className="border px-4 py-2">{agency}</td>
                                        <td className="border px-4 py-2 text-center">{presentation}</td>
                                        <td className={`border px-4 py-2 text-center text-${transformable?'green':'red'}-600`}>{transformableCaption}</td>
                                        <td className={`border px-4 py-2 text-center text-${status?'green':'red'}-600`}>{statusCaption}</td>
                                        <td className="border px-4 py-2">
                                             <DropdownButton caption="Actions" color="blue">
                                                  {can(auth.user, 'update-product-configuration') && (<InertiaLink href={route('product.config.edit', [data.id, id])} className="flex block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-700">
                                                       <Icon name={'edit'} className={'fill-current w-5 h-5 mr-2'} />
                                                       Edit
                                                  </InertiaLink>)}
                                             </DropdownButton>
                                        </td>
                                   </tr>
                              })}
                              {!data.config.length && (<tr>
                                   <td colSpan="5" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                              </tr>)}
                         </tbody>
                    </table>
               </DataContainer>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Index.layout = page => <Layout children={page} header={'Product Configurations'} />;

export default Index;
