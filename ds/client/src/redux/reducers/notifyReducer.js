import { TYPES } from "../actions/notifyAction";

const initalState = {}

const notifyReducer = (state = {initalState}, action) => {
    switch(action.type){
        case TYPES.NOTIFY:
            return action.payload
        default:
            return state
    }
}

export default notifyReducer