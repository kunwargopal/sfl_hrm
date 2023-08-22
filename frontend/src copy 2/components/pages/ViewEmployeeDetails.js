import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
import storage from "./Firebase";

function Home() {
  useEffect(() => {
    getAttendanceData();
  }, []);

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

  const [currMonth, setCurrMonth] = useState(month);
  const totalDays = () => {
    const day = new Date(year, currMonth, 0).getDate();
    return day;
  };
  const dayList = new Array(totalDays()).fill().map((i, n) => n + 1);

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
  const getTime = (x) => {
    const date = new Date(x);
    const hh = date.getHours();
    const mm = date.getMinutes();
    const hh1 = hh > 12 ? hh - 12 : hh;
    const nhh = hh1 < 10 ? `0${hh1}` : hh1;
    const nmm = mm < 10 ? `0${mm}` : mm;
    const AMPM = hh < 12 ? "AM" : "PM";
    const finalTime = `${nhh}:${nmm} ${AMPM}`;
    return finalTime;
  };
  const navigate = useNavigate();

  const data = localStorage.getItem("employeData");
  const employeeData = data ? JSON.parse(data) : [];
  const [postData, setPostData] = useState(employeeData);
  const [attList, setAttList] = useState([]);

  const getAttendanceData = () => {
    axios.get(baseUrl + "attendance").then((res) => setAttList(res.data.data));
  };

  const list = attList.filter((i) => i.empId === employeeData._id);

  const workingTime = (x) => {
    const wh = (x.outTime || Date.now()) - x.inTime;
    const outTime = x.tOut
      .map((i, n) => {
        const y = x.tIn[n] || x.outTime || Date.now();
        const z = y - i;
        return z;
      })
      .reduce((a, b) => a + b, 0);
    const d = 1000 * 60 * 60;
    const nwh = (wh - outTime) / d;
    const hh = Math.floor(nwh);
    const mm = Math.ceil(60 * (nwh % 1));
    return `${hh} hours ${mm} minutes`;
  };
  const workingTime1 = (x) => {
    const wh = (x.outTime || Date.now()) - x.inTime;
    const outTime = x.tOut
      .map((i, n) => {
        const y = x.tIn[n] || x.outTime || Date.now();
        const z = y - i;
        return z;
      })
      .reduce((a, b) => a + b, 0);
    const d = 1000 * 60 * 60;
    const nwh = (wh - outTime) / d;
    return +nwh;
  };

  const [fromDate, setFromDate] = useState(firstDate);
  const [toDate, setToDate] = useState(currDate);

  const list1 =
    fromDate !== ""
      ? list.filter((i) => new Date(+i.inTime) >= new Date(fromDate))
      : list;
  const list2 =
    toDate !== ""
      ? list1.filter(
          (i) => new Date(+i.inTime - 1000 * 60 * 60 * 24) <= new Date(toDate)
        )
      : list1;

  const totalWorkingHours = () => {
    const nwh = list2.map((i) => workingTime1(i)).reduce((a, b) => +a + +b, 0);
    const hh = Math.floor(nwh);
    const mm = Math.ceil(60 * (nwh % 1));
    return `${hh} hours ${mm} minutes`;
  };

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
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Name{totalDays()}
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    value={employeeData.name}
                                    placeholder="State"
                                    className="form-control"
                                  ></input>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Section
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    value={employeeData.section}
                                    placeholder="State"
                                    className="form-control"
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Department
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    value={employeeData.department}
                                    placeholder="State"
                                    className="form-control"
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Designation
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    value={employeeData.designation}
                                    placeholder="State"
                                    className="form-control"
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  From
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="date"
                                    placeholder="State"
                                    className="form-control"
                                    value={fromDate}
                                    onChange={(e) =>
                                      setFromDate(e.target.value)
                                    }
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  To
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="date"
                                    placeholder="State"
                                    className="form-control"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="accordion-body">
                          <div className="row g-3">
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Total Working Hours
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    placeholder="State"
                                    className="form-control"
                                    value={totalWorkingHours()}
                                    disabled
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-4 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Month
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    value={currMonth}
                                    className="form-control"
                                    onChange={(e) =>
                                      setCurrMonth(e.target.value)
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
                            <div className="d-flex flex-wrap my-3 ">
                            {dayList.map((i) => (
                              <button onClick={()=>{
                                const d = i<10?`0${i}`:i
                               const m = currMonth<10?`0${currMonth}`:currMonth
                               const date=year+"-"+m+"-"+d
                               setFromDate(date)
                               setToDate(date)

                              }} className="btn btn-outline-success m-1"
                              style={{width:70}}>
                                {i}
                              </button>
                            ))}
                        </div>
                         
                      </div>
                      </div>
                      <br />

                      <div className="table-responsive text-nowrap">
                        <table class="table table-striped">
                          <thead>
                            <tr className="ta ble-primary">
                              <th scope="col" style={{ color: "transparent" }}>
                                Sr No.
                              </th>
                              <th scope="col" style={{ color: "transparent" }}>
                                Name
                              </th>
                              <th scope="col" style={{ color: "transparent" }}>
                                Working Hours
                              </th>
                              <th scope="col" style={{ color: "transparent" }}>
                                View
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {" "}
                            {list2.map((i) => (
                              <>
                                <tr className="table-success">
                                  <td></td>
                                  <td style={{ fontWeight: "bold" }}>Date</td>

                                  <td style={{ fontWeight: "bold" }}>
                                    {getDate(+i.inTime)}
                                  </td>
                                  <td></td>
                                </tr>
                                <tr className="table-primary">
                                  <td style={{ fontWeight: "bold" }}>
                                    In Time
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td style={{ fontWeight: "bold" }}>
                                    {getTime(+i.inTime)}
                                  </td>
                                </tr>
                                {i.tOut?.map((j, k) => (
                                  <>
                                    <tr>
                                      <td></td>
                                      <td>out at</td>
                                      <td>{getTime(j)}</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td>in at</td>
                                      <td>
                                        {i.tIn[k] ? getTime(i.tIn[k]) : null}
                                      </td>
                                      <td></td>
                                    </tr>
                                  </>
                                ))}

                                <tr className="table-primary">
                                  <td style={{ fontWeight: "bold" }}>
                                    Out Time
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td style={{ fontWeight: "bold" }}>
                                    {i.outTime ? getTime(+i.outTime) : null}
                                  </td>
                                </tr>
                                <tr className="table-warning">
                                  <td></td>
                                  <td style={{ fontWeight: "bold" }}>
                                    working hours
                                  </td>
                                  <td style={{ fontWeight: "bold" }}>
                                    {workingTime(i)}
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td style={{ color: "transparent" }}>fdf</td>

                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <br />
                      <br />

                      <br />
                      <br />
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
