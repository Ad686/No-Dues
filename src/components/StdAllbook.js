import React from "react";
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "./firebase";
import Navbar2 from "./navbar2";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function StdAllbook() {
    var navi = useNavigate();
    const [search, setSearch] = useState("");//first step
    const [searchData, setSearchData] = useState([]);//second step
    const [book, setbook] = useState([]);//change its place in third step
    var std1 = localStorage.getItem("StudentID");
    const [issued, setIssued] = useState([])

    useEffect(() => {
        if (!std1) {
            alert("login first");
            navi("/");
        }
    }, []);

    console.log({ std1 });

    //fourth step to change the functionality of getting data

    function getdata() {
        var ar = [];
        db.collection("Added_Books")
            .orderBy("Date", "desc")
            .onSnapshot((succ) => { //from here
                setbook(
                    succ.docs.map((item) => ({
                        data: item.data(),
                        id: item.id,
                    }))
                );
            });//to here
    }
    useEffect(() => {
        getdata();
    }, []);

    //fifth step to get all the searching books
    const getSearchBook = () => {
        if (search) {
            const newData = book.filter((item) => {
                const itemData = item.data.Title
                    ? item.data.Title.toUpperCase()
                    : "".toUpperCase();
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setSearchData(newData);
            console.log(newData);
        } else {
            setSearchData([]);
            console.log("no data");
        }
    }

    //sixth step
    useEffect(() => {
        getSearchBook()
    }, [search]);

    const [fnm, setfnm] = useState([]);
    const [lnm, setlnm] = useState("");
    const [year, setyear] = useState();
    const [clgId, setclgId] = useState();
    const [cls, setcls] = useState("");
    const [s_id, sets_id] = useState("");

    //getting student
    function getstd() {
        if (std1) {
            db.collection("Add_Std")
                .where('StdId', '==', std1)
                .onSnapshot((succ) => {
                    setfnm(succ.docs.map((item) => ({
                        data: item.data()
                    })))
                    // setlnm(succ.data().LastName);
                    // setyear(succ.data().Year);
                    // setcls(succ.data().Class);
                    // sets_id(succ.data().StdId);
                    // setclgId(succ.data().ClgId);
                });
        }
    }

    const getIssuesReq = () => {
        db.collection('IssuesReq').onSnapshot((get) => {
            setIssued(get.docs.map((item) => ({
                data: item.data(),
                id: item.id
            })))
        })
    }

    useEffect(() => {
        getstd();
        getIssuesReq()
    }, []);

    const [req, setreq] = useState(false);

    function issue(x) {
        if (issued.length >= 4) {
            alert('you have already requested 4 books')
        } else {
            var sDetails = {
                Name: fnm[0].data.FirstName + " " + fnm[0].data.LastName,
                SYear: fnm[0].data.Year,
                ClgId: fnm[0].data.ClgId,
                Class: fnm[0].data.Class,
                StdId: fnm[0].data.StdId,
            };
            var allDetails = Object.assign(sDetails, x);
            console.log(allDetails, x);

            db.collection("IssuesReq")
                .where("Title", "==", x.data.Title)
                .get()
                .then((succ) => {
                    if (succ.size == 0) {
                        db.collection("IssuesReq")
                            .add({
                                Name: sDetails.Name,
                                SYear: sDetails.SYear,
                                ClgId: sDetails.ClgId,
                                Class: sDetails.Class,
                                StdId: sDetails.StdId,
                                Author: x.data.Author,
                                Image: x.data.Image,
                                Title: x.data.Title,
                                BYear: x.data.Year,
                            })
                            .then((succc) => {
                                alert("request sent");
                            });
                    } else {
                        alert("already requested");
                    }
                });
        }
    }
    return (
        <>
            <Navbar2 />
            <Grid container className="">
                <Grid
                    item
                    lg={10}
                    md={10}
                    sm={12}
                    xs={12}
                    sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }}
                >
                    <Typography variant="h4">All Available Book</Typography>
                    <TextField
                        id="text-field"
                        placeholder="Search"
                        variant="outlined"
                        size="large"
                        className="srch"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Paper
                        className="container1"
                        elevation={0}
                        sx={{
                            height: "calc(100vh - 160px)",
                            borderTop: "5px solid darkblue",
                            overflowX: "scroll",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"center"}>
                                        <b>Image</b>
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        <b>Title</b>
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        <b>Author</b>
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        <b>Publisher</b>
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        <b>Year</b>
                                    </TableCell>
                                    <TableCell align={"center"}>
                                        <b>Copies</b>
                                    </TableCell>
                                    <TableCell colSpan={2} align={"center"}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {search
                                    ? searchData.map((val) => (
                                        <TableRow>
                                            <TableCell align={"center"}>
                                                <img src={val.data.Image} height={50} />
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Title}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Author}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Publisher}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Year}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Copies}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <Button onClick={() => issue(val)}>issue</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : book.map((val) => (
                                        <TableRow>
                                            <TableCell align={"center"}>
                                                <img src={val.data.Image} height={50} />
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Title}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Author}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Publisher}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Year}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <p>{val.data.Copies}</p>
                                            </TableCell>
                                            <TableCell align={"center"}>
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
    );
}
