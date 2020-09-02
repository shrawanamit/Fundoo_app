import { DISPLAY_NOTE } from '../Action/ActionType';
import NoteService from "../../Services/NoteService";
let services = new NoteService();
const initialState = {
    allNotes: []
}
const noteReducer = (state = initialState, action) => {
    console.log("i am in reducer");
    switch (action.type) {
        case DISPLAY_NOTE:
           return { 
               ...state, 
               allNotes:[...action.payload] ,
            }
            
            default:return state
    }
}

export default noteReducer