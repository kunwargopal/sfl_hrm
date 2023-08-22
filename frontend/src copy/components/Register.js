import React from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="authentication-wrapper authentication-cover">
                <div className="authentication-inner row m-0">
                    {/* /Left Text */}
                    <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
                        <div className="w-100 d-flex justify-content-center">
                            <img src="../../assets/img/illustrations/girl-with-laptop-light.png" className="img-fluid" alt="Login image" width={700} data-app-dark-img="illustrations/girl-with-laptop-dark.png" data-app-light-img="illustrations/girl-with-laptop-light.png" />
                        </div>
                    </div>
                    {/* /Left Text */}
                    {/* Register */}
                    <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
                        <div className="w-px-400 mx-auto">
                            {/* Logo */}
                            <div className="app-brand mb-5">
                                {/* <a href="index-2.html" className="app-brand-link gap-2">
                                    <span className="app-brand-text demo text-body fw-bolder">Safal</span>
                                </a> */}
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2">Register here! 🚀</h4>
                            <form id="formAuthentication" className="mb-3" action="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/index.html" method="POST">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" autofocus />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <div className="input-group input-group-merge">
                                        <input type="password" id="password" className="form-control" name="password" placeholder="············" aria-describedby="password" />
                                        <span className="input-group-text cursor-pointer"><i className="bx bx-hide" /></span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                                        <label className="form-check-label" htmlFor="terms-conditions">
                                            I agree to
                                            <a >privacy policy &amp; terms</a>
                                        </label>
                                    </div>
                                </div>
                                <button onClick={()=>navigate("/")} className="btn btn-primary d-grid w-100">
                                   Register
                                </button>
                            </form>
                            <p className="text-center">
                                <span>Already have an account?</span>
                                <a onClick={()=>navigate("/")}>
                                    <span>Sign in instead</span>
                                </a>
                            </p>
                            <div className="divider my-4">
                                <div className="divider-text">or</div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="javascript:;" className="btn btn-icon btn-label-facebook me-3">
                                    <i className="tf-icons bx bxl-facebook" />
                                </a>
                                <a href="javascript:;" className="btn btn-icon btn-label-google-plus me-3">
                                    <i className="tf-icons bx bxl-google-plus" />
                                </a>
                                <a href="javascript:;" className="btn btn-icon btn-label-twitter">
                                    <i className="tf-icons bx bxl-twitter" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* /Register */}
                </div>
            </div>
        </>
    )
}

export default Login
