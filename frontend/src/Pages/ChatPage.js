import React, { useEffect, useState } from 'react'
import axios from "axios"

export const ChatPage = () => {
    const [chat,setchats]=useState([]);

    const fetchchats=async()=>{
        const {data}=await axios.get('/api/chat');
        setchats(data);

    }
    useEffect(()=>{
        fetchchats();

    },[])


  return (
    <div>{chat.map((chat)=>(
        <div key={chat._id}>{chat.chatName}</div>
    ))}</div>
  )
}
