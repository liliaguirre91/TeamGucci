import React from 'react';
import PayPalButton from './PayPalButton.js';

const CLIENT = {
  sandbox: 'AVNKckm9ldJ3royPVTzmL7it6dXl0reDKlHjqI13rJ9oCoVRGXRH_KvResh4NYjDxNpdGsGJUD3Md2TI',
  production: '',
};

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';
  
class PayPalPage extends React.Component {
    render() {
        const onSuccess = (payment) =>
            console.log('Successful payment!', payment);
        const onError = (error) =>
            console.log('Erroneous payment OR failed to load script!', error);
        const onCancel = (data) =>
            console.log('Cancelled payment!', data);
            
        return (
            <div className="paypal-button">
                <PayPalButton
                    client={CLIENT}
                    env={ENV}
                    commit={true}
                    currency={'USD'}
                    total={1}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}/>
            </div>
        );
    }
}

export default PayPalPage
