import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PrementForm = ({ handlePrement }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [prementError, setPrementError] = useState(null);
    const [prementSuccess, setPrementSuccess] = useState(null);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPrementError(error.message);
            setPrementSuccess(null);
        } else {
            setPrementSuccess(paymentMethod.id);
            setPrementError(null);
            handlePrement(paymentMethod.id);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {prementError && <p className="text-danger mt-3">{prementError}</p>}
            {prementSuccess && (
                <p className="text-success mt-3">Prement Success</p>
            )}
        </>
    );
};

export default PrementForm;
