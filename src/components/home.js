import react, { useState } from "react";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

export default function Home() {
  const [opn, setopn] = useState(false);
  const [opn1, setopn1] = useState(false);
  const [opn2, setopn2] = useState(false);

  var navi = useNavigate();

  // admin login

  function login(e) {
    e.preventDefault();
    var d = new FormData(e.currentTarget);
    var id = d.get("uname");
    var pass = d.get("password");
    console.log(id);
    console.log(pass);

    db.collection("Admin")
      .where("Username", "==", id)
      .where("Password", "==", pass)
      .get()
      .then((succ) => {
        if (succ.size == 0) {
          alert("wrong id or password");
        } else {
          succ.forEach((abc) => {
            console.log(abc.data());
            alert("login successful");
            localStorage.setItem("AdminID", abc.id);
            console.log(abc.id);
            navi("/Managestf");
          });
        }
      });
  }


    // student login

  function login2(e) {
    e.preventDefault();
    var d = new FormData(e.currentTarget);
    var id = d.get("Clgid");
    var pass = d.get("pass");

    db.collection("Add_Std")
      .where("ClgId", "==", id)
      .where("Password", "==", pass)
      .get()
      .then((succ) => {
        if (succ.size == 0) {
          alert("wrong id or password");
        } else {
          // alert("login successful")
          succ.forEach((abc) => {
            alert("login successful");
            localStorage.setItem("CollegeID", abc.id);
            navi("/studentrequest");
          });
        }
      });
    }

  // staff login

  function login3(e) {
    e.preventDefault();
    var d = new FormData(e.currentTarget);
    var id = d.get("stdid");
    var pass = d.get("pass");

    db.collection("Add_staff")
      .where("StdId", "==", id)
      .where("Password", "==", pass)
      .get()
      .then((succ) => {
        if (succ.size == 0) {
          alert("wrong id or password");
        } else {
          // alert("login successful")
          succ.forEach((abc) => {
            alert("login successful");
            console.log(id);
            localStorage.setItem("StaffID", id);
            console.log(abc.id);
            navi("/staffmanagerequest");
          });
        }
      });
    }

    return (
      <>
        {/* <Navbar/> */}
        <div>
          <section className=" homeback overflow-scroll">
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
              <div className="row gx-lg-5 align-items-center mb-5">
                <div className="col-lg-7 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                  <h1
                    className="my-5 display-5 fw-bold ls-tight"
                    style={{ color: "hsl(218, 81%, 95%)" }}
                  >
                    Guru Nanak Dev
                    <br />
                    <span style={{ color: "black" }}>Engineering College</span>
                  </h1>
                  <h6
                    className="mb-4 opacity-70"
                    style={{ color: "hsl(218, 81%, 85%)" }}
                  >
                    No-dues is an easy to use online tool which helps the
                    administration to maintain a record of pending dues and
                    helps the students to review and submit them.
                  </h6>
                </div>

                <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
                  <div
                    id="radius-shape-1"
                    className="position-absolute rounded-circle shadow-5-strong"
                  ></div>
                  <div
                    id="radius-shape-2"
                    className="position-absolute shadow-5-strong"
                  ></div>

                  <div className="card bg-glass">
                    <div className="card-body px-4 py-5 px-md-5">
                      {/* admin login */}
                      <Dialog open={opn} onClose={() => setopn(!opn)}>
                        <DialogTitle>Admin Login</DialogTitle>
                        <DialogContent sx={{ width: 500 }}>
                          <form onSubmit={login}>
                            <div className="d-flex flex-row align-items-center mb-4 text-center">
                              <i className="fa-solid fa-user"></i>
                              <div className="form-outline flex-fill mb-0 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="User Name"
                                  name="uname"
                                  required
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4 text-center">
                              <i className="fas fa-lock fa-lg"></i>
                              <div className="form-outline flex-fill mb-0 ">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="password"
                                  required
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary col-lg-12"
                            >
                              Login
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {/* student login */}
                      <Dialog open={opn1} onClose={() => setopn1(!opn1)}>
                        <DialogTitle>Student Login</DialogTitle>
                        <DialogContent sx={{ width: 500 }}>
                          <form onSubmit={login2}>
                            <div className="d-flex flex-row align-items-center mb-4 text-center">
                              <i className="fa-solid fa-user"></i>
                              <div className="form-outline flex-fill mb-0 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="User Name"
                                  name="Clgid"
                                  required
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4 text-center">
                              <i className="fas fa-lock fa-lg"></i>
                              <div className="form-outline flex-fill mb-0 ">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="pass"
                                  required
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary col-lg-12"
                            >
                              Login
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {/* staff login */}
                      <Dialog open={opn2} onClose={() => setopn2(!opn2)}>
                        <DialogTitle>Staff Login</DialogTitle>
                        <DialogContent sx={{ width: 500 }}>
                          <form onSubmit={login3}>
                            <div className="d-flex flex-row align-items-center mb-4 text-center">
                              <i className="fa-solid fa-user"></i>
                              <div className="form-outline flex-fill mb-0 ">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="User Name"
                                  name="stdid"
                                  required
                                />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4 text-center">
                              <i className="fas fa-lock fa-lg"></i>
                              <div className="form-outline flex-fill mb-0 ">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Password"
                                  name="pass"
                                  required
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary col-lg-12"
                            >
                              Login
                            </button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Button
                        className="form-control lgbtn"
                        variant="outlined"
                        
                        onClick={() => setopn(!opn)}
                      >
                        Login as admin
                      </Button>
                      <br />
                      <br />
                      <Button
                        className="form-control lgbtn"
                        variant="outlined"
                        
                        onClick={() => setopn2(!opn2)}
                      >
                        Login as staff
                      </Button>
                      <br />
                      <br />
                      <Button
                        className="form-control lgbtn"
                        variant="outlined"
                        
                        onClick={() => setopn1(!opn1)}
                      >
                        Login as student
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }