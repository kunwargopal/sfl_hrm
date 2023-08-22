import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";

function Home() {
  useEffect(() => {
    getEmployeeData();
  }, []);
  useEffect(() => {
    getDepartmentData();
    getDesignationData();
    getSectionData();
  }, []);
  const navigate = useNavigate();
  const [employeesList, setEmployeesList] = useState([]);
  const [employeesList1, setEmployeesList1] = useState([]);
  const [data, setData] = useState([]);
  const [section, setSection] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [search, setSearch] = useState("");

  const [departmentList, setDepartmentList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [designationList, setDesignationList] = useState([]);

  const getSectionData = () => {
    axios.get(baseUrl + "section").then((res) => setSectionList(res.data.data));
  };

  const getDepartmentData = () => {
    axios
      .get(baseUrl + "department")
      .then((res) => setDepartmentList(res.data.data));
  };

  const getDesignationData = () => {
    axios
      .get(baseUrl + "designation")
      .then((res) => setDesignationList(res.data.data));
  };

  const getEmployeeData = () => {
    axios.get(baseUrl + "employees").then((res) => {
      setEmployeesList(res.data.data);
      setEmployeesList1(res.data.data);
    });
  };
  const dltData = (x) => {
    axios.delete(baseUrl + "employees/" + x).then(() => getEmployeeData());
  };

  const list = employeesList;

  const list1 =
    section !== "" ? list.filter((i) => i.section === section) : list;
  const list2 =
    department !== ""
      ? list1.filter((i) => i.department === department)
      : list1;
  const list3 =
    designation !== ""
      ? list2.filter((i) => i.designation === designation)
      : list2;
  const list4 =
    search !== ""
      ? list3.filter((i) => i.name.toLowerCase().includes(search))
      : list3;

  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel"></h6>
              <button
                type="button"
                class="btn-primary close"
                data-dismiss="modal"
                aria-label="Close"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img style={{ height: 200 }} src={data.documentId}></img>
              <br />
              <img style={{ height: 200 }} src={data.photo}></img>
            </div>
            <div class="modal-footer"></div>
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
                      <button
                        onClick={() => navigate("/AddEmployee")}
                        className="btn btn-primary"
                      >
                        Add
                      </button>
                    </div>
                    <br />
                    <br />
                    <div className="accordion-body">
                      <div className="row g-3">
                        <div className="col-md-3">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              Section
                            </label>
                            <div className="col-sm-6">
                              <select
                                onChange={(e) => setSection(e.target.value)}
                                className="form-select"
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                {sectionList.map((i) => (
                                  <option>{i.section}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              Department
                            </label>
                            <div className="col-sm-6">
                              <select
                                onChange={(e) => setDepartment(e.target.value)}
                                placeholder="State"
                                className="form-select"
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                {departmentList
                                  .filter((j) => j.section === section)
                                  .map((i) => (
                                    <option>{i.department}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="row">
                            <label
                              className="col-sm-6 col-form-label text-sm-end"
                              htmlFor="collapsible-Mobile"
                            >
                              Designation
                            </label>
                            <div className="col-sm-6">
                              <select
                                onChange={(e) => setDesignation(e.target.value)}
                                placeholder="State"
                                className="form-select"
                              >
                                <option selected disabled>
                                  --Select--
                                </option>
                                {designationList
                                  .filter((j) => j.department === department)
                                  .map((i) => (
                                    <option>{i.designation}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
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
                          <th scope="col">Photo</th>
                          <th scope="col">Name</th>
                          <th scope="col">Number</th>
                          <th scope="col">Email</th>
                          <th scope="col">Section</th>
                          <th scope="col">Department</th>
                          <th scope="col">Designation</th>
                          {/* <th scope="col">Report To</th> */}
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
                        {list4.map((i, n) => (
                          <tr>
                            <td>{n + 1}</td>
                            <td>
                              <img
                                style={{ height: 50 }}
                                src={i.photo}
                              ></img>
                            </td>
                            <td>{i.name}</td>
                            <td>{i.number}</td>
                            <td>{i.email}</td>
                            <td>{i.section}</td>
                            <td>{i.department}</td>
                            <td>{i.designation}</td>
                            {/* <td>{i.reportTo}</td> */}
                            <td>{i.address}</td>
                            <td>{i.city}</td>
                            <td>{i.state}</td>
                            <td>{i.pinCode}</td>
                            <td>{i.aadharNo}</td>
                            <td>{i.basicSalary}</td>
                            <td>
                              <i
                                onClick={() => {
                                  localStorage.setItem(
                                    "employeData",
                                    JSON.stringify(i)
                                  );
                                  navigate("/Editemployee");
                                }}
                                className="fa fa-edit"
                              ></i>
                              &nbsp;&nbsp;
                              <i
                                onClick={() => setData(i)}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                className="fa fa-eye"
                              ></i>
                              &nbsp;&nbsp;
                              <i
                                onClick={() => dltData(i._id)}
                                className="fa fa-trash"
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
