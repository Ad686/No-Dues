import React, { useState } from "react";
import Navbar2 from "./navbar2";
import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { db } from "./firebase";
import { Cancel, CheckBox } from "@mui/icons-material";

function Staffmanagedues() {
   

    var cLgnId = localStorage.getItem("CollegeID");
    const classess = [{ stf1: 'Not Applicable' }, { stf1: 'Hardware Lab' }, { stf1: 'Web Devlopment Lab' }, { stf1: 'College Library ' }, { stf1: 'DBMS Lab' },{ stf1: 'PL-1'},{ stf1: 'PL-2' },{ stf1: 'Hostel' },{ stf1: 'Training and Placement Cell' },{ stf1: 'OS-1 Lab' },{ stf1: 'HPC Lab' },]

    const [book, setbook] = useState([]); //change its place in third step
    
    const [nm, nm1] = useState("");
    const [lnm, lnm1] = useState("");
    const [dpt, dpt1] = useState("");
    const [cId, cId1] = useState("");
    const [btch, btch1] = useState("");
    const [ct, ct1] = useState();
    const [sts, sts1] = useState();
    const[stf,setstf]=useState();
    const[amoun,setamount]=useState();
    const[reas,setreason]=useState();

    const [opn, setopn] = useState(false)
    const [opn2, setopn2] = useState(false)

    const [data, data1] = useState([])
    const [prog, setprog] = useState(0)

    function getIssRqst() {
        db.collection("IssueRequest").onSnapshot((succ) => {
            var ar = [];
            succ.forEach(element => {
                ar.push(element)
            });
            data1(ar)
        })
    }
    useEffect(() => {
        getIssRqst();
    }, [])
    console.log(sts)

    const [issuId, issuId1] = useState("")
    function rqstAccpt(x) {
            db.collection("IssueRequest").doc(x.id).update({
                Status: 1
            }).then((succ) => {
                alert("Request Accepted");
            }).catch((err) => {
                alert("Error Occured")
            })
    }
    function adddues(){
        setopn2(!opn2)

    }
    function updatedue(e){
        e.preventDefault();

        var d = new FormData(e.currentTarget);

        var staff = d.get('stf');
        var amount = d.get('amount')
        var reason = d.get('reason')
        console.log(staff)

        db.collection("Add_Dues").add({
            Facility: staff,
            Amount: amount,
            Reason:reason
            // Date:  firebase.firestore.FieldValue.serverTimestamp()
        }).then((succ) => {
            
            setprog(0)
            e.target.reset()
            getstd()
            e.target.value = ''
            setopn(!opn)
            alert("data added")
        })

    }
    function getstd() {
        var ar = []
        db.collection('Add_Dues').orderBy('Date', 'desc').get().then((succ) => {
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

 
    return (
        <>
            <Navbar2 />
            <Grid container className="">&nbsp;&nbsp;&nbsp;&nbsp;
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h5"> Manage Dues</Typography>

                    <Paper className="container1" elevation={0} sx={{ height: 'calc(100vh - 150px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>First Name</b></TableCell>
                                    <TableCell><b>Last Name</b></TableCell>
                                    <TableCell><b>Department</b></TableCell>
                                    <TableCell><b>College ID</b></TableCell>
                                    <TableCell><b>Dues</b></TableCell>
                                    {/* <TableCell><b>Contact</b></TableCell> */}
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key="">
                                        <TableCell>{row.data().FirstName}</TableCell>
                                        <TableCell>{row.data().LastName}</TableCell>
                                        <TableCell>{row.data().Class}</TableCell>
                                        <TableCell>{row.data().ClgId}</TableCell>
                                        <TableCell>{row.data().Amount}</TableCell>
                                        {/* <TableCell>{row.data().Contact}</TableCell> */}
                                        <TableCell><Button variant="outlined"  onClick={() => adddues()}>Add Dues</Button></TableCell>
                                        <TableCell><Button variant="outlined">View Dues</Button></TableCell>

                                     
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                    
            <Dialog open={opn2} onClose={() => setopn2(!opn2)}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <Box className="d-flex3" width={400}>
                        <Box>
                        <h4>Add Dues</h4>
                        <h5>Student Name:</h5>
                                    <br/>
                        <form onSubmit={updatedue}>
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
                                            {classess.map((row) => (
                                                <MenuItem value={row.stf1}>{row.stf1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>   
                        <FormControl fullWidth ><TextField className="txtfld" name="amount" placeholder="Amount In  &#8377;" required InputProps={{ sx: { height: 38 } }} /></FormControl>
                        <FormControl fullWidth ><TextField className="txtfld" name="reason" placeholder="Reason Of Penalty" required InputProps={{ sx: { height: 38 } }} /></FormControl>
                        <Button variant="contained" type="submit">update</Button>
                    </form>
                        </Box>
                      
                    </Box>
                
                </DialogContent>
               
            </Dialog>
                </Grid>
            </Grid>
        </>
    )
}
export default Staffmanagedues;