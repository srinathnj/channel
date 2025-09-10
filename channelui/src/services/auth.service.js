//Provides Register, Login, Logout services
//login() - POST(email, password) & save jwt to localstorage
//register() - Post(email,password and name) - and redirect to login screen
//logout() - remove jwt from local localstorage
//getCurrentUser()  - get stored information of current user ( jwt )


// const dotenv = require('dotenv').config();

import axios from "axios";
import authHeader from './auth-header';


const API_URL = process.env.REACT_APP_API_URL;

// const API_URL = "http://localhost:3000/api/users/";

class AuthService {
//   // login(email, password ){
//     console.log(API_URL+ "login");
//
//     fetch(API_URL+ "login", {
//       method: "POST",
//       body: JSON.stringify({
//         email:email,
//         password: password}),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8"
//       }
//     }).then((response) => response.json())
//     .then(data => {
//       if(data.body.accessToken){
//         localStorage.setItem("user",JSON.stringify(data.body))
//         console.log(data.body.accessToken);
//       }
//       return data.body;
//     });
//
//
//
//
//
// }
login(email, password) {
  console.log(API_URL,"login");
  // alert("checknow");
  // const body = JSON.stringify({email:email,password:password});
  // const axiosConfig = {headers: {
  //         "Content-type": "application/json; charset=UTF-8"
  //       }
  //   }
  //
  // axios.post(API_URL+"login", body, axiosConfig)
  //  .then(res => console.log(res))
  //  .catch(err => console.log('Login: ', err));


    return axios.post(API_URL + "login", {
      email:email,
      password:password
    })
    .then(response =>
     {
      console.log(response);
      // console.log(response.data.accessToken);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));//JSON.stringify(response));
        // alert(JSON.stringify(response.data));  //was added to see the jwt data
        // console.log("user",response.body);
      }
      return response.data;
    }).catch(error => {
      console.log(error);
    });
}

 logout() {
   localStorage.removeItem("user");
 }

 getUser = ({email}={}) => {
   var params = new URLSearchParams();
   if(typeof email != "undefined") params.append("email",email)

   var request = {params:params}
   return axios.get(API_URL + "userdetails", request,
   {headers:authHeader()}
   )
    .then(result => {
    // alert(result.data.success);
    if(result.data.error == 0 && result.data.success == 1){
      // alert("success result");
      return {success:1,load:result};
    }else if((result.data.error == 1 && result.data.success == 0)){
       // console.log("from checks:",result);
       // alert("authservice:" + result.data.message)}
       return {success:0,load:result};
      }
  });
 }

 updateUser(email,phone){
   // console.log(email,phone);
   // alert(1)
   return axios.post(API_URL + "updateuser", {
    email:email,
    phone:phone,

  })
  .catch(error => {console.log(error)});

 }

 removeSub(endpoint,email){

   return axios.post(API_URL+'removesub',
  {email:email,
   endpoint:endpoint},
   {headers:authHeader()}).catch(error => {
   // {headers:authHeader()}).catch(error => {
     const resMessage =
             (error.response &&
               error.response.data &&
               error.response.data.message) ||
             error.message ||
             error.toString();
           console.log(resMessage);});
 }


 signup(username, email, password,phone) {
    // alert("inside signup");
      return axios.post(API_URL + "signup", {
       userName:username,
       email:email,
       password:password,
       phone:phone,

     })
     .then(result => {
       // alert(result.data.success);
       if(result.data.error == 0 && result.data.success == 1){
         // alert("success result");
         return {success:1,load:result};
       }else if((result.data.error == 1 && result.data.success == 0)){
          // console.log("from checks:",result);
          // alert("authservice:" + result.data.message)}
          return {success:0,load:result};
         }
     });

   // catch(error){
   //   alert("in catch error");
   //
   //     const resMessage =
   //             (error.response &&
   //               error.response.data &&
   //               error.response.data.message) ||
   //             error.message ||
   //             error.toString();
   //             alert(resMessage);
   //           console.log(resMessage);
   //         }
   }



   pubSub(subscription,email){

     return axios.post(API_URL+'savesub',
    {email:email,
     subscription:JSON.stringify(subscription)},
     {headers:authHeader()}).catch(error => {
     // {headers:authHeader()}).catch(error => {
       const resMessage =
               (error.response &&
                 error.response.data &&
                 error.response.data.message) ||
               error.message ||
               error.toString();
             console.log(resMessage);});
   }



// register(username,email,password){
//
//   fetch(API_URL+ "signup", {
//     method: "POST",
//     body: JSON.stringify({
//       username:username,
//       email:email,
//       password: password}),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   })
//   .then((response) => response.json())
//   .then(data => {
//     if(data.body.accessToken){
//       localStorage.setItem("user",JSON.stringify(data.body))
//       console.log(data.body.accessToken);
//     }
//     return data.body;
//   });
// }
getCurrentUser(){
  return JSON.parse(localStorage.getItem("user"));
  }

requestOtp(email){
    console.log("inside request Otp:",email)
    return axios.post(API_URL + 'requestotp',
   {
     email: email
   },
    {headers:authHeader()}).then(data=>{console.log(data);return data}).catch(error => {console.log(error)});
  }

  mfaLogin(email, otp) {
    // console.log(API_URL+"login");

      return axios.post(API_URL + "mfalogin", {
        email:email,
        otp:otp
      })
      .then(response =>
       {
        console.log(response);
        // console.log(response.data.accessToken);
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));//JSON.stringify(response));
          // alert(JSON.stringify(response.data));  //was added to see the jwt data
          // console.log("user",response.body);
        }
        return response.data;
      }).catch(error => {
        console.log(error);
      });
  }


  userActivate(email, otp,isActive) {
    // console.log(API_URL+"login");

      return axios.post(API_URL + "activate", {
        email:email,
        otp:otp,
        isActive:isActive,
      })
      .then(response =>
       {
        console.log(response);
        alert(response);
        alert("check console");
        // console.log(response.data.accessToken);
        return response.data;
      }).catch(error => {
        console.log(error);
      });
  }





  pushNotification({senderEmail,message}={}){
    // alert("inside assign query service");
    return axios.post(API_URL + 'sendnotification',
  {
    email:senderEmail,
    emailArray:["test@test.com","user13@user.com"],
    message:message
  },
    {headers:authHeader()}).catch(error => {console.log(error)});
  }

}


export default new AuthService();
