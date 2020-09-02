import {DISPLAY_NOTE} from './ActionType';


//action creater
export  const displayNote = (data) =>{
    console.log("i am in action");
    return {   //object
        type:DISPLAY_NOTE,
        payload: data
    }
}