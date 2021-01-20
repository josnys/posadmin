import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Icon from './Icon';

export default ({ ...props }) => {
     const { app, auth, data } = usePage().props;

     return (
          <div className="bg-white border-b w-full p-4 md:py-0 md:px-12 text-sm d:text-md flex justify-between items-center">
               <div className="mt-2 mb-2 mr-4">
                    <span className="font-italic text-md text-gray-600 leading-tight">{ props.children }</span><span className="font-semibold text-md text-gray-700 leading-tight"> | {auth.user.fname}</span>
               </div>
               <div className="relative">
                    <div className="flex items-center">
                         <InertiaLink href={route('store.show', data.store.id)}>{app.name}</InertiaLink>
                    </div>
               </div>
          </div>
     );
};
