import React, { useState, useEffect } from 'react'
import { Icon, Col, Card, Row } from 'antd';

function Productdes(props) {

    const [Desimages, setDesimages] = useState([])

    useEffect(() => {

        if (props.detail.desimages && props.detail.desimages.length > 0) {
            let desimages = []

            props.detail.desimages.map(item => {
                desimages.push(`${item}`)
            })
            setDesimages(desimages)
        }

    }, [props.detail])



    return (
        <div>

                {Desimages.map((desimage, index) => (
                    <div>
                        <Row gutter={[24,24]}>
                            <Col key={index} span={24}>
                                <img style={{width: '100%', height:'auto'}}
                                    src={`http://localhost:5000/${desimage}`}/>
                            </Col>
                        </Row>
                    </div>
                ))}


            </div>
    )
}

export default Productdes
