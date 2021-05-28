import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, DropdownButton,Dropdown } from 'react-bootstrap';

import CircularProgress from '@material-ui/core/CircularProgress';

import './style.css'

import { startBot, endBot, getAllData, checkDM, checkComment, checkNotification, checkFollow } from "./../api/DashboardFunction";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            bot1_msg1: 'https://www.protectedtext.com/v2_msg1',
            bot1_msg2: 'https://www.protectedtext.com/v2_msg2',
            bot1_comment_msg: 'https://www.protectedtext.com/v_comment',
            username_num: 200,
            lead_type: "peachly",
            bot1_successful_dm: 0,
            bot1_unsuccessful_dm: 0,
            bot1_spintax1_reply: 0,
            bot2_successful_dm: 0,
            bot2_unsuccessful_dm: 0,
            bot2_spintax1_reply: 0,
        };

        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        console.log("real",localStorage.token)
        if (localStorage.token == undefined) {
            window.location.href = "/login"
        }
        if( this.props.success === false ) {
            this.props.getAllData();
        }
        console.log(this.props.data)
        // try {
        //     setInterval(async () => {
        //       this.props.checkNotification();
        //     }, 10000);
        //   } catch(e) {
        //     console.log(e);
        //   }
    }

    handleDisplayMessage = (data) => {
        console.log("HERE", data)
        this.props.history.push(`/message/${data.username}/${data.bot_number}/${data.profile}`)
        // window.location.href = "/message/"+data.username
    }

    handleDisplayComment = (data) => {
        console.log("comment", data)
        localStorage.setItem('previous_content', data.content);
        localStorage.setItem('link', data.link)
        this.props.history.push(`/comment/${data.account_username}/${data.to_username}/${data.bot_number}/${data.profile}`)
    }

    handleStartAutomation = () => {
        console.log("bot_num", this.props.bot_number)
        const bot_info = {
            bot_msg1: this.state.bot1_msg1,
            bot_msg2: this.state.bot1_msg2,
            bot_comment_msg: this.state.bot1_comment_msg,
            username_num: this.state.username_num,
            bot_number: this.props.bot_number,
            lead_type: this.state.lead_type,
            status: "start",
        }
        startBot(bot_info).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            }
        })
    }

    handleEndAutomation = () => {
        console.log("End Auto")
        const info = {
            status: "end",
            bot_number: this.props.bot_number
        }
        endBot(info).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })
    }

    handleCheckDM = () => {
        console.log("check dm clicked")
        checkDM(this.props.bot_number).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })
    }

    handleCheckFollow = () => {
        console.log("check follow clicked")
        checkFollow(this.props.bot_number).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })
    }

    handleCheckComment = () => {
        checkComment(this.props.bot_number).then((res) => {
            if (res.code == "failed") {
                alert(res.message)
            }
        })
    }

    handleLeadSelection = (data) => {
        console.log("125", data)
        this.setState({lead_type: data})
    }

    onChange = (e) => {
        console.log("I am changed!!!!!!!!!!", e.target.value);
        this.setState({ [e.target.name]: e.target.value });
        console.log("kkk", this.state.msg1)
    }

    render() {

        const columns = [
            { title: "Date", field: "date" },
            { title: "Amount", field: "amount" },
            { title: "Description", field: "description" },
            { title: "Status", field: "status" },
            { title: "Main Balance", field: "main_balance" },
        ];

        const leadDropDown = [];
        const lead = ["peachly", "linda"]
        for (let i = 0; i < lead.length; i++) {
            leadDropDown.push(<Dropdown.Item as="button" onClick={ () => this.handleLeadSelection(lead[i]) }>{lead[i]}</Dropdown.Item>)
        }

        if ( this.props.success !== true ) {
            return (
                <div className="lds-grid">
                    <div style={{marginTop: "100px"}}><CircularProgress /></div>
                </div>
            )
        }


        if( this.props.success === true ) {
            return (
                <div className="container" style={{paddingTop:"65px", paddingLeft:"20px", paddingRight: "20px", color: "black"}}>
                    <div className="control-div">
                        <Button variant="primary" onClick = {this.handleStartAutomation}>Start Automation</Button>
                        <Button variant="primary" onClick = {this.handleEndAutomation}>End Automation</Button>
                        {/* <Button variant="primary" disabled onClick = {this.handleCheckDM} >Check Coming DM</Button>
                        <Button variant="primary" disabled onClick = {this.handleCheckComment} >Check Comment Reply</Button>
                        <Button variant="primary" disabled onClick = {this.handleCheckFollow} >Check Follow Back</Button> */}
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <b><p>Number of the Leads: </p></b>
                        <input
                            type="number"
                            // max="500"
                            className="form-control"
                            id="username_num"
                            name="username_num"
                            value={this.state.username_num}
                            onChange={this.onChange}
                            style = {{width: "30%"}}
                        />
                    </div>
                    {/* <div style={{marginTop:"20px"}}>
                        <b><p>Leads Switching</p></b>
                        <DropdownButton id="lead_selection" title="Leads">
                            {leadDropDown}
                        </DropdownButton>
                    </div> */}
                    <div className="row">
                        <div className="col-md-4 col-sm-4 spintaxTextArea">
                            <b><p>First Spintax:</p></b>
                            <textarea onChange={this.onChange} style={{width:"99%"}} id="bot1_msg1" name="bot1_msg1" rows="2" cols="50" value={this.state.bot1_msg1} />
                        </div>
                        <div className="col-md-4 col-sm-4 spintaxTextArea">
                            <b><p>Second Spintax:</p></b>
                            <textarea onChange={this.onChange} style={{width:"99%"}} id="bot1_msg2" name="bot1_msg2" rows="2" cols="50" value={this.state.bot1_msg2} />
                        </div>
                        <div className="col-md-4 col-sm-4 spintaxTextArea">
                            <b><p>Comment Spintax:</p></b>
                            <textarea onChange={this.onChange} style={{width:"99%"}} id="bot1_comment_msg" name="bot1_comment_msg" rows="2" cols="50" value={this.state.bot1_comment_msg} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div >Coming Soon</div>
            )
        }
    }
}

const mapStateToProps = state => ({
    error: state.error,
    pending: state.pending,
    success: state.success,
    data: state.data,
    report: state.data.report,
    new_message: state.data.new_message,
    reply_comment: state.data.reply_comment,
    bot_number: state.bot
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllData,checkNotification
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)