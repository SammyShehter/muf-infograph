import {SET_ALERT, REMOVE_ALERT} from "../actions/types";

const initialSettingsState = {
    alerts:[]
}

const alert = (state = initialSettingsState, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [action.payload]
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alerts:state.filter(alert => alert.id !== action.payload)
            }
        default:
            return state
    }
}

export default alert
