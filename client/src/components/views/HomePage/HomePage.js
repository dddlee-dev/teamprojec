import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import LandingPage from '../LandingPage/LandingPage';

function HomePage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(1)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품들을 가져오는데 실패 했습니다.")
                }
            })
    }


    const renderCards = Products.map((product) => {

        return <Col >
            <Card 
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
            </Card>
        </Col>
    })



    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            {/* Cards */}
                {renderCards}

            <br />
        <div>
        <LandingPage />
        </div>
        </div>
    )
}

export default HomePage
