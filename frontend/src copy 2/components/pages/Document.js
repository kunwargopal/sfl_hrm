import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { baseUrl } from './BaseUrl';

function Document() {
    useEffect(()=>{getEmployeeData()},[])
    const [employeesList,setEmployeesList]=useState([])
    const getEmployeeData = () => {
        axios.get(baseUrl + "employees").then((res) => {
          setEmployeesList(res.data.data);
        });
      };
  return (
    <div style={{width:"100%",padding:"3%"}}>
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
            <td style={{width:"6.25%", border:"1px solid black"}}>12</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>3333</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>103333</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>103333</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>103333</td>
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
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0</td>
            <td style={{width:"6.25%", border:"1px solid black"}}>0.00</td>
         
      </tr>
 )}
    </tbody>
</table>
    </div>
  )
}

export default Document