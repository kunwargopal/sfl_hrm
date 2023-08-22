
import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Dashboards from './components/pages/Home';
import Login from './components/pages/Login';
import SupervisiorTable from './components/pages/SupervisiorTable';
import Addsupervisior from './components/pages/Addsupervisior';
import Editsupervisior from './components/pages/Editsupervisior';
import ContractorTable from './components/pages/ContractorTable';
import AddContractor from './components/pages/AddContractor';
import EditContractor from './components/pages/EditContractor';
import LabourTable from './components/pages/LabourTable';
import AddLabour from './components/pages/AddLabour';
import EditLabour from './components/pages/EditLabour';
import SupervisiorAtt from './components/pages/SupervisiorAtt';
import SupervisorAttDetails from './components/pages/SupervisorAttDetails';
import SuperSalary from './components/pages/SuperSalary';
import ContractorAtt from './components/pages/ContractorAtt';
import LabourAtt from './components/pages/LabourAtt';
import ContractorAttDetails from './components/pages/ContractorAttDetails';
import LabourAttDetails from './components/pages/LabourAttDetails';
import ContractorSalary from './components/pages/ContractorSalary';
import LabourSalary from './components/pages/LabourSalary';
import Demo from './components/pages/Demo';



function App() {
  return (
    <>
      <HashRouter>

        <Routes>
          <Route exact path='/' element={< Login />} />
          <Route path='/dashboard' element={< Dashboards />} />
          <Route path='/SupervisiorTable' element={< SupervisiorTable />} />
          <Route path='/Addsupervisior' element={< Addsupervisior />} />
          <Route path='/Editsupervisior' element={< Editsupervisior />} />
          <Route path='/ContractorTable' element={< ContractorTable />} />
          <Route path='/AddContractor' element={< AddContractor />} />
          <Route path='/EditContractor' element={< EditContractor />} />
          <Route path='/LabourTable' element={< LabourTable />} />
          <Route path='/AddLabour' element={< AddLabour />} />
          <Route path='/EditLabour' element={< EditLabour />} />
          <Route path='/SupervisiorAtt' element={< SupervisiorAtt />} />
          <Route path='/ContractorAtt' element={< ContractorAtt />} />
          <Route path='/SupervisorAttDetails' element={< SupervisorAttDetails />} />
          <Route path='/ContractorAttDetails' element={< ContractorAttDetails />} />
          <Route path='/SuperSalary' element={< SuperSalary />} />
          <Route path='/ContractorSalary' element={< ContractorSalary />} />
          <Route path='/LabourAtt' element={< LabourAtt />} />
          <Route path='/LabourAttDetails' element={< LabourAttDetails />} />
          <Route path='/LabourSalary' element={< LabourSalary />} />
          <Route path='/Demo' element={< Demo />} />
        </Routes>
      </HashRouter>
      <HelmetProvider>
        <Helmet>
          <script src="assets/vendor/libs/jquery/jquery.js"></script>
          <script src="assets/vendor/libs/popper/popper.js"></script>
          <script src="assets/vendor/js/bootstrap.js"></script>
          <script src="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

          <script src="assets/vendor/libs/hammer/hammer.js"></script>
          <script src="assets/vendor/libs/i18n/i18n.js"></script>
          <script src="assets/vendor/libs/typeahead-js/typeahead.js"></script>

          <script src="assets/vendor/js/menu.js"></script>

          <script src="assets/vendor/libs/cleavejs/cleave.js"></script>
          <script src="assets/vendor/libs/cleavejs/cleave-phone.js"></script>
          <script src="assets/vendor/libs/moment/moment.js"></script>
          <script src="assets/vendor/libs/flatpickr/flatpickr.js"></script>
          <script src="assets/vendor/libs/select2/select2.js"></script>

          <script src="assets/js/main.js"></script>

          <script src="assets/js/form-layouts.js"></script>
        </Helmet>
      </HelmetProvider>
    </>
  );
}

export default App;
