import React from "react";
import { useState, useEffect } from "react";
import Navbar2 from "./navbar2";
import Stdnavbar from "./stdnavbar";
import { Button, Divider } from "@mui/material";
import Footer from "./footer";
import { db } from "./firebase";

function Studentrequest() {

    var cId = localStorage.getItem("CollegeID");

    const [sDtls, sDtls1] = useState()
    function getstd() {
        if (cId) {
            db.collection("Add_Std").doc(cId).onSnapshot((succ) => {
                sDtls1(succ.data());
            });
        }
    }
    useEffect(() => {
        getstd();
    }, [])

    function issue() {
        var issRqst = {Status:0};
        var issueDetails = Object.assign(sDtls,issRqst);
        if(cId){
            db.collection("IssueRequest").add(issueDetails).then((succ)=>{
                alert("Request Sent")
            }).catch((err)=>{
                alert("Can't Send Request")
            })
        }else{
            alert("Login First")
        }
    }

    return (
        <>
            <Stdnavbar />
            {/* <div className="wlcm">
                <p>Welcome {+sDtls.FirstName + " " + sDtls.LastName}</p> 
            </div> */}
            <div className="rqtbtn">
                <Button variant="contained" color="primary" onClick={() => issue()}> Request For No Dues </Button>
            </div>
            <br /><br /><br />

            <Footer />

        </>
    )
}
export default Studentrequest