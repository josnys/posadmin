import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { can } from '../../utils';
import Icon from '../../Shared/Icon';

export default ({ data, ...props}) => {
     const { auth } = usePage().props;
     return (
          <div className="md:flex shadow-lg max-w-lg md:max-w-2xl h-32">
               <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={data.image} />
               <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-r-lg">
                    <div className="flex">
                         <h2 className="w-full text-md text-gray-700 font-medium">{data.name}</h2>
                         <p className="text-gray-600 font-semibold">
                              <div className={`w-2 h-2 rounded-full bg-${data.status?'green':'red'}-500`}></div>
                         </p>
                    </div>
                    <p className="text-sm text-gray-700 mt-4">
                         {data.code} <i className="text-gray-500 text-sm italic">{data.type}</i>
                    </p>
                    <div className="flex items-center justify-end mt-2 top-auto">
                         {can(auth.user, 'read-store') && (<InertiaLink href={route('store.show', data.id)} className="flex px-6 py-2 text-gray-600 hover:text-gray-700">
                              View
                         </InertiaLink>)}
                    </div>
               </div>
          </div>
     );
}
