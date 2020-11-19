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
                    <title>View Store</title>
               </Helmet>
               <ProfileCard>
                    <div className="md:col-span-1">
                         <div className="px-4 sm:px-0">
                              <h3 className="text-md font-medium text-gray-900">View Store</h3>
                              <div className="w-full mt-3">
                                   {data.image && (<img src={data.image} className="mx-auto" />)}
                                   {!data.image && (<p className="text-center">No image available</p>)}
                              </div>
                              <h4 className="text-lg font-medium text-gray-600 text-center">{data.name}</h4>
                              {data.slogan && (<p className="text-center italic text-gray-500 text-sm">{data.slogan}</p>)}
                              <p className="w-full text-center">
                                   <InertiaLink href={route('store.edit', data.id)} className="mx-auto text-sm text-blue-500 focus:outline-none hover:underline">
                                        Edit
                                   </InertiaLink>
                              </p>
                              <p className="w-full rounded bg-gray-300 px-2 mt-1 text-sm text-gray-600">Code <span className="float-right font-semibold">{data.code}</span></p>
                              <p className="w-full rounded bg-gray-300 px-2 mt-1 text-sm text-gray-600">Type <span className="float-right font-semibold">{data.type}</span></p>
                              <p className={`w-full rounded bg-${data.status?'green':'red'}-200 px-2 mt-1 text-sm text-gray-600`}>Status <span className={`float-right font-semibold text-${data.status?'green':'red'}-700`}>{data.statusCaption}</span></p>
                              <div className="w-full border-t mt-3"></div>
                              <h4 className="text-lg font-medium text-gray-700">Contacts</h4>
                              {data.contacts.map(({id, type, reference, status, statusCaption}) => {
                                   return <p key={`ct${id}`} className="w-full rounded bg-gray-300 px-2 mt-1 text-sm text-gray-600">
                                        {type} <InertiaLink className="text-blue-500 italic text-sm hover:underline" href={route('store.contact.edit', [data.id, id])}>(edit)</InertiaLink>
                                        <span className="float-right font-semibold">{reference}
                                             <div className={`ml-1 rounded-full bg-${status?'green':'red'}-600`}></div>
                                        </span>
                                   </p>
                              })}
                         </div>
                    </div>
                    <DataCard>
                         <div className="px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                   <div className="col-span-12">
                                        <InertiaLink href={route('store.index')} className="float-right bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                             <Icon name="back" className={iconClasses} />
                                             Back
                                        </InertiaLink>
                                   </div>
                                   <div className="col-span-12 sm:col-span-12">

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
Show.layout = page => <Layout children={page} header={'View Store'} />;

export default Show;
