
import { CollectionsBookmark, FeaturedPlayList, LibraryAdd, LibraryBooks, People, PowerSettingsNew } from "@mui/icons-material";
import { Box, Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";
function Navbar(){
    function logout(){

    }
    function page(){
        
    }
    return(
        <>
            
          <Grid container sx={{ display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' } }}>
                <Grid item lg={2} className="sidebar" >
                    <Box>
                        <List>
                        <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("allbooks")}>
                                    <LibraryBooks />All Books
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("issuerequest")}>
                                    <CollectionsBookmark />Issue Request
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            {/* <ListItem>
                                <ListItemButton onClick={() => page("bookrequests")}>
                                    <FeaturedPlayList />Book Request
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("AllBookIssued")}>
                                    <FeaturedPlayList />Books Issued
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            
                            <ListItem>
                                <ListItemButton onClick={() => page("addbook")}>
                                    <LibraryAdd />Add Book
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemButton onClick={() => page("managestudents")}>
                                    <People />Manage Stds
                                </ListItemButton>
                            </ListItem>
                            <Divider /> */}
                            <ListItem>
                                <ListItemButton onClick={logout}>
                                    <PowerSettingsNew />Logout
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default Navbar;

