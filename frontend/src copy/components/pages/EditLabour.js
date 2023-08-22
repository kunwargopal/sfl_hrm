import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {baseUrl}  from "./BaseUrl";

function Home() {
const labour=localStorage.getItem("labourData")
const data =JSON.parse(labour)

  const navigate = useNavigate();
  const [postData, setPostData]=useState(data)

  const putLabourData=(x)=>{
    axios.put(baseUrl +"labour/"+x, postData).then(()=>navigate("/LabourTable"))
  }

  
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />

          <div className="layout-page">
            <div className="container-fluid flex-grow-1 container-p-y">
            <div className="row my-4">
                <div className="col">
                  {/* <h6> Collapsible Section </h6> */}
                  <div className="accordion">
                    {/* Delivery Address */}
                    <div className="card accordion-item">
                      <div
                        id="collapseDeliveryAddress"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingDeliveryAddress"
                        data-bs-parent="#collapsibleSection"
                      >
                        {/* <h5 class="card-header">Sale Vendor Form</h5> */}
                        <div className="accordion-body">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Party"
                                >
                                  Labour Name
                                </label>
                                <div className="col-sm-9">
                                  <input
                                  value={postData.labourName}
                                  onChange={(e)=>setPostData({...postData,labourName:e.target.value})}
                                    className="form-control"
                                    placeholder="Name"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Country"
                                >
                                 Number
                                </label>
                                <div className="col-sm-9">
                                  <input
                                   value={postData.number}
                                   onChange={(e)=>setPostData({...postData,number:e.target.value})}
                                    placeholder="Number"
                                    className=" form-control"
                                  />
                                </div>
                              </div>
                            </div>
                    
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                 Address
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    value={postData.address}
                                    onChange={(e)=>setPostData({...postData,address:e.target.value})}
                                    placeholder="Address"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  City
                                </label>
                                <div className="col-sm-9">
                                  <input
                                   value={postData.city}
                                   onChange={(e)=>setPostData({...postData,city:e.target.value})}
                                    placeholder="City"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  State
                                </label>
                                <div className="col-sm-9">
                                  <input
                                   value={postData.state}
                                   onChange={(e)=>setPostData({...postData,state:e.target.value})}
                                    placeholder="State"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Pin Code
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    value={postData.pinCode}
                                    onChange={(e)=>setPostData({...postData,pinCode:e.target.value})}
                                    placeholder="Pin Code"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Aadhar Card No.
                                </label>
                                <div className="col-sm-9">
                                  <input
                                  value={postData.aadharNo}
                                  onChange={(e)=>setPostData({...postData,aadharNo:e.target.value})}
                                    placeholder="Aadhar Card"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                 Document
                                </label>
                                <div className="col-sm-9">
                                  <input
                                   value={postData.document}
                                   onChange={(e)=>setPostData({...postData,document:e.target.value})}
                                  type="file"
                                    placeholder="Aadhar Card"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Basic Salary
                                </label>
                                <div className="col-sm-9">
                                  <input
                                     value={postData.basicSalary}
                                     onChange={(e)=>setPostData({...postData,basicSalary:e.target.value})}
                                    placeholder="Basic Salary"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                   Salary Type
                                </label>
                                <div className="col-sm-9">
                                  <select
                                     value={postData.salaryType}
                                     onChange={(e)=>setPostData({...postData,salaryType:e.target.value})}
                                    
                                    className="form-select"
                                  >
                                    <option disabled selected>--Select--</option>
                                    <option>Per Day</option>
                                    <option>Per Year</option>
                                    <option>Per Month</option>
                                    <option>As a Contract</option>
                                    <option></option>
                                  </select>
                                </div>
                              </div>
                            </div>
                       
                       
                          </div>
                          <div className="mt-4 text-center">
                            <button
                            onClick={()=>putLabourData(postData._id)}
                              type="submit"
                              className="btn btn-primary me-sm-3 me-1"
                            >
                              Submit
                            </button>
                            <button
                            onClick={()=>navigate("/LabourTable")}
                              type="reset"
                              className="btn btn-label-secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
