import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./BaseUrl";
import Sidebar from "../Sidebar";
import { hasPermission } from "./HashPermission";
import { json, useNavigate } from "react-router-dom";

function Document() {

  useEffect(() => {
    getEmployeeData();
    getAdvanceData();
    getDeductionData();
    getSalaryData();
    getAttendanceData();
  }, []);
  const navigate = useNavigate()

  const employeeLocalData = sessionStorage.getItem("employeeLocalData")
  const parseEmployee = employeeLocalData? JSON.parse(employeeLocalData):[]
  const [employeesList, setEmployeesList] = useState(parseEmployee);
  const getEmployeeData = () => {
    axios.get(baseUrl + "employees").then((res) => {
      setEmployeesList(res.data);
      sessionStorage.setItem("employeeLocalData", JSON.stringify(res.data))
    });
  };

  const advanceLocalData = sessionStorage.getItem("advanceLocalData")
  const parseAdvance = advanceLocalData? JSON.parse(advanceLocalData):[]

  const [advanceList, setAdvanceList] = useState(parseAdvance);


  const deducationLocalData = sessionStorage.getItem("deducationLocalData")
  const parseDeducation = deducationLocalData? JSON.parse(deducationLocalData):[]
  const [deductionList, setDeductionList] = useState(parseDeducation);


  const getAdvanceData = () => {
    axios.get(baseUrl + "advance").then((res) => {
      setAdvanceList(res.data);
      sessionStorage.setItem("advanceLocalData", JSON.stringify(res.data))

    });
  };
  const getDeductionData = () => {
    axios.get(baseUrl + "deduction").then((res) => {
      setDeductionList(res.data);
      sessionStorage.setItem("deducationLocalData", JSON.stringify(res.data))

    });
  };

  const advncAmt = (x) => {
    const list1 =
    fromDate !== ""
      ? advanceList.filter((i) => new Date(+i.date) >= new Date(fromDate))
      : advanceList;
  const list2 =
    toDate !== ""
      ? list1.filter(
          (i) => new Date(i.date - 1000 * 60 * 60 * 24) <= new Date(toDate)
        )
      : list1;
    const advnc = list2
      .filter((i) => i.empId === x)
      .map((j) => +j.advance)
      .reduce((a, b) => a + b, 0);
    return advnc;
  };

  const ddctnAmt = (x) => {
    const list1 =
    fromDate !== ""
      ? deductionList.filter((i) => new Date(+i.date) >= new Date(fromDate))
      : deductionList;
  const list2 =
    toDate !== ""
      ? list1.filter(
          (i) => new Date(i.date - 1000 * 60 * 60 * 24) <= new Date(toDate)
        )
      : list1;

    const ddctn = list2
      .filter((i) => i.empId === x)
      .map((j) => +j.amount)
      .reduce((a, b) => a + b, 0);
    return ddctn;
  };
  const paidamnt = (x) => {
    const list1 =
    fromDate !== ""
      ? salaryList.filter((i) => new Date(+i.date) >= new Date(fromDate))
      : salaryList;
  const list2 =
    toDate !== ""
      ? list1.filter(
          (i) => new Date(i.date - 1000 * 60 * 60 * 24) <= new Date(toDate)
        )
      : list1;
    const adamnt = list2
      .filter((i) => i.empId === x)
      .map((j) => +j.amount)
      .reduce((a, b) => a + b, 0);
    return adamnt;
  };

  const totalAdvance = () => {
    const ttl = advanceList.map((i) => +i.advance).reduce((a, b) => a + b, 0);
    return ttl;
  };

  const getDate1 = (x) => {
    const date = new Date(x);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    const ndd = dd < 10 ? `0${dd}` : dd;
    const nmm = mm < 10 ? `0${mm}` : mm;
    const finalDate = ndd + "/" + nmm + "/" + yy;
    return finalDate;
  };

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

  const [attList, setAttList] = useState([]);

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

  const [currMonth, setCurrMonth] = useState(month);

  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [empId, setEmpId] = useState("");

  const salaryLocalData = sessionStorage.getItem("salaryLocalData")
  const parseSalary = salaryLocalData?JSON.parse(salaryLocalData):[]
  const [salaryList, setSalaryList] = useState(parseSalary);

  const postSalaryData = () => {
    const item = {
      amount: amount,
      mode: mode,
      empId: empId,
      month: currMonth,
      year: "2023",
      date: Date.now(),
    };
    axios.post(baseUrl + "salary", item).then(() => {
      getSalaryData();
      setAmount("");
      setMode("");
    });
  };

  const totalDays = () => {
    const day = new Date(year, currMonth, 0).getDate();
    return day;
  };

  const getSalaryData = () => {
    axios.get(baseUrl + "salary").then((res) =>{ setSalaryList(res.data)
    sessionStorage.setItem("salaryLocalData" , JSON.stringify(res.data))
    });
  };

  const salList1 =
    fromDate !== ""
      ? salaryList.filter((i) => new Date(+i.inTime) >= new Date(fromDate))
      : salaryList;
  const salList2 =
    toDate !== ""
      ? salList1.filter(
          (i) => new Date(+i.inTime - 1000 * 60 * 60 * 24) <= new Date(toDate)
        )
      : salList1;

  const salaryList1 = salaryList.filter((i) => i.empId === empId);

  const deleteSalData = (x) => {
    axios.delete(baseUrl + "salary/" + x).then(() => getSalaryData());
  };

  const getDate2 = (x) => {
    const date = new Date(x);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    const ndd = dd < 10 ? `0${dd}` : dd;
    const nmm = mm < 10 ? `0${mm}` : mm;
    const finalDate = yy + "-" + nmm + "-" + ndd;
    return finalDate;
  };

  const getAttendanceData = () => {
    axios.get(baseUrl + "attendance").then((res) => setAttList(res.data));
  };

  const filtrList = (x) => {
    const date = new Date(x);
    const dd = date.getDate();
    const td = totalDays()
    
    // const currDate = Date.now()
    const list = list2.filter((i) => i.empId === x);
    const prList = list.map((i) => getDate2(+i.inTime));
    return prList;
  };

  return (
    <>
      {/* =================Modal1=============== */}
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
              <div className="container">
              <form
                id="addNewCCForm"
                className="row g-3"
                onsubmit="return false"
              >
                <div className="col-md-6">
                  <div className="row">
                    <label
                      className="col-sm-6 col-form-label text-sm-start"
                      htmlFor="collapsible-Rate"
                    >
                      Amount
                    </label>
                    <div className="col-md-6">
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount.."
                        className=" form-control"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <label
                      className="col-sm-6 col-form-label text-sm-center"
                      htmlFor="collapsible-Rate"
                    >
                      Mode
                    </label>
                    <div className="col-md-6">
                      <select
                        onChange={(e) => setMode(e.target.value)}
                        placeholder="Advance.."
                        className=" form-select"
                      >
                        <option selected disabled>
                          --Select--
                        </option>
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
                    onClick={() => postSalaryData()}
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
              <br />
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
                  {salaryList1.map((i, n) => (
                    <tr>
                      <td>{n + 1}</td>
                      <td>{getDate1(+i.date)}</td>
                      <td>{i.amount}</td>
                      <td>{i.mode}</td>
                      <td>
                        <button className="btn btn-primary">
                          <i className="fa fa-edit"></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => deleteSalData(i._id)}
                          className="btn btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
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
      {/* =================Modal1=============== */}
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
                                  htmlFor="collapsible-Mobile"
                                >
                                  Month
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    value={currMonth}
                                    className="form-control"
                                    onChange={(e) => {
                                      setCurrMonth(e.target.value);
                                      const i = e.target.value;
                                      const m = i < 10 ? `0${i}` : i;
                                      const l = new Date(year, m, 0).getDate();
                                      const date = year + "-" + m + "-" + "01";
                                      const ldate = year + "-" + m + "-" + l;
                                      setFromDate(date);
                                      setToDate(ldate);
                                    }}
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
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Year
                                </label>
                                <div className="col-sm-9">
                                  <select disabled className="form-control">
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
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
              <div className="accordion  card text-nowrap overflow-scroll">
                <table className="table tbl-scroll">
                  <thead>
                    <tr>
                      <td>SR.NO.</td>
                      <td>NAME</td>
                      <td>BASIC SALARY</td>
                      <td>OVERTIME (HOURS)</td>
                      <td>OVERTIME AMOUNT</td>
                      <td>LEAVE DAYS</td>
                      <td>LEAVE AMOUNT</td>
                      <td>OTHER DEDUCTION</td>
                      <td>NET SALARY</td>
                      <td>ADVANCE</td>
                      <td>SALARY PAYABLE</td>
                      <td>ACTION</td>
                      <td>BANK</td>
                      <td>CASH</td>
                      <td>PAID</td>
                      <td>REMAINING</td>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesList.map((i, n) => (
                      <tr>
                        <td>{n + 1}</td>
                        <td>{i.name}</td>
                        <td>{i.basicSalary}</td>
                        <td>0</td>
                        <td>0</td>
                        <td>{filtrList(i._id).length}</td>
                        <td>0</td>
                        <td>{ddctnAmt(i._id)}</td>
                        <td>{i.basicSalary - ddctnAmt(i._id)}</td>
                        <td>{advncAmt(i._id)}</td>
                        <td>
                          {i.basicSalary - (advncAmt(i._id) + ddctnAmt(i._id))}
                          &nbsp;
                        </td>
                        <td>
                          <button
                            onClick={() => setEmpId(i._id)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            className="btn btn-info"
                          >
                            Pay
                          </button>
                        </td>
                        <td>0</td>
                        <td>0</td>
                        <td>{paidamnt(i._id)}</td>
                        <td>
                          {i.basicSalary -
                            (advncAmt(i._id) +
                              ddctnAmt(i._id) +
                              paidamnt(i._id))}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td></td>
                      <td>{employeesList.map((i)=>+i.basicSalary).reduce((a,b)=>a+b,0)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <button
                  onClick={() => window.print()}
                  className="btn btn-primary"
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Document;
