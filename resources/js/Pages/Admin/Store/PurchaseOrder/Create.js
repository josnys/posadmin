import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../../Shared/Layout';
import TextInput from '../../../../Shared/TextInput';
import SelectInput from '../../../../Shared/SelectInput';
import ProfileCard from '../../../../Shared/ProfileCard';
import DataCard from '../../../../Shared/DataCard';
import LoadingButton from '../../../../Shared/LoadingButton';
import Icon from '../../../../Shared/Icon';
import classNames from 'classnames';
import { toFormData } from '../../../../utils';
import axios from 'axios';

const Create = () => {
     const { auth, errors, data } = usePage().props;
     const [sending, setSending] = useState(false);
     const [searching, setSearching] = useState(false);
     const [completed, setCompleted] = useState(false);

     const [values, setValues] = useState({
          products: [],
          search: '',
          prevSearch: '',
          results: [],
          completed: false,
          message: null
     });

     const iconClasses = classNames('w-4 h-4 mr-2', {
          'text-red-700 fill-current': false,
          'text-red-700 hover:text-red-500 fill-current': true
     });

     const iconClassesBtn = classNames('w-4 h-4 mr-2', {
          'text-white fill-current': false,
          'text-gray-500 hover:text-white fill-current': true
     });

     function handleChange(e) {
          const key = e.target.name;
          const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
          setValues(values => ({
               ...values,
               [key]: value,
               message: null
          }));
          setCompleted(false);
     }

     function handleQty(e, i){
          const value = e.target.value;
          let products = values.products;
          products[i].qty = value;
          setValues(values => ({
               ...values,
               products: products
          }));
     }

     function handleSearch(e) {
          e.preventDefault();
          if(values.search == ''){
               setValues(values => ({
                    ...values,
                    message: 'Search can not be empty.'
               }));
          }else{
               setSending(true);
               setSearching(true);
               axios.post(route('product.search'), {search:values.search}).then((response) => {
                    setSearching(false);
                    setSending(false);
                    setCompleted(true);
                    let prevSearch = values.search;
                    setValues(values => ({
                         ...values,
                         search: '',
                         prevSearch: prevSearch,
                         results: response.data.data,
                    }));
               }).catch((error) => {
                    // console.log(error.response.data);
                    setValues(values => ({
                         ...values,
                         errors: error.response.data.errors
                    }));
                    setSending(false);
                    setSearching(false);
               });
          }
     }

     function addToList(prod){
          let product = {
               id: prod.id,
               code: prod.code,
               name: prod.name,
               qty: 1,
          }
          let products = values.products;
          products.push(product);
          setValues(values => ({
               ...values,
               products: products
          }));
     }

     function removeToList(e, id){
          e.preventDefault();
          let _products = values.products;
          let products = _products.filter(prod => prod.id !== id);
          setValues(values => ({
               ...values,
               products: products
          }));
     }

     function handleSubmit(e) {
          e.preventDefault();
          setSearching(true);
          Inertia.post(route('purchase-order.store', data.store.id), values).then((response) => {
               console.log(response);
               setSearching(false);
          });
     }

     return (
          <React.Fragment key="uprofile">
               <Helmet>
                    <title>Create Purchase Order</title>
               </Helmet>
               <div className="max-w-7xl mx-auto p-2">
                    <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('home')}>Dashboard</InertiaLink> | <InertiaLink className="font-semibold text-md text-gray-700 hover:text-gray-800 leading-tight" href={route('store.show', data.store.id)}>{data.name}</InertiaLink> | <span className="text-md text-gray-700 leading-tight">Create Purchase Order</span>
               </div>

               <div className="w-full flex">
                    <div className="bg-white rounded shadow p-2 w-1/3">
                         <form onSubmit={handleSearch}>
                              <div className="flex items-center mb-1">
                                   <TextInput
                                        className="form-input rounded-md shadow-sm mt-4 block w-3/4"
                                        label="Search Product"
                                        name="search"
                                        type="text"
                                        disable={false}
                                        readonly={false}
                                        must={false}
                                        errors={errors.search}
                                        value={values.search}
                                        onChange={handleChange}
                                   />
                                   <button className="w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-sm py-2 px-2 rounded mt-8 ml-2" disabled={searching}>Search</button>
                              </div>
                              {values.message && (<span className="w-full p-1 text-sm text-red-600 italic bg-red-200 rounded">{values.message}</span>)}
                         </form>
                         <div className="w-full mt-5 border-t">
                              <h3 className="text-md text-gray-600 border-b">
                                   Results : {(completed && values.results.length == 0) && (<span className="text-sm text-gray-700 italic">No results found for <span className="font-medium text-sm text-gray-700">{values.prevSearch}</span></span>)}
                                   {(completed && values.results.length > 0) && (<span className="text-sm text-gray-700 italic">{values.results.length} product(s) found for <span className="font-medium text-sm text-gray-700">{values.prevSearch}</span></span>)}
                              </h3>
                              <ul className="overflow-auto h-64 list-none">
                                   {values.results.map((prod, i) => {
                                        return <li key={prod.id} className="w-full p-2 border-b text-md text-gray-600">
                                             <div className="flex">
                                                  <span className="w-5/6">{prod.code} <span className="text-gray-800">{prod.name}</span></span>
                                                  <span className="italic center text-sm text-blue-600 w-1/6 p-0 m-0">
                                                       <button className="text-center" onClick={()=>addToList(prod)}>Add</button>
                                                  </span>
                                             </div>
                                        </li>
                                   })}
                              </ul>
                         </div>
                    </div>
                    <div className="bg-white rounded shadow p-2 w-2/3 ml-2">
                         <h3 className="text-md text-gray-600 border-b pb-5">
                              <span className="py-4">Selected Products</span>
                              <InertiaLink href={route('purchase-order.index', data.store.id)} className="float-right bg-transparent border border-gray-500 text-sm text-gray-500 p-2 rounded focus:outline-none hover:bg-gray-600 hover:text-gray-100 inline-flex items-center">
                                   <Icon name="back" className={iconClassesBtn} />
                                   Back
                              </InertiaLink>
                         </h3>
                         <form onSubmit={handleSubmit}>
                              <table className="table col-span-12 mt-2 w-full">
                                   <thead className="bg-gray-400">
                                        <tr>
                                             <th className="px-4 py-2">Code</th>
                                             <th className="px-4 py-2">Product</th>
                                             <th className="px-4 py-2">Quantity</th>
                                             <th className="px-4 py-2"></th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {values.products.map(({id, code, name, qty}, i) => {
                                             return <tr key={i}>
                                                  <td className="border px-4 py-2">{code}</td>
                                                  <td className="border px-4 py-2">{name}</td>
                                                  <td className={`border px-4 py-4 items-center`}>
                                                       <TextInput
                                                            className="form-input rounded-md block text-center"
                                                            label=""
                                                            name="qty"
                                                            type="number"
                                                            disable={false}
                                                            readonly={false}
                                                            must={false}
                                                            errors={errors.qty}
                                                            value={qty}
                                                            onChange={e=>handleQty(e, i)}
                                                       />
                                                  </td>
                                                  <td className="border px-4 py-2">
                                                       <a href="#" className="text-center" onClick={e=>removeToList(e, id)}>
                                                            <Icon name="trash" className={iconClasses} />
                                                       </a>
                                                  </td>
                                             </tr>
                                        })}
                                   </tbody>
                              </table>
                              <div className="flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b">
                                   {(values.products.length > 0) && (<LoadingButton type="submit" loading={sending} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4">
                                        Create Purchase Order
                                   </LoadingButton>)}
                              </div>
                         </form>
                    </div>
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Create.layout = page => <Layout children={page} header={'Create Purchase Order'} />;

export default Create;
