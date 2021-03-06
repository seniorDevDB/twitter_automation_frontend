import axios from "axios";
import { fetchDataFailed, fetchDataPending, fetchDataSuccess, fetchMessageData, fetchCommentData, commentNotify, dmNotify, sendMsgSuccess,sendCommentSuccess,setSelectedBot, fetchAccountInfo, fetchDmInboxDataSuccess,fetchCommentInboxDataSuccess, updateMarkedDM, updateMarkedComment } from "./../store/actions/actions";
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

export function getDmData() {
    return dispatch => {
        axiosInstance.post('/fetch_dm_data').then(res => {

            dispatch(fetchDmInboxDataSuccess(res.data));
        }).catch(err => {
            console.error(err);
        })
    }
}

export function getCommentData() {
    return dispatch => {
        axiosInstance.post('/fetch_comment_data').then(res => {

            dispatch(fetchCommentInboxDataSuccess(res.data));
        }).catch(err => {
            console.error(err);
        })
    }
}

// export function getReport(data) {
//     return dispatch => {
//         axiosInstance.post("/getReport", {
//             bot_number: data
//         }).then((res) => {
//             console.log("here is response", res)

//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }
// }

export const startBot = (data) => {
    console.log("start bot")
    return axiosInstance
        .post("/start_bot", {
            bot_msg1: data.bot_msg1,
            bot_msg2: data.bot_msg2,
            bot_comment_msg: data.bot_comment_msg,
            lead_number: data.username_num * 10,
            lead_type: data.lead_type,
            bot_number:data.bot_number,
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
            status: data.status,
            bot_number: data.bot_number
        })
        .then((res) => {
            console.log("DATA FROM BACK", res.data);
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkDM = (data) => {
    return axiosInstance
        .post("/check_dm", {
            bot_number: data
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkFollow = (data) => {
    return axiosInstance
        .post("/check_follow", {
            bot_number: data
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const checkComment = (data) => {
    return axiosInstance
        .post("/check_comment", {
            bot_number: data
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const resetReport = () => {
    return axiosInstance
        .post("/reset_report", {
        })
        .then((res) => {
            console.log(res.data)
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export const resetAccount = () => {
    return axiosInstance
        .post("/reset_account", {
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

export const getAccountInfo = (data) => {
    console.log("called account info")
    return dispatch => {
        axiosInstance
        .post("/account_info", {
            username: data.username,
            bot_number: data.bot_number
        })
        .then((res) => {
            console.log("ddd", res.data)
            dispatch(fetchAccountInfo(res.data))
        })
        .catch((err) => {
            console.log(err)
        });
    }
}

export const newComment = (data) => {
    return dispatch => axiosInstance
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
            dispatch(sendCommentSuccess(data));
        })
        .catch((err) => {
            console.log(err);
        });
}


export const displayMsg = (data) => {
    console.log("here is display masg fucntion", data)
    return dispatch => {
        axiosInstance
        .post("/display_msg", {
            username: data.username,
            bot_number: data.bot_number,
            profile_port: data.profile_port
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
    console.log("mmm", data)
    return dispatch => axiosInstance
        .post("/new_msg", {
            content: data.content,
            username: data.username,
            link: data.link,
            bot_number: data.bot_number,
            profile_port: data.profile_port,
        })
        .then((res) => {
            dispatch(sendMsgSuccess(data));
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

export const setBot = (data) => {
    return dispatch => dispatch(setSelectedBot(data))
}

export const updateIsMarkedComment = (data) => {

    return dispatch => {
        axiosInstance.post("/update_is_marked", {
            account_username: data.account_username,
            to_username: data.to_username,
            bot_number: data.bot_number,
            profile: data.profile,
            coming_time: data.coming_time,
            content: data.content
        })
        .then((res) => {
            if (res.data.code == "success"){
                dispatch(updateMarkedComment(data))
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

}

export const updateIsMarkedDm = (data) => {

    return dispatch => {
        axiosInstance.post("/update_is_marked_dm", {
            account_username: data.account_username,
            username: data.username,
            bot_number: data.bot_number,
            profile: data.profile,
            coming_time: data.coming_time,
            content: data.content
        })
        .then((res) => {
            if (res.data.code == "success"){
                dispatch(updateMarkedDM(data))
            }

        })
        .catch((err) => {
            console.log(err);
        });
    }

}