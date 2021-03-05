import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-bootstrap';
import MaterialTable, { Column } from "material-table";

import './style.css'

import { forwardRef } from 'react';
 
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import View from "@material-ui/icons/Visibility";
import ViewColumn from '@material-ui/icons/ViewColumn';
import { startBot, endBot, getAllData, checkDM, checkComment, checkNotification } from "./../api/DashboardFunction";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            bot1_msg1: 'https://www.protectedtext.com/v1_msg1',
            bot1_msg2: 'https://www.protectedtext.com/v1_msg2',
            bot1_comment_msg: 'https://www.protectedtext.com/v_comment',
            bot2_msg1: 'https://www.protectedtext.com/v2_msg1',
            bot2_msg2: 'https://www.protectedtext.com/v2_msg2',
            bot2_comment_msg: 'https://www.protectedtext.com/v_comment',
            bot3_msg1: 'https://www.protectedtext.com/v3_msg1',
            bot3_msg2: 'https://www.protectedtext.com/v3_msg2',
            bot3_comment_msg: 'https://www.protectedtext.com/v_comment',
            username_num: 100,
            bot1_successful_dm: 0,
            bot1_unsuccessful_dm: 0,
            bot1_spintax1_reply: 0,
            bot2_successful_dm: 0,
            bot2_unsuccessful_dm: 0,
            bot2_spintax1_reply: 0
        };

        this.onChange = this.onChange.bind(this);
    }

    async componentDidMount() {
        console.log("real",localStorage.usertoken)
        if (localStorage.usertoken == undefined) {
            window.location.href = "/login"
        }
        if( this.props.success === false ) {
            this.props.getAllData();
        }
        console.log("SSSSSSSSSSSSSSSSS")
        console.log(this.props.data)
        try {
            setInterval(async () => {
              this.props.checkNotification();
            }, 10000);
          } catch(e) {
            console.log(e);
          }
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
        console.log("start Auto")
        const bot_info = {
            bot1_msg1: this.state.bot1_msg1,
            bot1_msg2: this.state.bot1_msg2,
            bot1_comment_msg: this.state.bot1_comment_msg,
            bot2_msg1: this.state.bot2_msg1,
            bot2_msg2: this.state.bot2_msg2,
            bot2_comment_msg: this.state.bot2_comment_msg,
            bot3_msg1: this.state.bot3_msg1,
            bot3_msg2: this.state.bot3_msg2,
            bot3_comment_msg: this.state.bot3_comment_msg,
            username_num: this.state.username_num,
            status: "start"
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
            status: "end"
        }
        endBot(info).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })
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
        console.log(this.props.data.report)
        console.log("nnn", this.props.reply_comment)
        if( this.props.success === true ) {
            return (
                <div style={{paddingTop:"45px", paddingLeft:"20px", paddingRight: "20px", backgroundColor: "#ccffcc"}}>
                    <div className="control-div container">
                        <Button variant="primary" onClick = {this.handleStartAutomation}>Start Automation</Button>
                        <Button variant="primary" onClick = {this.handleEndAutomation}>End Automation</Button>
                        <div>
                            <label>Number of the Leads: </label>
                            <input
                                type="number"
                                className="form-control"
                                id="username_num"
                                name="username_num"
                                value={this.state.username_num}
                                style = {{width: "30%"}}
                            />
                        </div>
                        {/* <div>
                            <label>Which bot would you like to choose? </label>
                            <select className="browser-default custom-select" style = {{width: "30%"}}>
                                <option>All Bots</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                        </div> */}
                    </div>

                    {/* <div className="table">
                        <MaterialTable
                            icons={tableIcons}
                            columns={[
                                { title: "Bot Number", field: "_id" },
                                { title: "Number of Leads", field: "username" },
                                { title: "Sent DMs", field: "coming_time"},
                                { title: "Spintax1 DM Replies", field: "content"},
                                { title: "Sent Comments", field: "save_time"},
                                { title: "Unsuccessful Comments", field: "bot_number"},
                                { title: "Comment Replies", field: "profile" },
                                { title: "Follow", field: "profile" },
                                { title: "Follow Back", field: "profile" },
                            ]}
                            data={this.props.new_message}
                            title="Bot Report"
                            // actions={[
                            //     {
                            //     icon: View,
                            //     tooltip: "View",
                            //     onClick: (event, rowData) =>
                            //         {this.handleDisplayMessage(rowData)}
                            //     }
                            // ]}
                            options={{actionsColumnIndex: 1}}
                        />
                    </div> */}
                    <div className="report-div row">
                        <div className="col-md-3 col-sm-3">
                            <h3>Bot1</h3>
                            <div style={{display: "flex"}}>
                                <p>Number of Usernames:</p> <b><p>{this.props.report.bot1_user_number}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Sent DMS:</p> <b><p>{this.props.report.bot1_dm}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Unsuccessful DMS:</p> <b><p>{this.props.report.bot1_unsuccessful_dm}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Spintax Message 1 Replies:</p> <b><p>{this.props.report.bot1_spintax1_reply}</p></b>
                            </div>

                            <div style={{display: "flex"}}>
                                <p>Sent COMMENTS:</p> <b><p>{this.props.report.bot1_comment}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Unsuccessful COMMENTS:</p> <b><p>{this.props.report.bot1_unsuccessful_comment}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>COMMENT Replies:</p> <b><p>{this.props.report.bot1_comment_reply}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow</p> <b><p>{this.props.report.bot1_follow}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow Back:</p> <b><p>{this.props.report.bot1_follow_back}</p></b>
                            </div>

                            
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h3>Bot2</h3>
                            <div style={{display: "flex"}}>
                                <p>Number of Usernames:</p> <b><p>{this.props.report.bot2_user_number}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Sent DMS:</p> <b><p>{this.props.report.bot2_dm}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Unsuccessful DMS:</p> <b><p>{this.props.report.bot2_unsuccessful_dm}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Spintax Message 1 Replies:</p> <b><p>{this.props.report.bot2_spintax1_reply}</p></b>
                            </div>

                            <div style={{display: "flex"}}>
                                <p>Sent COMMENTS:</p> <b><p>{this.props.report.bot2_comment}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Unsuccessful COMMENTS:</p> <b><p>{this.props.report.bot2_unsuccessful_comment}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>COMMENT Replies:</p> <b><p>{this.props.report.bot2_comment_reply}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow:</p> <b><p>{this.props.report.bot2_follow}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow Back:</p> <b><p>{this.props.report.bot2_follow_back}</p></b>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h3>Bot3</h3>
                            <div style={{display: "flex"}}>
                                <p>Number of Usernames:</p> <b><p>{this.props.report.bot3_user_number}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Sent DMS:</p> <b><p>{this.props.report.bot3_dm}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Unsuccessful DMS:</p> <b><p>{this.props.report.bot3_unsuccessful_dm}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Spintax Message 1 Replies:</p> <b><p>{this.props.report.bot3_spintax1_reply}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Sent COMMENTS:</p> <b><p>{this.props.report.bot3_comment}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Unsuccessful COMMENTS:</p> <b><p>{this.props.report.bot3_unsuccessful_comment}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>COMMENT Replies:</p> <b><p>{this.props.report.bot3_comment_reply}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow:</p> <b><p>{this.props.report.bot3_follow}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow Back:</p> <b><p>{this.props.report.bot3_follow_back}</p></b>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <h3>Bot For Private Usernames</h3>
                            <div style={{display: "flex"}}>
                                <p>Follow:</p> <b><p>{this.props.report.follow}</p></b>
                            </div>
                            <div style={{display: "flex"}}>
                                <p>Follow Back:</p> <b><p>{this.props.report.unfollow}</p></b>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot1: First Spintax:</h3>
                            <textarea onChange={this.onChange} id="bot1_msg1" name="bot1_msg1" rows="3" cols="50" value={this.state.bot1_msg1} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot1: Second Spintax:</h3>
                            <textarea onChange={this.onChange} id="bot1_msg2" name="bot1_msg2" rows="3" cols="50" value={this.state.bot1_msg2} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot1: Comment:</h3>
                            <textarea onChange={this.onChange} id="bot1_comment_msg" name="bot1_comment_msg" rows="3" cols="50" value={this.state.bot1_comment_msg} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot2: First Spintax:</h3>
                            <textarea onChange={this.onChange} id="bot2_msg1" name="bot2_msg1" rows="3" cols="50" value={this.state.bot2_msg1} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot2: Second Spintax:</h3>
                            <textarea onChange={this.onChange} id="bot2_msg2" name="bot2_msg2" rows="3" cols="50" value={this.state.bot2_msg2} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot2: Comment:</h3>
                            <textarea onChange={this.onChange} id="bot2_comment_msg" name="bot2_comment_msg" rows="3" cols="50" value={this.state.bot2_comment_msg} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot3: First Spintax:</h3>
                            <textarea onChange={this.onChange} id="bot3_msg1" name="bot3_msg1" rows="3" cols="50" value={this.state.bot3_msg1} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot3: Second Spintax:</h3>
                            <textarea onChange={this.onChange} id="bot3_msg2" name="bot3_msg2" rows="3" cols="50" value={this.state.bot3_msg2} />
                        </div>
                        <div className="col-md-4 col-sm-4">
                            <h3 htmlFor="">Bot3: Comment:</h3>
                            <textarea onChange={this.onChange} id="bot3_comment_msg" name="bot3_comment_msg" rows="3" cols="50" value={this.state.bot3_comment_msg} />
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllData,checkNotification
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)