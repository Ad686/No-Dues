import react from "react";
import Navbar from './navbar';
import Footer from "./footer";
 function Home(){
    return(
        <>
        {/* <Navbar/> */}
        <div>
            <section className=" homeback overflow-hidden" >


                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-7 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                Guru Nanak Dev<br />
                                <span style={{ color: "black" }}>Engineering College</span>
                            </h1>
                            <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)"}}>
                            No-dues is an easy to use online tool which helps the administration to maintain a record of pending dues and helps the students to review and submit them.

                            </p>
                        </div>

                        <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form>



                                        <div className="d-flex flex-row align-items-center mb-4 text-center">
                                            <i className="fa-solid fa-user"></i>
                                            <div className="form-outline flex-fill mb-0 ">
                                                <input type="text"  className="form-control" placeholder='User Name' name="uname" required />

                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4 text-center">
                                            <i className="fas fa-lock fa-lg"></i>
                                            <div className="form-outline flex-fill mb-0 ">
                                                <input type="password"  className="form-control" placeholder='Password' name="password" required />

                                            </div>
                                        </div>
                                        {/* <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4" className="form-control" placeholder='Password' />

                                        </div> */}



                                        <button type="submit" className="btn btn-primary col-lg-12">
                                            Login
                                        </button>

                                        <div className="text-center">
                                            {/* <p>or sign up with:</p> */}
                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-facebook-f"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-google"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-twitter"></i>
                                            </button>

                                            <button type="button" className="btn btn-link btn-floating mx-1">
                                                <i className="fab fa-github"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
        </>
    )
}
export default Home;