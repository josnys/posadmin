import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../Shared/Layout';
import TextInput from '../../../Shared/TextInput';
import SelectInput from '../../../Shared/SelectInput';
import FileInput from '../../../Shared/FileInput';
import ProfileCard from '../../../Shared/ProfileCard';
import DataCard from '../../../Shared/DataCard';
import LoadingButton from '../../../Shared/LoadingButton';
import Icon from '../../../Shared/Icon';
import classNames from 'classnames';

const Create = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);

     const [values, setValues] = useState({
          fname: '',
          lname: '',
          dob: '',
          sex: '',
          identification: '',
          identificationType: '',
          address: '',
          phone: '',
          username: '',
          email: '',
          password: '',
          password_confirmation: '',
          pin: ''
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
          Inertia.post(route('user.store'), values).then(() => {
               setSending(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Create User</title>
               </Helmet>
               <form onSubmit={handleSubmit}>
                    <ProfileCard>
                         <div className="md:col-span-1">
                              <div className="px-4 sm:px-0">
                                   <h3 className="text-lg font-medium text-gray-900">Create User</h3>
                                   <p className="mt-1 text-sm text-gray-600">
                                        Create a new user to the system  by entering in this section all the new user personal information
                                   </p>
                              </div>
                         </div>
                         <DataCard>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-12 text-right">
                                             <InertiaLink href={route('user.index')} className="bg-transparent border border-gray-500 text-sm text-gray-500 p-1 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                                  <Icon name="back" className={iconClasses} />
                                                  Back
                                             </InertiaLink>
                                        </div>
                                        <div className="col-span-12">
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="First Name"
                                                  name="fname"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.fname}
                                                  value={values.fname}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Last Name"
                                                  name="lname"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.lname}
                                                  value={values.lname}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Date of Birth"
                                                  name="dob"
                                                  type="date"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.dob}
                                                  value={values.dob}
                                                  onChange={handleChange}
                                             />
                                             <SelectInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Sex"
                                                  name="sex"
                                                  must={true}
                                                  errors={errors.sex}
                                                  value={values.sex}
                                                  onChange={handleChange}
                                                  >
                                                  <option value={''}>Choose Sex</option>
                                                  {data.sexes.map(({code, name}, i) => {
                                                       return <option key={code} value={code}>{name}</option>
                                                  })}
                                             </SelectInput>
                                             <SelectInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Identity Type"
                                                  name="identificationType"
                                                  must={true}
                                                  errors={errors.identificationType}
                                                  value={values.identificationType}
                                                  onChange={handleChange}
                                                  >
                                                  <option value={''}>Choose Identity Type</option>
                                                  {data.identityType.map(({code, name}, i) => {
                                                       return <option key={code} value={code}>{name}</option>
                                                  })}
                                             </SelectInput>
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Identity Number"
                                                  name="identification"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.identification}
                                                  value={values.identification}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Userame"
                                                  name="username"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  errors={errors.username}
                                                  value={values.username}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Email"
                                                  name="email"
                                                  type="email"
                                                  disable={false}
                                                  readonly={false}
                                                  errors={errors.email}
                                                  value={values.email}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Phone Number"
                                                  name="phone"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.phone}
                                                  value={values.phone}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Address"
                                                  name="address"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.address}
                                                  value={values.address}
                                                  onChange={handleChange}
                                             />
                                        </div>
                                   </div>
                              </div>
                         </DataCard>
                    </ProfileCard>
                    <div className="hidden sm:block">
                         <div className="py-8">
                              <div className="border-t border-gray-400"></div>
                         </div>
                    </div>
                    <ProfileCard>
                         <div className="md:col-span-1">
                              <div className="px-4 sm:px-0">
                                   <h3 className="text-lg font-medium text-gray-900">User Security</h3>
                                   <p className="mt-1 text-sm text-gray-600">
                                        In this section, allow the user to enter a password and a PIN number to access the system.
                                   </p>
                              </div>
                         </div>
                         <DataCard>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Password"
                                                  name="password"
                                                  type="password"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.password}
                                                  value={values.password}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Confirm Password"
                                                  name="password_confirmation"
                                                  type="password"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.password_confirmation}
                                                  value={values.password_confirmation}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="PIN"
                                                  name="pin"
                                                  type="text"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={errors.pin}
                                                  value={values.pin}
                                                  onChange={handleChange}
                                             />
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
Create.layout = page => <Layout children={page} header={'Create User'} />;

export default Create;
