import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddItem from './pages/AddItem/AddItem';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
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

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/addItem' exact component={AddItem} />
        <Route path='/reports' exact component={Reports} />
        <Route path='/addCustomer' exact component={AddCustomer} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/createInvoice' exact component={CreateInvoice} />
        <Route path='/team' exact component={Team} />
        <Route path='/pdf' exact component={PdfInvoice} />
        <Route path='/itemView' exact component={ItemView} />
        <Route path='/invoiceList' exact component={InvoiceList} />
        <Route path='/createPurchase' exact component={PurchaseOrder} /> 
        <Route path='/addStaff' exact component={AddStaff} />  
        <Route path='/customerList' exact component={CustomerList} />  
        <Route path='/purchaseList' exact component={PurchaseList} />
        <Route path='/addVendor' exact component={AddVendor} />
        <Route path='/vendorList' exact component={VendorList} />
        <Route path='/addStore' exact component={AddStore} />
        <Route path='/storeList' exact component={StoreList} />
        <Route path='/brandList' exact component={BrandList} />
        <Route path='/categoryList' exact component={CategoryList} />     
        
      </Switch>
    </Router>
  );
}

export default App;
