import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
 function Home () {
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar />
    
            <div className="layout-page">

             
              <div
                style={{
                  height: 820,
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
         
            </div>

        </div>
        </div>
      </div>
    </div>
  )
              }
export default Home;
