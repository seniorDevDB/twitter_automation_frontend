import { keys } from "@material-ui/core/styles/createBreakpoints";
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dataReducer from "../store/reducers";
import { displayComment, newComment } from "./../api/DashboardFunction";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            content: "",
            username: "",
            account_name: "",
            bot_number: "",
            profile: ""
        };
    }

    componentDidMount() {
        console.log("here")
        const account_name = this.props.match.params.account
        const username = this.props.match.params.username;
        const bot_number = this.props.match.params.num;
        const profile = this.props.match.params.profile;
        console.log("here is compoent", username, bot_number, profile)
        this.setState({username: username, bot_number: bot_number, profile: profile, account_name: account_name})
        const data = {
            username: username,
            account_name: account_name,
            bot_number: bot_number,
            profile: profile
        }
        this.props.displayComment(data);
    }

    onChange = (e) => {
        console.log("I am changed!!!!!!!!!!", e.target.value);
        this.setState({ [e.target.name]: e.target.value });
        console.log("kkk", this.state.msg1)
    }

    sendMsg = () => {
        console.log("send msg", this.state.msg_content)
        const data = {
            username: this.state.username,
            account_name: this.state.account_name,
            bot_number: this.state.bot_number,
            profile: this.state.profile,
            content: this.state.msg_content,
            previous_content: localStorage.getItem('previous_content'),
            link: localStorage.getItem('link'),
        }
        console.log("data", data)
        this.props.newComment(data)
        this.setState({msg_content: ""})
        // newComment(data).then((res) => {
        //     if (res.code == "failed"){
        //         alert(res.message)
        //     }
        //     else {
        //         alert("Comment sent")
        //         this.setState({msg_content: ""})
        //     }
        // })
    }

    render() {
        console.log("msg data", this.props.comment_data)
        const commentData = this.props.comment_data
        console.log("mmm", commentData)
        return (
            <div className="content-wrapper">
            <div className="card">
            <div className="no-gutters">
                <div className="chat-container">
                    <ul className="chat-box chatContainerScroll">
                        {commentData && commentData.message.map((data, index) => (
                            data.coming_time != '' ? (
                                <li className="chat-left" key={index}>
                                    <div className="chat-avatar">  
                                        <AccountCircleIcon fontSize="large"/>                       
                                        <div className="chat-name">{data.to_username}</div>
                                    </div>
                                    <div className="chat-avatar">                     
                                        <div className="chat-name">{data.account_username}</div>
                                    </div>
                                    <div class="chat-text">
                                        {data.content}
                                    </div>
                                    <div class="chat-hour">{data.coming_time}</div>
                                </li>) : (
                                <li className="chat-right" key={index}>
                                    {data.new_reply || data.new_reply == false ? (
                                        <div className="chat-hour">"Sent"</div>
                                    ) : (<div className="chat-hour">"Pending"</div>)}
                                    <div className="chat-hour">{ data.coming_time }</div>
                                    <div className="chat-text">
                                    { data.content }
                                    </div>
                                    <div className="chat-avatar">                         
                                        <div className="chat-name">{ data.to_username}</div>
                                    </div>
                                    <div className="chat-avatar">   
                                        <AccountBoxIcon fontSize="large"/>                    
                                        <div className="chat-name">{data.account_username}</div>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>

                    <div>
                          <div style={{display:"flex"}}>
                                <textarea rows="3" onChange={this.onChange} id="msg-content" name= "msg_content" value={this.state.msg_content} placeholder="Type your message here..."></textarea>
                                <Button onClick={this.sendMsg} style={{marginTop:"auto",marginBottom: "auto", marginLeft:"20px", padding: '10px 30px', height: '100%'}}>Send</Button>
                          </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // comment_status: state.commentData.code,
    // comment_data: state.commentData.message
    comment_data: state.commentData
});

const mapDispatchToProps = dispatch => bindActionCreators({
    displayComment,
    newComment
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)