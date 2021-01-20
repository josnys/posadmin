import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

export default ({ caption, color, children, ...props }) => {
     const { auth } = usePage().props;
     const [menuOpened, setMenuOpened] = useState(false);
     return (
          <div className="relative">
               <div className="flex items-center cursor-pointer select-none group" onClick={() => setMenuOpened(true)}>
                    <button type="button" className={`inline-flex justify-center w-full rounded-md border border-${color}-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-${color}-700 hover:text-${color}-500 focus:outline-none focus:border-${color}-300 focus:ring-${color} active:bg-${color}-50 active:text-${color}-800 transition ease-in-out duration-150`} id="options-menu" aria-haspopup="true" aria-expanded="true">
                         {caption}
                         <svg className="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                    </button>
               </div>
               <div className={menuOpened ? '' : 'hidden'}>
                    <div className="whitespace-nowrap absolute z-20 mt-8 left-auto top-0 right-0 py-2 shadow-xl bg-white rounded text-sm">
                         {children}
                    </div>
                    <div
                         onClick={() => {
                              setMenuOpened(false);
                         }}
                         className="bg-black opacity-25 fixed inset-0 z-10">
                    </div>
               </div>
          </div>
     );
}
