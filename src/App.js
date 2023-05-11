import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import Home from './components/home';
import Managestf from './components/Managestf';
import ManageStd from './components/ManageStds';
import Studentrequest from './components/studentrequest';
import Staffmanagedues from './components/staffmanagedues';

import Staffmanagerequest from './components/staffmanagerequest'




function App() {
      return (
            <Router>
                  <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Managestf" element={<Managestf/>}/>
                        <Route path="/managestudents" element={<ManageStd/>}/>
                        <Route path="/studentrequest" element={<Studentrequest/>}/>
                        <Route path="/staffmanagerequest" element={<Staffmanagerequest/>}/>
                        <Route path="/staffmanagedues" element={<Staffmanagedues/>}/>

                  </Routes>
            </Router>
      );
}

export default App;
