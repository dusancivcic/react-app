
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,
  Navigate
}
from 'react-router-dom';

import { useState } from 'react';
import { nanoid } from 'nanoid';

import Invoices from './pages/invoices/Invoices'
import Sellers from './pages/sellers/Sellers'
import Customers from './pages/customers/Customers'
import Sidebar from './components/sidebar/Sidebar';

import './Default.css';


function App() {

  const [invoiceArray, setInvoiceArray] = useState([{'id': nanoid(), 'seller' : 'Microsoft', 'customer' : 'Marko Markovic', 'date' : '2020-01-05', 'amount' : '10214'},{'id': nanoid(),'seller' : 'Amazon', 'customer' : 'Mitar Mitrovic', 'date' : '2021-01-04', 'amount' : '124'},{'id': nanoid(),'seller' : 'Paypal', 'customer' : 'Dusan Dusanovic', 'date' : '2021-02-03', 'amount' : '1444'},{'id': nanoid(),'seller' : 'Apple', 'customer' : 'Petar Petrovic', 'date' : '2021-07-11', 'amount' : '13445'}])

  const [sellerArray, setSellerArray] = useState([{'id': nanoid(), 'companyName' : 'Microsoft', 'address' : 'Karadjordjeva', 'isActive' : 'active'},{'id': nanoid(), 'companyName' : 'Amazon', 'address' : 'Brace Jugovic', 'isActive' : 'active'},
  {'id': nanoid(), 'companyName' : 'Paypal', 'address' : 'Mladena Stojanovica', 'isActive' : 'active'},{'id': nanoid(), 'companyName' : 'Apple', 'address' : 'Pere krece 21', 'isActive' : 'active'}])

  const [customerArray, setCustomerArray] = useState([{'id': nanoid(), 'name' : 'Petar', 'surname' : 'Petrovic', 'address' : 'Karadjordjeva', 'age' : 21},{'id': nanoid(), 'name' : 'Marko', 'surname' : 'Markovic', 'address' : 'Brace Jugovica', 'age' : 25},{'id': nanoid(), 'name' : 'Dusan', 'surname' : 'Dusanovic', 'address' : 'Vlade Kopanje 1', 'age' : 22},{'id': nanoid(), 'name' : 'Mitar', 'surname' : 'Mitrovic', 'address' : 'Kolubarska 22', 'age' : 19}])


  const setInvoiceArrayHandler = (prop) => {
    setInvoiceArray(prop)
  }
  const setSellerArrayHandler = (prop) => {
    setSellerArray(prop)
  }
  const setCustomerArrayHandler = (prop) => {
    setCustomerArray(prop)
  }


  return (
    <div className="App">
      <Router>
        <Sidebar />

        <Routes>
          <Route path="/invoices" element={<Invoices sellerArray={sellerArray} customerArray={customerArray} invoiceArray={invoiceArray} setInvoiceArrayHandler={setInvoiceArrayHandler} />} />
          {
            invoiceArray.map((invoice, mainID) => (
              <Route path={`/invoices/${mainID+1}`} element={<Invoices mainID={mainID} sellerArray={sellerArray} customerArray={customerArray} invoiceArray={invoiceArray} setInvoiceArrayHandler={setInvoiceArrayHandler} />} />
            ))
          }
          <Route path="/sellers" element={<Sellers invoiceArray={invoiceArray} sellerArray={sellerArray} setSellerArrayHandler={setSellerArrayHandler} />} />
          <Route path="/customers" element={<Customers invoiceArray={invoiceArray} customerArray={customerArray} setCustomerArrayHandler={setCustomerArrayHandler}/>} />
          <Route path="*" element={<Navigate to="/invoices" replace />
          }
    />
        </Routes>

      </Router>
      
    </div>
  );
}

export default App;
