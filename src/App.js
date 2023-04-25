import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import Home from './components/home';
import Managestf from './components/Managestf';
import AllBooks from './components/AllBooks';
import ManageStd from './components/ManageStds';
import StdAllbook from './components/StdAllbook';
import IssueReq from './components/issuerequest';
import BookIssued from './components/BookIssued';
import BookReq from './components/BookReq';
import GetReqBook from './components/GetReqBook';
import StdBookIssued from './components/stdbookissue';
import AllBookIssued from './components/AllBookIssued'
// import Managestf from './components/Managestf'




function App() {
      return (
            <Router>
                  <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Managestf" element={<Managestf/>}/>
                        <Route path="/allbooks" element={<AllBooks/>}/>
                        <Route path="/managestudents" element={<ManageStd/>}/>
                        <Route path="/books" element={<StdAllbook/>}/>
                        <Route path="/issuerequest" element={<IssueReq/>}/>
                        <Route path="/booksissued" element={<BookIssued/>}/>
                        <Route path="/bookrequest" element={<BookReq/>}/>
                        <Route path="/bookrequests" element={<GetReqBook/>}/>
                        {/* <Route path="/stdBookIssued" element={<StdBookIssued/>}/> */}
                        <Route path="/AllBookIssued" element={<AllBookIssued/>}/>


                  </Routes>
            </Router>
      );
}

export default App;
