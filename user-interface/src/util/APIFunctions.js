//APIFunctions.js holds all of the http requests sent to the API
//This file is used to organize the API functions and reduce duplicate informtaion

//Access Token is the token given to React from the API on successful login
import { ACCESS_TOKEN } from '../constants'

//APIRequest is the information used by all of the API calls
//so it is declared and set to hold the information for each function to use
const APIRequest = (options) => {
    //headers holds all of the headers for the API calls
    //the first piece of information tells the API what format the information
    //passed to it will be in
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    //The next piece of information in the header is the access token
    //from the login. This tells the API what functions the current user can use.
    if(localStorage.getItem(ACCESS_TOKEN)) {
         headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }
   //Defaults and options are used to hold the header for all of the API functions
   const defaults = { headers: headers };
   options = Object.assign({}, defaults, options);
   
   //Will have to change name to json, this inly works for createAccount. 
   //fetch runs the API call with the options specified above
   return fetch(options.url, options)
};

//createAccount is used by a customer to make a user account
//it is expecting a json object with a name, email, and password in it
//these are sent to the api to create and store this user in the database
//it sends a post http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function createAccount(signupRequest) {
   return APIRequest({
      url: '/api/auth/signup',
      method: 'POST',
      body: JSON.stringify(signupRequest)
   })
   .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
}

//createAdmin is used by the ROOT admin user to make a
//regular admin. This function is expecting a json object with
//name, email, and password and returns the api response
//The response is whether or not the api was able to create the admin
//it sends a post http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function createAdmin(adminInfo) {
   return APIRequest({
      url: '/api/users/createAdmin',
      method: 'POST',
      body: JSON.stringify(adminInfo)
   })
   .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
}
//orderCount is used to count the number of orderss in a campaign
//it is expecting a number and it returns a number which is the number 
//of orders in the campaign that was given to it
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function orderCount( camp ){
   return APIRequest({
      url: '/api/orders/count/' + camp,
      method: 'GET'
   })
   .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
}
//amountPaid is used to count the amount of money earned in a campaign
//it is expecting a number and it returns a number which is the total 
//amount paid in the campaign that was given to it
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function amountPaid( camp ){
   return APIRequest({
      url: '/api/orders/total/' + camp,
      method: 'GET'
   })
   .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
}
//getTotalCost is used to count the total amount expected to be paid in a campaign
//it is expecting a number and it returns a number which is the total 
//amount expected in the campaign that was given to it
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function getTotalCost( camp ){
    return APIRequest({
       url: '/api/orders/totalCost/' + camp,
       method: 'GET'
    })
    .then(response =>
         response.json().then(json => {
             if(!response.ok) {
                 return Promise.reject(json);
             }
             return json;
         })
     );
 }
//login is used by a customer to login into their user account
//it is expecting a json object with a email, and password in it
//these are sent to the api to verify this user in the database and return an access token
//it sends a post http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function login(loginRequest) {
    return APIRequest({
        url: 'api/auth/signin',
        method: 'POST',
        body: JSON.stringify(loginRequest)
    })
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
     );
}
//createOrder is used to make an order it is expecting a json object with an 
//address, name, campaign, total cost, amount paid and phone in it
//these are sent to the api to create and store this order in the database
//it sends a post http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function createOrder(orderInfo) {
   return APIRequest({
      url:'/api/orders/create',
      method: 'POST',
      body: JSON.stringify(orderInfo)
   })
   .then(response =>
      response.json().then(json => {
         if(!response.ok) {
            return Promise.reject(json);
         }
         return json;
      })
    );
}
//createCampaign is used by an admin to make a new campaign it is expecting
//a json object with a year in it this is sent to the api to create and store 
//this campaign in the database the database also sets this new campaign to false
//it sends a post http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function createCampaign(campaignInfo) {
   return APIRequest({
      url:'/api/campaigns/create',
      method: 'POST',
      body: JSON.stringify(campaignInfo)
   })
   .then(response =>
      response.json().then(json => {
         if(!response.ok) {
            return Promise.reject(json);
         }
         return json;
      })
    );
}
//deleteCampaign is used by an admin to delete a campaign it is expecting
//a number which is the yearRan of the campaign that is wanted to be deleted
//this function can only be ran by an admin otherwise it doesn't run
//it sends a delete http request to the url specified by proxy followed by the url
//set in this function with  the previously defined headers
export function deleteCampaign(campaignInfo) {
   return APIRequest({
      url:'/api/campaigns/' + campaignInfo,
      method: 'DELETE'
   })
   .then(response =>
      response.json().then(json => {
         if(!response.ok) {
            return Promise.reject(json);
         }
         return json;
      })
    );
}
//createProductsOrdered is used to add a product to an order it is expecting
//a json object which contains the order number, the product number and the 
//quantity of that product that needs to be added to that order
//these are sent to the api to create and store this information in the database
//it sends a post http request to the url specified by proxy followed by the url
//set in this function with the paramater as the body and the previously
//defined headers
export function createProductsOrdered(productsOrdered) {
   return APIRequest({
      url:'http://localhost:5555/api/productOrdered/create',
      method: 'POST',
      body: JSON.stringify(productsOrdered)
   })
   .then(response =>
      response.text().then(json => {
         if(!response.ok) {
            return Promise.reject(json);
         }
         return json;
      })
    );
}
//lookupOrder is used to get information about an order based on its order id
//it is expecting a number that is the order number that is being querried
//this is sent to the api to get this order from the database and return it
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function lookupOrder(orderNumber) {
   return APIRequest({
      url: '/api/orders/search/' + orderNumber,
      method: 'GET'
   })
   .then(response =>
      response.text().then(result => {
         if(!response.ok) {
            return Promise.reject(result);
         }
         return result;
      })
    );
}
//getProducts is used to get all products in a campaign it is expecting
//a number which is the campaign that the products are wanted from
//the parameter is sent to the api to get these products from the database and return them
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function getProducts(campaign) {
    return APIRequest({
        url:'api/products/camp/' + campaign,
        method: 'GET'
    })
    .then(response =>
      response.json().then(data => {
         if(!response.ok) {
            return Promise.reject(data);
         }
         return data;
      })
    );
}
//getProduct is used to get information about an order based on its product id
//it is expecting a number that is the product number that is being querried
//this is sent to the api to get this product from the database and return it
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function getProduct(productID) {
    return APIRequest({
        url:'api/products/' + productID,
        method: 'GET'
    })
    .then(response =>
        response.json().then(result => {
            if(!response.ok) {
                return Promise.reject(result);
            }
            return result;
        })
    );
}
//checkEmail is used to check whether an email is already registered to a user
//this function is expecting a string which is the email this is sent to the api 
//to check the email and see if it is in the database and indicate as such
//it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function checkEmail(email) {
    return APIRequest({
        url:'api/users/check/' + email ,
        method: 'GET'
    })
    .then(response =>
      response.text().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
     );
}
//getCurrentUser is used to get the information related to the user who is currently 
//logged in this function takes no parameters and instead simply requests info from the 
//database it sends a get http request to the url specified by proxy followed by the url
//set in this function with the previously defined headers
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return APIRequest({
        url: 'api/user/me',
        method: 'GET'
    })
    .then(response =>
      response.json().then(json => {
         if(!response.ok) {
            return Promise.reject(json);
         }
         return json;
      })
    );
}

