import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../Shared/Layout';
import DataContainer from '../../../Shared/DataContainer';
import DropdownButton from '../../../Shared/DropdownButton';
import StoreFront from '../../Components/StoreFront';
import Icon from '../../../Shared/Icon';
import { can } from '../../../utils';

const Index = () => {
     const { auth, errors, data } = usePage().props;
     return (
          <React.Fragment key="security-index">
               <Helmet>
                    <title>Stores</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Stores</span>
               </div>
               <DataContainer>
                    <div className="col-span-12">
                         {can(auth.user, 'create-store') && (<InertiaLink href={route('store.create')} className="bg-gray-300 hover:bg-gray-400 mr-2 text-gray-800 text-sm py-1 px-1 rounded inline-flex items-center">
                              <Icon name={'plus'} className={'fill-current w-4 h-4 mr-2'} />
                              Add Store
                         </InertiaLink>)}
                    </div>
               </DataContainer>
               <div className="grid grid-cols-3 gap-3 pt-5">
                    {data.data.map(({id, name, code, type, image, status, statusCaption}) => {
                         return <StoreFront data={{id, name, code, type, image, status, statusCaption}} />
                    })}
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Index.layout = page => <Layout children={page} header={'Stores'} />;

export default Index;
