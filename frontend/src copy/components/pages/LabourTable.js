import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {baseUrl}  from "./BaseUrl";
function Home() {
  useEffect(()=>{getData()},[])
    const navigate=useNavigate()
    const [list,setList]=useState([])
const getData=()=>{
  axios.get(baseUrl+"labour").then((res)=>setList(res.data.data))
}
const dltData=(x)=>{
  axios.delete(baseUrl+"labour/"+x).then(()=>getData())
}

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />

          <div className="layout-page">
            <div className="container-fluid flex-grow-1 container-p-y">
              <div className="card py-4 vcenter">
                <div className="container">
                  <div className="row h-100">
                    <div className="col-12 text-start">
                      <button onClick={()=>navigate("/AddLabour")} className="btn btn-primary">
                        Add Labour
                      </button>
                    </div><br/><br/>
                    <div className="table-responsive text-nowrap">
                    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Name</th>
      <th scope="col">Number</th>
      <th scope="col">Address</th>
      <th scope="col">City</th>
      <th scope="col">State</th>
      <th scope="col">Pin Code</th>
      <th scope="col">Aadhar No.</th>
      <th scope="col">Basic Salary</th>
      <th scope="col">Salary Type</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{list.map((i,n)=>
    <tr>
       <td>{n+1}</td>
       <td>{i.labourName}</td>
      <td>{i.number}</td>
      <td>{i.address}</td>
      <td>{i.city}</td>
      <td>{i.state}</td>
      <td>{i.pinCode}</td>
      <td>{i.aadharNo}</td>
      <td>{i.basicSalary}</td>
      <td>{i.salaryType}</td>
      <td><i onClick={()=>{localStorage.setItem("labourData", JSON.stringify(i));
      navigate("/EditLabour")
    }} className="fa fa-edit"></i>&nbsp;&nbsp;
      <i className="fa fa-eye"></i>&nbsp;&nbsp;
      <i onClick={()=>dltData(i._id)} className="fa fa-trash"></i>
      </td>
    </tr>)}
  
  </tbody>
</table>
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
