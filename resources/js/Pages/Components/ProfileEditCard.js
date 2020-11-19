import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import TextInput from '../../Shared/TextInput';
import FileInput from '../../Shared/FileInput';
import SelectInput from '../../Shared/SelectInput';
import ProfileCard from '../../Shared/ProfileCard';
import DataCard from '../../Shared/DataCard';
import LoadingButton from '../../Shared/LoadingButton';
import { toFormData } from '../../utils';
import axios from 'axios';

const ProfileEditCard = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);
     const [saved, setSaved] = useState(false);

     const [values, setValues] = useState({
          fname: data.fname || '',
          lname: data.lname || '',
          code: data.code || '',
          dob: data.dob || '',
          sex: data.sex || '',
          identification: data.identification || '',
          identificationType: data.identificationType || '',
          address: data.address || '',
          phone: data.phone || '',
          current_username: data.username || '',
          username: data.username || '',
          current_email:data.email || '',
          email: data.email || '',
          avatar: data.avatar,
          photo: null,
          selectedAvatar: null,
          errors: errors
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
               photo: file,
               selectedAvatar: path
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSending(true);
          setSaved(false);
          const formData = toFormData(values, 'PUT');
          axios.post(route('profile.save', data.id), formData).then((response) => {
               setSaved(true);
               setSending(false);
               setValues(values => ({
                    ...values,
                    current_username: response.data.username,
                    current_email: response.data.email
               }));
          }).catch((error) => {
               setValues(values => ({
                    ...values,
                    errors: error.response.data.errors
               }));
               setSending(false);
          });
     }
     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Profile</title>
               </Helmet>
               <ProfileCard>
                    <div className="md:col-span-1">
                         <div className="px-4 sm:px-0">
                              <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                              <p className="mt-1 text-sm text-gray-600">
                                   Update your account's profile information and email address.
                              </p>
                              <div className="w-full mt-3">
                                   <h3 className="text-md text-center text-gray-700">Current Photo</h3>
                                   {!values.avatar && (<img src={`https://ui-avatars.com/api/?name=${auth.user.name}&amp;color=7F9CF5&amp;background=EBF4FF`} className="mx-auto rounded-full h-20 w-20" />)}
                                   {values.avatar && (<img src={`${auth.user.avatar}`} className="mx-auto rounded-full h-20 w-20" />)}
                              </div>
                         </div>
                    </div>
                    <DataCard>
                         <form onSubmit={handleSubmit}>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                             <label className="block font-medium text-sm text-gray-700" htmlFor="photo">
                                                  <span>Photo</span>
                                             </label>
                                             <div className="mt-2">
                                                  {values.selectedAvatar && (<img src={`${values.selectedAvatar}`} className="rounded-full h-20 w-20" />)}
                                             </div>
                                             <FileInput
                                                  className="w-full lg:w-1/2"
                                                  label="Select Picture"
                                                  name="photo"
                                                  accept="image/jpg,jpeg,png"
                                                  errors={values.errors.photo}
                                                  value={values.photo}
                                                  onChange={handleFileChange}
                                              />
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
                                                  label="Code"
                                                  name="code"
                                                  type="text"
                                                  disable={true}
                                                  readonly={true}
                                                  must={false}
                                                  errors={errors.code}
                                                  value={values.code}
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
                                                  disable={true}
                                                  readonly={true}
                                                  errors={errors.username}
                                                  value={values.username}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Email"
                                                  name="email"
                                                  type="email"
                                                  disable={true}
                                                  readonly={true}
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
          </React.Fragment>
     );
};

export default ProfileEditCard;
