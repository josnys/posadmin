import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Helmet from 'react-helmet';
import MainMenu from './MainMenu';
import FlashMessages from './FlashMessages';
import TopHeader from './TopHeader';
import POSHeader from './POSHeader';

export default function Layout({ children, header }) {
     const { app } = usePage().props;
     return (
          <React.Fragment key="layout">
               <Helmet titleTemplate={`${app.name} | %s`} />
               <div className="flex flex-col">
                    <div className="h-screen flex flex-col">
                         <div className="md:flex">
                              <POSHeader>{header}</POSHeader>
                         </div>
                         <div className="flex flex-grow overflow-hidden">
                              <div className="w-full overflow-hidden overflow-y-auto bg-gray-300 p-1">
                                   <FlashMessages />
                                   {children}
                              </div>
                         </div>
                    </div>
               </div>
          </React.Fragment>
     );
}
