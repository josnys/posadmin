import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import MainMenuItem from './MainMenuItem';
import { can } from '../utils';

export default ({ className }) => {
     const { auth } = usePage().props;
     return (
          <div className={className}>
               <MainMenuItem text="Dashboard" link="home" icon="dashboard" />
               {can(auth.user, 'read-user')?<MainMenuItem text="Users" link="user.index" icon="user-group" />:null}
               {can(auth.user, 'read-supplier')?<MainMenuItem text="Supplier" link="supplier.index" icon="briefcase" />:null}
               {can(auth.user, 'read-product')?<MainMenuItem text="Products" link="product.index" icon="collection" />:null}
               {can(auth.user, 'read-customer')?<MainMenuItem text="Customers" link="customer.index" icon="users" />:null}
               {can(auth.user, 'read-currency')?<MainMenuItem text="Currencies" link="currency.index" icon="money" />:null}
               {can(auth.user, 'read-payment-method')?<MainMenuItem text="Payment Methods" link="paymethod.index" icon="credit-card" />:null}
               {can(auth.user, 'read-store')?<MainMenuItem text="Stores" link="store.index" icon="office" />:null}
          </div>
     );
};
