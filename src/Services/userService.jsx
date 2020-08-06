import Config from "../Configuration/config";
import AxiosService from './axiosSevices.jsx';

const axiosService = new AxiosService();
const apiUrl = Config.url;

export default class Service {
  Login(data) {
    return axiosService.Post(`${apiUrl}user/login`, data,false);
  }
  
  Registration(data) {
    return axiosService.Post(`${apiUrl}user/userSignUp`, data,false);
  }

  ForgotPassword(data) {
    return axiosService.Post(`${apiUrl}user/reset`, data,false);
  }

  Resetpassword( data) {
    return axiosService.Post(`${apiUrl}user/reset-password`, data,false );
      
  }
}