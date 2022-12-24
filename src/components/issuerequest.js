
import { Check, CheckCircle, Close } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import Navbar1 from "./navbar1";

export default function IssueReq() {



    var navi = useNavigate()
    // var lib = sessionStorage.getItem("LibrarianID")

    // useEffect(() => {
    //     if (!lib) {
    //         alert("login first")
    //         navi("/")
    //     }
    // }, [])

    var std = localStorage.getItem("StudentID");

    const [data, setdata] = useState([])
    function getissRequest() {
        var ar = []
        // if (std) {
            db.collection("IssuesReq").onSnapshot((succ) => {
                succ.forEach((abc) => {
                    console.log(abc.data())
                    ar.push(abc)
                })
                setdata(ar)
            })
        // }
    }
    useEffect(() => {
        getissRequest()
    }, [])

    function accept(x) {
        var a1 = { id: x.id, Status: 1 }
        var obj = Object.assign(a1, x.data())
        console.log(obj)

        db.collection("AcceptIssue").add(obj).then((succ) => {
            db.collection("IssuesReq").doc(x.id).delete().then((succ) => {
                alert("accepted")
                getissRequest()
            });
        })
    }

    function reject(x) {
        var a1 = { id: x.id, Status: 0 }
        var obj = Object.assign(a1, x.data())
        console.log(obj)

        db.collection("AcceptIssue").add(obj).then((succ) => {
            db.collection("IssuesReq").doc(x.id).delete().then((succ) => {
                alert("rejected")
                getissRequest()
            });
        })
    }

    return (
        <>
            <Navbar1 />
            <Grid container className="">
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h5">Issue Request</Typography>
                    
                    <Paper className="container1" elevation={0} sx={{ height: 'calc(100vh - 150px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Clg Id</b></TableCell>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Class</b></TableCell>
                                    <TableCell><b>StdId</b></TableCell>
                                    <TableCell><b>Year</b></TableCell>
                                    <TableCell><b>Book</b></TableCell>
                                    <TableCell><b>Author</b></TableCell>
                                    <TableCell >
                                        <b>Category</b>
                                    </TableCell>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((val) => (
                                    <TableRow>
                                        <TableCell>{val.data().ClgId}</TableCell>
                                        <TableCell>{val.data().Name}</TableCell>
                                        <TableCell>{val.data().Class}</TableCell>
                                        <TableCell>{val.data().StdId}</TableCell>
                                        <TableCell>{val.data().SYear}</TableCell>
                                        <TableCell>{val.data().Title}</TableCell>
                                        <TableCell>{val.data().Author}</TableCell>
                                        <TableCell align={"center"}>
                                                <p>{val.data().Category}</p>
                                            </TableCell>
                                        <TableCell>
                                            <CheckCircle color="success" onClick={() => accept(val)} />
                                        </TableCell>
                                        <TableCell>
                                            <Close color="error" onClick={() => reject(val)} />
                                        </TableCell>
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

