import { ACCESS_TOKEN } from '../constants'
const APIRequest = (options) => {
   const headers = new Headers({
      'Content-Type': 'application/json',
   })
   
   //Not sure what this does, but has something to do with authentication:
   /*if(localStorage.getItem(ACCESS_TOKEN)) {
      headers.append('Authorization', 'Bearer' + localStorage.getItem(ACCESS_TOKEN))
   }*/
   
   const defaults = { headers: headers };
   options = Object.assign({}, defaults, options);
   
   //Will have to change name to json, this inly works for createAccount. 
   return fetch(options.url, options)
   /*.then(response =>
      response.json().then(json => {
         if(!response.ok) {
            return Promise.reject(json);
         }
         return json;
      })
    );*/
};

export function createAccount(signupRequest) {
   return APIRequest({
      url: '/api/users/create',
      method: 'POST',
      body: JSON.stringify(signupRequest)
   })
   .then(response =>
      response.text().then(name => {
         if(!response.ok) {
            return Promise.reject(name);
         }
         return name;
      })
    );
}

export function createOrder(orderInfo) {
   return APIRequest({
      url:'/api/orders/create',
      method: 'POST',
      body: JSON.stringify(orderInfo)
   });
}

export function lookupOrder(orderNumber) {
   return APIRequest({
      url: '/api/orders/search/' + orderNumber,
      method: 'GET'
   })
   .then(response =>
      response.text().then(name => {
         if(!response.ok) {
            return Promise.reject(name);
         }
         return name;
      })
    );
}

export function getProducts() {
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
        
        
        
        
        
        
        
        
