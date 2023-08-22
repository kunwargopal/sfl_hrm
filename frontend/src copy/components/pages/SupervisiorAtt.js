import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
function Home() {
  useEffect(() => {
    getData();
    presentGetData();
  }, []);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [attList, setattList] = useState([]);
  const getData = () => {
    axios.get(baseUrl + "supervisior").then((res) => setList(res.data.data));
  };

  const presentGetData = () => {
    axios
      .get(baseUrl + "supervisioratt")
      .then((res) => setattList(res.data.data));
  };

  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth();
  const year = current.getFullYear();
  const day = current.getDay();

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

  const PresentPost = (x) => {
    const item = {
      supervisiorName: x.supervisiorName,
      number: x.number,
      salary: x.basicSalary,
      date: date,
      month: month + 1,
      year: year,
      fullMonth: monthList[month],
      status: "Present",
    };
    axios.post(baseUrl + "supervisioratt", item).then(() => presentGetData());
  };
  const AbsentPost = (x) => {
    const item = {
      supervisiorName: x.supervisiorName,
      number: x.number,
      salary: x.basicSalary,
      date: date,
      month: month + 1,
      year: year,
      fullMonth: monthList[month],
      status: "Absent",
    };
    axios.post(baseUrl + "supervisioratt", item).then(() => presentGetData());
  };
  const HalfDayPost = (x) => {
    const item = {
      supervisiorName: x.supervisiorName,
      number: x.number,
      salary: x.basicSalary,
      date: date,
      month: month + 1,
      year: year,
      fullMonth: monthList[month],
      status: "Halfday",
    };
    axios.post(baseUrl + "supervisioratt", item).then(() => presentGetData());
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
                      <button
                        onClick={() => navigate("/Addsupervisior")}
                        className="btn btn-primary"
                      >
                        {date}/{month}/{year}
                      </button>
                    </div>
                    <br />
                    <br />
                    <div className="table-responsive text-nowrap">
                      <table
                        class="table table-striped"
                        style={{ textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Present</th>
                            <th scope="col">Absent</th>
                            <th scope="col">HalfDay</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((i, n) => (
                            <tr>
                              <td>{n + 1}</td>
                              <td>{i.supervisiorName}</td>
                              <td>{i.number}</td>
                              <td>{i.email}</td>
                              <td>
                                <input
                                  onClick={() => {
                                    if (
                                      attList.filter(
                                        (j) =>
                                          (j.supervisiorName ===
                                            i.supervisiorName) &
                                          (j.date == date) &
                                         
                                          (j.month == month + 1)
                                      ).length === 0
                                    ) {
                                      PresentPost(i);
                                    }
                                  }}
                                  checked={
                                    attList.filter(
                                      (j) =>
                                        (j.supervisiorName ===
                                          i.supervisiorName) &
                                        (j.date == date) &
                                  
                                        (j.month == month + 1)
                                    )[0]?.status === "Present"
                                  }
                                  type="checkbox"
                                />
                              </td>
                              <td>
                                <input
                                  onClick={() => {
                                    if (
                                      attList.filter(
                                        (j) =>
                                          (j.supervisiorName ===
                                            i.supervisiorName) &
                                          (j.date == date) &
                                         
                                          (j.month == month + 1)
                                      ).length === 0
                                    ) {
                                      AbsentPost(i);
                                    }
                                  }}
                                  checked={
                                    attList.filter(
                                      (j) =>
                                        (j.supervisiorName ===
                                          i.supervisiorName) &
                                        (j.date == date) &
                                       
                                        (j.month == month + 1)
                                    )[0]?.status === "Absent"
                                  }
                                  type="checkbox"
                                />
                              </td>
                              <td>
                                <input
                                  onClick={() => {
                                    if (
                                      attList.filter(
                                        (j) =>
                                          (j.supervisiorName ===
                                            i.supervisiorName) &
                                          (j.date == date) &
                                          (j.month == month + 1)
                                      ).length === 0
                                    ) {
                                      HalfDayPost(i);
                                    }
                                  }}
                                  checked={
                                    attList.filter(
                                      (j) =>
                                        (j.supervisiorName ===
                                          i.supervisiorName) &
                                        (j.date == date) &
                                        (j.month == month + 1)
                                    )[0]?.status === "Halfday"
                                  }
                                  type="checkbox"
                                />
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
    </div>
  );
}
export default Home;
