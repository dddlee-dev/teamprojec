import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import LandingPage from '../LandingPage/LandingPage';
import Community from './community.js'
//import path from 'path';
//import { response } from 'express';



function Comm_con(props) {
    
    const [loading, setLoading] = useState(true)
        
    const Id1 = props.match.params.pageId 
    const Id2 = props.match.params.pageId2
    const Id3 = props.match.params.pageId3


    const re_url=`/community/${Id1}/${Id2}`
    
    const [board, setboard] = useState({})
   
    useEffect(() => {
        axios.get(`http://localhost:5000/community/${Id1}/${Id2}/${Id3}`)
        .then(data => {
            setboard(data.data[0])
            
            setLoading(false)
            })
        .catch(err => alert(err))
    }, [])
  
    console.log(board)





    if (loading) return <div>Loading...</div>

    return (
        

        <div>
            <h1>{board[0].title}</h1>
            <p>추천 = {board[0].recommend}</p>
            <p>조회수 = {board[0].view}</p>
            <hr/>
            <p>{board[0].nick}님</p>
            <p>{board[0].date}</p>
            <div id="content">{board[0].content}</div>
            <button onclick="recommed_plus()"><a>{board[0].recommend} 추천하기</a></button>
            <hr/>
            
        </div>
    )
}

export default Comm_con;