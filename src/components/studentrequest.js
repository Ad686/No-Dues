import React from "react";
import { useState, useEffect } from "react";
import Navbar2 from "./navbar2";
import Stdnavbar from "./stdnavbar";
import { Button, Divider } from "@mui/material";
import Footer from "./footer";
function studentrequest(){
    function issue(){
        alert("request send")
    }
   
    return(
        <>
            <Stdnavbar/>
            <div className="rqtbtn">
            <Button variant="contained" color="primary"onClick={() => issue()}> Request For No Dues </Button>
            </div>
            <br/><br/><br/>
        
            <Footer/>
            
        </>
    )
}
export default studentrequest