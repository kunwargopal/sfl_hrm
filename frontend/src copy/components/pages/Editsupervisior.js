import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {baseUrl}  from "./BaseUrl";
import storage from "./Firebase";


function Home() {
const supervisior=localStorage.getItem("supervisiorData")
const data =JSON.parse(supervisior)

  const navigate = useNavigate();
  const [postData, setPostData]=useState(data)

  const putSupervisiorData=(x)=>{
    axios.put(baseUrl +"supervisior/"+x, postData).then(()=>navigate("/SupervisiorTable"))
  }




  const uploadImage = (x) => {
    if (x !== "") {
      const uploadTask = storage.ref(`images/${x.name}`).put(x);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress1(
            Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(x.name)
            .getDownloadURL()
            .then((url) => {
              setProgress1(0);
         
              setPostData({...postData, document: url});
            });
        }
      ); 
    } else {
      alert("no image selected");
    }
  };
  const [progress1, setProgress1] = useState(0);

  
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
                                  Supervisior Name
                                </label>
                                <div className="col-sm-9">
                                  <input
                                  value={postData.supervisiorName}
                                  onChange={(e)=>setPostData({...postData,supervisiorName:e.target.value})}
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
                                  htmlFor="collapsible-Country"
                                >
                                 Email
                                </label>
                                <div className="col-sm-9">
                                  <input
                                     value={postData.email}
                                     onChange={(e)=>setPostData({...postData,email:e.target.value})}
                                    placeholder="Email"
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
                         
                                   onChange={(e) => uploadImage(e.target.files[0])}
                                  type="file"
                                    placeholder="Aadhar Card"
                                    className="form-control"
                                  />
                                    <div style={{height:3, width:"100%", backgroundColor:"lightgrey"}}>
                                    <div style={{height:3, width:`${progress1}%`, backgroundColor:"green"}}>
                                      
                             
                              </div>
                                    </div>
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
                       
                       
                          </div>
                         
                          <div className="mt-4 text-center">
                            <button
                            disabled={progress1!==0}
                            onClick={()=>putSupervisiorData(postData._id)}
                              type="submit"
                              className="btn btn-primary me-sm-3 me-1"
                            >
                              Submit
                            </button>
                            <button
                            onClick={()=>navigate("/SupervisiorTable")}
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
