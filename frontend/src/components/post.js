import { DeletePostAPI, UpdatePostAPI } from "../api";
import { decodeToken } from "react-jwt";
import { useState } from "react";
import CreateComment from "./createComment";
import Comment from "./comment";
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";




export default function Post ({ id, createdAt, imageUrl, title, content, userId, refresh, User }) {
    const [titleValue, setTitleValue] = useState(title);
    const [contentValue, setContentValue] = useState(content);
    const [isEdit, setIsEdit] = useState(false);

    const token = localStorage.getItem('token');
    const myDecodedToken = decodeToken(token);

    const newDate = new Date(createdAt)

    const shouldDisabled = (isAdmin, userId, userIdPost) => {
        if (isAdmin) return (false);
        
        return userId !== userIdPost;
    }

    async function DeletePost(postId) {
        try{
            await DeletePostAPI(token, postId);
            refresh()
        }catch(err){
            console.log(err);
        }
    }

    const OnEdit = async () => {
        try {
            await UpdatePostAPI(token, id, { title: titleValue, content: contentValue });
        } catch (err) {
            console.log(err);
        }
    }

    if (isEdit) {
        return (
          <div style={{ border: "solid 2px red", padding: "25px" }} >
          <form onSubmit={OnEdit}>
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
              noValidate
              autoComplete="off"
            >
          <TextField
            id="outlined-name"
            label="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          /> <br></br>
          <TextField
            id="outlined-name"
            label="your post..."
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          /> <br></br>
        </Box>
        <Button type='submit' variant="contained" endIcon={<SendIcon />}>
            Update !
          </Button>
    </form>
        </div>
        )
    }

    return (
      <Card sx={{ maxWidth: 345 }} style={{ border: "solid 1px 1px 1px 0 green", marginTop: "10px" }} >
      <CardHeader
        avatar={
          <Avatar alt="img profil" src={`http://localhost:3001/images/${User.imageUrl || 'no-image.png'}`} />
        }
        title={titleValue}
        subheader= {newDate.toUTCString()}
      />
      {!shouldDisabled(myDecodedToken.isAdmin, myDecodedToken.userId, userId) && 
             <>
                 <EditOutlinedIcon  onClick={() => setIsEdit(true)} style={{ color: 'grey', cursor: "pointer" }} />
               <DeleteIcon onClick={() => DeletePost(id)} style={{ color: 'red', cursor: "pointer" }} />       
            </>
        }
      <CardMedia
        component="img"
        height="194"
        image={`http://localhost:3001/images/${imageUrl || 'no-image.png'}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {contentValue}
        </Typography>
      </CardContent>
        <Comment token={token} postId={id} />
        <CreateComment postId={id}/>
    </Card>
    )
}
            