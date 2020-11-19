import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import MainMenuItem from './MainMenuItem';
import { can } from '../utils';

export default ({ className }) => {
     const { auth } = usePage().props;
     return (
          <div className={className}>
               <MainMenuItem text="Dashboard" link="home" icon="dashboard" />
               {can(auth.user, 'read-permission')?<MainMenuItem text="Roles & Permissions" link="security.index" icon="key" />:null}
               {can(auth.user, 'read-user')?<MainMenuItem text="Users" link="user.index" icon="users" />:null}
               {can(auth.user, 'read-category')?<MainMenuItem text="Categories" link="category.index" icon="category" />:null}
               {can(auth.user, 'read-presentation')?<MainMenuItem text="Presentations" link="presentation.index" icon="presentation" />:null}
               {can(auth.user, 'read-agency')?<MainMenuItem text="Agencies" link="agency.index" icon="clipboard" />:null}
               {can(auth.user, 'read-supplier')?<MainMenuItem text="Supplier" link="supplier.index" icon="briefcase" />:null}
               {can(auth.user, 'read-product')?<MainMenuItem text="Products" link="product.index" icon="collection" />:null}
               {can(auth.user, 'read-product')?<MainMenuItem text="Stores" link="store.index" icon="office" />:null}
          </div>
     );
};
