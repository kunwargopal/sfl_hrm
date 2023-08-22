import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login () {

const navigate=useNavigate()
  
  return (
    <> 

  
      <div 
        className="authentication-wrapper authentication-cover"
        style={{
         
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="authentication-inner row m-0">
          {/* Login */}
          <div className="login">
            <div className=" mx-auto"  id="my-node">
              {/* Logo */}
              <div className="app-brand mb-5">
                <a href="index-2.html" className="app-brand-link gap-2"></a>
              </div>
              {/* /Logo */}
              <h4 className="mb-2">Welcome to Safal! 👋</h4>
              <p className="mb-4">Please log-in to your account</p>
              <div
              
                className="mb-3"
                action="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/index.html"
                method="POST"
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    autofocus
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="············"
                      aria-describedby="password"
                     
                    />

                    <span className="input-group-text cursor-pointer">
                      <i  className="bx bx-show" />
                    </span>
                  </div>
                </div>
                <div className="mb-3">

                </div>
                <button
                onClick={()=>navigate("/dashboard")}
                  className="btn btn-primary d-grid w-100"
                >
                  Login
                </button>
              </div>

            </div>
          </div>
          {/* /Login */}
        </div>
      </div>


    </>
  );
};

export default Login;
