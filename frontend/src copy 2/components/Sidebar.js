import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import safallogo from "./safallogo.png"

function Sidebar() {
  const navigate=useNavigate()
  const [showDiv, setShowDiv]=useState(0)
  return (
      <aside
        id="layout-menu"
        className=" menu-vertical menu bg-menu-theme sideclass1"
        style={{ height: "100vh", position: "sticky", top: 0, width: 300 }}
      >
        <div className="pt-2 text-center">
          <img
            alt=""
            style={{ width: "80%", height: "auto" }}
            src={safallogo}
          />
        </div>

        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
            <li className="menu-item">
              <a href className="menu-link" style={{ cursor: "pointer" }}>
                <i className="menu-icon tf-icons bx bx-home-circle" />
                <div
                  
                >
                  Dashboard
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                &nbsp; &nbsp; &nbsp;
                <i
                  className="fa fa-long-arrow-left"
                />
              </a>
            </li>
     
          <div
            className="abc"
            style={{ height:showDiv==="Master"? "35vh":"7vh",transition:"0.5s", overflow: "hidden", overflowY: "scroll" , width:"100%"}}
          >
               <li onClick={()=>setShowDiv(showDiv==="Master"?"":"Master")} className="menu-header small text-uppercase">
          <span className="menu-header-text">HRM</span>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate("/EmployeeTable")} className="menu-link" style={{ cursor: "pointer" }}>
            <i class="menu-icon tf-icons bx bx-spreadsheet"></i>
            <div >Employees</div>
          </a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate("/Attendance")} className="menu-link" style={{ cursor: "pointer" }}>
            <i class="menu-icon tf-icons bx bx-spreadsheet"></i>
            <div >Attendance</div>
          </a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate("/InOut")} className="menu-link" style={{ cursor: "pointer" }}>
            <i class="menu-icon tf-icons bx bx-spreadsheet"></i>
            <div >In-Out</div>
          </a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate("/AttendanceRecord")} className="menu-link" style={{ cursor: "pointer" }}>
            <i class="menu-icon tf-icons bx bx-spreadsheet"></i>
            <div >Attendance Record</div>
          </a>
        </li>
        <li className="menu-item">
          <a onClick={() => navigate("/Document")} className="menu-link" style={{ cursor: "pointer" }}>
            <i class="menu-icon tf-icons bx bx-spreadsheet"></i>
            <div >Monthly Report</div>
          </a>
        </li>
        
           
       
          </div>
   
        </ul>
      </aside>

//       // {showSide ? (
//         <div
//           style={{
//             position: "fixed",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100vh",
//             oerflow: "hidden",
//             overflowY: "auto",
//             paddingLeft: 10,
//             zIndex: 10,
//             border: "1px solid lightgrey",
//             borderRadius: 5,
//           }}
//           className="sideclass"
//         >
//           <div style={{ padding: 5, marginLeft: -10 }}>
//             {" "}
//             <img
//               style={{ width: 200, height: "auto", marginLeft: 10 }}
//               src={safallogo}
//             />
//           </div>
//           <span
//             onClick={() => setShowSide(false)}
//             style={{
//               fontSize: 20,
//               fontWeight: "bold",
//               cursor: "pointer",
//               position: "absolute",
//               right: 15,
//               top: 10,
//             }}
//           >
//             X
//           </span>

//           <div className="menu-inner-shadow" />
//           <ul
//             className="menu-inner py-1"
//             style={{ display: "flex", flexDirection: "column" }}
//           >
//             {hasPermission("Dashboard", "view") && (<>
//               <li className="menu-item">
//                 <a href className="menu-link" style={{ cursor: "pointer" }}>
//                   <i className="menu-icon tf-icons bx bx-home-circle" />
//                   <div
//                     onClick={() => {
//                       navigate("/dashboard");
//                     }}
//                   >
//                     Dashboard
//                   </div>
//                   &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
//                   &nbsp; &nbsp; &nbsp;
//                   <i
//                     className="fa fa-long-arrow-left"
//                     onClick={() => navigate(-1)}
//                   />
//                 </a>
//               </li></>
//             )}
// <br/>

