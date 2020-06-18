import React, { useState } from 'react'
import { Button, Descriptions, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';


function ProductInfo(props) {
    const [Continent, setContinent] = useState(1)
    const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail._id))

    }

    const editclickHandler = () => {

    }

    
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    return (
        <div>
            <Descriptions title="상품 정보">
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Row gutter={[24, 24]}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
                
                </Row>
            </div>


        </div>
    )
}

export default ProductInfo
