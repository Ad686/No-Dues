import { Delete, Edit } from "@mui/icons-material";
import { Button, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db, storage } from "./firebase";
import Navbar1 from "./navbar1";

export default function AllBooks() {

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


    function del(x) {
        // console.log(x)
        if (window.confirm("Are You Sure??")) {
            db.collection("Added_Books").doc(x.id).delete();
            storage.refFromURL(x.data().Image).delete()
            alert("deleted")
            getdata()
        }
    }

    const [id, setid] = useState('')
    function edit(x) {
        console.log(x)
        setopn(!opn)
        setid(x.id)
    }

    const [tit, settit] = useState('')
    const [yr, setyr] = useState('')
    const [cop, setcop] = useState('')
    const [pub, setpub] = useState('')
    const [auth, setauth] = useState('')
    // const [img, setimg] = useState('')

    const [opn, setopn] = useState(false)

    const [prog, setprog] = useState(0)

    function addform(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        setprog(1)

        var img = d.get('img')
        var title = tit
        var year = yr
        var author = auth
        var publisher = pub
        var copies = cop

        console.log(title + year + author + publisher + copies)
        var alpha = /[A-Z a-z,'&.]/
        var abc = []

        for (var i = 0; i < title.length; i++) {
            if (!alpha.test(title[i])) {
                abc.push(title[i])
                settit("")
            }
        }

        for (var i = 0; i < publisher.length; i++) {
            if (!alpha.test(publisher[i])) {
                abc.push(publisher[i])
                setpub("")
            }
        }

        for (var i = 0; i < author.length; i++) {
            if (!alpha.test(author[i])) {
                abc.push(author[i])
                setauth("")
            }
        }

        var num = /[0-9]/
        var abc2 = []
        for (var i = 0; i < year.length; i++) {
            if (!num.test(year[i])) {
                abc2.push(year[i])
                setyr("")
            }
        }

        for (var i = 0; i < copies.length; i++) {
            if (!num.test(copies[i])) {
                abc2.push(copies[i])
                setcop("")
            }
        }

        console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        } else if (abc2 != '') {
            alert("enter numbers only")
        } else {
            var st_ref = storage.ref("/books/" + img.name).put(img);
            st_ref.then((succ) => {
                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                    // console.log(url)
                    db.collection("Added_Books").doc(id).update({
                        Title: title,
                        Author: author,
                        Publisher: publisher,
                        Copies: copies,
                        Year: year,
                        Image: url
                    }).then((succ) => {
                        alert("data updated")
                        setprog(0)
                        settit("")
                        setyr("")
                        setcop("")
                        setpub("")
                        setauth("")
                        getdata()
                        setopn(!opn)
                        // setimg("")
                    })
                })
            })
        }
    }

    function getonedata() {
        if (id) {
            db.collection("Added_Books").doc(id).get().then((succ) => {
                console.log(succ.data())
                settit(succ.data().Title)
                setyr(succ.data().Year)
                setcop(succ.data().Copies)
                setpub(succ.data().Publisher)
                setauth(succ.data().Author)
                // setimg(succ.data().Image)
            })
        }
    }
    useEffect(() => {
        getonedata()
    }, [id])


    return (
        <>
            <Navbar1 />
            <Grid container className="">
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h3">All Available Book</Typography>
                    <TextField
                        id="text-field"
                        placeholder="Search"
                        variant="outlined"
                        size="large"
                        className="srch"
                        // onChange={(e) => setSearch(e.target.value)}
                    /> 
                    <Paper className="container1" elevation={0} sx={{ height: 'calc(100vh - 160px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'center'}>
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
                                        <TableCell align={'center'} >
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
                                            <Button onClick={() => del(val)}><Delete /></Button>
                                        </TableCell>
                                        <TableCell align={'center'}>
                                            <Button onClick={() => edit(val)}><Edit /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={opn} onClose={() => setopn(!opn)}>
                <DialogContent>
                    edit
                    <form className="form1" onSubmit={addform}>
                        <TextField className="txtfld" onChange={(e) => settit(e.target.value)} value={tit} name="title" placeholder="Book Title" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setauth(e.target.value)} value={auth} name="author" placeholder="Author Name" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setpub(e.target.value)} value={pub} name="publisher" placeholder="Publisher" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setyr(e.target.value)} value={yr} name="year" placeholder="Year" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setcop(e.target.value)} value={cop} name="copies" placeholder="Number Of Copies" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" type={'file'} name="img" InputProps={{ sx: { height: 40 } }} />
                        {prog == 0 ? (
                            <Button variant="contained" type='submit' fullWidth>Editing Book</Button>
                        ) : (
                            <>editing</>
                        )}
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
