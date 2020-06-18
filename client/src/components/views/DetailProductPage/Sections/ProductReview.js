import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';



function ProductReview(props){



  //const [loading1, setLoading1] = useState(true)
        
  const loading1 = props.detail
  console.log(loading1)
  console.log(loading1.length)
  const [board1, setboard1] = useState({})
  useEffect(() => {
    setboard1(loading1)
    
    console.log(board1.title)
  }, [])
  
  // const [board1, setboard1] = useState({})
 
  // useEffect(() => {
  //     // axios.get(`http://localhost:5000/community/comment/${Id1}`)
  //     // .then(data => {
  //     //   console.log(data.data)
  //     //     setboard1(data.data[0])
          
  //     //     setLoading1(false)
  //     //     })
  //     // .catch(err => alert(err))
  // }, [])

  const columns = [{
    title: '작성시간',
    dataIndex: 'a',
    key: 'a',
    //render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '제목',
    dataIndex: 'b',
    key: 'b',
  }, {
    title: '작성자',
    dataIndex: 'c',
    key: 'c',
  }, {
    title: '평점',
    dataIndex: 'd',
    key: 'd',
  }];
const dataSource = [];
for(let i=0; i<loading1.length;i++){
    dataSource.push({
      key: i,
      a: loading1[i].date,
      b: loading1[i].title,
      c: loading1[i].nick,
      d:loading1[i].start,
      description: loading1[i].description
    })

}
  


return (
    <div>
        <Table columns={columns} 
        expandedRowRender={ record => (
        <p style={{ margin: 0 }}>{record.description}</p>)}
        dataSource={dataSource} />
    </div>
)
}

export default ProductReview