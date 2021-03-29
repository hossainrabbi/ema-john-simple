import React from 'react';

const Inventory = () => {
    const handleClick = () => {
        const product = {};
        fetch('http://localhost:8000/addproduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <form>
            <label htmlFor="">Product Name</label>
            <input type="text" /> <br />
            <label htmlFor="">Product Price</label>
            <input type="text" />
            <br />
            <label htmlFor="">Product Image</label>
            <input type="file" />
            <br />
            <button onClick={handleClick}>Add Product</button>
        </form>
    );
};

export default Inventory;
