import { TYPES } from "../actions/authAction";

const initialState = {
    auth: {
        token: null,
        user: null
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.AUTH:
            return { ...state, auth: action.payload };
        default:
            return state
    }
}

export default authReducer;