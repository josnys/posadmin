import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import POSLayout from '../../../Shared/POSLayout';
import TextInput from '../../../Shared/TextInput';
import Icon from '../../../Shared/Icon';
import axios from 'axios';

const Create = () => {
     const { app, auth, data, errors } = usePage().props;
     const [searching, setSearching] = useState(false);
     const [sending, setSending] = useState(false);
     const [values, setValues] = useState({
          type: 'Sale',
          customer: data.customer.id,
          customerData: data.customer,
          amount: 0,
          discountTotal: 0,
          discount: data.customer.discount || 0,
          tax: 0,
          delivery: 0,
          total: 0,
          items: [],
          searchInputName: 'searchProduct',
          searchProduct: '',
          searchCustomer: '',
          prevSearch: '',
          results: [],
          searchProductResults: [],
          searchCustomerResults: [],
          showPanel: false,
          showNumPad: false,
          numPad: [1,2,3,4,5,6,7,8,9,0],
          message: null,
          showPayPanel: false,
          isSearchCustomer: false,
          paymethods: data.paymethods,
          payments: [],
          paid: 0,
          due: 0,
          change: 0,
     });

     const iconClasses = classNames('w-5 h-5 mx-auto', {
          'text-gray-800 fill-current': false,
          'text-gray-800 hover:text-gray-800 fill-current': true
     });

     const iconClassesBtn = classNames('w-6 h-6 mx-auto', {
          'text-gray-200 fill-current': false,
          'text-gray-200 hover:text-gray-200 fill-current': true
     });

     function handleChange(e) {
          const key = e.target.name;
          const value = e.target.value;
          setValues(values => ({
               ...values,
               [key]: value,
               message: null
          }));
     }

     function handleSearchProduct(e) {
          e.preventDefault();
          if(values.searchProduct == ''){
               setValues(values => ({
                    ...values,
                    message: 'Search can not be empty.'
               }));
          }else{
               setSearching(true);
               axios.post(route('sell.search.product', data.store.id), {search:values.searchProduct}).then((response) => {
                    setSearching(false);
                    let prevSearch = values.searchProduct;
                    setValues(values => ({
                         ...values,
                         searchProduct: (response.data.data.length == 0)?prevSearch:'',
                         prevSearch: prevSearch,
                         searchProductResults: response.data.data,
                         showPanel: (response.data.data.length > 0) ? true : false,
                         message: response.data.message,
                    }));
               }).catch((error) => {
                    console.log(error.response);
                    setValues(values => ({
                         ...values,
                         errors: error.response.data.errors
                    }));
                    setSending(false);
                    setSearching(false);
               });
          }
     }

     function handleSearchCustomer(e) {
          e.preventDefault();
          if(values.searchCustomer == ''){
               setValues(values => ({
                    ...values,
                    message: 'Search can not be empty.'
               }));
          }else{
               setSearching(true);
               axios.post(route('sell.search.customer', data.store.id), {search:values.searchCustomer}).then((response) => {
                    setSearching(false);
                    let prevSearch = values.searchCustomer;
                    setValues(values => ({
                         ...values,
                         searchCustomer: (response.data.data.length == 0)?prevSearch:'',
                         prevSearch: prevSearch,
                         searchCustomerResults: response.data.data,
                         showPanel: (response.data.data.length > 0) ? true : false,
                         message: response.data.message,
                    }));
               }).catch((error) => {
                    console.log(error.response);
                    setValues(values => ({
                         ...values,
                         errors: error.response.data.errors
                    }));
                    setSending(false);
                    setSearching(false);
               });
          }
     }

     function changeCustomer(e){
          e.preventDefault();
          let toggle = !values.isSearchCustomer;
          setValues(values => ({
               ...values,
               isSearchCustomer: toggle,
          }));
     }

     function addToList(product){
          let items = values.items;
          let amount = values.amount;
          let total = values.total;
          amount += ((product.price - product.discount) * product.quantity);
          let discountTotal = ((amount * values.discount) / 100);
          total = ((amount - discountTotal) + values.tax + values.delivery);
          items.push(product);
          setValues(values => ({
               ...values,
               amount: amount,
               discountTotal: discountTotal,
               total: total,
               items: items,
               searchProductResults: [],
               showPanel: false,
               message: null
          }));
     }

     function choseCustomer(customer){
          let amount = values.amount;
          let discountTotal = ((amount * customer.discount) / 100);
          let total = ((amount - discountTotal) + values.tax + values.delivery);

          setValues(values => ({
               ...values,
               amount: amount,
               discountTotal: discountTotal,
               discount: customer.discount,
               total: total,
               customer: customer.id,
               customerData: customer
          }));
     }

     function cancelsearch(){
          setValues(values => ({
               ...values,
               searchProductResults: [],
               searchCustomerResults: [],
               isSearchCustomer: false,
               showPanel: false,
               message: null
          }));
     }

     function addAndRemove(e, i, action) {
          e.preventDefault();
          let value = e.target.value;
          let items = values.items;
          let amount = values.amount;
          let discountTotal = ((amount * values.discount) / 100);
          let total = ((amount - discountTotal) + values.tax + values.delivery);
          amount -= ((items[i].price - items[i].discount) * items[i].quantity);
          switch(action){
               case '-': items[i].quantity = items[i].quantity - 1; break;
               case '+': if((items[i].quantity + 1) <= items[i].qty_available){
                    items[i].quantity = items[i].quantity + 1;
               } break;
          }
          if(items[i].quantity == 0){
               items[i].quantity = 1;
          }
          amount += ((items[i].price - items[i].discount) * items[i].quantity);
          discountTotal = ((amount * values.discount) / 100);
          total = ((amount - discountTotal) + values.tax + values.delivery);

          setValues(values => ({
               ...values,
               amount: amount,
               discountTotal: discountTotal,
               total: total,
               items: items,
          }));
     }

     function choseMethod(e, method, i){
          e.preventDefault();
          if(values.items.length > 0){
               let methods = values.paymethods;
               let defaultCurr = {};
               for(var p = 0; p < data.currency.length; p++){
                    if(data.currency[p].is_default){
                         defaultCurr = data.currency[p];
                         break;
                    }
               }
               if(!method.isSelected){
                    method.isSelected = true;
                    methods[i] = method;
               }
               let payMethod = {
                    id: method.id,
                    method: method.id,
                    name: method.name,
                    currencies: data.currency,
                    currency: defaultCurr.id,
                    rate: defaultCurr.rate,
                    prevAmount: 0,
                    amount: '',
                    paid: '',
                    change: '',
                    reference: ''
               }
               let payments = values.payments;
               payments.push(payMethod);
               setValues(values => ({
                    ...values,
                    payments: payments,
                    paymethods: methods,
                    showPanel: true,
                    showPayPanel: true
               }));
          }
          return false;
     }

     function cancelMethod(e, i){
          e.preventDefault();
          let payments = values.payments;
          if(values.paid > 0){
               let paid = values.paid;
               paid = paid - (payments[i].amount * payments[i].rate);
               let change = paid - values.total;
               change = (change < 0) ? 0 : change;
               let due = values.total - paid;
               setValues(values => ({
                    ...values,
                    paid: paid,
                    due: (due < 0) ? 0 : due,
                    change: change
               }));
          }
          payments.splice(i,1);
          setValues(values => ({
               ...values,
               payments: payments,
          }));
     }

     function paymentChange(e,i){
          e.preventDefault();
          let payments = values.payments;
          let value = e.target.value;
          const key = e.target.name;
          if(key == 'currency'){
               for(var p = 0; p < payments[i].currencies.length; p++){
                    if(payments[i].currencies[p].id == value){
                         payments[i].rate = payments[i].currencies[p].rate;
                         break;
                    }
               }
          }
          payments[i][key] = value;
          if(key == 'amount'){
               let paid = 0;
               for(var j = 0; j < payments.length; j++){
                    if(j != i){
                         paid += parseFloat(payments[j].amount * payments[j].rate);
                    }
               }
               value = (value == '') ? 0 : value;
               paid = paid + (parseFloat(value) * payments[i].rate);
               payments[i]['paid'] = value;
               let change = paid - values.total;
               change = (change < 0) ? 0 : change;
               let due = values.total - paid;
               setValues(values => ({
                    ...values,
                    payments: payments,
                    paid: paid,
                    due: (due < 0) ? 0 : due,
                    change: change
               }));
          }else{
               setValues(values => ({
                    ...values,
                    payments: payments,
               }));
          }
     }

     function proceedPayment(e){
          e.preventDefault();
          if(values.items.length > 0 && values.payments.length > 0){
               setSending(true);
               Inertia.post(route('sell.post', data.store.id), values).then(() => {
                    setSending(false);
               });
          }
          return false;
     }

     return (
          <React.Fragment>
               <Helmet>
                    <title>POS Sale</title>
               </Helmet>
               <div className="grid grid-cols-8 bg-gray-400 rounded h-full">
                    <div className="relative col-span-2 p-2">
                         <div className="flex">
                              <img src={data.store.image} className="w-16" />
                              <div className="ml-2">
                                   <h1 className="text-lg font-medium">{data.store.name}</h1>
                                   <h2 className="text-xs font-medium">{data.store.code}</h2>
                                   <h3 className="text-xs font-italic">{data.store.slogan}</h3>
                              </div>
                         </div>
                         <ul className="mt-2 border-t border-gray-600">
                              <li className="w-full py-1 text-gray-700 font-medium">Customer <span className="float-right text-semibold text-gray-800">{values.customerData.name} <span className={`bg-${values.isSearchCustomer?'blue':'gray'}-500 text-xs text-${values.isSearchCustomer?'blue':'gray'}-700 p-1 rounded`} onClick={e=>changeCustomer(e)}>Change</span></span></li>
                              <li className="w-full py-1 text-gray-700 font-medium">Amount <span className="float-right text-semibold text-gray-800">{values.amount.toFixed(2)}</span></li>
                              <li className="w-full py-1 text-gray-700 font-medium">Discount % <span className="float-right text-semibold text-gray-800">{values.discount.toFixed(2)}</span></li>
                              <li className="w-full py-1 text-gray-700 font-medium">Discount Total <span className="float-right text-semibold text-gray-800">{values.discountTotal.toFixed(2)}</span></li>
                              <li className="w-full py-1 text-gray-700 font-medium">Tax <span className="float-right text-semibold text-gray-800">{values.tax.toFixed(2)}</span></li>
                              <li className="w-full py-1 text-gray-700 font-medium">Delivery <span className="float-right text-semibold text-gray-800">{values.delivery.toFixed(2)}</span></li>
                              <li className="w-full border-t border-gray-500"></li>
                              {data.currency.map(({id, code, rate, is_default}, i) => {
                                   return <li key={`cur${i}`} className={`w-full text-${is_default?'xl':'xs'} text-gray-${is_default?'900':'600'} font-medium`}>Total {code}
                                        <span className={`float-right text-semibold text-gray-${is_default?'900':'600'}`}>
                                             {is_default?((values.total * rate).toFixed(2)):((values.total / rate).toFixed(2))}
                                        </span>
                                   </li>
                              })}
                              <li className="w-full border-t border-gray-500"></li>
                              <li key={`paid`} className={`w-full text-xl text-gray-900 font-medium`}>Paid
                                   <span className={`float-right text-semibold text-gray-900`}>
                                        {values.paid.toFixed(2)}
                                   </span>
                              </li>
                              <li key={`due`} className={`w-full text-xl text-gray-900 font-medium`}>Due
                                   <span className={`float-right text-semibold text-gray-900`}>
                                        {values.due.toFixed(2)}
                                   </span>
                              </li>
                              <li key={`change`} className={`w-full text-xl text-gray-900 font-medium`}>Change
                                   <span className={`float-right text-semibold text-gray-900`}>
                                        {values.change.toFixed(2)}
                                   </span>
                              </li>
                         </ul>
                         <div className="absolute bottom-0 grid grid-cols-3 gap-4 justify-items-auto py-2 pr-2">
                              {values.paymethods.map((method, i) => {
                                   return <div key={`pm${method.id}`} onClick={e=>choseMethod(e, method, i)} className={`text-center text-md text-gray-800 font-semibold bg-gray-${method.isSelected?'600':'500'} flex justify-center items-center px-4 py-2 rounded`}>
                                        {method.name}
                                   </div>
                              })}
                         </div>
                    </div>
                    <div className={`relative bg-gray-800 ${!values.showPanel?'col-span-6 rounded-r':'col-span-4'} rounded-l-xl p-2`}>
                         {!values.isSearchCustomer && (<form onSubmit={e=>handleSearchProduct(e)}>
                              <div className="flex items-center">
                                   <TextInput
                                        className="form-input rounded-md shadow-sm block w-5/6"
                                        label=""
                                        name="searchProduct"
                                        type="text"
                                        disable={false}
                                        readonly={false}
                                        must={false}
                                        errors={errors.searchProduct}
                                        value={values.searchProduct}
                                        onChange={handleChange}
                                   />
                                   <button className="w-1/6 block bg-gray-500 hover:bg-gray-600 text-white font-sm py-3 px-4 rounded ml-1">
                                        <Icon name="search" className={iconClasses} />
                                   </button>
                              </div>
                              {values.message && (<span className="flex w-full mt-2 p-1 text-sm text-red-600 italic bg-red-200 rounded transition duration-500 ease-in-out">{values.message}</span>)}
                         </form>)}
                         {values.isSearchCustomer && (<form onSubmit={e=>handleSearchCustomer(e)}>
                              <div className="flex items-center">
                                   <TextInput
                                        className="form-input rounded-md shadow-sm block w-5/6"
                                        label=""
                                        name="searchCustomer"
                                        type="text"
                                        disable={false}
                                        readonly={false}
                                        must={false}
                                        errors={errors.searchCustomer}
                                        value={values.searchCustomer}
                                        onChange={handleChange}
                                   />
                              <button className="w-1/6 block bg-blue-500 hover:bg-blue-600 text-white font-sm py-3 px-4 rounded ml-1">
                                        <Icon name="search" className={iconClasses} />
                                   </button>
                              </div>
                              {values.message && (<span className="flex w-full mt-2 p-1 text-sm text-red-600 italic bg-red-200 rounded transition duration-500 ease-in-out">{values.message}</span>)}
                         </form>)}
                         <div className="w-full mt-2 border-t border-gray-600"></div>
                              <table className="table-auto w-full text-sm">
                                   <thead className="bg-gray-400">
                                        <tr>
                                             <th className="px-4 py-2">Item</th>
                                             <th className="px-4 py-2 text-right">Qty</th>
                                             <th className="px-4 py-2 text-right">Price</th>
                                             <th className="px-4 py-2 text-right">Disc.</th>
                                             <th className="px-4 py-2 text-right">Total</th>
                                        </tr>
                                   </thead>
                                   <tbody className="text-gray-200">
                                        {values.items.map((product, i) => {
                                             return <tr key={`pr${i}`} className="border-b">
                                                  <td className="px-4 py-2">{product.name}</td>
                                                  <td className="px-4 py-2 flex justify-center items-center">
                                                       <span onClick={e=>addAndRemove(e, i, '-')}>
                                                            <Icon name="minusbtn" className={iconClassesBtn} />
                                                       </span>
                                                       <input type="text" name="quantity" className="w-20 p-2 bg-gray-700 float-right text-center rounded" value={product.quantity} onChange={e=>handleQty(e, i)} disabled />
                                                       <span onClick={e=>addAndRemove(e, i, '+')}>
                                                            <Icon name="plusbtn" className={iconClassesBtn} />
                                                       </span>
                                                  </td>
                                                  <td className="px-4 py-2 text-right">{product.price.toFixed(2)}</td>
                                                  <td className="px-4 py-2 text-right">{product.discount.toFixed(2)}</td>
                                                  <td className="px-4 py-2 text-right">{((product.price.toFixed(2) - product.discount.toFixed(2)) * product.quantity).toFixed(2)}</td>
                                             </tr>
                                        })}
                                   </tbody>
                              </table>
                    </div>
                    <div className={`relative h-full overflow-auto transition duration-500 ease-in-out bg-gray-700 ${(values.showPanel)?'col-span-2':'hidden'} p-2`}>
                         {(values.searchProductResults.length > 0) && (<ul className="w-full text-gray-200 text-md">
                              <li className="w-full p-1 border-b border-gray-400 pb-2">
                                   <span className="p-2 bg-gray-100 text-gray-600 text-center rounded font-semibold" onClick={()=>cancelsearch()}>Cancel</span>
                              </li>
                              {values.searchProductResults.map((product, i) => {
                                   return <li key={`sp${i}`} className="flex w-full p-1 border-b border-gray-400">
                                        <span className="w-5/6 h-full">{product.name} ({product.qty_available}) <span className="text-sm px-1 rounded mr-2 float-right bg-gray-200 text-gray-800">{product.price}</span></span>
                                        <span className="w-1/6 p-2 h-full bg-gray-400 text-gray-700 text-center rounded font-semibold" onClick={()=>addToList(product)}>+</span>
                                   </li>
                              })}
                         </ul>)}
                         {(values.searchCustomerResults.length > 0) && (<ul className="w-full text-gray-200 text-md">
                              <li className="w-full p-1 border-b border-gray-400 pb-2">
                                   <span className="p-2 bg-gray-100 text-gray-600 text-center rounded font-semibold" onClick={()=>cancelsearch()}>Cancel</span>
                              </li>
                              {values.searchCustomerResults.map((customer, i) => {
                                   return <li key={`sp${i}`} className="flex w-full p-1 border-b border-gray-400">
                                        <span className="w-5/6 h-full">({customer.code}) {customer.name}</span>
                                        <span className="w-1/6 p-2 h-full bg-blue-500 text-blue-700 text-center rounded font-semibold" onClick={()=>choseCustomer(customer)}>+</span>
                                   </li>
                              })}
                         </ul>)}
                         {values.showPayPanel && (<React.Fragment>
                              <button disabled={sending} onClick={e=>proceedPayment(e)} className="w-full items-center py-4 bg-blue-600 border border-transparent rounded-md font-semibold text-md text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:shadow-outline-blue disabled:opacity-25 transition ease-in-out duration-150 mb-2">
                                   Pay
                              </button>
                              {values.payments.map((method, i) => {
                                   return <div key={`lpm${i}`} className="w-full p-2 mb-1 rounded bg-gray-800">
                                        <h3 className="text-md font-semibold text-gray-400 pb-1 mb-1 border-b border-gray-600">{method.name} <span className="float-right bg-red-700 text-red-300 text-xs rounded px-1" onClick={e=>cancelMethod(e,i)}>Cancel</span></h3>
                                        <div className="w-full flex">
                                             <select name="currency" value={method.currency} onChange={e=>paymentChange(e,i)} className="w-1/3 bg-gray-300 text-gray-700 font-semibold rounded-l focus:outline-none">
                                                  {method.currencies.map(({id, code, rate}) => {
                                                       return <option className="text-right" key={`pmc${id}`} value={id}>{code}</option>
                                                  })}
                                             </select>
                                             <input type="text" name="amount" className="w-2/3 p-2 bg-gray-300 text-gray-700 font-semibold text-right text-center rounded-r focus:outline-none" value={method.amount} onChange={e=>paymentChange(e, i)} />
                                        </div>
                                        <div className="w-full flex pt-1">
                                             <div className="w-full">
                                                  <label className="text-sm text-gray-400">Referece</label>
                                                  <input type="text" name="reference" className="w-full p-2 bg-gray-300 text-gray-700 font-semibold text-right text-center rounded focus:outline-none" value={method.reference} onChange={e=>paymentChange(e, i)} />
                                             </div>
                                        </div>
                                   </div>
                              })}
                         </React.Fragment>)}
                    </div>
               </div>
          </React.Fragment>
     );
};

// Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts
Create.layout = page => <POSLayout children={page} header={'POS'} />;

export default Create;
