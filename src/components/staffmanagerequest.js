import React from "react";
import Navbar2 from "./navbar2";
import { Grid, Paper, Table,  TableCell, TableHead, TableRow, Typography } from "@mui/material";
function staffmanagerequest(){
    return(
        <>
            <Navbar2/>
            <Grid container className="">&nbsp;&nbsp;&nbsp;&nbsp;
                <Grid item lg={10} md={10} sm={12} xs={12} sx={{ mt: { md: 10, xs: 10 }, ml: { md: 25, sm: 0 } }} >
                    <Typography variant="h5"> Request</Typography>
                    
                    <Paper className="container1" elevation={0} sx={{ height: 'calc(100vh - 150px)', borderTop: '5px solid darkblue', overflowX: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Father Name</b></TableCell>
                                    <TableCell><b>Department</b></TableCell>
                                    <TableCell><b>College ID</b></TableCell>
                                    <TableCell><b>Batch</b></TableCell>
                                    <TableCell><b>Contact</b></TableCell>                
                                    <TableCell colSpan={2} sx={{ textAlign: 'center' }}><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                           
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
export default staffmanagerequest;