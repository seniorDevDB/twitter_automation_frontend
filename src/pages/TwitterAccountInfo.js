import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccountInfo} from "./../api/DashboardFunction";

class TwitterAccountInfo extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            bot_number: ""
        }
    }

    async componentDidMount() {
        const username = this.props.match.params.username;
        const bot_number = this.props.match.params.bot_number;
        console.log("username", username, bot_number)
        this.setState({username: username, bot_number: bot_number})
        const data = {
            username: username,
            bot_number: bot_number
        }
        this.props.getAccountInfo(data);
    }

    render() {
        return(
            <div className="row" style={{marginTop: '100px', color: "black"}}>
                {/* <p>{this.state.username}</p>
                { this.props.account_info && <h1>{this.props.account_info.code}</h1>} */}
                <div className="col-md-4">
                    <div className="account_info">
                        <label style={{float:"left"}}><h5>Account Username : </h5></label>
                        <p>{this.state.username}</p>
                    </div>
                    <div className="account_info">
                        <label style={{float:"left"}}><h5>Bot Number : </h5></label>
                        <p>{this.state.bot_number}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="account_info">
                        <label><h5>Sent DM Users :</h5></label>
                        <select className="ur-select px-3">
                            {this.props.account_info.message && this.props.account_info.message.map((msg) => (
                                <option value={msg.username}>{msg.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="account_info">
                        <label><h5>Sent Comment Users :</h5></label>
                        <select className="ur-select px-3">
                            {this.props.account_info.comment && this.props.account_info.comment.map((comment) => (
                                <option value={comment.to_username}>{comment.to_username}</option>
                            ))}
                        </select>
                    </div>
                    
                </div>
                <div className="col-md-4">
                    <div className="account_info">
                        <label><h5>Used Leads :</h5></label>
                        <select className="ur-select px-3">
                            {this.props.account_info.used_leads && this.props.account_info.used_leads.map((lead) => (
                                <option value={lead.username}>{lead.username}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    account_info: state.accountInfo,
    // message: state.account_info.message,
    // comment: state.account_info.comment
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAccountInfo,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TwitterAccountInfo)