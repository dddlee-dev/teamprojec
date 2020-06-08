import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function Productdes(props) {

    const [Desimages, setDesimages] = useState([])

    useEffect(() => {

        if (props.detail.desimages && props.detail.desimages.length > 0) {
            let desimages = []

            props.detail.desimages.map(item => {
                desimages.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setDesimages(desimages)
        }

    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Desimages} />
        </div>
    )
}

export default Productdes
