import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../Shared/Layout';
import ProfileCard from '../../../Shared/ProfileCard';
import DataCard from '../../../Shared/DataCard';
import DataContainer from '../../../Shared/DataContainer';
import Icon from '../../../Shared/Icon';
import classNames from 'classnames';
import TextInput from '../../../Shared/TextInput';
import TextArea from '../../../Shared/TextArea';
import LoadingButton from '../../../Shared/LoadingButton';
import { createSlug } from '../../../utils';
import axios from 'axios';

function CreatePermission() {
     const { auth, errors, data } = usePage();
     const [sending, setSending] = useState(false);
     const [saved, setSaved] = useState(false);
     const [values, setValues] = useState({
          id: null,
          name: '',
          display: '',
          description: '',
          errors: errors,
          data: data.data
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

     function handleFocusOut(e){
          const value = e.target.value;
          setValues(values => ({
               ...values,
               name: createSlug(value)
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          axios.post(route('permission.store'), values).then((response) => {
               setSaved(true);
               setSending(false);
               let _data = values.data;
               _data.push(response.data.data);
               setValues(values => ({
                    ...values,
                    name: '',
                    display: '',
                    description: '',
                    data: _data,
                    errors: []
               }));
          }).catch((error) => {
               // console.log(JSON.stringify(error));
               setValues(values => ({
                    ...values,
                    errors: error.response.data.errors
               }));
               setSending(false);
          });
     }

     return (
          <React.Fragment key="permission-c">
               <ProfileCard>
                    <div className="md:col-span-1">
                         <div className="px-4 sm:px-0">
                              <h3 className="text-lg font-medium text-gray-900">Add Permission</h3>
                              <p className="mt-1 text-sm text-gray-600">
                                   Use the form to add permissions to the system. These permissions will be used to grant access to all system's functionalities
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
                                                   errors={values.errors.display}
                                                   value={values.display}
                                                   onChange={handleChange}
                                                   onBlur={handleFocusOut}
                                              />
                                              <TextInput
                                                   className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                   label="Name"
                                                   name="name"
                                                   type="text"
                                                   disable={false}
                                                   readonly={true}
                                                   must={false}
                                                   errors={values.errors.name}
                                                   value={values.name}
                                                   onChange={handleChange}
                                              />
                                              <TextArea
                                                   className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                   label="Description"
                                                   name="description"
                                                   errors={values.errors.description}
                                                   value={values.description}
                                                   onChange={handleChange}
                                              />
                                        </div>
                                   </div>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <div className="mr-3">
                                        {!sending && saved && (<div className="text-sm text-gray-600">
                                             Saved.
                                        </div>)}
                                   </div>
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Save
                                   </LoadingButton>
                              </div>
                         </form>
                    </DataCard>
               </ProfileCard>
               <div className="hidden sm:block">
                    <div className="py-8">
                         <div className="border-t border-gray-400"></div>
                    </div>
               </div>
               <DataContainer>
                    <div className="col-span-12">
                         <h3 className="text-lg font-medium text-gray-900">Permission's List</h3>
                    </div>
                    <table className="table-auto col-span-12">
                         <thead className="bg-gray-400">
                              <tr>
                                   <th className="px-4 py-2">Display Name</th>
                                   <th className="px-4 py-2">Name</th>
                                   <th className="px-4 py-2">Description</th>
                                   <th className="px-4 py-2"></th>
                              </tr>
                         </thead>
                         <tbody>
                              {data.data.map(({id, name, display, description}, i) => {
                                   return <tr key={i}>
                                        <td className="border px-4 py-2">{display}</td>
                                        <td className="border px-4 py-2">{name}</td>
                                        <td className="border px-4 py-2">{description}</td>
                                        <td className="border px-4 py-2">
                                             <InertiaLink href={route('permission.edit', id)} className="bg-blue-300 hover:bg-blue-400 mr-2 text-blue-800 text-sm py-1 px-1 rounded inline-flex items-center">
                                                  <Icon name={'edit'} className={'fill-current w-4 h-4 mr-2'} />
                                                  Edit
                                             </InertiaLink>
                                        </td>
                                   </tr>
                              })}
                              {!values.data.length && (<tr>
                                   <td colSpan="4" className="p-4 bg-blue-100 text-blue-500 text-center">No data found.</td>
                              </tr>)}
                         </tbody>
                    </table>
               </DataContainer>
          </React.Fragment>
     );
}

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
CreatePermission.layout = page => <Layout children={page} header={'Create Permission'} />;

export default CreatePermission;
