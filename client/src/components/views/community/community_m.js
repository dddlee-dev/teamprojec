import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import LandingPage from '../LandingPage/LandingPage';
//import path from 'path';
//import { response } from 'express';
import Community from './community.js'


export function setpage_(props){}

function Community_m(props) {

    const[Type, settype] = useState(-1)
    const[Page, setpage] = useState(0)
    const[Content, setcontent]  = useState(null)


    useEffect(() => {
        settype(-1)
        setpage(0)
    }, [])

    // function setpage_(t){
    //     console.log(Page)
    //     this.setpage (t)
        
    // }
    // function setpage_(t){
    //     //console.log(this.Page)
    //     //const t = props.t 
    //     setpage (t+1)
    // }

    return (
        

        <div>
            
            <Community Id1={Type} Id2={Page} />
        </div>
    )
}



export default Community_m;

