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
import { toFormData } from '../../../utils';

const Edit = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);

     const [values, setValues] = useState({
          type: data.type || '',
          name: data.name || '',
          slogan: data.slogan || '',
          image: null,
          selectedLogo: '',
          status: data.status || false,
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

     function handleFileChange(file, path) {
          setValues(values => ({
               ...values,
               image: file,
               selectedLogo: path
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          const formData = toFormData(values, 'POST');
          Inertia.post(route('store.update', data.id), formData).then(() => {
               setSending(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Edit Store</title>
               </Helmet>
               <form onSubmit={handleSubmit}>
                    <ProfileCard>
                         <div className="md:col-span-1">
                              <div className="px-4 sm:px-0">
                                   <h3 className="text-lg font-medium text-gray-900">Edit Store</h3>
                                   <p className="mt-1 text-sm text-gray-600">
                                        Edit store in the system. This will represent your store where you can manage everything about inventory, user's access, suppliers, products and so on.
                                   </p>
                                   <div className="w-full mt-3">
                                        <h3 className="text-lg text-center font-medium text-gray-600">Current Image</h3>
                                        {data.image && (<img src={data.image} className="w-18 mx-auto" />)}
                                        {!data.image && (<p className="text-center">No image available</p>)}
                                   </div>
                              </div>
                         </div>
                         <DataCard>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-12 text-right">
                                             <InertiaLink href={route('store.index')} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                                  <Icon name="back" className={iconClasses} />
                                                  Back
                                             </InertiaLink>
                                        </div>
                                        <div className="col-span-8 sm:col-span-8">
                                             <label className="block font-medium text-sm text-gray-700" htmlFor="photo">
                                                  <span>Photo</span>
                                             </label>
                                             <div className="mt-2">
                                                  {values.selectedLogo && (<img src={`${values.selectedLogo}`} className="rounded-full h-20 w-20" />)}
                                             </div>
                                             <FileInput
                                                  className="w-full lg:w-1/2"
                                                  label="Select Picture"
                                                  name="photo"
                                                  accept="image/.jpg,.jpeg,.png"
                                                  errors={errors.photo}
                                                  value={values.photo}
                                                  onChange={handleFileChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Name"
                                                  name="name"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.name}
                                                  value={values.name}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Slogan"
                                                  name="slogan"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={false}
                                                  errors={errors.slogan}
                                                  value={values.slogan}
                                                  onChange={handleChange}
                                             />
                                             <SelectInput
                                                  className="flex-shrink w-5/6 inline-block relative mt-4 mr-2"
                                                  label="Store Type"
                                                  name="type"
                                                  must={true}
                                                  errors={errors.type}
                                                  value={values.type}
                                                  onChange={handleChange}
                                             >
                                                  <option value="">Select Store Type</option>
                                                  {data.types.map((type) => {
                                                       return <option key={`c${type}`} value={type}>{type}</option>
                                                  })}
                                             </SelectInput>
                                             <label className="flex items-center mt-3" htmlFor="status">
                                                  <input name="status" className="form-checkbox" type="checkbox" value={values.status} checked={values.status} onChange={handleChange}/>
                                                  <span className="ml-2 text-sm text-gray-800">Active</span>
                                             </label>
                                        </div>
                                   </div>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Update
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
Edit.layout = page => <Layout children={page} header={'Edit Store'} />;

export default Edit;
