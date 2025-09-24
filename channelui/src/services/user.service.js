//to be edited later
import axios from 'axios';
import authHeader from './auth-header';
import authHeader_mp from './auth-header-mp';

// const API_URL = "http://localhost:3000/api/users/";
const API_URL = process.env.REACT_APP_API_URL;

// const API_URL = 'http://localhost:8080/api/test/';

class UserService {
 
  getServicesCust(phone){
    return axios.get(API_URL + 'getServicesCust/'+ phone, { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
    }

  getCustServicesRec({srId}){
    // console.log(srId);
    // alert("srid "+srId);
    // alert("API_URL=>"+API_URL);
    return axios.get(API_URL + 'getCustServicesRec/'+ srId, { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
    }

  getServicesAdmin(phone){
    return axios.get(API_URL + 'getAdminServicesRec/'+ phone, { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
   }
   getAdminServicesRec(srId){
    return axios.get(API_URL + 'getServicesCust/'+ srId, { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
    }

    getAllServices(status){
    return axios.get(API_URL + 'getAllServices/'+ status, { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
    }


  addService({changes}){
    return axios.post(API_URL + 'addService',
   changes,
    { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
  }

  updateService({srId,changes}){
    return axios.post(API_URL + 'updateService',
   {srId:srId,
    changes:changes
   },
    { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
  }

  deleteService(srId){
    return axios.delete(API_URL + 'deleteService' + srId,
       { headers: authHeader() }).catch(error => {
      const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            console.log(resMessage);});
  }

  
}

export default new UserService();
