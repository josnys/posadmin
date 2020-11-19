import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../Shared/Layout';
import TextInput from '../../../Shared/TextInput';
import SelectInput from '../../../Shared/SelectInput';
import FileInput from '../../../Shared/FileInput';
import TextArea from '../../../Shared/TextArea';
import ProfileCard from '../../../Shared/ProfileCard';
import DataCard from '../../../Shared/DataCard';
import LoadingButton from '../../../Shared/LoadingButton';
import Icon from '../../../Shared/Icon';
import classNames from 'classnames';

const Show = () => {
     const { auth, data } = usePage().props;

     const iconClasses = classNames('w-4 h-4 mr-2', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     const iconClassesBlue = classNames('w-4 h-4 mr-2', {
          'text-white fill-current': false,
          'text-blue-500 hover:text-white fill-current': true
     });

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>View Product</title>
               </Helmet>
               <ProfileCard>
                    <div className="md:col-span-1">
                         <div className="px-4 sm:px-0">
                              <h3 className="text-md font-medium text-gray-900">View Product</h3>
                              <h4 className="text-lg font-medium text-gray-700">{data.name}</h4>
                              <p className="w-full rounded bg-gray-300 px-2 mt-1 text-sm text-gray-600">Category <span className="float-right font-semibold">{data.category}</span></p>
                              <p className="w-full rounded bg-gray-300 px-2 mt-1 text-sm text-gray-600">Subcategory <span className="float-right font-semibold">{data.subcategory}</span></p>
                              <p className={`w-full rounded bg-${data.status?'green':'red'}-200 px-2 mt-1 text-sm text-gray-600`}>Status <span className={`float-right font-semibold text-${data.status?'green':'red'}-700`}>{data.statusCaption}</span></p>
                              <p className={`w-full rounded bg-${data.valid?'green':'red'}-200 px-2 mt-1 text-sm text-gray-600`}>Valid <span className={`float-right font-semibold text-${data.valid?'green':'red'}-700`}>{data.validCaption}</span></p>
                              <div className="w-full mt-3">
                                   {data.image && (<img src={data.image} className="mx-auto" />)}
                                   {!data.image && (<p className="text-center">No image available</p>)}
                              </div>
                              <p className="mt-1 text-sm text-gray-600">{data.description}</p>
                         </div>
                    </div>
                    <DataCard>
                         <div className="px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                   <div className="col-span-12">
                                        <InertiaLink href={route('product.edit', data.id)} className="bg-transparent border border-blue-500 text-sm text-blue-500 p-2 rounded focus:outline-none hover:bg-blue-600 hover:text-blue-100 inline-flex items-center">
                                             <Icon name="edit" className={iconClassesBlue} />
                                             Edit
                                        </InertiaLink>
                                        <InertiaLink href={route('product.index')} className="float-right bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                             <Icon name="back" className={iconClasses} />
                                             Back
                                        </InertiaLink>
                                   </div>
                                   <div className="col-span-12 sm:col-span-12">
                                        <h4 className="text-md font-medium text-gray-700">Configurations</h4>
                                        <table className="table-fixed w-full mt-3 text-sm">
                                             <thead className="bg-gray-400">
                                                  <tr>
                                                       <th className="px-2 py-1">Code</th>
                                                       <th className="px-2 py-1">Agency</th>
                                                       <th className="px-2 py-1">Presentation</th>
                                                       <th className="px-2 py-1">Transformable</th>
                                                       <th className="px-2 py-1">Status</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {data.configs.map(({id, code, agency, presentation, transformable, transformableCaption, status, statusCaption}) => {
                                                       return <tr key={id}>
                                                            <td className="border px-2 py-1">{code}</td>
                                                            <td className="border px-2 py-1">{agency}</td>
                                                            <td className="border px-2 py-1 text-center">{presentation}</td>
                                                            <td className={`border px-2 py-1 text-center text-${transformable?'green':'red'}-600`}>{transformableCaption}</td>
                                                            <td className={`border px-2 py-1 text-center text-${status?'green':'red'}-600`}>{statusCaption}</td>
                                                       </tr>
                                                  })}
                                                  {!data.configs.length && (<tr>
                                                       <td colSpan="5" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                                                  </tr>)}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </DataCard>
               </ProfileCard>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Show.layout = page => <Layout children={page} header={'View Product'} />;

export default Show;
