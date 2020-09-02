import Config from "../Configuration/config";
import AxiosService from './axiosSevices.jsx';

const axiosService = new AxiosService();
const apiUrl = Config.url;
const token = localStorage.getItem('token');


export default class NoteService {
    CreateNote(data) {
        return axiosService.Post(`${apiUrl}notes/addNotes`, data, { headers: {
            authorization: token
          }});
      }

      getAllNotes(){
        return axiosService.Get(`${apiUrl}notes/getNotesList`, { headers: {
            authorization: token
          }});
      }
      deleteNote(data){
        return axiosService.Post(`${apiUrl}notes/trashNotes`, data,{ headers: {
          authorization: token
        }});
      }
      updateNote(data){
        return axiosService.Post(`${apiUrl}notes/updateNotes`,data, { headers: {
          authorization: token
        }});
      }
      searchUserList(data){
        return axiosService.Post(`${apiUrl}user/searchUserList`,data,{ headers: {
          authorization: token
        }});
      }
      colaboratesNote(data){
        return axiosService.Post(`${apiUrl}notes/${data.id}/AddcollaboratorsNotes`,data,{ headers: {
          authorization: token
        }});
      }
      addColorToNote(data){
        return axiosService.Post(`${apiUrl}notes/changesColorNotes`,data,{ headers: {
          authorization: token
        }});
      }
      updateList(data){
        return axiosService.Post(`${apiUrl}notes/${data.notesId}/checklist/${data.checklistId}/update`,data,{ headers: {
          authorization: token
        }});
      }
}