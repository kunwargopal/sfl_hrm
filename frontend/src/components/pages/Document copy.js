import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from './BaseUrl';

function Document() {
    useEffect(()=>{getEmployeeData();getAdvanceData()},[])
    const [employeesList,setEmployeesList]=useState([])
    const getEmployeeData = () => {
        axios.get(baseUrl + "employees").then((res) => {
          setEmployeesList(res.data.data);
        });
      };


        const [advanceList, setAdvanceList]=useState([])
  const getAdvanceData=()=>{
    axios.get(baseUrl+"advance").then((res)=>{setAdvanceList(res.data.data)
    })
  }

  const advncAmt=(x)=>{
    const advnc= advanceList.filter((i)=>i.empId===x).map((j)=>+j.advance).reduce((a,b)=>a+b,0)
    return advnc
  }

  const totalAdvance=()=>{
    const ttl= advanceList.map((i)=>+i.advance).reduce((a,b)=>a+b,0)
    return ttl
  }

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

  const [currMonth, setCurrMonth] = useState(month);


  return (
    <div style={{width:"100%",padding:"3%"}}>
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
                            <div className="col-md-6">
                              <div className="row">
                                <label
                                  className="col-sm-3 col-form-label text-sm-end"
                                  htmlFor="collapsible-Mobile"
                                >
                                  Year
                                </label>
                                <div className="col-sm-9">
                                <select
                                disabled
                                   className="form-control"
                                  >
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
                  </div><br />
             <div style={{width:"100%", height:40, border:"1px solid black", display:"flex", justifyContent:"center", alignItems:"center", borderBottom:"none"}}>
            MONTH : MAY 2023
        </div>
   <table>
    <thead>
   
    </thead>
    <tbody style={{textAlign:"center"}}>
        <tr>
            <td style={{width:"6.25%", border:"1px solid black"}}>TOTAL</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>{employeesList.map((j)=>+j.basicSalary).reduce((a,b)=>a+b,0)}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>{totalAdvance()}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
        
        </tr>
        <tr>
            <td style={{width:"6.25%", border:"1px solid black"}}>SR.NO.</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>NAME</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>BASIC SALARY</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>OVERTIME (HOURS)</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>OVERTIME AMOUNT</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>LEAVE DAYS</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>LEAVE AMOUNT</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>OTHER DEDUCTION</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>NET SALARY</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>ADVANCE</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>SALARY PAYABLE</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>BANK</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>CASH</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>BAL.</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>ADVANCE</td>
       
        </tr>
        {employeesList.map((i,n)=>
        <tr>
            <td style={{width:"6.25%", border:"1px solid black"}}>{n+1}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>{i.name}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>{i.basicSalary}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>{advncAmt(i._id)}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>{(i.basicSalary)-(advncAmt(i._id))}</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0.00</td>
         
      </tr>
 )}
    </tbody>
</table>
<div style={{height:50,width:"100%", justifyContent:"center", alignItems:"center", display:"flex"}}>
<button onClick={()=>window.print()} className='btn btn-primary'>Print</button>
</div>


    </div>
  )
}

export default Document