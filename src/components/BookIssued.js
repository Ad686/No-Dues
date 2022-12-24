
import { Check, CheckCircle, Close } from "@mui/icons-material";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import Navbar2 from "./navbar2";

export default function BookIssued() {

    var navi = useNavigate()
    var std = localStorage.getItem("StudentID")

    console.log(std);

    useEffect(() => {
        if (!std) {
            alert("login first")
            navi("/")
        }
    }, [])

    console.log(std);


    const [data, setdata] = useState([])
    function getissbook() {
        var ar = []
        db.collection('AcceptIssue').where('StdId', '==', std).onSnapshot((succ) => {
            succ.forEach((abc) => {
                ar.push(abc)
                console.log(abc.data())
            })
            setdata(ar)
        })
        // db.collection('AcceptIssue').where('id', '==', std).onSnapshot((get) => {
        //     console.log(get)
        //     setdata(get.docs.map((item) => ({
        //         data: item.data(),
        //         id: item.id
        //     })))
        // })

    }
    useEffect(() => {
        getissbook()
    }, [])



    return (
        <>
            <Navbar2 />
            <Grid container>
                <Grid item lg={10} sx={{ ml: { md: 25 }, mt: { md: 10, xs: 10 } }} >
                    <Typography variant="h5">Issued Books</Typography>
                    <TextField
                        id="text-field"
                        placeholder="Search"
                        variant="outlined"
                        size="large"
                        className="srch"
                        // onChange={(e) => setSearch(e.target.value)}
                    /> 
                    <Paper className="container1" elevation={0} sx={{ display: { md: 'block', xs: 'none' }, height: 'calc(100vh - 150px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
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
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}><b>result</b></TableCell>
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
                                        <TableCell>{(val.data().Status == 1) ? (
                                            <>
                                                accepted
                                            </>
                                        ) : (
                                            <>
                                                rejected
                                            </>
                                        )}</TableCell>
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

