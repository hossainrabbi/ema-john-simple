import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prodact from '../Prodact/Prodact';

const ProdactDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://sleepy-cliffs-58288.herokuapp.com/product/${productKey}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [productKey]);

    return (
        <div>
            <Prodact addToCart={false} prodact={product} />
        </div>
    );
};

export default ProdactDetail;
