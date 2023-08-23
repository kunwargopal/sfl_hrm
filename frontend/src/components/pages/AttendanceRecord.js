import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
import { hasPermission } from "./HashPermission";
function Home() {

  useEffect(() => {
    getEmployeeData();
    getAttendanceData();
    getAdvanceData()
    getDeductionData()
  }, []);

  const navigate = useNavigate();

  const employeeLocalData = sessionStorage.getItem("employeeLocalData")
  const parseEmployeeData = employeeLocalData?JSON.parse(employeeLocalData):[]
  const [employeesList, setEmployeesList] = useState(parseEmployeeData);
  const [employeesList1, setEmployeesList1] = useState([]);
  const [search, setSearch] = useState("");



  const getEmployeeData = () => {
    axios.get(baseUrl + "employees").then((res) => {
      setEmployeesList(res.data);
      sessionStorage.setItem("employeeLocalData", JSON.stringify(res.data))
      setEmployeesList1(res.data);
    });
  };
  const [attList, setAttList] = useState([]);
  const getAttendanceData = () => {
    axios.get(baseUrl + "attendance").then((res) => setAttList(res.data));
  };
  const list = employeesList;
  const list4 =
    search !== ""
      ? list.filter((i) => i.name.toLowerCase().includes(search))
      : list;

  const date = new Date();
  const day = date.getDate();
  const nday = day < 10 ? `0${day}` : day;
  const month = date.getMonth() + 1;
  const nmonth = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const currDate = year + "-" + nmonth + "-" + nday;
  const firstDate = year + "-" + nmonth + "-" + "01";
  const finalTime = `${hour}:${minute}`;
  const [fromDate, setFromDate] = useState(firstDate);
  const [toDate, setToDate] = useState(currDate);

  const list1 =
    fromDate !== ""
      ? attList.filter((i) => new Date(+i.inTime) >= new Date(fromDate))
      : attList;
  const list2 =
    toDate !== ""
      ? list1.filter(
          (i) => new Date(+i.inTime - 1000 * 60 * 60 * 24) <= new Date(toDate)
        )
      : list1;

  const workingTime1 = (x) => {
    const wh = (x.outTime || Date.now()) - x.inTime;
    const d = 1000 * 60 * 60;
    const nwh = wh / d;
    return +nwh;
  };
  const workingTime2 = (x) => {
    const wh = (x.outTime || Date.now()) - x.inTime;
    const outTime = x.tOut
      ?.map((i, n) => {
        const y = x.tIn[n] || x.outTime || Date.now();
        const z = y - i;
        return z;
      })
      .reduce((a, b) => a + b, 0)
    const d = 1000 * 60 * 60;
    const nwh = (wh - (outTime||0)) / d;
    return +nwh;
  };
  const workingTime3 = (x) => {

    const outTime = x.tOut
      ?.map((i, n) => {
        const y = x.tIn[n] || x.outTime || Date.now();
        const z = y - i;
        return z;
      })
      .reduce((a, b) => a + b, 0)
    const d = 1000 * 60 * 60;
    const nwh = (outTime||0)/ d;
    return +nwh;
  };

  const totalWorkingHours = (x) => {
    const nwh = list2
      .filter((i) => i.empId === x)
      .map((i) => workingTime1(i))
      .reduce((a, b) => +a + +b, 0)
    const hh = Math.floor(nwh);
    const mm = Math.ceil(60 * (nwh % 1));
    return `${hh} hours ${mm} minutes`;
  };
  
  const totalWorkingHours1 = (x) => {
    const nwh = list2
      .filter((i) => i.empId === x)
      .map((i) => workingTime1(i))
      .reduce((a, b) => +a + +b, 0);
    return nwh;
  };
  const totalWorkingHours2 = (x) => {
    const nwh = list2
      .filter((i) => i.empId === x)
      .map((i) => workingTime2(i))
      .reduce((a, b) => +a + +b, 0)
    const hh = Math.floor(nwh);
    const mm = Math.ceil(60 * (nwh % 1));
    return `${hh} hours ${mm} minutes`;
  };
  const totalWorkingHours3 = (x) => {
    const nwh = list2
      .filter((i) => i.empId === x)
      .map((i) => workingTime3(i))
      .reduce((a, b) => +a + +b, 0)
    const hh = Math.floor(nwh);
    const mm = Math.ceil(60 * (nwh % 1));
    return `${hh} hours ${mm} minutes`;
  };

  const salary = (x) => {
    const totalHours = totalWorkingHours1(x.id);
    const d =
      x.salaryType === "Monthly" ? 30 : x.salaryType === "Weekly" ? 7 : 1;
    const pds = x.basicSalary / (d * 12);
    const total = Math.floor(totalHours * pds);
    return total;
  };

  const [empId, setEmpId]=useState("")
  const [advance, setAdvance]=useState("")
  const [amount, setAmount]=useState("")
  const [reason, setReason]=useState("")
  const [mode, setMode]=useState("")
  const [currMonth, setCurrMonth] = useState(month);




  const postAdvanceData=()=>{
    const item={
      empId:empId,
      advance:advance,
      mode:mode,
      date:Date.now()
    }
    axios.post(baseUrl+"advance",item).then(()=>{getAdvanceData();
      setAdvance("")
      setMode("")
    })
  }
  const postDeductionData=()=>{
    const item={
      empId:empId,
      amount:amount,
      reason:reason,
      date:Date.now()
    }
    axios.post(baseUrl+"deduction",item).then(()=>{getDeductionData();
      setAmount("")
      setReason("")
    })
  }


  const advanceLocalData = sessionStorage.getItem("advanceLocalData")
  const parseAdvance = advanceLocalData? JSON.parse(advanceLocalData):[]
  
  const [advanceList, setAdvanceList]=useState(parseAdvance)

  
  const deductionLocalData = sessionStorage.getItem("deductionLocalData")
  const parseDeduction = deductionLocalData? JSON.parse(deductionLocalData):[]
  const [deductionList, setDeductionList]=useState(parseDeduction)
  const getAdvanceData=()=>{
    axios.get(baseUrl+"advance").then((res)=>{setAdvanceList(res.data)
      sessionStorage.setItem("advanceLocalData", JSON.stringify(res.data))
    })
  }
  const getDeductionData=()=>{
    axios.get(baseUrl+"deduction").then((res)=>{setDeductionList(res.data)
      sessionStorage.setItem("deductionLocalData", JSON.stringify(res.data))


    })
  }
  const advanceList1=advanceList.filter((i)=>i.empId===empId)
  const deductionList1=deductionList.filter((i)=>i.empId===empId)
  const dltAdvanceData=(x)=>{
    axios.delete(baseUrl+"advance/"+x).then(()=>getAdvanceData()
    )
  }
  const dltDeductionData=(x)=>{
    axios.delete(baseUrl+"deduction/"+x).then(()=>getAdvanceData()
    )
  }

  const getDate = (x) => {
    const date = new Date(x);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    const ndd = dd < 10 ? `0${dd}` : dd;
    const nmm = mm < 10 ? `0${mm}` : mm;
    const finalDate = ndd + "/" + nmm + "/" + yy;
    return finalDate;
  };



  return (
    <div>

      {/* =================Modal1=============== */}
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
        <div className="container">
      <form 
                        id="addNewCCForm"
                        className="row g-3"
                        onsubmit="return false"
                      >
                     
                        <div className="col-md-6">
                        <div className="row">
                          <label className="col-sm-6 col-form-label text-sm-start" htmlFor="collapsible-Rate">Advance Payment</label>
                          <div className="col-md-6">
                          <input
                          value={advance}
                          onChange={(e)=>setAdvance(e.target.value)}
                         placeholder="Advance.."
                        
                            className=" form-control"
                          >
                
                          </input>

                          </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                        <div className="row">
                          <label className="col-sm-6 col-form-label text-sm-center" htmlFor="collapsible-Rate">Mode</label>
                          <div className="col-md-6">
                          <select
                          onChange={(e)=>setMode(e.target.value)}
                         placeholder="Advance.."
                        
                            className=" form-select"
                          >
                            <option selected disabled>--Select--</option>
                            <option>Cash</option>
                            <option>Bank</option>
                          </select>

                          </div>
                          </div>
                        </div>

                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            aria-label="Close"
                            onClick={()=>postAdvanceData()}
                            className="btn btn-primary me-sm-3 me-1 mt-3"
                            data-bs-dismiss="modal"
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="btn btn-label-secondary btn-reset mt-3"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                      </div>
                      <br/>
                      <div className="container-fluid overflow-scroll">
                    <table class="table table-striped text-center">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Date</th>
      <th scope="col">Amount</th>
      <th scope="col">Mode</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {advanceList1.map((i,n)=>
<tr>
  <td>{n+1}</td>
  <td>{getDate(+i.date)}</td>
  <td>{i.advance}</td>
  <td>{i.mode}</td>
  <td><i className="fa fa-edit"></i>&nbsp;<i onClick={()=>dltAdvanceData(i.id)} className="fa fa-trash"></i></td>
</tr>)}
<tr>
  <td></td>
  <td style={{fontWeight:"bold"}}>Total</td>
  <td style={{fontWeight:"bold"}}>{advanceList1.map((j)=>j.advance).reduce((a,b)=>+a + +b,0)}Rs.</td>
  <td></td>
  <td></td>
</tr>
  
  </tbody>
</table>
          </div>
          </div>
      <div class="modal-footer">
        
      </div>
    </div>
  </div>
</div>
      {/* =================Modal1=============== */}


            {/* =================Modal2=============== */}
            <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" id="exampleModalLabel"></h6>
        <button type="button" class="btn-primary close" data-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal1">
        <i className="fa fa-times"></i>
        </button>
      </div>
      <div style={{ display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"column", padding:10}}>
        <div className="container">
      <form 
                        id="addNewCCForm"
                        className="row"
                        onsubmit="return false"
                      >
                     
                        <div className="col-md-6">
                        <div className="row">
                          <label className="col-sm-6 col-form-label text-sm-center" htmlFor="collapsible-Rate">Amount</label>
                          <div className="col-md-6">
                          <input
                          value={amount}
                          onChange={(e)=>setAmount(e.target.value)}
                         placeholder="Amount.."
                        
                            className=" form-control"
                          >
                
                          </input>

                          </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                        <div className="row">
                          <label className="col-sm-6 col-form-label text-sm-center" htmlFor="collapsible-Rate">Reason</label>
                          <div className="col-md-6">
                          <input
                          value={reason}
                          onChange={(e)=>setReason(e.target.value)}
                         placeholder="Amount.."
                        
                            className=" form-control"
                          >
                
                          </input>

                          </div>
                          </div>
                        </div>

                        <div className="col-12 text-center">
                          <button
                            type="submit"
                            aria-label="Close"
                            onClick={()=>postDeductionData()}
                            className="btn btn-primary me-sm-3 me-1 mt-3"
                            data-bs-dismiss="modal"
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="btn btn-label-secondary btn-reset mt-3"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                      </div>
                      <br/>
                      <div className="container-fluid overflow-scroll px-0">
                    <table class="table table-striped text-center">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Date</th>
      <th scope="col">Amount</th>
      <th scope="col">Reason</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {deductionList1.map((i,n)=>
<tr>
  <td>{n+1}</td>
  <td>{getDate(+i.date)}</td>
  <td>{i.amount}</td>
  <td>{i.reason}</td>
  <td><i className="fa fa-edit"></i>&nbsp;<i onClick={()=>dltDeductionData(i.id)} className="fa fa-trash"></i></td>
</tr>)}
<tr>
  <td></td>
  <td style={{fontWeight:"bold"}}>Total</td>
  <td style={{fontWeight:"bold"}}>{deductionList1.map((j)=>j.amount).reduce((a,b)=>+a + +b,0)}Rs.</td>
  <td></td>
  <td></td>
</tr>
  
  </tbody>
</table>
          </div>
          </div>
      <div class="modal-footer">
        
      </div>
    </div>
  </div>
</div>
      {/* =================Modal=============== */}

      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />

          <div className="layout-page">
            <div className="container-fluid flex-grow-1 container-p-y">
              <div className="card py-4 vcenter">
                <div className="container">
                  <div className="row h-100">
                    <div className="col-12 text-start">
                      <button className="btn btn-primary">
                        {day}/{month}/{year}
                      </button>
                    </div>
                    <br />
                    <br />
                    <div className="container">
                    <div className="accordion-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              From
                            </label>
                            <div className="col-sm-6">
                              <input
                              type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="form-select"
                              >
                              </input>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              To
                            </label>
                            <div className="col-sm-6">
                              <input
                                value={toDate}
                                type="date"
                                onChange={(e) => setToDate(e.target.value)}
                                placeholder="State"
                                className="form-select"
                              ></input>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="row">
                            <div className="col-sm-11">
                              <input
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="form-control"
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div><br />
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              Year
                            </label>
                            <div className="col-sm-6">
                              <select
                             disabled
                              className="form-select"
                              >
                             
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              Month
                            </label>
                            <div className="col-sm-6">
                            <select
                                         value={currMonth}
                                    className="form-control"
                                    onChange={(e) =>{
                                      setCurrMonth(e.target.value)
                                      const i = e.target.value
                                      const m = i<10?`0${i}`:i
                                     const l = new Date(year, m, 0).getDate();
                                      const date=year+"-"+m+"-"+"01"
                                      const ldate=year+"-"+m+"-"+l
                                      setFromDate(date)
                                      setToDate(ldate)
                                    }
                                    }
                                  >
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                  </select>
                            </div>
                          </div>
                        </div>

                   
                      </div>
                    </div>
                    </div>
                    <br />
                  </div>
                  <br />

                  <div className="table-responsive text-nowrap">
                    <table class="table table-striped">
                      <thead>
                        <tr className="table-primary">
                          <th scope="col">Sr No.</th>
                          <th scope="col">Name</th>
                          <th scope="col">Salary</th>
                          <th scope="col">Working Hours</th>
                          <th scope="col">In Hours</th>
                          <th scope="col">Out Hours</th>
                          <th scope="col">Est. Salary</th>
                          <th scope="col">Advance</th>
                          <th scope="col">DEDUCTION</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list4.map((i, n) => (
                          <tr>
                            <td>{n + 1}</td>

                            <td>{i.name}</td>
                            <td>{i.basicSalary}</td>
                            <td>{totalWorkingHours(i.id)}</td>
                            <td>{totalWorkingHours2(i.id)}</td>
                            <td>{totalWorkingHours3(i.id)}</td>
                           
                            <td>{salary(i)}</td>

                            <td>
                              <button data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={() => 
                                setEmpId(i.id) 
                                } className="btn btn-primary">
                              <i
                              
                                className="fa fa-plus"
                              ></i>
                              </button>
                            </td>
                            <td>
                              <button  data-bs-toggle="modal" data-bs-target="#exampleModal1"
                                onClick={() => 
                                setEmpId(i.id) 
                                } className="btn btn-danger">
                              <i
                             
                                className="fa fa-minus"
                              ></i>
                              </button>
                            </td>

                            <td>
                              <button onClick={() => {
                                  navigate("/ViewEmployeeDetails");
                                  sessionStorage.setItem(
                                    "employeData",
                                    JSON.stringify(i)
                                  );
                                }} className="btn btn-info">
                              <i
                                
                                className="fa fa-eye"
                              ></i></button>
                            </td>
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
  );
}
export default Home;