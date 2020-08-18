import axios from 'axios';

export default class AxiosService{
    Post(url,data,isHeaderRequired){
        return axios.post(url,data,isHeaderRequired);
    }

    Get(url,isHeaderRequired){
        return axios.get(url,isHeaderRequired);
    }
    
    Delete(url,data,isHeaderRequired){
         return axios.post(url,data,isHeaderRequired);
    }
    Update(url,data,isHeaderRequired){
        return axios.post(url,data,isHeaderRequired);
   }
}