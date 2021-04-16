import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PrementForm from './PrementForm';
import SplitForm from './SplitForm';

const stripePromise = loadStripe(
    'pk_test_51Ie7tmLRpmAZQyNw2gWFqNUAPCQzTm7DxPO0yRVy2pLzGqZooS0EK0FRwEs8cyDvWq7NiTW0YOk3OeNfhX4rqIli00uc51XnIk'
);

const ProcessPrement = ({ handlePrement }) => {
    return (
        <Elements stripe={stripePromise}>
            <PrementForm handlePrement={handlePrement} />
            {/* <SplitForm /> */}
        </Elements>
    );
};

export default ProcessPrement;
