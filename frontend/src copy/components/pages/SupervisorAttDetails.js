import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
function Home() {
  useEffect(() => {
    getData();
    getSuperVisiorData()

  }, []);
  const navigate = useNavigate();
  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth();
  const year = current.getFullYear();
  const day = current.getDay();
  const [currMonth, setCurrMonth] = useState(month);
  const [currYear, setCurrYear] = useState(year);



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


  
  

  const sajn = [3, 5, 8, 10];

  const numberOfDays =
    currMonth === 1
      ? currYear % 4 === 0
        ? 29
        : 28
      : sajn.includes(currMonth)
      ? 30
      : 31;

  const calenderData = new Array(numberOfDays).fill().map((i, n) => n + 1);

  const nextMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };
  const previusMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  const firstDayOfMonth = () => {
    const a = new Date(`${monthList[currMonth]} 1, ${currYear} 01:15:00 `);
    const d = a.getDay();
    return d;
  };
  const list1 = new Array(firstDayOfMonth()).fill().map((i, n) => "");
  const list2 = [...list1, ...calenderData];






  const [list, setList] = useState([]);
  const [attList, setattList] = useState([]);
  const [empList, setEmpList] = useState([]);
 
  const getData = () => {
    axios.get(baseUrl + "supervisioratt").then((res) => setList(res.data.data));
  };

  const getSuperVisiorData = () => {
    axios.get(baseUrl + "supervisior").then((res) => setEmpList(res.data.data));
  };

  const [name, setName] = useState([]);


  const presentCheck = list
  .filter((j) => j.supervisiorName.includes(name?.supervisiorName) & (j.status === "Present"))
  .map((j) => +j.date);
const absentCheck = list
  .filter((j) => j.supervisiorName.includes(name?.supervisiorName) & (j.status === "Absent"))
  .map((j) => +j.date);
const halfdayCheck = list
  .filter((j) => j.supervisiorName.includes(name?.supervisiorName) & (j.status === "Halfday"))
  .map((j) => +j.date);






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
      <div className="modal11">
            <div
              style={{
                float: "right",
                marginRight: "10px",
                fontSize: "18px",
                color: "white",
              }}
            >
              <i
               
                class="fa fa-times"
                aria-hidden="true"
                style={{ margin:"10px"}}
              ></i>
            </div>
            <br />
            <br />
            <div
              style={{
                width: "95%",
                height: "10vh",
                marginLeft: "2.5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: "2px solid maroon",
                // borderRadius: 10,
              }}
            >
              <label style={{ color: "black", fontSize: 30 }}>
              {name?.supervisiorName}'s Celender
              </label>
            </div>
            <div
              style={{
                width: "95%",
                minHeight: "40vh",
                marginLeft: "2.5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                //  border: "2px solid maroon",
                //  borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <i
                  onClick={() => previusMonth()}
                  class="fa fa-arrow-circle-left"
                  aria-hidden="true"
                  style={{ color: "black" }}
                ></i>
                <label style={{ color: "rgba(221 81 66)" }}>
                  {" "}
                  {monthList?.[currMonth]} {currYear}
                </label>
                <i
                  onClick={() => nextMonth()}
                  class="fa fa-arrow-circle-right"
                  aria-hidden="true"
                  style={{ color: "black" }}
                ></i>
              </div>
              <br />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <label style={{ color: "black" }}>Sun</label>
                <label style={{ color: "black" }}>Mon</label>
                <label style={{ color: "black" }}>Tue</label>
                <label style={{ color: "black" }}>Wed</label>
                <label style={{ color: "black" }}>Thu</label>
                <label style={{ color: "black" }}>Fri</label>
                <label style={{ color: "black" }}>Sat</label>
              </div>
              <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                {list2.map((i, n) => (
                  <div
                    style={{
                      width: "13%",
                      textAlign: "end",
           
                    }}
                  >
                    <button
                      style={{
                      
                        color:
                          (i !== "") & (n % 7 === 0)
                            ? "grey"
                            : presentCheck.includes(i) &
                              ((month === currMonth) & (year === currYear))
                            ? "green"
                            : absentCheck.includes(i) &
                              ((month === currMonth) & (year === currYear))
                            ? "red"
                            : halfdayCheck.includes(i) &
                              ((month === currMonth) & (year === currYear))
                            ? "orange"
                            : "black",
                        backgroundColor:
                          (date === i) &
                          (month === currMonth) &
                          (year === currYear)
                            ? "lightgrey"
                            : "transparent",
                        textAlign: "center",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginTop: "10px",
                        border:"none"
                      }}
                    >
                      {i}
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
                            <th style={{color:"white"}} scope="col">Total Present</th>
                            <th style={{color:"white"}} scope="col">Total Absent</th>
                            <th style={{color:"white"}} scope="col">Total HalfDay</th>
                            <th style={{color:"white"}} scope="col">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {empList.map((i, n) => (
                            <tr>
                              <td>{n + 1}</td>
                              <td>{i.supervisiorName}</td>
                              <td>{i.number}</td>
           
                              <td>{list.filter((j)=>j.supervisiorName===i.supervisiorName&j.status==="Present").length}</td>
                              <td>{list.filter((j)=>j.supervisiorName===i.supervisiorName&j.status==="Absent").length}</td>
                              <td>{list.filter((j)=>(j.supervisiorName===i.supervisiorName)&(j.status==="Halfday")).length}</td>
                              <td><i onClick={()=>setName(i)} data-bs-toggle="modal" data-bs-target="#exampleModal" className="fa fa-eye"></i></td>
                            
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
