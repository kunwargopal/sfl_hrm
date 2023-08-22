import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
function Home() {
  useEffect(() => {
    getData();
    getSuperVisiorData();

  }, []);
  const navigate = useNavigate();


  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth();
  const year = current.getFullYear();
  const day = current.getDay();


  const [list, setList] = useState([]);
  const [attList, setattList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [currMonth, setCurrMonth] = useState(month);
  const [currYear, setCurrYear] = useState(year);
  const getData = () => {
    axios.get(baseUrl + "contractoratt").then((res) => setList(res.data.data));
  };


  const getSuperVisiorData = () => {
    axios.get(baseUrl + "contractor").then((res) => setEmpList(res.data.data));
  };




  const monthList = [
    "January",
    "Fabuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agust",
    "September",
    "October",
    "November",
    "December",
  ];


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
                    <div className="col-4 text-start">
                      <select
                    className="form-select"
                        value={currYear} onChange={(e)=>setCurrYear(e.target.value)}
                      >
                        <option>--Select Year--</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                      </select>
                    </div>
                    <div className="col-4 text-start">
                      <select
                    className="form-select"
                    value={currMonth} onChange={(e)=>setCurrMonth(e.target.value)}
                      >
                        <option>--Select Month--</option>
                        {monthList.map((i)=>
                        <option>{i}</option>
                        )}
                      
                      </select>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="table-responsive text-nowrap">
                      <table
                        class="table table-striped"
                        style={{ textAlign: "center" }}
                      >
                        <thead className="bg-primary" >
                          <tr>
                            <th style={{color:"white"}} scope="col">Sr No.</th>
                            <th style={{color:"white"}} scope="col">Name</th>
                            <th style={{color:"white"}} scope="col">Number</th>
                            <th style={{color:"white"}} scope="col">Salary</th>
                            <th style={{color:"white"}} scope="col">Present</th>
                            <th style={{color:"white"}} scope="col">Absent</th>
                            <th style={{color:"white"}} scope="col">HalfDay</th>
                            <th style={{color:"white"}} scope="col">Salary</th>
                          </tr>
                        </thead>
                        <tbody>
                          {empList.map((i, n) => (
                            <tr>
                              <td>{n + 1}</td>
                              <td>{i.contractorName}</td>
                              <td>{i.number}</td>
                              <td>{i.basicSalary}</td>
                              <td>{list.filter((j)=>j.supervisiorName===i.supervisiorName&j.status==="Present").length}</td>
                              <td>{list.filter((j)=>j.supervisiorName===i.supervisiorName&j.status==="Absent").length}</td>
                              <td>{list.filter((j)=>(j.supervisiorName===i.supervisiorName)&(j.status==="Halfday")).length}</td>
                             <td> {(+i.basicSalary / 25) *
                        list.filter(
                          (j) =>
                            (j.supervisiorName ===i. supervisiorName) &
                            (j.status === "Present") 
                           
                        ).length +
                        (+i.basicSalary / 50) *
                          list.filter(
                            (j) =>
                              (j.supervisiorName === i.supervisiorName) &
                              (j.status === "Halfday") 
                            
                          ).length}
                      Rs.</td>
                            
                            </tr>
                          ))}
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
