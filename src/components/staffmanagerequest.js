import React, { useState } from "react";
import Navbar2 from "./navbar2";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { db } from "./firebase";
import { Cancel, CheckBox } from "@mui/icons-material";

function Staffmanagerequest() {

    var cLgnId = localStorage.getItem("CollegeID");


    const [nm, nm1] = useState("");
    const [lnm, lnm1] = useState("");
    const [dpt, dpt1] = useState("");
    const [cId, cId1] = useState("");
    const [btch, btch1] = useState("");
    const [ct, ct1] = useState();
    const [sts, sts1] = useState();

    const [data, data1] = useState([])
    function getIssRqst() {
        db.collection("IssueRequest").onSnapshot((succ) => {
            var ar = [];
            succ.forEach(element => {
                ar.push(element)
            });
            data1(ar)
        })
    }
    useEffect(() => {
        getIssRqst();
    }, [])
    console.log(sts)

    const [issuId, issuId1] = useState("")
    function rqstAccpt(x) {
            db.collection("IssueRequest").doc(x.id).update({
                Status: 1
            }).then((succ) => {
                alert("Request Accepted");
            }).catch((err) => {
                alert("Error Occured")
            })
    }

    function rejctRqt(x) {
        db.collection("IssueRequest").doc(x.id).update({
            Status: "rejected"
        }).then((succ) => {
            alert("Request Rejected")
        }).catch((err) => {
            alert("Error Occured")
        })
    }
    return (
        <>
            <Navbar2 />
            <Grid container className="">&nbsp;&nbsp;&nbsp;&nbsp;
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h5"> Request</Typography>

                    <Paper className="container1" elevation={0} sx={{ height: 'calc(100vh - 150px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Father Name</b></TableCell>
                                    <TableCell><b>Department</b></TableCell>
                                    <TableCell><b>College ID</b></TableCell>
                                    <TableCell><b>Batch</b></TableCell>
                                    <TableCell><b>Contact</b></TableCell>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key="">
                                        <TableCell>{row.data().FirstName}</TableCell>
                                        <TableCell>{row.data().LastName}</TableCell>
                                        <TableCell>{row.data().Class}</TableCell>
                                        <TableCell>{row.data().ClgId}</TableCell>
                                        <TableCell>{row.data().Year}</TableCell>
                                        <TableCell>{row.data().Contact}</TableCell>
                                        {row.data().Status == 0 && (
                                            <>
                                                <TableCell style={{ cursor: "pointer" }} onClick={() => rqstAccpt(row)}><CheckBox style={{ color: "green" }} /></TableCell>
                                                <TableCell style={{ cursor: "pointer" }} onClick={() => rejctRqt(row)}><Cancel style={{ color: "red" }} /></TableCell>
                                            </>
                                        )}

                                        {row.data().Status == 1 && (
                                            <TableCell style={{ textAlign: "center", color: "green" }}>Accepted</TableCell>
                                        )}
                                        {row.data().Status == "rejected" && (
                                            <TableCell style={{ textAlign: "center", color: "red" }}>Rejected</TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
export default Staffmanagerequest;