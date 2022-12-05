import React, { useState } from "react";
import { AppBar, Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Toolbar, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
// import bck from './images/bck.jpg';
export default function Home() {

    const [opn, setopn] = useState(false)
    const [opn1, setopn1] = useState(false)

    var navi = useNavigate()

    function login1(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var id = d.get("id")
        var pass = d.get('pass')
        console.log(id)
        console.log(pass)

        db.collection("Librarian").where("Id", "==", id).where("Password", "==", pass).get().then((succ) => {
            if (succ.size == 0) {
                alert("wrong id or password")
            } else {
                succ.forEach((abc) => {
                    console.log(abc.data())
                    alert("login successful")
                    localStorage.setItem("LibrarianID", abc.id)
                    console.log(abc.id)
                    navi("/allbooks")
                })
            }
        })
    }


    function login2(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var id = d.get("id")
        var pass = d.get('pass')

        db.collection("Add_Std").where("StdId", "==", id).where("Password", "==", pass).get().then((succ) => {
            if (succ.size == 0) {
                alert("wrong id or password")
            } else {
                // alert("login successful")
                succ.forEach((abc) => {
                    alert("login successful")
                    console.log(id)
                    localStorage.setItem("StudentID", id)
                    console.log(abc.id)
                    navi("/books")
                })
            }
        })

        // db.collection("Add_Std").where("StdId", "==", id).where("Password", "==", pass).onSnapshot((get) => {
        //     setUser(get.docs.map((item) => ({
        //         data: item.data(),
        //         id: item.id
        //     })))

        //     console.log(get);
        // })
    }


    return (
        <>
            <Dialog open={opn} onClose={() => setopn(!opn)} >
                <DialogTitle>Librarian Login</DialogTitle>
                <DialogContent sx={{ width: 500 }}>
                    <form onSubmit={login1}>
                        <TextField autoComplete="off"
                            InputProps={{ sx: { height: 38 } }} name="id" placeholder="user id" type='text' fullWidth required /><br /><br />
                        <TextField autoComplete="off" InputProps={{ sx: { height: 38 } }} name="pass" placeholder="password" type='password' fullWidth required /><br /><br />
                        <Button type='submit' variant="outlined">Login</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
            <Dialog open={opn1} onClose={() => setopn1(!opn1)} >
                <DialogTitle>Student Login</DialogTitle>
                <DialogContent sx={{ width: 500 }}>
                    <form onSubmit={login2}>
                        <TextField autoComplete="off" InputProps={{ sx: { height: 38 } }} name="id" placeholder="user id" type='text' fullWidth required /><br /><br />
                        <TextField autoComplete="off" InputProps={{ sx: { height: 38 } }} name="pass" placeholder="password" type='password' fullWidth required /><br /><br />
                        <Button type='submit' variant="outlined">Login</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>


            {/* <Typography variant="h3" style={{textAlign:'center',margin:'10px 0'}}>Central Library,Ludhiana</Typography> */}
            {/* <AppBar className="apbar1" >
                <Toolbar>
                <Avatar src="https://static.vecteezy.com/system/resources/previews/000/585/835/original/vector-book-reading-logo-and-symbols-template-icons.jpg"></Avatar>

                    <Typography variant="h5" sx={{margin:'auto'}}>
                        Central Library
                    </Typography>
                    </Toolbar>
                    </AppBar>
                    <br/><br/><br/> */}
            <Grid container>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className="imgg ">
                    {/* <img src={bck} width={'100%'} /> */}
                    <br />
                    <br />
                    <br /><br />
                    <br />
                    <br /><br />
                    <br />
                    <br /><br />
                    <br />
                    <br /><br />
                    <br />
                    <br /> <Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="box1">
                        <Typography variant="h2" className="hh4">LOGIN HERE</Typography>
                        <Box className="m-top">
                            <Button variant="contained" onClick={() => setopn(!opn)}>Login As Librarian</Button>&nbsp;&nbsp;&nbsp;
                            <Button variant="contained" color="secondary" onClick={() => setopn1(!opn1)}>Login As Student</Button>
                        </Box>
                    </Grid>
                </Grid>
                {/* <Grid item xl={6} lg={6} md={6} sm={6} xs={12} className="box1">
                    <Typography variant="h4">Login Here</Typography>
                    <Box className="m-top">
                        <Button  variant="outlined" onClick={() => setopn(!opn)}>Login As Librarian</Button>
                        <Button variant="outlined" onClick={() => setopn1(!opn1)}>Login As Student</Button>
                    </Box>
                </Grid> */}
            </Grid>
        </>
    )
}

