import { keys } from "@material-ui/core/styles/createBreakpoints";
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dataReducer from "../store/reducers";
import { displayMsg, newMsg } from "./../api/DashboardFunction";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

class Message extends Component {
    constructor() {
        super();
        this.state = {
            msg_content: "",
            username: "",
            bot_number: "",
            profile_port: ""
        };
    }

    componentDidMount() {
        const username = this.props.match.params.id;
        const bot_number = this.props.match.params.num;
        const profile = this.props.match.params.profile
        console.log("profile", profile)
        
        this.setState({username: username, bot_number: bot_number, profile_port: profile})
        const data = {
            username: username,
            bot_number: bot_number,
            profile_port: profile
        }
        this.props.displayMsg(data);
    }

    onChange = (e) => {
        console.log("I am changed!!!!!!!!!!", e.target.value);
        this.setState({ [e.target.name]: e.target.value });
        console.log("kkk", this.state.msg1)
    }

    sendMsg = () => {
        console.log("send msg", this.state.profile_port)
        const data = {
            username: this.state.username,
            bot_number: this.state.bot_number,
            profile_port: this.state.profile_port,
            content: this.state.msg_content,
            link: localStorage.getItem('dm_link'),
        }
        console.log("data", data)
        this.props.newMsg(data)
        this.setState({msg_content: ""})
        // .then((res) => {
        //     if (res.code == "failed"){
        //         alert(res.message)
        //     }
        //     else {
        //         alert("dm sent")
        //         this.setState({msg_content: ""})
        //     }
        // })
    }

    render() {
        {
            if ( this.props.msg_data == null || this.props.msg_data[0].username != this.state.username) {
                return (
                    <div className="lds-grid">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                )
            }
        }
        console.log("msg data", this.props.msg_data)
        const msgData = this.props.msg_data
        console.log("mmm", msgData)
        return (
            <div className="content-wrapper">
            <div className="card">
            <div className="no-gutters" style={{paddingTop:"45px"}}>
                <div className="chat-container">
                    <ul className="chat-box chatContainerScroll">
                        {msgData && msgData.map((data, index) => (
                            data.coming_time != '' ? (
                                <li className="chat-left" key={index}>
                                    <div className="chat-avatar">  
                                        <AccountCircleIcon fontSize="large"/>                   
                                        <div className="chat-name">{data.username}</div>
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
                                        <AccountBoxIcon fontSize="large"/>                            
                                        <div className="chat-name">{ data.username }</div>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>

                    <div>
                          <div style={{marginTop:"-10px",display:"flex"}}>
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
    msg_status: state.msgData.code,
    msg_data: state.msgData.message
});

const mapDispatchToProps = dispatch => bindActionCreators({
    displayMsg,
    newMsg
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)