import React from "react";
import { Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "./firebase";
import Navbar2 from "./navbar2";
import { useNavigate } from "react-router-dom";

export default function StdAllbook() {

    var navi = useNavigate()
        var std1 = localStorage.getItem("StudentID")
    
        useEffect(() => {
            if (!std1) {
                alert("login first")
                navi("/")
            }
        }, [])

    const [book, setbook] = useState([])
    function getdata() {
        var ar = []
        db.collection("Added_Books").orderBy("Date",'desc').onSnapshot((succ) => {
            succ.forEach((abc) => {
                ar.push(abc)
            })
            setbook(ar)
        })
    }
    useEffect(() => {
        getdata()
    }, [])

    const [fnm, setfnm] = useState('')
    const [lnm, setlnm] = useState('')
    const [year, setyear] = useState()
    const [clgId, setclgId] = useState()
    const [cls, setcls] = useState('')
    const [s_id, sets_id] = useState('')

    //getting student
    function getstd() {
        if (std1) {
            db.collection("Add_Std").doc(std1).get().then((succ) => {
                // console.log(succ.data())
                setfnm(succ.data().FirstName)
                setlnm(succ.data().LastName)
                setyear(succ.data().Year)
                setcls(succ.data().Class)
                sets_id(succ.data().StdId)
                setclgId(succ.data().ClgId)

            })
        }
    }
    useEffect(() => {
        getstd()
    }, [std1])

    const [req, setreq] = useState(false)

    function issue(x) {
        // console.log(x.id)
        // console.log(x.data())

        var sDetails = { Name: fnm + " " + lnm, SYear: year, ClgId: clgId, Class: cls, StdId: s_id }
        var allDetails = Object.assign(sDetails, x.data())
        console.log(allDetails)

        db.collection("IssuesReq").where("Title","==",x.data().Title).get().then((succ)=>{
            if(succ.size == 0){
                db.collection("IssuesReq").add({
                    Name:sDetails.Name,
                    SYear:sDetails.SYear,
                    ClgId:sDetails.ClgId,
                    Class:sDetails.Class,
                    StdId:sDetails.StdId,
                    Author:x.data().Author,
                    Image:x.data().Image,
                    Title:x.data().Title,
                    BYear:x.data().Year
                }).then((succc)=>{
                    alert("request sent")   
                })
            }else{
                alert   ("already requested")
            }
        })
      

    }
    return (
        <>
            <Navbar2 />
            <Grid container className="">
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h4">All Available Book</Typography>
                    <Paper className="container1" elevation={0} sx={{ height: 'calc(100vh - 160px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell align={'center'} >
                                        <b>Image</b>
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <b>Title</b>
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <b>Author</b>
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <b>Publisher</b>
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <b>Year</b>
                                    </TableCell>
                                    <TableCell align={'center'}>
                                        <b>Copies</b>
                                    </TableCell>
                                    <TableCell colSpan={2} align={'center'}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {book.map((val) => (
                                    <TableRow>
                                        <TableCell align={'center'}>
                                            <img src={val.data().Image} height={50} />
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <p>{val.data().Title}</p>
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <p>{val.data().Author}</p>
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <p>{val.data().Publisher}</p>
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <p>{val.data().Year}</p>
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <p>{val.data().Copies}</p>
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <Button onClick={() => issue(val)}>issue</Button>
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

