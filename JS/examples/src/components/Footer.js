import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default function Footer({ tenant }) {

    // const [ time, getTime ] = useState()
    const dateToFormat = new Date()
    return (
        <>
            <div className="container-fluid">
                <hr />
                    <small><Moment>{dateToFormat}</Moment></small>
                    {'   '}
                    <small>Current Tenant: {tenant ? tenant : "log in first"}</small>
            </div>
        </>
    );
}

