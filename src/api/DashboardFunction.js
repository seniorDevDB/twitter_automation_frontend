import axios from "axios";
import { fetchDataFailed, fetchDataPending, fetchDataSuccess, fetchMessageData, fetchCommentData, commentNotify, dmNotify } from "./../store/actions/actions";
import history from "./../history"
const axiosInstance = axios.create({baseURL: "http://3.140.95.106:5000"})

export function getAllData() {
    return dispatch => {
        dispatch(fetchDataPending());
        axiosInstance.post("/fetch_all_data").then(res => {
            console.log("here is data", res)
            dispatch(fetchDataSuccess(res.data));
        }).catch(err => {
            console.error(err);
            dispatch(fetchDataFailed());
        })
    }
}

export const startBot = (data) => {
    console.log("start bot")
    return axiosInstance
        .post("/start_bot", {
            bot1_msg1: data.bot1_msg1,
            bot1_msg2: data.bot1_msg2,
            bot1_comment_msg: data.bot1_comment_msg,
            bot2_msg1: data.bot2_msg1,
            bot2_msg2: data.bot2_msg2,
            bot2_comment_msg: data.bot2_comment_msg,
            bot3_msg1: data.bot3_msg1,
            bot3_msg2: data.bot3_msg2,
            bot3_comment_msg: data.bot3_comment_msg,
            username_num: data.username_num,
            status: data.status
        })
        .then((res) => {
            console.log("DATA FROM BACK", res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const endBot = (data) => {
    console.log("end bot")
    return axiosInstance
        .post("/end_bot", {
            status: data.status
        })
        .then((res) => {
            console.log("DATA FROM BACK", res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkDM = () => {
    return axiosInstance
        .post("/check_dm", {

        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkFollow = () => {
    return axiosInstance
        .post("/check_follow", {

        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkComment = () => {
    return axiosInstance
        .post("/check_comment", {

        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const displayComment = (data) => {
    console.log("here is display comment fucntion")
    return dispatch => {
        axiosInstance
        .post("/display_comment", {
            username: data.username,
            bot_number: data.bot_number,
            profile: data.profile,
            account_name: data.account_name
        })
        .then((res) => {
            console.log("RESPONSE", res.data)
            dispatch(fetchCommentData(res.data));
        })
        .catch((err) => {
            console.log(err)
        });
    }
}

export const newComment = (data) => {
    return axiosInstance
        .post("/new_comment", {
            content: data.content,
            username: data.username,
            account_name: data.account_name,
            bot_number: data.bot_number,
            profile: data.profile,
            previous_content: data.previous_content,
            link: data.link
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}


export const displayMsg = (data) => {
    console.log("here is display masg fucntion")
    return dispatch => {
        axiosInstance
        .post("/display_msg", {
            username: data
        })
        .then((res) => {
            console.log("RESPONSE", res.data)
            dispatch(fetchMessageData(res.data));
        })
        .catch((err) => {
            console.log(err)
        });
    }
}

export const newMsg = (data) => {
    return axiosInstance
        .post("/new_msg", {
            content: data.content,
            username: data.username,
            link: data.link,
            bot_number: data.bot_number,
            profile: data.profile,
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkNotification = () => {
    console.log("checkNotification")
    return dispatch => axiosInstance
        .post("check_notification", {

        })
        .then((res) => {
            console.log(res.data)
            if (res.data.message == "dm"){
                dispatch(dmNotify(true));
            }
            else if (res.data.message == "comment"){
                dispatch(commentNotify(true));
            }
            
        })
        .catch((err) => {
            console.log(err);
        });
}

export const clearNotification = (data) => {
    if (data == "dm") {
        return dispatch => dispatch(dmNotify(false))
    }
    else if (data == "comment") {
        return dispatch => dispatch(commentNotify(false))
    }
    
}

export const updateIsMarked = (data) => {
    console.log("data", data)
    return axiosInstance
        .post("/update_is_marked", {
            account_username: data.account_username,
            to_username: data.to_username,
            bot_number: data.bot_number,
            profile: data.profile,
            coming_time: data.coming_time,
            content: data.content
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const updateIsMarkedDm = (data) => {
    console.log("datadddd", data)
    return axiosInstance
        .post("/update_is_marked_dm", {
            account_username: data.account_username,
            username: data.username,
            bot_number: data.bot_number,
            profile: data.profile,
            coming_time: data.coming_time,
            content: data.content
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}