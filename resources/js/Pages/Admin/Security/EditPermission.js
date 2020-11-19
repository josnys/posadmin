import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../Shared/Layout';
import ProfileCard from '../../../Shared/ProfileCard';
import DataCard from '../../../Shared/DataCard';
import Icon from '../../../Shared/Icon';
import classNames from 'classnames';
import TextInput from '../../../Shared/TextInput';
import TextArea from '../../../Shared/TextArea';
import LoadingButton from '../../../Shared/LoadingButton';
import axios from 'axios';

function CreateRole() {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);
     const [saved, setSaved] = useState(false);
     const [values, setValues] = useState({
          id: data.id || null,
          name: data.name || '',
          display: data.display || '',
          description: data.description || '',
          errors: errors
     });

     const iconClasses = classNames('w-4 h-4 mr-2', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     function handleChange(e) {
          const key = e.target.name;
          const value = e.target.value;
          setValues(values => ({
               ...values,
               [key]: value
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          Inertia.post(route('permission.update', data.id), values).then(() => {
               setSending(false);
          });
     }

     return (
          <React.Fragment key="permission-c">
               <ProfileCard>
                    <div className="md:col-span-1">
                         <div className="px-4 sm:px-0">
                              <h3 className="text-lg font-medium text-gray-900">Edit Permission</h3>
                              <p className="mt-1 text-sm text-gray-600">
                                   Use the form to edit permissions to the system. These role will be used to defined the level of access of each users
                              </p>
                         </div>
                    </div>
                    <DataCard>
                         <form onSubmit={handleSubmit}>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-3 gap-3">
                                        <div className="col-span-12 text-right">
                                             <InertiaLink href={route('security.index')} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                                  <Icon name="back" className={iconClasses} />
                                                  Back
                                             </InertiaLink>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                             <TextInput
                                                   className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                   label="Display Name"
                                                   name="display"
                                                   type="text"
                                                   disable={false}
                                                   readonly={false}
                                                   must={true}
                                                   errors={errors.display}
                                                   value={values.display}
                                                   onChange={handleChange}
                                              />
                                              <TextInput
                                                   className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                   label="Name"
                                                   name="name"
                                                   type="text"
                                                   disable={false}
                                                   readonly={true}
                                                   errors={errors.name}
                                                   value={values.name}
                                              />
                                              <TextArea
                                                   className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                   label="Description"
                                                   name="description"
                                                   errors={errors.description}
                                                   value={values.description}
                                                   onChange={handleChange}
                                              />
                                        </div>
                                   </div>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <div className="mr-3">
                                        {!sending && saved && (<div className="text-sm text-gray-600">
                                             Updated.
                                        </div>)}
                                   </div>
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Update
                                   </LoadingButton>
                              </div>
                         </form>
                    </DataCard>
               </ProfileCard>
          </React.Fragment>
     );
}

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
CreateRole.layout = page => <Layout children={page} header={'Create Role'} />;

export default CreateRole;