//             <div
//               className="abc"
//               style={{
//                 height: "80vh",
//                 overflow: "hidden",
//                 overflowY: "scroll",
//               }}
//             >
//               {hasPermission("PurchaseTrade", "view") ||
//               hasPermission("PurchaseTransactions", "view") ||
//               hasPermission("WheatBagTransactions", "view") ||
//               hasPermission("WheatLabReport", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() =>
//                     setShowMenu(showMenu === "Purchase" ? "" : "Purchase")
//                   }
//                 >
//                   <span className="menu-header-text">Purchase</span>
//                   {showMenu !== "Purchase" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "Purchase"
//                       ? (hasPermission("PurchaseTrade", "view") ? 3 : 0) +
//                         (hasPermission("PurchaseTransactions", "view")
//                           ? 3
//                           : 0) +
//                         (hasPermission("WheatBagTransactions", "view")
//                           ? 3
//                           : 0) +
//                         (hasPermission("WheatLabReport", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("PurchaseTrade", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/PurchaseRegistration")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Purchase Trade</div>
//                     </a>
//                   </li><br /></>
//                 )}
                
//                 {hasPermission("PurchaseTransactions", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/TradePurchasesTransacrtions")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Purchases Transactions</div>
//                     </a>
//                   </li> <br /></>
//                 )}
               

//                 {hasPermission("WheatBagTransactions", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/PurchaseTransactionLabReport1")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Wheat Bag Transactions</div>
//                     </a>
//                     </li> <br /></>
                  
//                 )}
                
//                 {hasPermission("WheatLabReport", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/PurchaseTransactionLabReport")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Wheat Lab Report</div>
//                     </a>
//                    </li> <br /></>
//                 )}
                
//               </div>
//               {hasPermission("SalesTrade", "view") ||
//               hasPermission("SalesTransactions", "view") ||
//               hasPermission("AverageRate", "view") ||
//               hasPermission("VehicleRecord", "view") ||
//               hasPermission("TransportTransactions", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() => setShowMenu(showMenu === "Sale" ? "" : "Sale")}
//                 >
//                   <span className="menu-header-text">Sale</span>
//                   {showMenu !== "Sale" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "Sale"
//                       ? (hasPermission("SalesTrade", "view") ? 3 : 0) +
//                         (hasPermission("SalesTransactions", "view") ? 3 : 0) +
//                         (hasPermission("AverageRate", "view") ? 3 : 0) +
//                         (hasPermission("VehicleRecord", "view") ? 3 : 0) +
//                         (hasPermission("TransportTransactions", "view")
//                           ? 3
//                           : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("SalesTrade", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/SaleRegistration")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Sale Trade</div>
//                     </a>
//                   </li>
//                   <br /></>
//                 )}
//                 {hasPermission("SalesTransactions", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/TradeSalesTransacrtions")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Sales Transactions</div>
//                     </a>
//                   </li>
//                   <br /></>
//                 )}
               

//                 {hasPermission("AverageRate", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/AverageRate")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Average Rate</div>
//                     </a>
//                   </li>
//                   <br /></>
//                 )}
             
//                 {hasPermission("VehicleRecord", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/TransportRegistration")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Vehicle Record</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("TransportTransactions", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/AllTransportTransacrtions")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Transport Transactions</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>

//               {hasPermission("Office", "view") ||
//               hasPermission("In", "view") ||
//               hasPermission("Out", "view") ||
//               hasPermission("Visitor", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() =>
//                     setShowMenu(showMenu === "inout" ? "" : "inout")
//                   }
//                 >
//                   <span className="menu-header-text">In-Out</span>
//                   <i class="fa fa-caret-right"></i>
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "inout"
//                       ? (hasPermission("Office", "view") ? 3 : 0) +
//                         (hasPermission("In", "view") ? 3 : 0) +
//                         (hasPermission("Out", "view") ? 3 : 0) +
//                         (hasPermission("Visitor", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("Office", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Inout")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Office</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("In", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Inout1")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>In</div>
//                     </a>
//                   </li><br /></>
//                 )}


//                 {hasPermission("Out", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Inout2")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Out</div>
//                     </a>
//                   </li><br /></>
//                 )}


//                 {hasPermission("Visitor", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/VisitorCheack")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Visitor</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>

