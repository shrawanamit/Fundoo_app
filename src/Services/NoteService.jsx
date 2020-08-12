import Config from "../Configuration/config";
import AxiosService from './axiosSevices.jsx';

const axiosService = new AxiosService();
const apiUrl = Config.url;

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
}