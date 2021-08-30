import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddItem from './pages/AddItem/AddItem';
import { Reports, ReportsTwo } from './pages/Reports';
import Team from './pages/Team';
import AddCustomer from './pages/AddCustomer';
import CreateInvoice from './pages/CreateInvoice';
import PdfInvoice from './pages/PdfInvoice';
import ItemView from './pages/ItemView';
import 'semantic-ui-css/semantic.min.css'
import InvoiceList from './pages/InvoicesList'
import PurchaseOrder from './pages/PurchaseOrder';
import AddStaff from './pages/AddStaff/AddStaff';
import CustomerList from './pages/CustomerList/CustomerList';
import PurchaseList from './pages/PurchaseList/PurchaseList';
import AddVendor from './pages/AddVendor/AddVendor';
import VendorList from './pages/VendorList/VendorList';
import AddStore from './pages/AddStore/AddStore';
import StoreList from './pages/StoreList/StoreList';
import BrandList from './pages/BrandList/BrandList';
import CategoryList from './pages/CategoryList/CategoryList';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import { getCurrentUser } from './store/auth-api'
import { PrivateRoute } from './components/PrivateRoute';
import {useState} from 'react';

function App() {

  //localStorage.removeItem("user");
const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'))

const onLogout = () => {
  setIsLoggedIn(false)
}

const onLogin = () => {
  setIsLoggedIn(true)
}

  return (
    <Router>
      {isLoggedIn && <Sidebar onLogout={onLogout}/>}     
      <Switch>
      <PrivateRoute exact path="/">
        <Sidebar onLogout={onLogout}/>
      </PrivateRoute>
        <PrivateRoute path='/addItem' exact component={AddItem} />
        <PrivateRoute path='/reports' exact component={Reports} />
        <PrivateRoute path='/addCustomer' exact component={AddCustomer} />
        <PrivateRoute path='/reports/reports2' exact component={ReportsTwo} />
        <PrivateRoute path='/createInvoice' exact component={CreateInvoice} />
        <PrivateRoute path='/team' exact component={Team} />
        <PrivateRoute path='/pdf' exact component={PdfInvoice} />
        <PrivateRoute path='/itemView' exact component={ItemView} />
        <PrivateRoute path='/invoiceList' exact component={InvoiceList} />
        <PrivateRoute path='/createPurchase' exact component={PurchaseOrder} /> 
        <PrivateRoute path='/addStaff' exact component={AddStaff} />  
        <PrivateRoute path='/customerList' exact component={CustomerList} />  
        <PrivateRoute path='/purchaseList' exact component={PurchaseList} />
        <PrivateRoute path='/addVendor' exact component={AddVendor} />
        <PrivateRoute path='/vendorList' exact component={VendorList} />
        <PrivateRoute path='/addStore' exact component={AddStore} />
        <PrivateRoute path='/storeList' exact component={StoreList} />
        <PrivateRoute path='/brandList' exact component={BrandList} />
        <PrivateRoute path='/categoryList' exact component={CategoryList} />
        <PrivateRoute path='/dashboard' exact component={Dashboard} /> 
        <Route exact path="/login">
        <Login onLogin={onLogin}/>
      </Route>      
        
      </Switch>
    </Router>
  );
}

export default App;
