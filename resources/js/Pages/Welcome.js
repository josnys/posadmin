import React from 'react';
import ReactDOM from 'react-dom';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Helmet from 'react-helmet';

function Welcome() {
     const { app } = usePage().props;
     
     return (
          <React.Fragment key="app">
               <Helmet title={app.name} />
               <div className="p-6 min-h-screen flex justify-center items-center">
                    <div className="bg-white p-4 rounded text-center text-lg text-gray-600 shadow-xl w-full max-w-xl leading-loose">
                         <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                              POS Admin
                         </h1>
                         by <InertiaLink className="hover:text-purple-600" href="https://twitter.com/josnyS">JosnyS</InertiaLink><br />
                         <InertiaLink className="mr-2 text-xs hover:underline hover:text-blue-500" href={route('login')}>Login</InertiaLink>
                    </div>
               </div>
          </React.Fragment>
     );
}

export default Welcome;
