import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
function Home() {
  useEffect(() => {
    getEmployeeData();
    getAttendanceData();
  }, []);

  const navigate = useNavigate();
  const [employeesList, setEmployeesList] = useState([]);
  const [employeesList1, setEmployeesList1] = useState([]);
  const [search, setSearch] = useState("");


  const getEmployeeData = () => {
    axios.get(baseUrl + "employees").then((res) => {
      setEmployeesList(res.data.data);
      setEmployeesList1(res.data.data);
    });
  };
  const [attList, setAttList] = useState([]);
  const getAttendanceData = () => {
    axios.get(baseUrl + "attendance").then((res) => setAttList(res.data.data));
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

  const totalWorkingHours = (x) => {
    const nwh = list2
      .filter((i) => i.empId === x)
      .map((i) => workingTime1(i))
      .reduce((a, b) => +a + +b, 0);
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

  const salary = (x) => {
    const totalHours = totalWorkingHours1(x._id);
    const d =
      x.salaryType === "Monthly" ? 30 : x.salaryType === "Weekly" ? 7 : 1;
    const pds = x.basicSalary / (d * 12);
    const total = Math.floor(totalHours * pds);
    return total;
  };

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
                      <button className="btn btn-primary">
                        {day}/{month}/{year}
                      </button>
                    </div>
                    <br />
                    <br />
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
                                value={fromDate}
                                type="date"
                                onChange={(e) => setFromDate(e.target.value)}
                                className="form-select"
                              ></input>
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
                          <th scope="col">Est. Salary</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list4.map((i, n) => (
                          <tr>
                            <td>{n + 1}</td>

                            <td>{i.name}</td>
                            <td>{i.basicSalary}</td>
                            <td>{totalWorkingHours(i._id)}</td>
                            <td>{salary(i)}</td>

                            <td>
                              <i
                                onClick={() => {
                                  navigate("/ViewEmployeeDetails");
                                  localStorage.setItem(
                                    "employeData",
                                    JSON.stringify(i)
                                  );
                                }}
                                className="fa fa-eye"
                              ></i>
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
