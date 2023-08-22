import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import axios from "axios";

const SaleVendorTable = () => {
  const [allSale, setAllSale] = useState([]);
  const [allSale1, setAllSale1] = useState([]);
  const [itemtype, setitemtype] = useState([]);
  const getDataFn = () => {
    axios.get("https://test.ajiosys.in/api/sale").then((res) => {
      setAllSale(res.data.data);
      setAllSale1(res.data.data);
    });
  };
  useEffect(() => {
    getDataFn();
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://test.ajiosys.in/api/itemtype")
      .then((res) => setItemData(res.data.data));
  };
  const [itemData, setItemData] = useState([]);
  const rateXqty = (x, y) => {
    const list = x.filter((i) => i.type === y);
    const rqlist = list.length > 0 ? list.map((i) => +i.rate * +i.quantity) : 0;
    const totalrq = rqlist !== 0 ? rqlist.reduce((a, b) => +a + +b) : 0;
    return totalrq;
  };
  const millrateXqty = (x, y,z) => {
    const list = x.filter((i) => i.type === y);
    const rqlist =
      list.length > 0 ? list.map((i) => (i.rate - z) * i.quantity) : 0;
    const totalrq = rqlist !== 0 ? rqlist.reduce((a, b) => a + b) : 0;
    return totalrq;

  };
  const qty = (x, y) => {
    const list = x.filter((i) => i.type === y);
    const rqlist = list.length > 0 ? list.map((i) => +i.quantity) : 0;
    const totalrq = rqlist !== 0 ? rqlist.reduce((a, b) => +a + +b) : 0;
    return totalrq;
  };
  const avgrate = (y) => {
    const rXqList = allSale.map((i) => rateXqty(i.itemList, y));
    const qList = allSale.map((i) => qty(i.itemList, y));
    const totalrXq = rXqList.length > 0 ? rXqList.reduce((a, b) => +a + +b) : 0;
    const totalq = qList.length > 0 ? qList.reduce((a, b) => +a + +b) : 0;
    const avg = totalrXq / totalq;
    return avg.toFixed(2);
  };
  const avgmillrate = (y) => {
    const rXqList = allSale.map((i) =>  millrateXqty(i.itemList, y,i.freight));
    const qList = allSale.map((i) => qty(i.itemList, y));
    const totalrXq = rXqList.length > 0 ? rXqList.reduce((a, b) => a + b) : 0;
    const totalq = qList.length > 0 ? qList.reduce((a, b) => a + b) : 0;
    const avg = totalrXq / totalq;
    return avg.toFixed(2);
  };
  useEffect(()=>{
    getbroker()
    getparty()
    getitem()
  },[])
  const [broker,setBroker] = useState([])
  const [broker1,setBroker1] = useState([])
  const getbroker =()=>{
    axios.get("https://test.ajiosys.in/api/broker")
    .then((res) => {setBroker(res.data.data);setBroker1(res.data.data)})
  }
  const [party,setParty] = useState([])
  const [party1,setParty1] = useState([])
  const getparty =()=>{
    axios.get("https://test.ajiosys.in/api/party")
    .then((res) => {setParty(res.data.data);setParty1(res.data.data)})
  }
  const [item,setItem] = useState([])
  const [item1,setItem1] = useState([])
  const getitem = () =>{
    axios.get("https://test.ajiosys.in/api/itemtype")
    .then((res)=>{setItem(res.data.data);setItem1(res.data.data)})
  }
  useEffect(() => {
    getAllSaleTransations();
  }, []);
  const getAllSaleTransations = () => {
    axios
      .get("https://test.ajiosys.in/api/saletransactions")
      .then((res) =>
        setAllSalesTransaction(
          res.data.data
        )
      );
  };
  const [allSalesTransactions, setAllSalesTransaction] = useState([]);
  const renderSaudaRow = (list,sn,pn)=>{
    return <>
    {list.map((i,n)=><tr><td>{`${sn})-(${n+1})`}</td></tr>)}
    </>

  }
  const renderAllRow=()=>{
const list = allSale.map((i,n)=>renderSaudaRow(i.itemList,n+1,i.partyName))
  }

  return (
    <div>
      <div className="layout-wrapper layout-content-navbar  ">
        <div className="layout-container">
          <Sidebar />
          <div className="layout-page">
            <Nav />
            <div className="container-xxl flex-grow-1 container-p-y">
              <div
                className="mt-3 mb-3"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <div>
                  <label>From</label>
                </div>
                <div>
                  <input type="date" />
                </div>
                <div>
                  <label>To</label>
                </div>
                <div>
                  <input type="date" />
                </div>
                <div>
                  <label>Broker Filter</label>
                </div>
                <div>
                  {" "}
                  <select style={{ width: 100 }}>
                    <option selected disabled>
                      --select--
                    </option>
                    {broker.map((i) => (
                        <option>{i.partyName}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label>Party Filter</label>
                </div>
                <div>
                  <select>
                  <option selected disabled>--Select--</option>
                    {party.map((i)=><option>{i.partyName}</option>)}
                  </select>
                </div>
              </div>
              <div
                className="mt-3 mb-3"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
               
                <div>
                  <label>Item Type</label>
                </div>
                <div>
                  {" "}
                  <select style={{ width: 100 }}>
                    <option selected disabled>
                      --select--
                    </option>
                    {item.map((i) => (<option>{i.itemtype}</option>))}
                  </select>
                </div>
                <div>
                  <label>Status</label>
                </div>
                <div>
                  <select>
                    <option selected disabled>--Select--</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cencelled</option>
                  </select>
                </div>
                <div>
                  <label>Average Rate</label>
                </div>
                <div>
                  <button style={{border:"1px solid grey",width:90,backgroundColor:"white",color:"black",borderRadius:3}}  disabled>...</button>
                </div>
                <div>
                  <label>Average Mill Rate</label>
                </div>
                <div>
                  <button style={{border:"1px solid grey",width:90,backgroundColor:"white",color:"black",borderRadius:3}}  disabled>...</button>
                </div>
              </div>
              <div className="card">
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr className="text-nowrap">
                        <th>S No.</th>
                        <th>TRADE DATE</th>
                        <th>PARTY NAME</th>
                        <th>ITEM TYPE</th>
                        <th>RATE</th>
                        <th>RATE EXMILL</th>
                        <th>QUANTITY</th>
                        <th>REMAINING QUANTITY</th>
                        <th>SAUDA STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemData.map((i, n) => (
                        <tr>
                          <th>{n + 1}</th>
                          <th>{}</th>
                          <th>{n + 1}</th>
                          <th>{n + 1}</th>
                          <th>{n + 1}</th>
                          <th>{n + 1}</th>
                          <td>{i.itemtype}</td>
                          <td>{avgrate(i.itemtype)}</td>
                          <td>{avgmillrate(i.itemtype)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/*/ Responsive Table */}
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle" />
        {/* Drag Target Area To SlideIn Menu On Small Screens */}
        <div className="drag-target" />
      </div>
    </div>
  );
};

export default SaleVendorTable;
