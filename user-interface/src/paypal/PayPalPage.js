import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import "./PayPalPage.css";

class PayPalPage extends React.Component {
    render() {
        return (
            <div className="paypal-button" align="center">
                <PayPalButton
                    amount="0.01"
                    onSuccess={(details, data) => {
                        alert("HELLO1");
                        alert("Transaction completed by " + JSON.stringify(details.purchase_units[0].shipping.address));
            
                    // This is where we will make our order
                    /*return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                        orderId: data.orderID
                        })
                    });*/
                    }}
                    onError={(details, data) => {
                        alert("HELLO");
                    }}
                    options={{
                        clientId: "AVNKckm9ldJ3royPVTzmL7it6dXl0reDKlHjqI13rJ9oCoVRGXRH_KvResh4NYjDxNpdGsGJUD3Md2TI"
                    }}
                />
            </div>
        );
    }
}

export default PayPalPage;
