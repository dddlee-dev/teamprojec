import React, { useEffect, useState } from 'react'
import { Table } from 'antd';

function TablePage(props){
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
          address: `10 Downing Street, ${i}`,
          description: `Hello! ${i}`
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

export default TablePage