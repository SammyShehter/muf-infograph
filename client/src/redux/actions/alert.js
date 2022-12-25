import * as actionTypes from "./types";

export const setAlert = (msg, type) => {
    return {
        type: actionTypes.SET_ALERT,
        payload: {msg, type}
    }
};
