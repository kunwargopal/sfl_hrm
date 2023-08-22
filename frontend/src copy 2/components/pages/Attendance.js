import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./BaseUrl";
import storage from "./Firebase";
import { ProgressBar } from "react-loader-spinner";
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
  const [postData, setPostData] = useState({});
  const [progress, setProgress] = useState(0);
  const [progress1, setProgress1] = useState(0);
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

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const finalTime = `${hour}:${minute}`;


  const Open = (x) => {

      document.getElementById(x).click();
    
  };
  const Open1 = (x) => {
    document.getElementById(x).click();
  };

  const uploadImage = (x,y) => {
    if (x !== "") {
      const uploadTask = storage.ref(`images/${x.name}`).put(x);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
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
              setProgress(0);
              postAttandance(url,y)
            });
        }
      );
    } else {
      alert("no image selected");
    }
  };
  const uploadImage1 = (x,y) => {
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
putAttandance(url,y)
            
            });
        }
      );
    } else {
      alert("no image selected");
    }
  };

  const postAttandance = (x,y) => {
    const item={
      empId:y,
      inTime:Date.now(),
      inTimePhoto:x,
    }
    axios.post(baseUrl + "attendance", item).then((res)=>axios.put(baseUrl+"employees/inout/"+y,{aid:res.data.data._id,status:"in"})).then(()=>getEmployeeData())
  };
  const putAttandance = (x,y) => {
    const item={
      outTime:Date.now(),
      outTimePhoto:x
    }
    axios.put(baseUrl + "attendance/"+y, item).then((res)=>axios.put(baseUrl+"employees/inout/"+res.data.data.empId,{aid:"",status:""})).then(()=>getEmployeeData())
  };

  return (
    <div>
    
      {progress !== 0 && (
        <div
          style={{
            zIndex: 10,
            position: "fixed",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgb(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
          {progress} %
        </div>
      )}
      {progress1 !== 0 && (
        <div
          style={{
            zIndex: 10,
            position: "fixed",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgb(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
          {progress1} %
        </div>
      )}

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
                      <button className="btn btn-primary">
                        {day}/{month}/{year}
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
                        <div className="col-md-3">
                          <button className="btn btn-danger"
                          onClick={()=>{
                            setSection("")
                            setDepartment("")
                            setDesignation("")
                            setSearch("")
                          }}>Reset</button>
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
                       
                          <th scope="col">In</th>
                          <th scope="col">Out</th>
                      
                        </tr>
                      </thead>
                      <tbody>
                        {list4.map((i, n) => (
                          <tr>
                            <td>{n + 1}</td>
                            <td>
                              <img style={{ height: 50 }} src={i.photo}></img>
                            </td>
                            <td>{i.name}</td>
                           

                         

                            <td>
                            <input
                              onChange={(e) => uploadImage(e.target.files[0],i._id)}
                              id={"in"+n}
                              style={{ display: "none" }}
                              type="file"
                            />
                              <button
                                onClick={() => {
                                  Open("in"+n);
                                }}
                                disabled={i.aid}
                                className={i.aid?"btn btn-outline-primary":"btn btn-primary"}
                              >
                               In</button>
                            </td>


                         

                   
                            <td>
                            <input
                            onChange={(e) => uploadImage1(e.target.files[0],i.aid)}
                              id={"out"+n}
                              style={{ display: "none" }}
                              type="file"
                            />
                              <button
                                onClick={() => {Open1("out"+n)}}
                              disabled={!i.aid}
                                className={!i.aid?"btn btn-outline-primary":"btn btn-primary"}
                              >
                                OUT</button>
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
