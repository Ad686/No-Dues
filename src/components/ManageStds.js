import { Delete, Edit } from "@mui/icons-material";
import { Autocomplete, Box, Button, ButtonGroup, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "./firebase";
import Navbar1 from "./navbar1";
import firebase from "firebase";

export default function ManageStd() {


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
    const classes = [{ cls1: 'Mechanical' }, { cls1: 'Civil' }, { cls1: 'Information technology' }, { cls1: 'Computer Science ' }, { cls1: 'Electrical' }, { cls1: 'Electronics and Communications' }, { cls1: 'Production' },]
    const cd = [{ cd1: 'NEFT' }, { cd1: 'RTGS' }, { cd1: 'IFSC' },]
    function addstd(e) {
        e.preventDefault();
        var d = new FormData(e.currentTarget);
        var img = d.get('img')
        console.log(img)

        var F_Name = d.get('f_name');
        var L_Name = d.get('l_name');
        var Father_Name = d.get('father_name')
        var address = d.get('address')
        var ClgId = d.get("clg_id");
        var Year = d.get("year");
        var Contact = d.get("contact");
        var Class = d.get('cls')
        var Bank_acc = d.get('bank_acc')
        var Bank_nm = d.get('bank_nm')
        var Branch_add = d.get('branch_add')
        var Bank_num = d.get('bank_num')
        var cd = d.get('cd')
        var Code_type = d.get('code_type')
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
        for (var i = 0; i < Year.length; i++) {
            if (!num.test(Year[i])) {
                abc2.push(Year[i])
                // setyear("")
            }
        }

        for (var i = 0; i < Contact.length; i++) {
            if (!num.test(Contact[i])) {
                abc2.push(Contact[i])
                // setcot("")
            }
        }

        console.log(ClgId.length)
        var alphanum = /[ a-z0-9]/
        var abc3 = [];
        for (var i = 0; i < ClgId.length; i++) {
            if (!alphanum.test(ClgId[i])) {
                abc3.push(ClgId[i])
                // setclgId("")
            }
        }


        // console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        }
        else if (abc2 != '') {
            alert("enter numbers only")
        } else if (abc3 != "") {
            alert("enter correct id")
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
                    db.collection("Add_Std").add({
                        FirstName: F_Name.toLocaleLowerCase(),
                        LastName: L_Name.toLocaleLowerCase(),
                        FatherName: Father_Name.toLocaleLowerCase(),
                        Address: address,
                        Year: Number(Year),
                        ClgId: ClgId,
                        Image: url,
                        Contact: Number(Contact),
                        Class: Class.toLocaleLowerCase(),

                        BankAccountNo: Bank_acc,
                        BankName: Bank_nm,
                        BankAddress: Branch_add,
                        BankNumber: Bank_num,
                        Codetype: cd,
                        Code: Code_type,
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
        db.collection('Add_Std').orderBy('Date', 'desc').get().then((succ) => {
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
                else if (item.data.ClgId.toLowerCase().startsWith(textData)) {
                    return item
                }
                else if (item.data.Class.toLowerCase().startsWith(textData)) {
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
    const [img, setimg] = useState('')
    const [s_id, sets_id] = useState('')
    const [pass, setpass] = useState('')
    const [fathername, setfathername] = useState('')
    const [address, setaddress] = useState('')
    const [bankaccountno, setbankaccno] = useState('')
    const [bankname, setbankname] = useState('')
    const [bankaddress, setbankaddress] = useState('')
    const [banknumber, setbanknumber] = useState('')
    const [codetype, setcodetype] = useState('')
    const [code, setcode] = useState('')


    const [id, setid] = useState('')

    function getdetails(x) {
        console.log(x.id)
        setid(x.id)
        db.collection('Add_Std').doc(x.id).get().then((succ) => {
            setfnm(succ.data().FirstName)
            setlnm(succ.data().LastName)
            setyear(succ.data().Year)
            setcls(succ.data().Class)
            setpass(succ.data().Password)
            sets_id(succ.data().StdId)
            setcot(succ.data().Contact)
            setclgId(succ.data().ClgId)
            setimg(succ.data().Image)
            setfathername(succ.data().FatherName)
            setaddress(succ.data().Address)
            setbankaccno(succ.data().BankAccountNo)
            setbankname(succ.data().BankName)
            setbankaddress(succ.data().BankAddress)
            setbanknumber(succ.data().BankNumber)
            setcodetype(succ.data().Codetype)
            setcode(succ.data().Code)



        })
        setopn2(!opn2)
    }

    //deleting data
    function del(x, y) {
        // console.log(x)
        if (window.confirm("ready to delete student?")) {
            db.collection("Add_Std").doc(x).delete();
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
        var FatherName = fathername;
        var Address = address;
        var ClgId = clgId;
        var Year = year;
        var Contact = cot;
        var Class = cls;
        var Bank_acc = bankaccountno;
        var Bank_nm = bankname;
        var Branch_add = bankaddress;
        var Bank_num = banknumber;
        var cd = code;
        var Code_type = codetype;
        var alpha = /[A-Z a-z,'&.+]/;
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
        for (var i = 0; i < Year.length; i++) {
            if (!num.test(Year[i])) {
                abc2.push(Year[i])
                // setyear("")
            }
        }

        for (var i = 0; i < Contact.length; i++) {
            if (!num.test(Contact[i])) {
                abc2.push(Contact[i])
                // setcot("")
            }
        }

        console.log(ClgId.length)
        var alphanum = /[ a-z0-9]/
        var abc3 = [];
        for (var i = 0; i < ClgId.length; i++) {
            if (!alphanum.test(ClgId[i])) {
                abc3.push(ClgId[i])
                // setclgId("")
            }
        }


        // console.log(abc)
        if (abc != '') {
            alert("enter alphabers only")
        }
        else if (abc2 != '') {
            alert("enter numbers only")
        } else if (abc3 != "") {
            alert("enter correct id")
        } else {
            var st_ref = storage.ref("/students/" + img.name).put(img);
            st_ref.then((succ) => {
                st_ref.snapshot.ref.getDownloadURL().then((url) => {
                    db.collection("Add_Std").doc(id).update({
                        FirstName: F_Name.toLocaleLowerCase(),
                        LastName: L_Name.toLocaleLowerCase(),
                        FatherName: FatherName.toLocaleLowerCase(),
                        Address: Address,
                        Year: Number(Year),
                        ClgId: ClgId,
                        Image: url,
                        Contact: Number(Contact),
                        Class: Class.toLocaleLowerCase(),
                        BankAccountNo: Bank_acc,
                        BankName: Bank_nm,
                        BankAddress: Branch_add,
                        BankNumber: Bank_num,
                        Codetype: Code_type,
                        Code: cd

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
                        <Button variant="outlined" onClick={() => setopn(!opn)} className="addstd" size="large">Add Student</Button>&nbsp;&nbsp;&nbsp;
                        <TextField
                            id="text-field"
                            placeholder="Search"
                            variant="outlined"
                            // size="large"
                            InputProps={{ sx: { height: 38 } }}
                            className="srch"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* <TextField id="text-field" label="🔍Search" variant="outlined"  size="large" className="srch"  InputProps={{ sx: { height: 38} }}/> */}
                        <Box>

                            <Collapse in={opn}>
                                <h3>Personal Info</h3>
                                <form encType="multipart/form-data" className="form1" onSubmit={addstd} style={{ marginTop: '11px' }}>
                                    {/* <form encType="multipart/form-data" className="form1" onSubmit={id2 ? (editstd) : (addstd)} style={{ marginTop: '11px' }}> */}
                                    <TextField className="txtfld" name="f_name" placeholder="First Name" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="l_name" placeholder="Last Name" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="father_name" placeholder="Father Name" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="address" placeholder="Address" required InputProps={{ sx: { height: 38 } }} />


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

                                    {/* <FormControl></FormControl> */}
                                    <TextField className="txtfld" name="clg_id" placeholder="College Id" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="year" placeholder="Batch" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="contact" placeholder="Contact" required InputProps={{ sx: { height: 38 } }} />
                                    {/* <input type="file" className="txtxfld2 " name="img" /> */}
                                    <h3>Bank Details</h3>
                                    <TextField className="txtfld" name="bank_acc" placeholder="Bank Account Number" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="bank_nm" placeholder="Bank Name" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="branch_add" placeholder=" Branch Address" required InputProps={{ sx: { height: 38 } }} />
                                    <TextField className="txtfld" name="bank_num" placeholder=" Bank Phone Number" required InputProps={{ sx: { height: 38 } }} />
                                    <FormControl fullWidth className="txtfld" required>
                                        {/* {!id2 && ( */}
                                        <InputLabel id="demo-simple-select-label" >Code Type</InputLabel>
                                        {/* )} */}
                                        <Select
                                            sx={{ height: 45 }}
                                            // value={cls}
                                            // onChange={(e) => setcls(e.target.value)}
                                            name="cd"
                                        >
                                            {cd.map((val) => (
                                                <MenuItem value={val.cd1}>{val.cd1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField className="txtfld" name="code_type" placeholder=" NEFT/RTGS/IFSC Code" required InputProps={{ sx: { height: 38 } }} />

                                    <Button variant="contained" onClick={() => filePickerRef.current.click()} style={{ marginBottom: 10 }} fullWidth>upload student image</Button>
                                    <input ref={filePickerRef} type="file" hidden className="txtfld" name="img" />
                                    {prog != 0 ? (
                                        <CircularProgress></CircularProgress>
                                    ) : (
                                        <Button variant="contained" type='submit' fullWidth>Add Student</Button>
                                    )}
                                </form>
                            </Collapse>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 3, xs: 2 }, ml: { md: 25, xs: 0 } }} >
                    <Typography variant="h3">Students</Typography>

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
                                        <b>College Id : </b><br />
                                        <b>Batch : </b><br />
                                        <b>Department : </b><br />

                                    </Box>
                                    <Box>
                                        {val.data.FirstName} {val.data.LastName}<br />
                                        {val.data.ClgId}<br />
                                        {val.data.Year}<br />
                                        {val.data.Class}
                                        <br />
                                        <Button size="small" onClick={() => getdetails(val)}>view details</Button>
                                    </Box>
                                </Grid>
                            ))
                            : book.map((val) => (
                                <Grid item md={3} sm={5} xs={9} sx={{ marginBottom: { sm: 0, xs: 2 }, boxShadow: '0 0 3px dimgrey', padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        <b>Name : </b><br />
                                        <b>College Id : </b><br />
                                        <b>Batch : </b><br />
                                        <b>Department : </b><br />

                                    </Box>
                                    <Box>
                                        {val.data.FirstName} {val.data.LastName}<br />
                                        {val.data.ClgId}<br />
                                        {val.data.Year}<br />
                                        {val.data.Class}<br /><br />
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
                            <p><b>Batch : </b>{year}</p>
                            <p><b>College Id : </b>{clgId}</p>
                            <p><b>Student Id : </b>{s_id} </p>
                            <p><b>Password : </b>{pass}</p>
                            <p><b>Contact : </b>{cot}</p>
                            <p><b>Father Name : </b>{fathername}</p>
                            <p><b>Address : </b>{address}</p>
                            <p><b>Bank Account No : </b>{bankaccountno}</p>
                            <p><b>Bank Name : </b>{bankname}</p>
                            <p><b>Branch Address  : </b>{bankaddress}</p>
                            <p><b>Branch Number : </b>{banknumber}</p>
                            <p><b>Code Type : </b>{codetype}</p>
                            <p><b>Code : </b>{code}</p>



                            {/* <p><b>Father Name : </b>{fatherName}</p> */}

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
                        <h5>Personal Info</h5>
                        <TextField className="txtfld" onChange={(e) => setfnm(e.target.value)} value={fnm} name="f_name" label="First Name" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setlnm(e.target.value)} value={lnm} name="l_name" label="Last Name" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setfathername(e.target.value)} value={fathername} name="father_name" label="Father Name" InputProps={{ sx: { height: 38 } }} />

                        <TextField className="txtfld" onChange={(e) => setaddress(e.target.value)} value={address} name="address" label="Address" InputProps={{ sx: { height: 38 } }} />
                        <FormControl fullWidth className="txtfld">
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
                        <TextField className="txtfld" onChange={(e) => setclgId(e.target.value)} value={clgId} name="clg_id" label="College Id" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setyear(e.target.value)} value={year} name="year" label="Year" InputProps={{ sx: { height: 38 } }} />


                        <TextField className="txtfld" onChange={(e) => setcot(e.target.value)} value={cot} name="contact" label="Contact" InputProps={{ sx: { height: 38 } }} />



                        <TextField className="txtfld" value={s_id} InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" value={pass} InputProps={{ sx: { height: 38 } }} />
                        <h5>Bank Details</h5>
                        <TextField className="txtfld" onChange={(e) => setbankaccno(e.target.value)} value={bankaccountno} name="bankaccountno" label="Bank Account Number" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setbankname(e.target.value)} value={bankname} name="bankname" label="Bank Name" InputProps={{ sx: { height: 38 } }} />
                        <TextField className="txtfld" onChange={(e) => setbankaddress(e.target.value)} value={bankaddress} name="bankaddress" label="Branch Address" InputProps={{ sx: { height: 38 } }} />

                        <TextField className="txtfld" onChange={(e) => setbanknumber(e.target.value)} value={banknumber} name="banknumber" label="Bank Phone Number" InputProps={{ sx: { height: 38 } }} />
                        <FormControl fullWidth className="txtfld">
                            <InputLabel id="demo-simple-select-label" >Code Type</InputLabel>

                            <Select

                                sx={{ height: 45 }}

                                onChange={(e) => setcodetype(e.target.value)} value={codetype}
                                // onChange={(e) => setcls(e.target.value)}
                                name="cd"
                            >
                                {cd.map((val) => (
                                    <MenuItem onChange={(e) => setcodetype(e.target.value)} value={val.cd1}>{val.cd1}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField className="txtfld" onChange={(e) => setcode(e.target.value)} value={code} name="code" label="Code" InputProps={{ sx: { height: 38 } }} />

                        <input type="file" className="txtxfld2 " name="img" required />


                        <Button variant="contained" type='submit' fullWidth>Edit Student</Button>
                    </form>

                </DialogContent>
            </Dialog>

        </>
    )
}