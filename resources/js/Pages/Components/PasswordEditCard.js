import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import TextInput from '../../Shared/TextInput';
import FileInput from '../../Shared/FileInput';
import ProfileCard from '../../Shared/ProfileCard';
import DataCard from '../../Shared/DataCard';
import LoadingButton from '../../Shared/LoadingButton';
import axios from 'axios';

const ProfileEditCard = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);
     const [saved, setSaved] = useState(false);

     const [values, setValues] = useState({
          current_password: '',
          password: '',
          password_confirmation: '',
          pin: '',
          errors: errors
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
          setSaved(false);
          axios.post(route('profile.password', data.id), values).then((response) => {
               setSaved(true);
               setSending(false);
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
                              <h3 className="text-lg font-medium text-gray-900">Update Password</h3>
                              <p className="mt-1 text-sm text-gray-600">
                                   Ensure your account is using a long, random password to stay secure.
                              </p>
                         </div>
                    </div>
                    <DataCard>
                         <form onSubmit={handleSubmit}>
                              <div className="px-4 py-5 sm:p-6">
                                   <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="Current Password"
                                                  name="current_password"
                                                  type="password"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={values.errors.current_password}
                                                  value={values.current_password}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="New Password"
                                                  name="password"
                                                  type="password"
                                                  disable={false}
                                                  readonly={false}
                                                  must={true}
                                                  errors={values.errors.password}
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
                                                  must={false}
                                                  errors={values.errors.password_confirmation}
                                                  value={values.password_confirmation}
                                                  onChange={handleChange}
                                             />
                                             <TextInput
                                                  className="form-input rounded-md shadow-sm mt-4 block w-full"
                                                  label="PIN"
                                                  name="pin"
                                                  type="password"
                                                  disable={false}
                                                  readonly={false}
                                                  errors={values.errors.pin}
                                                  value={values.pin}
                                                  onChange={handleChange}
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   <div className="mr-3">
                                        {!sending && saved && (<div className="text-sm text-gray-600">
                                             Password change, please <InertiaLink className="font-semibold text-gray-700" href={route('login')}>login to continue</InertiaLink>
                                        </div>)}
                                   </div>
                                   <LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
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
