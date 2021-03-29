import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prodact from '../Prodact/Prodact';

const ProdactDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8000/product/${productKey}`)
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
