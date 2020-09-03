import {DISPLAY_NOTE} from './ActionType';
import {UPDATE_NOTE} from './ActionType';

//action creater
export  const displayNote = (data) =>{
    console.log("i am in action");
    return {   //object
        type:DISPLAY_NOTE,
        payload: data
    }
}
export  const updateNote = () =>{
    console.log("i am in action update");
    return {   //object
        type:UPDATE_NOTE,
        // payload: data
    }
}