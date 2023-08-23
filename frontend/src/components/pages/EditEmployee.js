import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
import storage from "./Firebase";
import Statecity from "./State-City.json";
import State from "./state.json";
import { hasPermission } from "./HashPermission";

function Home() {

  useEffect(() => {
    getDepartmentData();
    getDesignationData();
  }, []);
  const navigate = useNavigate();
  const data = sessionStorage.getItem("employeData");
  const employeeData = data ? JSON.parse(data) : {};
  const [postData, setPostData] = useState(employeeData);

  const departmentLocalData =sessionStorage.getItem("departmentLocalData")
  const parseDepartment =departmentLocalData? JSON.parse(departmentLocalData):[]

  const [departmentList, setDepartmentList] = useState(parseDepartment);

  const designationLocalData= sessionStorage.getItem("designationLocalData")
  const parseDesignation =designationLocalData? JSON.parse(designationLocalData):[]
  const [designationList, setDesignationList] = useState(parseDesignation);
  const [departmentData, setDepartmentData] = useState({});
  const [designationData, setDesignationData] = useState({});

  const postDepartmentData = () => {
    axios.post(baseUrl + "department", departmentData).then(() => {
      getDepartmentData();
      setDepartmentData({})
    });
  };

  const editDepartment = () => {
    axios.patch(baseUrl + "department/" + departmentData.id, departmentData).then(() => {
      getDepartmentData();
      setDepartmentData({})
    });
  };
  const getDepartmentData = () => {
    axios
      .get(baseUrl + "department")
      .then((res) =>{ setDepartmentList(res.data)
      sessionStorage.setItem("departmentLocalData", JSON.stringify(res.data))
      });
  };
  const dltDepartmentData = (x) => {
    axios.delete(baseUrl + "department/" + x).then(() => getDepartmentData());
  };
  const postDesignationData = () => {
    axios
      .post(baseUrl + "designation", designationData)
      .then(() => {
        getDesignationData()
        setDesignationData({})
      });
  };
  const getDesignationData = () => {
    axios
      .get(baseUrl + "designation")
      .then((res) =>{ setDesignationList(res.data)
        sessionStorage.setItem("designationLocalData", JSON.stringify(res.data))
      });
  };
  const editDesignation = () => {
    axios.patch(baseUrl + "designation/" + designationData.id, designationData).then(() => {
      getDesignationData();
      setDesignationData({})
    });
  };
  const dltDesignationData = (x) => {
    axios.delete(baseUrl + "designation/" + x).then(() => getDesignationData());
  };
  const postEmployeesData = () => {
    axios.patch(baseUrl + "employees/"+postData.id, postData).then(()=>{
      navigate("/EmployeeTable");
    })
  };

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

              setPostData({ ...postData, documentId: url });
            });
        }
      );
    } else {
      alert("no image selected");
    }
  };

  const uploadImage1 = (x) => {
    if (x !== "") {
      const uploadTask = storage.ref(`images/${x.name}`).put(x);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress2(
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

              setPostData({ ...postData, photo: url });
            });
        }
      );
    } else {
      alert("no image selected");
    }
  };
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const getDeparmentName=(x)=>{
    const currDep = departmentList.filter((i)=>i.id===x)
    const name = currDep.length?currDep[0].department:""
    return name
  }
  return (
    <div>
      {/* <!-- Modal2 --> */}
      <div
        class="modal fade"
        id="exampleModal1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ paddingRight: 10 }}>
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel"></h6>
              <button
                type="button"
                class="btn-primary close"
                data-dismiss="modal"
                aria-label="Close"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
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
              <div className="container">
                <div
                  id="addNewCCForm"
                  className="row g-3"
                  onsubmit="return false"
                >
                  <div className="col-md-6">
                    <div className="row">
                      <label
                        className="col-sm-3 col-form-label text-sm-end"
                        htmlFor="collapsible-Rate"
                      >
                        Department
                      </label>
                      <div className="col-md-9">
                        <input
                          value={departmentData.department||""}
                          placeholder="Department"
                          onChange={(e) =>
                            setDepartmentData({
                              ...departmentData,
                              department: e.target.value,
                            })
                          }
                          className=" form-control"
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    {!departmentData.id ? (
                      <button
                        type="submit"
                        aria-label="Close"
                        onClick={() => postDepartmentData()}
                        className="btn btn-primary me-sm-3 me-1 mt-3"
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        aria-label="Close"
                        onClick={() => {
                          editDepartment();
                       
                        }}
                        className="btn btn-primary me-sm-3 me-1 mt-3"
                        data-bs-dismiss="modal"
                      >
                        Update
                      </button>
                    )}
                    <button
                      type="reset"
                      className="btn btn-label-secondary btn-reset mt-3"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <br />
              <div className="container-fluid overflow-scroll">
                <table class="table table-striped text-center">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>

                      <th scope="col">Department</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentList.map((i, n) => (
                      <tr>
                        <td>{n + 1}</td>
                       
                        <td>{i.department}</td>
                        <td>
                          <i
                            onClick={() => setDepartmentData(i)}
                            className="fa fa-edit"
                          ></i>
                          &nbsp;&nbsp;
                          <i
                            onClick={() => {
                              if (window.confirm("are you sure")) {
                                dltDepartmentData(i.id);
                              }
                            }}
                            className="fa fa-trash"
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
      {/* =====================Modal Close============ */}

      {/* <!-- Modal3 --> */}
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ paddingRight: 10 }}>
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel2"></h6>
              <button
                type="button"
                class="btn-primary close"
                data-dismiss="modal"
                aria-label="Close"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
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
              <div className="container">
                <div
                  id="addNewCCForm"
                  className="row g-3"
                  onsubmit="return false"
                >
                  <div className="col-md-6">
                    <div className="row">
                      <label
                        className="col-sm-4 col-form-label text-sm-end"
                        htmlFor="collapsible-Rate"
                      >
                        Department
                      </label>
                      <div className="col-md-8">
                        <select
                           value={designationData.department||""}
                          onChange={(e) =>
                            setDesignationData({
                              ...designationData,
                              department: e.target.value,
                            })
                          }
                          className=" form-select"
                        >
                          <option selected disabled value={""}>
                            --Select--
                          </option>
                          {departmentList
                           
                            .map((i) => (
                              <option value={i.id}>{i.department}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <label
                        className="col-sm-4 col-form-label text-sm-end"
                        htmlFor="collapsible-Rate"
                      >
                        Designation
                      </label>
                      <div className="col-md-8">
                        <input
                          value={designationData.designation||""}
                          placeholder="Designation"
                          onChange={(e) =>
                            setDesignationData({
                              ...designationData,
                              designation: e.target.value,
                            })
                          }
                          className=" form-control"
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    {!designationData.id ? (
                      <button
                        type="submit"
                        aria-label="Close"
                        onClick={() => postDesignationData()}
                        className="btn btn-primary me-sm-3 me-1 mt-3"
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        aria-label="Close"
                        onClick={() => editDesignation()}
                        className="btn btn-primary me-sm-3 me-1 mt-3"
                        data-bs-dismiss="modal"
                      >
                        Update
                      </button>
                    )}
                    <button
                      type="reset"
                      className="btn btn-label-secondary btn-reset mt-3"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <br />
              <div className="container-fluid overflow-scroll">
                <table class="table table-striped text-center">
                  <thead>
                    <tr>
                      <th scope="col">Sr No.</th>

                      <th scope="col">Department</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designationList.map((i, n) => (
                      <tr>
                        <td>{n + 1}</td>
                      
                        <td>{getDeparmentName(i.department)}</td>
                        <td>{i.designation}</td>
                        <td>
                          <i
                            onClick={() => setDesignationData(i)}
                            className="fa fa-edit"
                          ></i>
                          &nbsp;&nbsp;
                          <i
                            onClick={() => {
                              if (window.confirm("are you sure?")) {
                                dltDesignationData(i.id);
                              }
                            }}
                            className="fa fa-trash"
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                                  className="col-sm-6 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  <span
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal1"
                                    style={{
                                      fontSize: 17,
                                      fontWeight: "bold",
                                      color: "green",
                                    }}
                                  >
                                    +
                                  </span>
                                  Department
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    value={postData.department}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        department: e.target.value,
                                      })
                                    }
                                    placeholder="State"
                                    className="form-select"
                                  >
                                    <option selected disabled>
                                      --Select--
                                    </option>
                                    {departmentList
                                   
                                      .map((i) => (
                                        <option value={i.id}>{i.department}</option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-6 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  <span
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal2"
                                    style={{
                                      fontSize: 17,
                                      fontWeight: "bold",
                                      color: "green",
                                    }}
                                  >
                                    +
                                  </span>
                                  Designation
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    value={postData.designation}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        designation: e.target.value,
                                      })
                                    }
                                    placeholder="State"
                                    className="form-select"
                                  >
                                    <option selected disabled>
                                      --Select--
                                    </option>
                                    {designationList
                                      .filter(
                                        (j) =>
                                          j.department === postData.department
                                      )
                                      .map((i) => (
                                        <option value={i.id}>{i.designation}</option>
                                      ))}
                                  </select>
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
                                  Full Name
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    value={postData.name}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        name: e.target.value,
                                      })
                                    }
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
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        number: e.target.value,
                                      })
                                    }
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
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        email: e.target.value,
                                      })
                                    }
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
                                  Aadhar Card No.
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    value={postData.aadharNo}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        aadharNo: e.target.value,
                                      })
                                    }
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
                                  Basic Salary
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    value={postData.basicSalary}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        basicSalary: e.target.value,
                                      })
                                    }
                                    placeholder="Basic Salary"
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
                                  Salary Type
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    value={postData.salaryType}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        salaryType: e.target.value,
                                      })
                                    }
                                    placeholder="Basic Salary"
                                    className="form-control"
                                  >
                                    <option disabled selected>
                                      --Select--
                                    </option>
                                    <option>Monthly</option>
                                    <option>Weekly</option>
                                    <option>Per Day</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Document Id
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    onChange={(e) =>
                                      uploadImage(e.target.files[0])
                                    }
                                    type="file"
                                    placeholder="Aadhar Card"
                                    className="form-control"
                                  />
                                  <div
                                    style={{
                                      height: 3,
                                      width: "100%",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: 3,
                                        width: `${progress1}%`,
                                        backgroundColor: "green",
                                      }}
                                    ></div>
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
                                  Photo
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    onChange={(e) =>
                                      uploadImage1(e.target.files[0])
                                    }
                                    type="file"
                                    className="form-control"
                                  />
                                  <div
                                    style={{
                                      height: 3,
                                      width: "100%",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <div
                                      style={{
                                        height: 3,
                                        width: `${progress2}%`,
                                        backgroundColor: "green",
                                      }}
                                    ></div>
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
                                  Address
                                </label>
                                <div className="col-sm-9">
                                  <textarea
                                    value={postData.address}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        address: e.target.value,
                                      })
                                    }
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
                                  State
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    value={postData.state}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        state: e.target.value,
                                      })
                                    }
                                    className="form-select"
                                  >
                                    <option selected disabled>
                                      --Select--
                                    </option>
                                    {State.map((i) => (
                                      <option>{i}</option>
                                    ))}
                                  </select>
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
                                  <select
                                    value={postData.city}
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        city: e.target.value,
                                      })
                                    }
                                    placeholder="City"
                                    className="form-select"
                                  >
                                    <option selected disabled>
                                      --Select--
                                    </option>
                                    {Statecity.filter(
                                      (j) => j.state === postData.state
                                    ).map((i) => (
                                      <option>{i.name}</option>
                                    ))}
                                  </select>
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
                                    onChange={(e) =>
                                      setPostData({
                                        ...postData,
                                        pinCode: e.target.value,
                                      })
                                    }
                                    placeholder="Pin Code"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <button
                              disabled={progress1 !== 0}
                              onClick={() => {
                                postEmployeesData()
                              
                              }}
                              type="submit"
                              className="btn btn-primary me-sm-3 me-1"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                navigate("/EmployeeTable");
                              }}
                              type="submit"
                              className="btn btn-label-secondary btn-reset"
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
