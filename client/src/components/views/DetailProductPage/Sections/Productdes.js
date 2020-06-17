import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';
import { FaSun } from 'react-icons/fa';

function Productdes(props) {

    const [Desimages, setDesimages] = useState([])
    //const [Desimage, setDesimage] = useState([])

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

            // let desi = []
            // desi.push('http://localhost:5000/uploads/sun.jpg');
            // desi.push('http://localhost:5000/uploads/delivery.jpg');
            // setDesimage(desi)
        
        }

    }, [props.detail])

    // if(props.detail.continents == 2)
    // {
    // return (
    //     <div>
    //         <ImageGallery items={Desimage} />
    //         <ImageGallery items={Desimages} />
            
    //     </div>
    // )
    // }else{
    return (
        <div>
            <ImageGallery items={Desimages} />
        </div>
        )
    // }
}

export default Productdes
