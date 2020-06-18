import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Row, Table, Collapse, Comment, List, Card } from 'antd';
import { Divider, Header, Image, Segment } from 'semantic-ui-react'
import "./BoardPage.css"
import axios from "axios";

import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import LandingPage from '../LandingPage/LandingPage';
import Community from './community.js'
//import path from 'path';
//import { response } from 'express';
//import CommentPage from './CommentPage'


const { Panel } = Collapse;
function Cons(props){

    const [loading1, setLoading1] = useState(true)
        
    const Id1 = props.match.params.pageId 
    const Id2 = props.match.params.pageId2
    const Id3 = props.match.params.pageId3


    const re_url=`/community/${Id1}/${Id2}`
    
    const [board1, setboard1] = useState({})
   
    useEffect(() => {
        axios.get(`http://localhost:5000/community/${Id1}/${Id2}/${Id3}`)
        .then(data => {
            setboard1(data.data[0])
            
            setLoading1(false)
            })
        .catch(err => alert(err))
    }, [])

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        //render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }];
    const dataSource = [];
    for(let i=0; i<50;i++){
        dataSource.push({
          key: i,
          name: `temp ${i}`,
          age: 32,
          address: `10 Downing Street, ${i}`
        })
    }
      
    const DividerExampleClearing = () => (
      <Segment>
        <Header as='h2' floated='right'>
          Floated Content
        </Header>
    
        <Divider clearing />
        <Image src='/images/wireframe/short-paragraph.png' />
      </Segment>
    )

    if (loading1) return <div>Loading...</div>
    return (
        <div style={{ width: '75%', padding: '3rem 4rem' }}>

<Card>


        <div>
          
            <div class="ui segment">
            <h2 class="ui right floated header">게시판</h2>
            </div>
            <div>
        <table>
            <thead><tr><th colspan="3">{board1[0].title}</th></tr></thead>
            <tr>
              <td style={{border: '1px solid #ffffff'}}>번호 : {Id3}</td>
              <td style={{border: '1px solid #ffffff'}}>작성자 : {board1[0].nick}</td>
              <td style={{border: '1px solid #ffffff', textAlign:'right'}}>조회 : {board1[0].view}</td>
            </tr>
            <tr>
              <td style={{border: '1px solid #ffffff', borderBottomColor: '#dddddd'}}>평점 : {board1[0].recommend}</td>
              <td style={{textAlign:'right', border: '1px solid #ffffff', borderBottomColor: '#dddddd'}} colspan="2">작성일 : {board1[0].date}</td>
            </tr>
            <tr>
            <td colspan="3" style={{border: '1px solid #dddddd'}}>
              <br/>
              {board1[0].content}
              <br/>
              </td>
            </tr>
        </table>
            <div>

            </div>
        </div>
        </div>
        
        </Card>

        
  </div>
    
    
    )
    
}

export default Cons