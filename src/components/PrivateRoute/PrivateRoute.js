import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UseContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggendInUser, setLoggendInUser] = useContext(UseContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggendInUser.email || localStorage.getItem('token') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
