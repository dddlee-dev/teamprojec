import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import LandingPage from '../LandingPage/LandingPage';
//import path from 'path';
//import { response } from 'express';
import setpage_ from './community_m.js'



function Community(props) {
    
    const [loading, setLoading] = useState(true)
        
    const Id1 = props.Id1 
    const Id2 = props.Id2
    const s = props.sp

    const b = Number(Id2) - 1
    const b_l = `./${b}`
    const n = Number(Id2) + 1
    const n_l = `./${n}`

    


    
    const [board, setboard] = useState({})
    const [list, setpl] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:5000/community/${Id1}/${Id2}`)
        .then(data => {
            setboard(data.data[0])
            setpl(data.data[1])
            setLoading(false)
            })
        .catch(err => alert(err))
    }, [])
  
    // console.log("커뮤니티 테스트 : ")
    // console.log(board)
    // console.log(list)



    var rows = []
    for (var i = 0; i < (list/20); i++) {
        if(Number(Id2) !== i)
        {
            rows.push([`./${i}`,i+1])
        }
        else{
            rows.push([0,i+1])
        }
    }

    // function next(Id2) {
    //     // console.log("클릭")
    //     // setpage_( Id2 + 1)
    //     // console.log("클릭2")
    //     s
    // }



    if (loading) return <div>Loading...</div>

    return (
        

        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>추천</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>

                {board.map((contact) => (
                     <tr>
                        <td>{contact.num}</td>
                        <td>{contact.recommend}</td>                   
                        <td><a href={contact.title_l}>{contact.title}</a></td>
                        <td>{contact.nick}</td>
                        <td>{contact.date}</td>
                        <td>{contact.view}</td> 
                        </tr>
                ))}
                </tbody>
            </table> 
            
             
            <p>
                { Number(Id2) !== 0 ? <a href={b_l}>◀이전  </a> : <a></a> }
                {rows.map((num) => (
                    num[0] == 0 ? <a >{num[1]}</a> : <a href={num[0]}>{num[1]} </a>
                ))}
                { Number(Id2) !== list/20 ? <a href={n_l}>다음▶</a> : <a></a> }
            </p>

        </div>
    )
}

export default Community;