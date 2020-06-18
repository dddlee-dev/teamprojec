import React, { useState } from 'react'
import { Button, Descriptions, Row, Table, Collapse, Comment, List, Card } from 'antd';
import { Divider, Header, Image, Segment } from 'semantic-ui-react'
import "./BoardPage.css"
//import CommentPage from './CommentPage'


const { Panel } = Collapse;
function BoardPage(props){

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

    return (
        <div style={{ width: '75%', padding: '3rem 4rem' }}>

<Card>
        <div>
          
            <div class="ui segment">
            <h2 class="ui right floated header">게시판</h2>
            </div>
            <div>
        <table>
            <thead><tr><th colspan="3">제목</th></tr></thead>
            <tr>
              <td style={{border: '1px solid #ffffff'}}>번호 : 1</td>
              <td style={{border: '1px solid #ffffff'}}>작성자 : abc</td>
              <td style={{border: '1px solid #ffffff', textAlign:'right'}}>조회 : 3</td>
            </tr>
            <tr>
              <td style={{border: '1px solid #ffffff', borderBottomColor: '#dddddd'}}>평점 : 5</td>
              <td style={{textAlign:'right', border: '1px solid #ffffff', borderBottomColor: '#dddddd'}} colspan="2">작성일 : 2020.06.11</td>
            </tr>
            <tr>
            <td colspan="3" style={{border: '1px solid #dddddd'}}>
              <br/>
              내용내용
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

export default BoardPage