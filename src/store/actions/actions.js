export const FETCH_DATA_PENDING = "FETCH_DATA_PENDING";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILED = "FETCH_DATA_FAILED";
export const FETCH_MESSAGE_DATA = "FETCH_MESSAGE_DATA";
export const FETCH_COMMENT_DATA = "FETCH_COMMENT_DATA";
export const FETCH_ACCOUNT_INFO = 'FETCH_ACCOUNT_INFO';
export const DM_NOTIFICATION = "DM_NOTIFICATION";
export const COMMENT_NOTIFICATION = "COMMENT_NOTIFICATION";
export const MSG_SUCCESS = "MSG_SUCCESS";
export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const SET_BOT = "SET_BOT";
export const FETCH_DM_INBOX_DATA_SUCCESS = "FETCH_DM_INBOX_DATA_SUCCESS";
export const FETCH_COMMENT_INBOX_DATA_SUCCESS = "FETCH_COMMENT_INBOX_DATA_SUCCESS";

export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    };
}

export function fetchDataPending() {
    return {
        type: FETCH_DATA_PENDING,
    };
}

export function fetchDataFailed() {
    return {
        type: FETCH_DATA_FAILED,
    };
}

export function fetchDmInboxDataSuccess(data) {
    return {
        type: FETCH_DM_INBOX_DATA_SUCCESS,
        payload: data
    }
}

export function fetchCommentInboxDataSuccess(data) {
    return {
        type: FETCH_COMMENT_INBOX_DATA_SUCCESS,
        payload: data
    }
}

export function fetchMessageData(data) {
    return {
        type: FETCH_MESSAGE_DATA,
        payload: data
    };
}

export function fetchCommentData(data) {
    return {
        type: FETCH_COMMENT_DATA,
        payload: data
    };
}

export function fetchAccountInfo(data) {
    return {
        type: FETCH_ACCOUNT_INFO,
        payload: data
    };
}

export function dmNotify(data) {
    return {
        type: DM_NOTIFICATION,
        payload: data
    };
}

export function commentNotify(data) {
    return {
        type: COMMENT_NOTIFICATION,
        payload: data
    };
}

export function sendMsgSuccess(data) {
    return {
        type: MSG_SUCCESS,
        payload: data
    }
}

export function sendCommentSuccess(data) {
    return {
        type: COMMENT_SUCCESS,
        payload: data
    }
}

export function setSelectedBot(data) {
    return {
        type: SET_BOT,
        payload: data
    }
}