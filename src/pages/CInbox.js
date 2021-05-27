import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MaterialTable, { Column, MTableBodyRow, TablePagination } from "material-table";

class CInbox extends Component {

    constructor(){
        super();

        this.state = {
            hoveringOver: ""
        };

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="">

            </div>
        )
    }
}

const mapStateToProps = state => ({
    success: state.success,
    reply_comment: state.data.reply_comment,
    bot_number: state.bot
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CInbox)