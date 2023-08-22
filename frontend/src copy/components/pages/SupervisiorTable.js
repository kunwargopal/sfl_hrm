import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {baseUrl}  from "./BaseUrl";
function Home() {
  useEffect(()=>{getData()},[])
    const navigate=useNavigate()
    const [list,setList]=useState([])
    const [data,setData]=useState([])
const getData=()=>{
  axios.get(baseUrl+"supervisior").then((res)=>setList(res.data.data))
}
const dltData=(x)=>{
  axios.delete(baseUrl+"supervisior/"+x).then(()=>getData())
}

  return (
    <div>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" id="exampleModalLabel"></h6>
        <button type="button" class="btn-primary close" data-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i className="fa fa-times"></i>
        </button>
      </div>
      <div style={{ display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      <img style={{height:300,}} src={data.document}></img>
          </div>
      <div class="modal-footer">
        
      </div>
    </div>
  </div>
</div>


{/* =====================Modal Close============ */}



      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />

          <div className="layout-page">
            <div className="container-fluid flex-grow-1 container-p-y">
              <div className="card py-4 vcenter">
                <div className="container">
                  <div className="row h-100">
                    <div className="col-12 text-start">
                      <button onClick={()=>navigate("/Addsupervisior")} className="btn btn-primary">
                        Add Supervisior
                      </button>
                    </div><br/><br/>
                    <div className="table-responsive text-nowrap">
                    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Document</th>
      <th scope="col">Name</th>
      <th scope="col">Number</th>
      <th scope="col">Email</th>
      <th scope="col">Address</th>
      <th scope="col">City</th>
      <th scope="col">State</th>
      <th scope="col">Pin Code</th>
      <th scope="col">Aadhar No.</th>
      <th scope="col">Basic Salary</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{list.map((i,n)=>
    <tr>
       <td>{n+1}</td>
       <td><img style={{height:100}} src={i.document}></img></td>
       <td>{i.supervisiorName}</td>
      <td>{i.number}</td>
      <td>{i.email}</td>
      <td>{i.address}</td>
      <td>{i.city}</td>
      <td>{i.state}</td>
      <td>{i.pinCode}</td>
      <td>{i.aadharNo}</td>
      <td>{i.basicSalary}</td>
      <td><i onClick={()=>{localStorage.setItem("supervisiorData", JSON.stringify(i));
      navigate("/Editsupervisior")
    }} className="fa fa-edit"></i>&nbsp;&nbsp;
      <i onClick={()=>setData(i)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="fa fa-eye"></i>&nbsp;&nbsp;
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
