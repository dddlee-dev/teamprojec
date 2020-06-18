import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import Productdes from './Sections/Productdes';
import ProductReview from './Sections/ProductReview'
//import ProductGraph from './Sections/ProductGraph';
import { Row, Col } from 'antd';

function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})
    const [Product2, setProduct2] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0][0])
                setProduct2(response.data[1])
            })
            .catch(err => alert(err))
    }, [])
    
    const slideHypo=()=>{
        if(Product.continents===1){     //재배기인지 아닌지 감별
            return (
                <ProductImage detail={Product} />       //슬라이드
                // <ProductGraph />
            )
        }else{
            return (
            <br />
            )
        }
    }

    return (
        <div style={{ marginTop: '3rem', width: '75%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
                <br />
                <br />
                
                {/* {if(Product.continents===1)} */}
                <br />
                
                    <Productdes detail={Product} />
                    <br />
                    <br />
                    <ProductReview detail={Product2}/>


        </div>
    )
}

export default DetailProductPage
