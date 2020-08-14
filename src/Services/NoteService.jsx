import Config from "../Configuration/config";
import AxiosService from './axiosSevices.jsx';

const axiosService = new AxiosService();
const apiUrl = Config.url;
//const token = localStorage.getItem('token');


export default class NoteService {
    CreateNote(token, data) {
        console.log(token);
        return axiosService.Post(`${apiUrl}notes/addNotes`, data, { headers: {
            authorization: token
          }});
      }

      getAllNotes(token){
        return axiosService.Get(`${apiUrl}notes/getNotesList`, { headers: {
            authorization: token
          }});
      }
      deleteNote(data,token){
        return axiosService.Delete(`${apiUrl}notes/trashNotes`, data,{ headers: {
          authorization: token
        }});
      }
      updateNote(data,token){
        return axiosService.Update(`${apiUrl}notes/updateNotes`,data, { headers: {
          authorization: token
        }});
      }
}