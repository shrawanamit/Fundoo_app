import {DISPLAY_NOTE} from './ActionType';

//action creater
export  const displayNote = (data) =>{
    console.log("i am in action",data);
    return {   //object
        type:DISPLAY_NOTE,
        payload: data
    }
}