//               {hasPermission("AttaTest", "view") ||
//               hasPermission("MaidaTest", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() => setShowMenu(showMenu === "lab" ? "" : "lab")}
//                 >
//                   <span className="menu-header-text">Lab</span>
//                   {showMenu !== "lab" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "lab"
//                       ? (hasPermission("AttaTest", "view") ? 3 : 0) +
//                         (hasPermission("MaidaTest", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("AttaTest", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/AttaLabRegistration")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Atta Test</div>
//                     </a>
//                   </li><br /></>
//                 )}


//                 {hasPermission("MaidaTest", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/MaidaLabRegistration")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Maida Test</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>
//               {hasPermission("MaidaProduction", "view") ||
//               hasPermission("MaidaProductionReport", "view") ||
//               hasPermission("Stock", "view") ||
//               hasPermission("StockReport", "view") ||
//               hasPermission("OrderReport", "view") ||
//               hasPermission("UnloadingSupervisor", "view") ||
//               hasPermission("Order", "view") ||
//               hasPermission("DispatchSummary", "view") ||
//               hasPermission("UnloadingSummary", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() =>
//                     setShowMenu(showMenu === "production" ? "" : "production")
//                   }
//                 >
//                   <span className="menu-header-text">
//                     Production & Dispatch
//                   </span>
//                   {showMenu !== "production" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "production"
//                       ? (hasPermission("MaidaProduction", "view") ? 3 : 0) +
//                         (hasPermission("MaidaProductionReport", "view")
//                           ? 3
//                           : 0) +
//                         (hasPermission("Stock", "view") ? 3 : 0) +
//                         (hasPermission("StockReport", "view") ? 3 : 0) +
//                         (hasPermission("OrderReport", "view") ? 3 : 0) +
//                         (hasPermission("Order", "view") ? 3 : 0) +
//                         (hasPermission("UnloadingSupervisor", "view") ? 3 : 0) +
//                         (hasPermission("DispatchSummary", "view") ? 3 : 0) +
//                         (hasPermission("UnloadingSummary", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("MaidaProduction", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Production")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Maida Production</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("MaidaProductionReport", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/ProductionReport")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Maida Production Report</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Stock", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Stock")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Stock</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("StockReport", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/StockReport")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Stock Report</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Order", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Order")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Order</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("UnloadingSupervisor", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/UnloadingSupervisor")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Unloading</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("UnloadingSummary", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/UnloadingSummary")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Unloading Summary</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("OrderReport", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/OrderReport")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Loading</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("DispatchSummary", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/PktSaleReport")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Loading Summary</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>

//               {hasPermission("WheatBagStock", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() => setShowMenu(showMenu === "bag" ? "" : "bag")}
//                 >
//                   <span className="menu-header-text">Bag Management</span>
//                   {showMenu !== "bag" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height: showMenu === "bag" ? "3rem" : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("WheatBagStock", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Bag")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>Wheat Bag Stock</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>

//               {hasPermission("MeterReading", "view") ||
//               hasPermission("WheatTank", "view") ||
//               hasPermission("Mill", "view") ||
//               hasPermission("Pesa", "view") ? (<>
//                 <li
//                   onClick={() =>
//                     setShowMenu(showMenu === "Report" ? "" : "Report")
//                   }
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <span className="menu-header-text">Mill Record</span>
//                   {showMenu !== "Report" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "Report"
//                       ? (hasPermission("MeterReading", "view") ? 3 : 0) +
//                         (hasPermission("WheatTank", "view") ? 3 : 0) +
//                         (hasPermission("Mill", "view") ? 3 : 0) +
//                         (hasPermission("Pesa", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("MeterReading", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/MeterReading")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Meter Reading</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("WheatTank", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/WheatTank")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Wheat Tank</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Mill", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Mill")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Mill</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Pesa", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Pesa")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Pesa</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>

