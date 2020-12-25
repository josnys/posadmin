import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import TextInput from '../../../../Shared/TextInput';
import SelectInput from '../../../../Shared/SelectInput';
import ProfileCard from '../../../../Shared/ProfileCard';
import DataCard from '../../../../Shared/DataCard';
import LoadingButton from '../../../../Shared/LoadingButton';
import Icon from '../../../../Shared/Icon';
import classNames from 'classnames';
import { toFormData } from '../../../../utils';

const Create = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);

     const [values, setValues] = useState({
          type: '',
          reference: '',
          link: '',
          status: false,
     });

     const iconClasses = classNames('w-4 h-4 mr-2', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     function handleChange(e) {
          const key = e.target.name;
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
          setValues(values => ({
               ...values,
               [key]: value
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          Inertia.post(route('store.contact.store', data.id), values).then(() => {
               setSending(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Create Store Contact</title>
               </Helmet>
               <form onSubmit={handleSubmit}>
                    <ProfileCard>
                         <div className="md:col-span-1">
                              <div className="px-4 sm:px-0">
                                   <h3 className="text-lg font-medium text-gray-900">Create Store Contact</h3>
                                   <p className="mt-1 text-sm text-gray-600">
                                        Create a new contact. This contact will serve to be display anywhere it is needed.
                                   </p>
                                   <div className="w-full mt-3 border-t py-3">
                                        <h4 className="text-md underline font-medium text-gray-700">Store</h4>
                                        <p className="w-full text-md text-gray-600">Name: <span className="float-right font-semibold">{data.name}</span></p>
                                        <p className="w-full text-md text-gray-600">Code: <span className="float-right font-semibold">{data.code}</span></p>
                                        {data.image?<img src={data.image} className="mx-auto mt-3 w-48" />:<p className="font-italic text-center">No Image</p>}
                                   </div>
                              </div>
                         </div>
                         <DataCard>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-12 text-right">
                                             <InertiaLink href={route('store.contact.index', data.id)} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                                  <Icon name="back" className={iconClasses} />
                                                  Back
                                             </InertiaLink>
                                        </div>
                                        <div className="col-span-8 sm:col-span-8">
                                             <SelectInput
                                                  className="flex-shrink w-full inline-block relative mt-4 mr-2"
                                                  label="Type"
                                                  name="type"
                                                  must={true}
                                                  errors={errors.type}
                                                  value={values.type}
                                                  onChange={handleChange}
                                             >
                                                  <option value="">Select Type</option>
                                                  {data.types.map((type, i) => {
                                                       return <option key={`c${i}`} value={type}>{type}</option>
                                                  })}
                                             </SelectInput>
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Reference"
                                                  name="reference"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.reference}
                                                  value={values.reference}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Link"
                                                  name="link"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={false}
                                                  errors={errors.link}
                                                  value={values.link}
                                                  onChange={handleChange}
                                             />
                                             <label className="flex items-center mt-3" htmlFor="status">
                                                  <input name="status" className="form-checkbox" type="checkbox" value={values.status} checked={values.status} onChange={handleChange}/>
                                                  <span className="ml-2 text-sm text-gray-800">Active</span>
                                             </label>
                                        </div>
                                   </div>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Save
                                   </LoadingButton>
                              </div>
                         </DataCard>
                    </ProfileCard>
               </form>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Create.layout = page => <Layout children={page} header={'Create Store Contact'} />;

export default Create;
