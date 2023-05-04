

import { Box, Button, ButtonGroup, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "./firebase";
import Navbar1 from "./navbar1";
import firebase from "firebase";
import { Pattern } from "@mui/icons-material";

export default function Managestf() {


    var navi = useNavigate()
    const [search, setSearch] = useState(""); //first step
    const [searchData, setSearchData] = useState([]); //second step
    const [book, setbook] = useState([]); //change its place in third step
    var admin = localStorage.getItem("AdminID")

    useEffect(() => {
        if (!admin) {
            alert("login first")
            navi("/")
        }
    }, [])

    const [opn, setopn] = useState(false)
    const [opn2, setopn2] = useState(false)

    const [id1, setid1] = useState('')
    const [ps, setps] = useState('')

    const [prog, setprog] = useState(0)


    // const classes = [{ cls1: '' }, { cls1: 'b.com' }, { cls1: 'b.c.a' }, { cls1: 'b.tech' }, { cls1: 'b.a' }, { cls1: 'M.com' },]
    const classes = [{ cls1: 'Mechanical' }, { cls1: 'Civil' }, { cls1: 'Information technology' }, { cls1: 'Computer Science ' }, { cls1: 'Electrical' },{ cls1: 'Electronics and Communications'},{ cls1: 'Production' },]
    const classess = [{ stf1: 'Not Applicable' }, { stf1: 'Hardware Lab' }, { stf1: 'Web Devlopment Lab' }, { stf1: 'College Library ' }, { stf1: 'DBMS Lab' },{ stf1: 'PL-1'},{ stf1: 'PL-2' },{ stf1: 'Hostel' },{ stf1: 'Training and Placement Cell' },{ stf1: 'OS-1 Lab' },{ stf1: 'HPC Lab' },]
    const classesss = [{ rl1: 'Not Applicable' }, { rl1: 'Clerk' }, { rl1: 'HOD' }, { rl1: 'Librarian ' }, { rl1: 'Mess Accountant' },{ rl1: 'Record Keeper'},{ rl1: 'Supdt(A/C)' },{ rl1: 'Chief Warden' },{ rl1: 'Mentor' },{ rl1: 'Lab Technician' },]
    
    function addstd(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var img = d.get('img')
        console.log(img)

        var F_Name = d.get('f_name');
        var L_Name = d.get('l_name');
        var ClgId = d.get("clg_id");
        var Year = d.get("year");
        var contact = d.get("contact");
        var Class = d.get('cls');
        var staff = d.get('stf');
        var role = d.get('rl')
        

        console.log(F_Name)

        var alpha = /[A-Z a-z,'&.+]/
        var abc = []

        for (var i = 0; i < F_Name.length; i++) {
            if (!alpha.test(F_Name[i])) {
                abc.push(F_Name[i])
                // setfnm("")
            }
        }

        for (var i = 0; i < L_Name.length; i++) {
            if (!alpha.test(L_Name[i])) {
                abc.push(L_Name[i])
                // setlnm("")
            }
        }

        var num = /[0-9]/
        var abc2 = []
        // for (var i = 0; i < Year.length; i++) {
        //     if (!num.test(Year[i])) {
        //         abc2.push(Year[i])
        //         // setyear("")
        //     }
        // }

        // for (var i = 0; i < Contact.length; i++) {
        //     if (!num.test(Contact[i])) {
        //         abc2.push(Contact[i])
        //         // setcot("")
        //     }
        // }

        // console.log(ClgId.length)
        // var alphanum = /[ a-z0-9]/
        // var abc3 = [];
        // for (var i = 0; i < ClgId.length; i++) {
        //     if (!alphanum.test(ClgId[i])) {
        //         abc3.push(ClgId[i])
        //         // setclgId("")
        //     }
        // }


        // console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        }
        else if (abc2 != '') {
            alert("enter numbers only")
        // } else if (abc3 != "") {
        //     alert("enter correct id")
        } else {

            setprog(1)
            //setting studentid
            var result = '';
            var characters = '0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            var StdId = "std" + result;

            //setting password of student
            var pass = '';
            var characters2 = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength2 = characters2.length;
            for (var i = 0; i < 8; i++) {
                pass += characters2.charAt(Math.floor(Math.random() * charactersLength2));
            }
            var s_pass = pass

            var st_ref = storage.ref("/students/" + img.name).put(img);
            st_ref.then((succ) => {
                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url)
                    db.collection("Add_staff").add({
                        FirstName: F_Name.toLocaleLowerCase(),
                        LastName: L_Name.toLocaleLowerCase(),
                        Year: Number(Year),
                        // ClgId: ClgId,
                        Image: url,
                        Facility: staff,
                        SelectRole: role, 
                        Contact: Number(contact),
                        Class: Class.toLocaleLowerCase(),
                        StdId: StdId,
                        Password: s_pass,
                        Date: firebase.firestore.FieldValue.serverTimestamp()
                    }).then((succ) => {
                        setprog(0)
                        getstd()
                        e.target.reset()
                        e.target.value = ''
                        setopn(!opn)
                        alert("data added")
                    })
                })
            })
        }
    }

    const [std, setstd] = useState([])
    function getstd() {
        var ar = []
        db.collection('Add_staff').orderBy('Date', 'desc').get().then((succ) => {
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
        getstd()
    }, [])

    const getSearchBook = () => {
        if (search) {
            const newData = book.filter((item) => {
                const textData = search.toLowerCase();
                if (item.data.FirstName.toLowerCase().startsWith(textData)) {
                    return item;
                }
                else if (item.data.LastName.toLowerCase().startsWith(textData)) {
                    return item
                }
                else if (item.data.Class.toLowerCase().startsWith(textData)) {
                    return item
                } 
                else if (item.data.Facility.toLowerCase().startsWith(textData)) {
                    return item
                } 
                else if (item.data.SelectRole.toLowerCase().startsWith(textData)) {
                    return item
                } 
                // else if (item.data.Class.toLowerCase().startsWith(textData)) {
                //     return item
                // }
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



    const [fnm, setfnm] = useState('')
    const [lnm, setlnm] = useState('')
    const [cot, setcot] = useState()
    const [year, setyear] = useState()
    const [clgId, setclgId] = useState()
    const [cls, setcls] = useState('')
    const [stf, setstf] = useState('')
    const [rl, setrl] = useState('')
    const [img, setimg] = useState('')
    const [s_id, sets_id] = useState('')
    const [pass, setpass] = useState('')

    const [id, setid] = useState('')

    function getdetails(x) {
        console.log(x.id)
        setid(x.id)
        db.collection('Add_staff').doc(x.id).get().then((succ) => {
            setfnm(succ.data().FirstName)
            setlnm(succ.data().LastName)
            setyear(succ.data().Year)
            setcls(succ.data().Class)
            setstf(succ.data().Facility)
            setrl(succ.data().SelectRole)
            setpass(succ.data().Password)
            sets_id(succ.data().StdId)
            setcot(succ.data().Contact)
            setclgId(succ.data().ClgId)
            setimg(succ.data().Image)
        })
        setopn2(!opn2)
    }

    //deleting data
    function del(x, y) {
        // console.log(x)
        if (window.confirm("ready to delete student?")) {
            db.collection("Add_staff").doc(x).delete();
            storage.refFromURL(y).delete().then((succ) => {
                alert("deleted")
                getstd();
                setopn2(!opn2)
            })
        }
    }

    const [opn3, setopn3] = useState(false)
    function edit(x) {
        console.log(x)
        setopn2(false)
        setopn3(!opn3)
    }

    function updatestd(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var img = d.get("img")
        console.log(img)

        var F_Name = fnm;
        var L_Name = lnm;
        var StfId = clgId;
        
        var Contact = cot;
        var Class = cls;
        var staff = stf;
        var role = rl

        var alpha = /[A-Z a-z,'&.+]/
        var abc = []

        for (var i = 0; i < F_Name.length; i++) {
            if (!alpha.test(F_Name[i])) {
                abc.push(F_Name[i])
                // setfnm("")
            }
        }

        for (var i = 0; i < L_Name.length; i++) {
            if (!alpha.test(L_Name[i])) {
                abc.push(L_Name[i])
                // setlnm("")
            }
        }

        var num = /[0-9]/
        var abc2 = []
        // for (var i = 0; i < Year.length; i++) {
        //     if (!num.test(Year[i])) {
        //         abc2.push(Year[i])
        //         // setyear("")
        //     }
        // }

        for (var i = 0; i < Contact.length; i++) {
            if (!num.test(Contact[i])) {
                abc2.push(Contact[i])
                // setcot("")
            }
        }

        // console.log(ClgId.length)
        // var alphanum = /[ a-z0-9]/
        // var abc3 = [];
        // for (var i = 0; i < ClgId.length; i++) {
        //     if (!alphanum.test(ClgId[i])) {
        //         abc3.push(ClgId[i])
        //         // setclgId("")
        //     }
        // }


        // console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        }
        else if (abc2 != '') {
            alert("enter numbers only")
        // } else if (abc3 != "") {
        //     alert("enter correct id")
        } else {
            var st_ref = storage.ref("/students/" + img.name).put(img);
            st_ref.then((succ) => {
                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                    db.collection("Add_staff").doc(id).update({
                        FirstName: F_Name.toLocaleLowerCase(),
                        LastName: L_Name.toLocaleLowerCase(),
                        Contact: Number(Contact),
                        Class: Class.toLocaleLowerCase(),
                        Facility : staff,
                        SelectRole : role, 
                        Image: url,
                        
                      
                        
                    }).then((succ) => {
                        setprog(0)
                        e.target.reset()
                        e.target.value = ''
                        alert("data updated")
                        setopn3(!opn3)
                        setopn2(true)
                    })
                })
            })
        }
    }
    const filePickerRef = useRef(null);
    return (
        <>
            <Navbar1 />
            <Grid container className="" >
                <Grid item lg={9} md={9} sm={11} xs={11} sx={{ mt: { md: 10, sm: 10, xs: 8 }, ml: { md: 25, sm: 5, xs: 2 }, display: { sm: 'flex', xs: "block" }, flexDirection: 'column' }}>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Button variant="outlined" onClick={() => setopn(!opn)} className="addstd" size="large">Add Staff</Button>&nbsp;&nbsp;&nbsp;
                        
                        <TextField
                        id="text-field"
                        placeholder="Search"
                        variant="outlined"
                        // size="large"
                        InputProps={{ sx: { height: 38} }}
                        className="srch"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                        <Box>
                        
                            <Collapse in={opn}>
                            <h2>Staff Info</h2>
                                <form encType="multipart/form-data" className="form1" onSubmit={addstd} style={{ marginTop: '11px' }}>
                                
                                    {/* <form encType="multipart/form-data" className="form1" onSubmit={id2 ? (editstd) : (addstd)} style={{ marginTop: '11px' }}> */}
                                    <TextField className="txtfld" name="f_name" placeholder="First Name" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="l_name" placeholder="Last Name"  required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="contact" placeholder="Contact"  required InputProps={{ sx: { height: 38 } }} />
                                   
                                    {/* <TextField className="txtfld" onChange={(e) => setcls(e.target.value)} value={cls} name="l_name" placeholder="Class Name" InputProps={{ sx: { height: 38 } }} /> */}
                                    <FormControl fullWidth className="txtfld" required>
                                        {/* {!id2 && ( */}
                                        <InputLabel id="demo-simple-select-label" >Department</InputLabel>
                                        {/* )} */}
                                        <Select
                                            sx={{ height: 45 }}
                                            // value={cls}
                                            // onChange={(e) => setcls(e.target.value)}
                                            name="cls"
                                        >
                                            {classes.map((val) => (
                                                <MenuItem value={val.cls1}>{val.cls1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth className="txtfld" required>
                                        {/* {!id2 && ( */}
                                        <InputLabel id="demo-simple-select-label" >Facility</InputLabel>
                                        {/* )} */}
                                        
                                        <Select
                                            sx={{ height: 45 }}
                                            // value={cls}
                                            // onChange={(e) => setcls(e.target.value)}
                                            name="stf"
                                        >
                                            {classess.map((val) => (
                                                <MenuItem value={val.stf1}>{val.stf1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth className="txtfld" required>
                                        {/* {!id2 && ( */}
                                        <InputLabel id="demo-simple-select-label" >Select Role</InputLabel>
                                        {/* )} */}
                                        <Select
                                            sx={{ height: 45 }}
                                            // value={cls}
                                            // onChange={(e) => setcls(e.target.value)}
                                            name="rl"
                                        >
                                            {classesss.map((val) => (
                                                <MenuItem value={val.rl1}>{val.rl1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                   {/* <FormControl></FormControl> */}
                                    {/* <TextField className="txtfld" name="clg_id" placeholder="College Id" InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="year" placeholder="Batch" InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="contact" placeholder="Contact" InputProps={{ sx: { height: 38 } }} /> */}
                                    {/* <input type="file" className="txtxfld2 " name="img" /> */}
                                    <Button variant="contained" onClick={() => filePickerRef.current.click()} style={{ marginBottom: 10 }}  fullWidth>upload staff image</Button>
                                        <input ref={filePickerRef} type="file"  hidden className="txtfld" name="img" />
                                    {prog != 0 ? (
                                        <CircularProgress></CircularProgress>
                                    ) : (
                                        <Button variant="contained" type='submit' fullWidth>Add Staff</Button>
                                    )}
                                </form>
                            </Collapse>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 3, xs: 2 }, ml: { md: 25, xs: 0 } }} >
                    <Typography variant="h3">Staff</Typography>

                    {/* <Grid container sx={{ gap: { md: '0.1', sm: 2 }, justifyContent: { md: 'start', xs: 'center' } }}>
                        {std.map((val) => (
                            <Grid item md={3} sm={5} xs={9} sx={{ marginBottom: { sm: 0, xs: 2 }, boxShadow: '0 0 3px dimgrey', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <b>Name : </b><br />
                                    <b>Student Id : </b><br />
                                    <b>Batch : </b><br />
                                </Box>
                                <Box>
                                    {val.data().FirstName} {val.data().LastName}<br />
                                    {val.data().StdId}<br />
                                    {val.data().Year}<br /><br />
                                    <Button size="small" onClick={() => getdetails(val)}>view details</Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid> */}
                     <Grid container sx={{ gap: { md: '0.1', sm: 2 }, justifyContent: { md: 'start', xs: 'center' } }}>
                                {search
                                    ? searchData.map((val) => (
                                        <Grid item md={3} sm={5} xs={9} sx={{ marginBottom: { sm: 0, xs: 2 }, boxShadow: '0 0 3px dimgrey', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <b>Name : </b><br />
                                    <b>Department </b><br />
                                    <b>Facility : </b><br />
                                    <b>Role : </b><br />

                                </Box>
                                <Box>
                                    {val.data.FirstName} {val.data.LastName}<br />
                                    {val.data.Class}<br />
                                    {val.data.Facility}<br />
                                    {val.data.SelectRole}<br /><br />
                                    <Button size="small" onClick={() => getdetails(val)}>view details</Button>
                                </Box>
                            </Grid>
                                    ))
                                    : book.map((val) => (
                                        <Grid item  md={3} sm={5} xs={9} sx={{ marginBottom: { sm: 0, xs: 2 }, boxShadow: '0 0 3px dimgrey', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <b>Name : </b><br />
                                            <b>Department : </b><br />
                                            <b>Facility : </b><br />
                                            <b>Role : </b><br />

                                        </Box>
                                        <Box>
                                            {val.data.FirstName} {val.data.LastName}<br />
                                            {val.data.Class}<br />
                                            {val.data.Facility}<br />
                                            {val.data.SelectRole}<br /><br />
                                            <Button size="small" onClick={() => getdetails(val)}>view details</Button>
                                        </Box>
                                    </Grid>
                                    ))}
                            </Grid>
                </Grid>
            </Grid>

            <Dialog open={opn2} onClose={() => setopn2(!opn2)}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <Box className="d-flex3" width={400}>
                        <Box>
                            <p><b>Name : </b>{fnm} {lnm}</p>
                            <p><b>Department : </b>{cls}</p>
                            {/* <p><b>Batch : </b>{year}</p> */}
                            {/* <p><b>College Id : </b>{clgId}</p> */}
                            <p><b>Staff Id : </b>{s_id} </p>
                            <p><b>Password : </b>{pass}</p>
                            <p><b>Contact : </b>{cot}</p>
                            <p><b>Facility : </b>{stf}</p>
                            <p><b>Role : </b>{rl}</p>

                        </Box>
                        <Box>
                            <img src={img} height={150} />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button onClick={() => del(id, img)}>del</Button>
                        <Button onClick={() => edit(id)}>edit</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>

            <Dialog open={opn3} onClose={() => setopn3(!opn3)}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <form encType="multipart/form-data" className="form1" onSubmit={updatestd} style={{ marginTop: '11px' }}>
                        <TextField className="txtfld" onChange={(e) => setfnm(e.target.value)} value={fnm} name="f_name" label="First Name"required InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setlnm(e.target.value)} value={lnm} name="l_name" label="Last Name"required InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setcot(e.target.value)} value={cot} name="contact" label="Contact"required InputProps={{ sx: { height: 38 } }} />
                        
                        <FormControl fullWidth className="txtfld" required>
                        <InputLabel id="demo-simple-select-label" >Department</InputLabel>
                            <Select
                                sx={{ height: 45 }}
                                onChange={(e) => setcls(e.target.value)} value={cls}
                                // onChange={(e) => setcls(e.target.value)}
                                name="cls"
                            >
                                {classes.map((val) => (
                                    <MenuItem onChange={(e) => setcls(e.target.value)} value={val.cls1}>{val.cls1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className="txtfld" required>
                        <InputLabel id="demo-simple-select-label" >Facility</InputLabel>
                            <Select
                                sx={{ height: 45 }}
                                onChange={(e) => setstf(e.target.value)} value={stf}
                                // onChange={(e) => setcls(e.target.value)}
                                name="stf"
                            >
                                {classess.map((val) => (
                                    <MenuItem onChange={(e) => setstf(e.target.value)} value={val.stf1}>{val.stf1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className="txtfld" required>
                        <InputLabel id="demo-simple-select-label" >Select role</InputLabel>
                            <Select
                                sx={{ height: 45 }}
                                onChange={(e) => setrl(e.target.value)} value={rl}
                                // onChange={(e) => setcls(e.target.value)}
                                name="rl"
                            >
                                {classesss.map((val) => (
                                    <MenuItem onChange={(e) => setrl(e.target.value)} value={val.rl1}>{val.rl1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* <TextField className="txtfld" onChange={(e) => setclgId(e.target.value)} value={clgId} name="clg_id" placeholder="College Id" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setstf(e.target.value)} value={stf} name="stf" placeholder="facility" InputProps={{ sx: { height: 38 } }} /> */}
                        <TextField className="txtfld" value={s_id} label="Staff Id" required InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" value={pass} label="Password" required InputProps={{ sx: { height: 38 } }} />
                        <input type="file" className="txtxfld2 " name="img" required />

                        <Button variant="contained" type='submit' fullWidth>Edit Student</Button>
                    </form>

                </DialogContent>
            </Dialog>

        </>
    )
}