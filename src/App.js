import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Home from './components/home';
import AddBook from './components/AddBook';
import AllBooks from './components/AllBooks';
import ManageStd from './components/ManageStds';
import StdAllbook from './components/StdAllbook';
import IssueReq from './components/issuerequest';
import BookIssued from './components/BookIssued';
import BookReq from './components/BookReq';
import GetReqBook from './components/GetReqBook';
import StdBookIssued from './components/stdbookissue';


function App() {
      return (
            <Router>
                  <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/addbook" element={<AddBook/>}/>
                        <Route path="/allbooks" element={<AllBooks/>}/>
                        <Route path="/managestudents" element={<ManageStd/>}/>
                        <Route path="/books" element={<StdAllbook/>}/>
                        <Route path="/issuerequest" element={<IssueReq/>}/>
                        <Route path="/booksissued" element={<BookIssued/>}/>
                        <Route path="/bookrequest" element={<BookReq/>}/>
                        <Route path="/bookrequests" element={<GetReqBook/>}/>
                        <Route path="/stdBookIssued" element={<StdBookIssued/>}/>

                  </Routes>
            </Router>
      );
}

export default App;
