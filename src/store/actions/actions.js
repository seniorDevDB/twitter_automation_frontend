export const FETCH_DATA_PENDING = "FETCH_DATA_PENDING";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILED = "FETCH_DATA_FAILED";
export const FETCH_MESSAGE_DATA = "FETCH_MESSAGE_DATA";
export const FETCH_COMMENT_DATA = "FETCH_COMMENT_DATA";
export const DM_NOTIFICATION = "DM_NOTIFICATION";
export const COMMENT_NOTIFICATION = "COMMENT_NOTIFICATION";

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