import { FETCH_DATA_FAILED, FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_MESSAGE_DATA, FETCH_COMMENT_DATA, DM_NOTIFICATION, COMMENT_NOTIFICATION, MSG_SUCCESS, COMMENT_SUCCESS, SET_BOT,FETCH_ACCOUNT_INFO,FETCH_DM_INBOX_DATA_SUCCESS,FETCH_COMMENT_INBOX_DATA_SUCCESS,UPDATE_MARKED_DM,UPDATE_MARKED_COMMENT} from "./../actions/actions";

export default function dataReducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
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
        case FETCH_DM_INBOX_DATA_SUCCESS:
            newState.dmInboxData = action.payload
            newState.pending = false;
            newState.success = true;
            newState.error = false;
            return newState;
        case FETCH_COMMENT_INBOX_DATA_SUCCESS:
            newState.commentInboxData = action.payload
            newState.pending = false;
            newState.success = true;
            newState.error = false;
            return newState;
        case FETCH_MESSAGE_DATA:
            newState.msgData = action.payload;
            return newState;
        case FETCH_COMMENT_DATA:
            newState.commentData = action.payload;
            return newState;
        case FETCH_ACCOUNT_INFO:
            newState.accountInfo = action.payload;
            return newState;
        case SET_BOT:
            newState.bot = action.payload;
            return newState;
        case DM_NOTIFICATION:
            newState.dmNotification = action.payload;
            return newState;
        case COMMENT_NOTIFICATION:
            newState.commentNotification = action.payload;
            return newState;
        case UPDATE_MARKED_DM:
            let findIndex = newState.data.new_message.findIndex(ele => {
                return ele.account_username === action.payload.account_username &&
                ele.username === action.payload.username &&
                ele.bot_number === action.payload.bot_number &&
                ele.profile === action.payload.profile &&
                ele.coming_time === action.payload.coming_time;
            })
            newState.data.new_message[findIndex].mark_as_read = true
            return JSON.parse(JSON.stringify(newState));
        case UPDATE_MARKED_COMMENT:
            let findIndexComment = newState.data.reply_comment.findIndex(ele => {
                return ele.account_username === action.payload.account_username &&
                ele.to_username === action.payload.to_username &&
                ele.bot_number === action.payload.bot_number &&
                ele.profile === action.payload.profile &&
                ele.coming_time === action.payload.coming_time;
            })
            newState.data.reply_comment[findIndexComment].mark_as_read = true;
            return JSON.parse(JSON.stringify(newState));
        case MSG_SUCCESS:
            console.log("Herrere", newState)
            newState.msgData.message.push({
                content: action.payload.content,
                username: action.payload.username,
                link: action.payload.link,
                bot_number: action.payload.bot_number,
                profile: action.payload.profile,
                coming_time: ""
            })
            return JSON.parse(JSON.stringify(newState));
        case COMMENT_SUCCESS:
            console.log("comment here", newState)
            newState.commentData.message.push({
                content: action.payload.content,
                to_username: action.payload.username,
                account_username: action.payload.account_name,
                link: action.payload.link,
                bot_number: action.payload.bot_number,
                profile: action.payload.profile,
                coming_time: ""
            })
            return JSON.parse(JSON.stringify(newState));
        default:
            return state;
    }
}