import { keys } from "@material-ui/core/styles/createBreakpoints";
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dataReducer from "../store/reducers";
import { displayMsg, newMsg } from "./../api/DashboardFunction";

class Message extends Component {
    constructor() {
        super();
        this.state = {
            msg_content: "",
            username: "",
            bot_number: "",
            profile: ""
        };
    }

    componentDidMount() {
        const username = this.props.match.params.id;
        const bot_number = this.props.match.params.num;
        const profile = this.props.match.params.profile
        console.log("here is compoent", username, bot_number, profile)
        this.setState({username: username, bot_number: bot_number, profile: profile})
        this.props.displayMsg(username);
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
            bot_number: this.state.bot_number,
            profile: this.state.profile,
            content: this.state.msg_content,
            link: localStorage.getItem('dm_link'),
        }
        console.log("data", data)
        newMsg(data).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            }
            else {
                alert("dm sent")
                this.setState({msg_content: ""})
            }
        })
    }

    render() {
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
                                        <div className="chat-name">"{data.username}"</div>
                                    </div>
                                    <div class="chat-text">
                                        "{data.content}"
                                    </div>
                                    <div class="chat-hour">"{data.coming_time}"</div>
                                </li>) : (
                                <li className="chat-right" key={index}>
                                    <div className="chat-hour">"{ data.coming_time }"</div>
                                    <div className="chat-text">
                                    "{ data.content }"
                                    </div>
                                    <div className="chat-avatar">                         
                                        <div className="chat-name">"{ data.username }"</div>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>

                    <div>
                          <div style={{display:"flex"}}>
                                <textarea rows="3" onChange={this.onChange} id="msg-content" name= "msg_content" value={this.state.msg_content} placeholder="Type your message here..."></textarea>
                                <Button onClick={this.sendMsg} style={{marginLeft:"20px"}}>Send</Button>
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
    displayMsg
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)