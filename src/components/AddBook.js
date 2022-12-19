import { Button, CircularProgress, Collapse, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Navbar1 from "./navbar1";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook() {

        var navi = useNavigate()
        var lib = localStorage.getItem("LibrarianID")

    const classes = [{ cls1: 'Engineering' }, { cls1: 'Non-Engineering' }, { cls1: 'Medical' }, { cls1: 'Arts' }, { cls1: 'Commerce' },]
        

        useEffect(() => {
                if (!lib) {
                        alert("login first")
                        navi("/")
                }
        }, [])

        const [tit, settit] = useState('')
        const [yr, setyr] = useState('')
        const [cop, setcop] = useState('')
        const [pub, setpub] = useState('')
        const [auth, setauth] = useState('')
        // const [img, setimg] = useState('')

        const [prog, setprog] = useState(0)

        function addform(e) {
                e.preventDefault();
                var d = new FormData(e.currentTarget);
                var img = d.get('img')
                var title = tit.toLowerCase()
                var year = Number(yr)
                var author = auth.toLowerCase()
                var publisher = pub.toLowerCase()
                var copies = Number(cop)
                var Class = d.get('cls')


                var alpha = /[A-Z a-z,'&.+]/
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
                        setprog(1)
                        var st_ref = storage.ref("/books/" + img.name).put(img);
                        st_ref.then((succ) => {
                                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                                        db.collection("Added_Books").add({
                                                Title: title,
                                                Author: author,
                                                Publisher: publisher,
                                                Copies: copies,
                                                Year: year,
                                                Image: url,
                                                Date: firebase.firestore.FieldValue.serverTimestamp()
                                        }).then((succ) => {
                                                alert("data added")
                                                setprog(0)
                                                settit("")
                                                setyr("")
                                                setcop("")
                                                setpub("")
                                                setauth("")
                                                // setimg("")
                                        })
                                })
                        })
                }

        }
        const filePickerRef = useRef(null);

        return (
                <>
                        <Navbar1 />
                        <Collapse in>
                                <Grid container className="d-flex">
                                        <Grid item lg={5} md={5} sm={8} xs={10} sx={{ mt: { md: 10, xs: 10 } }} >
                                                <Typography variant="h3">Add Book</Typography>
                                                <form className="form1" onSubmit={addform}>
                                                        <TextField className="txtfld" onChange={(e) => settit(e.target.value)} value={tit} name="title" label="Book Title" InputProps={{ sx: { height: 38 } }} required/>
                                                        <TextField className="txtfld" onChange={(e) => setauth(e.target.value)} value={auth} name="author" label="Author Name" InputProps={{ sx: { height: 38 } }} required/>
                                                        <TextField className="txtfld" onChange={(e) => setpub(e.target.value)} value={pub} name="publisher" label="Publisher" InputProps={{ sx: { height: 38 } }} required/>
                                                        <TextField className="txtfld" onChange={(e) => setyr(e.target.value)} value={yr} name="year" label="Year" InputProps={{ sx: { height: 38 } }} required/>
                                                        <TextField className="txtfld1" onChange={(e) => setcop(e.target.value)} value={cop} name="copies" label="Number Of Copies" InputProps={{ sx: { height: 38 } }} required/>
                                                     
                                                     {/* Book category */}
                                                        <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                                        {/* )} */}
                                        <Select
                                            sx={{ height: 45 }}
                                            className="txtfld"
                                            // value={cls}
                                            // onChange={(e) => setcls(e.target.value)}
                                            name="cls"
                                        >
                                            {classes.map((val) => (
                                                <MenuItem value={val.cls1}>{val.cls1}</MenuItem>
                                            ))}
                                        </Select>
                                                        {/* <InputLabel id="demo-simple-select-label" >Upload Book Image</InputLabel> <TextField className="txtfld" type='file' name="img" InputProps={{ sx: { height: 40 } }} /> */}
                                                        <Button variant="contained" onClick={() => filePickerRef.current.click()} style={{ marginBottom: 10 }} fullWidth>upload book image</Button>
                  <input ref={filePickerRef} type="file" hidden className="txtfld" name="img" />
                                                        {prog == 0 ? (
                                                                <Button variant="contained" type='submit' fullWidth>Add Book</Button>
                                                        ) : (
                                                                <CircularProgress></CircularProgress>
                                                        )}
                                                </form>
                                        </Grid>
                                </Grid>
                        </Collapse>
                </>
        )
}
