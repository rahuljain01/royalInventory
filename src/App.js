import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddItem from './pages/AddItem';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';
import AddCustomer from './pages/AddCustomer';
import CreateInvoice from './pages/CreateInvoice';

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
      </Switch>
    </Router>
  );
}

export default App;
