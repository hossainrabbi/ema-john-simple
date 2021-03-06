import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UseContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPrement from '../ProcessPrement/ProcessPrement';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UseContext);
    const [shipmentData, setShipmentData] = useState(null);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        setShipmentData(data);
    };

    const handlePrementSubmit = (paymentId) => {
        const saveCart = getDatabaseCart();
        const orderdetails = {
            ...loggedInUser,
            products: saveCart,
            shipment: shipmentData,
            paymentId,
            orderTime: new Date(),
        };

        fetch('https://sleepy-cliffs-58288.herokuapp.com/addorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderdetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    alert('Order added successfully');
                    processOrder();
                } else {
                    alert('Order not added!');
                }
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div
                    className="col-md-6"
                    style={{ display: shipmentData ? 'none' : 'block' }}
                >
                    <form
                        className="shipment-from"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            name="name"
                            defaultValue={loggedInUser.name}
                            ref={register({ required: true })}
                        />
                        {errors.name && (
                            <span className="error">Name is required</span>
                        )}

                        <input
                            name="email"
                            defaultValue={loggedInUser.email}
                            ref={register({ required: true })}
                        />
                        {errors.email && (
                            <span className="error">Email is required</span>
                        )}

                        <input
                            name="address"
                            ref={register({ required: true })}
                        />
                        {errors.address && (
                            <span className="error">Address is required</span>
                        )}
                        <input type="submit" />
                    </form>
                </div>
                <div
                    className="col-md-6"
                    style={{ display: shipmentData ? 'block' : 'none' }}
                >
                    <ProcessPrement handlePrement={handlePrementSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Shipment;
