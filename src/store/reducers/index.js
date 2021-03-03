import { FETCH_DATA_FAILED, FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_MESSAGE_DATA, FETCH_COMMENT_DATA, DM_NOTIFICATION, COMMENT_NOTIFICATION} from "./../actions/actions";

export default function dataReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            console.log(action);
            newState.data = action.payload;
            newState.pending = false;
            newState.success = true;
            newState.error = false;
            return newState;
        case FETCH_DATA_PENDING:
            newState.pending = true;
            newState.success = false;
            newState.error = false;
            return newState;
        case FETCH_DATA_FAILED:
            newState.pending = false;
            newState.success = false;
            newState.error = true;
            return newState;
        case FETCH_MESSAGE_DATA:
            newState.msgData = action.payload;
            return newState;
        case FETCH_COMMENT_DATA:
            newState.commentData = action.payload;
            return newState;
        case DM_NOTIFICATION:
            newState.dmNotification = action.payload;
            return newState;
        case COMMENT_NOTIFICATION:
            newState.commentNotification = action.payload;
            return newState;
        default:
            return state;
    }
}