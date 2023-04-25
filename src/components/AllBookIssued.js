import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import Navbar1 from "./navbar1";
// import Navbar2 from "./navbar2";

export default function AllBookIssued() {

    var navi = useNavigate()
    const [search, setSearch] = useState(""); //first step
    const [searchData, setSearchData] = useState([]); //second step
    const [book, setbook] = useState([]); //change its place in third step
    var std = localStorage.getItem("StudentID")

    useEffect(() => {
        if (!std) {
            alert("login first")
            navi("/")
        }
    }, [])


    const [data, setdata] = useState([])
    function getissbook() {
        var ar = []
        db.collection('AcceptIssue').onSnapshot((succ) => {
            //from here
            setbook(
                succ.docs.map((item) => ({
                    data: item.data(),
                    id: item.id,
                }))
            );
        })
    }
    useEffect(() => {
        getissbook()
    }, [])
    const getSearchBook = () => {
        if (search) {
            const newData = book.filter((item) => {
                const textData = search.toLowerCase();
                if (item.data.Title.toLowerCase().startsWith(textData)) {
                    return item;
                }
                else if (item.data.Name.toLowerCase().startsWith(textData)) {
                    return item
                }
                else if (item.data.ClgId.toLowerCase().startsWith(textData)) {
                    return item
                } 
                else if (item.data.Class.toLowerCase().startsWith(textData)) {
                    return item
                }
                else {
                    return null
                }
            });
            setSearchData(newData);
            console.log(newData);
        } else {
            setSearchData([]);
            console.log("no data");
        }
    };

    //sixth step
    useEffect(() => {
        getSearchBook();
    }, [search]);


    return (
        <>
            <Navbar1 />
            <Grid container>
            <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h5">Issued Books</Typography>
                    <TextField
                        id="text-field"
                        placeholder="Search"
                        variant="outlined"
                        size="large"
                        className="srch"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Paper className="container1" elevation={0} sx={{ display: { md: 'block', xs: 'block' }, height: 'calc(100vh - 150px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Clg Id</b></TableCell>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Class</b></TableCell>
                                    <TableCell><b>StdId</b></TableCell>
                                    <TableCell><b>Batch</b></TableCell>
                                    <TableCell><b>Book</b></TableCell>
                                    <TableCell><b>Author</b></TableCell>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}><b>result</b></TableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
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
                            </TableBody> */}
                            <TableBody>
                                {search
                                    ? searchData.map((val) => (
                                        <TableRow>
                                        <TableCell>{val.data.ClgId}</TableCell>
                                        <TableCell>{val.data.Name}</TableCell>
                                        <TableCell>{val.data.Class}</TableCell>
                                        <TableCell>{val.data.StdId}</TableCell>
                                        <TableCell>{val.data.SYear}</TableCell>
                                        <TableCell>{val.data.Title}</TableCell>
                                        <TableCell>{val.data.Author}</TableCell>
                                        <TableCell>{(val.data.Status == 1) ? (
                                            <>
                                                accepted
                                            </>
                                        ) : (
                                            <>
                                                rejected
                                            </>
                                        )}</TableCell>
                                    </TableRow>
                                    ))
                                    : book.map((val) => (
                                        <TableRow>
                                        <TableCell>{val.data.ClgId}</TableCell>
                                        <TableCell>{val.data.Name}</TableCell>
                                        <TableCell>{val.data.Class}</TableCell>
                                        <TableCell>{val.data.StdId}</TableCell>
                                        <TableCell>{val.data.SYear}</TableCell>
                                        <TableCell>{val.data.Title}</TableCell>
                                        <TableCell>{val.data.Author}</TableCell>
                                        <TableCell>{(val.data.Status == 1) ? (
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
