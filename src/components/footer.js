import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-white text-muted">

                {/* <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href="https://m.facebook.com/official.gndec/"target="_blank" className="me-4 link-secondary">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/officialgndec?lang=en" target="_blank" className="me-4 link-secondary">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://gndec.ac.in/" className="me-4 link-secondary">
                            <i className="fab fa-google"></i>
                        </a>
                        
                        <a href="https://www.linkedin.com/company/tnpgndec/" target="_blank" className="me-4 link-secondary">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    
                    </div>

                </section> */}

                <section className="">
                    <div className="container text-center text-md-start mt-5">

                        <div className="row mt-3">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                                <h6 className="text-uppercase fw-bold mb-4">
                                  No Dues
                                </h6>
                                <p>
                                    No-dues is an easy to use online tool which helps the administration to maintain a record of pending dues and helps the students to review and submit them.
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                                <h6 className="text-uppercase fw-bold mb-4">
                                    Locate us
                                </h6>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2114.0745677865257!2d75.86083276220239!3d30.862035608835562!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a828f09011b15%3A0xbf3f5b51dcc81b12!2sGuru%20Nanak%20Dev%20Engineering%20College!5e0!3m2!1sen!2sin!4v1670780673586!5m2!1sen!2sin" max-width="100%" height="auto" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                {/* <p>
                                    <a href="#!" className="text-reset">Angular</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">React</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Vue</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Laravel</a>
                                </p> */}
                            </div>

                            {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">Pricing</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Settings</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Orders</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">Help</a>
                                </p>
                            </div> */}

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p> Guru Nanak Dev Engineering College
                                    Gill Park, Gill Road, Ludhiana 141006, Punjab(India).</p>
                                <p>
                                    <i className="fas fa-envelope me-3 text-secondary"></i>
                                    <a href="mailto:principal@gndec.ac.in">principal@gndec.ac.in </a>
                                </p>
                                <p><i className="fas fa-phone me-3 text-secondary"></i>
                                    <a href="tel:0161-250270" >0161-2502700</a>,      <a href="tel: 0161-5064501" > 0161-5064501</a>
                                </p>

                            </div>

                        </div>

                    </div>
                </section>



                <div className="text-center p-4">
                    © 2023 Copyright:
                    Guru Nank Dev Engineering College
                </div>

            </footer>
        </div>
    )
}