export function getOrdersNotDelivered(campaign) {
    return APIRequest({
        url:'api/orders/deliver/' + campaign ,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}   

export function getOrdersDelivered(campaign) {
    return APIRequest({
        url:'api/orders/delivered/' + campaign ,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}  

export function getOrders(campaign) {
    return APIRequest({
        url:'api/orders/campaign/' + campaign ,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}   

export function getProductsOrdered(orderNumber) {
    return APIRequest({
        url:'api/productOrdered/' + orderNumber ,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}

export function createProduct( newProduct ){
   return APIRequest({
      url:'api/products/create',
      method: 'POST',
      body: JSON.stringify( newProduct )
  })
  .then(response =>
    response.json().then(result => {
        if(!response.ok) {
            return Promise.reject(result);
        }
        return result;
    })
  );
}  

export function updateProduct( productID, product ){
   return APIRequest({
      url:'api/products/' + productID,
      method: 'PUT',
      body: JSON.stringify( product )
  })
  .then(response =>
    response.json().then(result => {
        if(!response.ok) {
            return Promise.reject(result);
        }
        return result;
    })
  );
}  


export function setCampaign(campNumber) {
    return APIRequest({
        url:'api/campaigns/current/' + campNumber ,
        method: 'PUT'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}
export function getCampaign() {
    return APIRequest({
        url:'api/campaigns/current' ,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}
export function countProductsLeft(campaign, productID) {
    return APIRequest ({
       url: 'api/orders/products/' + campaign + '/' + productID,
       method: 'GET'
    })
    .then(response =>
       response.json().then(result => {
          if(!response.ok) {
             return Promise.reject(result);
          }
          return result;
       })
    );
 }
export function countProducts( productID ) {
   return APIRequest ({
      url: 'api/productOrdered/sum/' + productID,
      method: 'GET'
   })
   .then(response =>
      response.json().then(result => {
         if(!response.ok) {
            return Promise.reject(result);
         }
         return result;
      })
   );
}
   export function getPreviousOrders(user) {
    return APIRequest({
        url:'api/orders/previous/' + user ,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
} 
export function getAllProducts() {
    return APIRequest({
        url:'api/products',
        method: 'GET'
    })
    .then(response =>
      response.json().then(data => {
         if(!response.ok) {
            return Promise.reject(data);
         }
         return data;
      })
    );
} 
export function getAllUsers( ) {
    return APIRequest({
        url:'api/users',
        method: 'GET'
    })
    .then(response =>
      response.json().then(data => {
         if(!response.ok) {
            return Promise.reject(data);
         }
         return data;
      })
    );
}

export function setToDelivered(orderID, status) {
    return APIRequest ({
      url: 'api/orders/delivered/' + orderID + '/' + status,
      method: 'PUT'
   })
   .then(response =>
      response.json().then(result => {
         if(!response.ok) {
            return Promise.reject(result);
         }
         return result;
      })
   );
}


export function deleteProduct(productID) {
    return APIRequest ({
      url: 'api/products/' + productID,
      method: 'DELETE'
   })
   .then(response =>
      response.json().then(result => {
         if(!response.ok) {
            return Promise.reject(result);
         }
         return result;
      })
   );
}

export function setComments( user, comments ) {
    return APIRequest({
        url:'api/users/comments/' + user + '?comments=' + comments,
        method: 'PUT'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}

export function findUser( email ) {
    return APIRequest({
        url:'api/users/find/' + email,
        method: 'GET'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}

export function setPassword( user, password ) {
    return APIRequest({
        url:'api/users/password/' + user + '?password=' + password ,
        method: 'PUT'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}

export function changeUserInfo( user, name, email ) {
    return APIRequest({
        url:'api/users/change/' + user + '?email=' + email + '&name=' + name,
        method: 'PUT'
    })
    .then(response =>
      response.json().then(result => {
          if(!response.ok) {
              return Promise.reject(result);
          }
          return result;
      })
    );
}