//               {hasPermission("Department", "view") ||
//               hasPermission("UserRegistration", "view") ||
//               hasPermission("Logs", "view") ? (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{
//                     cursor: "pointer",
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                   onClick={() =>
//                     setShowMenu(showMenu === "usermanage" ? "" : "usermanage")
//                   }
//                 >
//                   <span className="menu-header-text">User Management</span>
//                   {showMenu !== "usermanage" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}


//               <div
//                 style={{
//                   height:
//                     showMenu === "usermanage"
//                       ? (hasPermission("Department", "view") ? 3 : 0) +
//                         (hasPermission("UserRegistration", "view") ? 3 : 0) +
//                         (hasPermission("Logs", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("Department", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/RoleTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Department</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("UserRegistration", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/UserTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>User Registration</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Logs", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/Logs")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i className="menu-icon tf-icons bx bx-check-shield" />
//                       <div>Logs</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>
//               {hasPermission("Party", "view") ||
//               hasPermission("Broker", "view") ||
//               hasPermission("Transporter", "view") ||
//               hasPermission("Location", "view") ||
//               hasPermission("LabIncharge", "view") ||
//               hasPermission("ItemType", "view") ||
//               hasPermission("ProductionItem", "view") ||
//               hasPermission("CheackList", "view") ? (<>
//                 <li
//                   onClick={() =>
//                     setShowMenu(showMenu === "Master" ? "" : "Master")
//                   }
//                   className="menu-header small text-uppercase"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <span className="menu-header-text">Master</span>
//                   {showMenu !== "Master" ? (
//                     <i class="fa fa-caret-right"></i>
//                   ) : (
//                     <i class="fa fa-caret-down"></i>
//                   )}
//                 </li><br /></>
//               ) : null}

//               <div
//                 style={{
//                   height:
//                     showMenu === "Master"
//                       ? (hasPermission("Party", "view") ? 3 : 0) +
//                         (hasPermission("Broker", "view") ? 3 : 0) +
//                         (hasPermission("Transporter", "view") ? 3 : 0) +
//                         (hasPermission("Location", "view") ? 3 : 0) +
//                         (hasPermission("LabIncharge", "view") ? 3 : 0) +
//                         (hasPermission("ItemType", "view") ? 3 : 0) +
//                         (hasPermission("ProductionItem", "view") ? 3 : 0) +
//                         (hasPermission("CheackList", "view") ? 3 : 0) +
//                         "rem"
//                       : "0rem",
//                   transition: "0.6s",
//                   overflow: "hidden",
//                 }}
//               >
//                 {hasPermission("Party", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/SaleVendorTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Party</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Broker", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/BrokerTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Broker</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Location", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/LocationTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Location</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("Transporter", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/TransportVendorTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Transporter</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("LabIncharge", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/LabInchargeTable")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Lab Incharge</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("ItemType", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/item")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Item Type</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("ProductionItem", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/PacketSize")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Production Item</div>
//                     </a>
//                   </li><br /></>
//                 )}

//                 {hasPermission("CheackList", "view") && (<>
//                   <li className="menu-item">
//                     <a
//                       href
//                       onClick={() => navigate("/CheckList")}
//                       className="menu-link"
//                       style={{ cursor: "pointer" }}
//                     >
//                       &nbsp;&nbsp;&nbsp;
//                       <i class="menu-icon tf-icons bx bx-check-shield"></i>
//                       <div>&nbsp;&nbsp;Check List</div>
//                     </a>
//                   </li><br /></>
//                 )}

//               </div>
//               {hasPermission("Backup", "view") && (<>
//                 <li
//                   className="menu-header small text-uppercase"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => exportData()}
//                 >
//                   <span className="menu-header-text">Backup</span>
//                 </li><br /></>
//               )}


//               <li
//                 className="menu-header small text-uppercase"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   localStorage.removeItem("user");
//                   navigate("/");
//                 }}
//               >
//                 <span className="menu-header-text">Logout</span>
//               </li>
//             </div>
//           </ul>
//         </div>
//       ) : (
//         <div
//           style={{
//             width: 30,
//             height: 30,
//             margin: 15,
//             marginLeft: 20,
//             position: "fixed",
//             zIndex: 1100,
//             cursor: "pointer",
//             padding: 7.5,
//           }}
//           className="sideclass card"
//           onClick={() => setShowSide(true)}
//         >
//           <i
//             className="fa fa-bars"
//             style={{ position: "fixed", zIndex: 1100, cursor: "pointer" }}
//           />
//         </div>
//       )}
 
  );
}

export default Sidebar;
