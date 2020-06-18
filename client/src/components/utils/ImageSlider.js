import React from 'react'
import { Icon, Col, Card, Row, Carousel } from 'antd'

function ImageSlider(props) {
    return (
        <div>
            <Carousel>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img width= '200px' Height='150px' 
                            src={`http://localhost:5000/${image}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
