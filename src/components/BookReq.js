import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db, storage } from "./firebase";
import Navbar2 from "./navbar2";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";

export default function BookReq() {

   var navi = useNavigate()
   const classes = [{ cls1: 'Mechanical' }, { cls1: 'Civil' }, { cls1: 'Information technology' }, { cls1: 'Computer Science ' }, { cls1: 'Electrical' },{ cls1: 'Electronics and Communications'},{ cls1: 'Production' },]

   var lib = localStorage.getItem("LibrarianID")

   // useEffect(() => {
   //    if (!lib) {
   //       alert("login first")
   //       navi("/")
   //    }
   // }, [])
   const[cls, setcls]=useState('')

   const [prog, setprog] = useState(0)
   function request(e) {
      e.preventDefault();
      var d = new FormData(e.currentTarget);
      var img = d.get('img')
      var title = d.get("title").toLocaleLowerCase()
      var year = d.get("author").toLocaleLowerCase()
      var publisher = d.get("publisher").toLocaleLowerCase()
      var author = d.get("author").toLocaleLowerCase()
      var cls = d.get("cls").toLocaleLowerCase()
      // var publisher = Number(d.get("year"))

      var alpha = /[A-Z a-z,'&.+]/
      var abc = []

      for (var i = 0; i < title.length; i++) {
         if (!alpha.test(title[i])) {
            abc.push(title[i])
            // settit("")
            // e.target.title.reset()
         }
      }

      for (var i = 0; i < publisher.length; i++) {
         if (!alpha.test(publisher[i])) {
            abc.push(publisher[i])
            // setpub("")
            // e.target.publisher.reset()
         }
      }

      for (var i = 0; i < author.length; i++) {
         if (!alpha.test(author[i])) {
            abc.push(author[i])
            // setauth("")
            // e.target.author.reset()
         }
      }

      console.log(abc)
      if (abc != '') {
         alert("enter alphabers only")
      }
      else {
         setprog(1)
         var st_ref = storage.ref("/req_books/" + img.name).put(img);
         st_ref.then((succ) => {
            st_ref.snapshot.ref.getDownloadURL().then((url) => {
               db.collection("Req_Books").add({
                  Title: title,
                  Author: author,
                  Publisher: publisher,
                  Category:cls,
                  // Year: year,
                  Image: url,
                  Date: firebase.firestore.FieldValue.serverTimestamp()
               }).then((succ) => {
                  alert("request sent")
                  setprog(0)
                  e.target.reset()
                  // setimg("")
               })
            })
         })
      }
   }

   const filePickerRef = useRef(null);

   return (
      <>
         <Navbar2 />
         <Grid container className="d-flex">
            <Grid item lg={5} md={5} sm={8} xs={10} sx={{ mt: { md: 10, xs: 10 } }} >
               <Typography variant="h3">Requesting Book</Typography>
               <form className="form1" onSubmit={request}>
                  <TextField className="txtfld" name="title" placeholder="Book Title" InputProps={{ sx: { height: 38 } }} />
                  <TextField className="txtfld" name="author" placeholder="Author Name" InputProps={{ sx: { height: 38 } }} />
                  <TextField className="txtfld" name="publisher" placeholder="Publisher" InputProps={{ sx: { height: 38 } }} />
                <FormControl fullWidth className="txtfld">
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select
                                            sx={{ height: 45 }}
                                            className="txtfld"
                                            value={cls}
                                            onChange={(e) => setcls(e.target.value)}
                                            name="cls"
                                        >
                                            {classes.map((val) => (
                                                <MenuItem value={val.cls1}>{val.cls1}</MenuItem>
                                            ))}
                                        </Select>
                                        </FormControl>
                  {/* <TextField className="txtfld" name="year" placeholder="Year" InputProps={{ sx: { height: 38 } }} /> */}
                  {/* <TextField className="txtfld" hidden={true} type='file' name="img" InputProps={{ sx: { height: 40 } }} /> */}
                  <Button variant="contained" onClick={() => filePickerRef.current.click()} style={{ marginBottom: 10 }} fullWidth>UPLOAD BOOK IMAGE</Button>
                  <input ref={filePickerRef} type="file" hidden className="txtfld" name="img" />
                  {prog == 0 ? (
                     <Button variant="contained" type='submit' fullWidth>Send Request</Button>
                  ) : (
                     <>Sending Request</>
                  )}
               </form>
            </Grid>
         </Grid>
      </>
   )
}

