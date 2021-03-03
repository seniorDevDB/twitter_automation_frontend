import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-bootstrap';
import MaterialTable, { Column, MTableBodyRow } from "material-table";

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
import { getAllData, updateIsMarked} from "./../api/DashboardFunction";

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

class CommentInbox extends Component {
    constructor() {
        super();

        this.state = {
            hoveringOver: ""
        };
    }

    async componentDidMount() {
        this.props.getAllData();
    }

    handleRowHover = (event, propsData) => {
        this.setState({hoveringOver: propsData.index});
    }

    handleRowHoverLeave = (event, propsData) => {
        this.setState({hoveringOver: ""});
    }

    isMarkAsRead = (row) => {
        console.log("72", row)
        return row.mark_as_read == false;
    }

    handleDisplayMessage = (event, data) => {
        console.log("I am dat!!", data);
        // udpate is marked
        const info = {
            account_username: data.account_username,
            to_username: data.to_username,
            bot_number: data.bot_number,
            profile: data.profile,
            coming_time: data.coming_time,
            content: data.content
        }
        updateIsMarked(info).then((res) => {
            if (res.code == "failed"){
                alert(res.message)
            } 
        })

        localStorage.setItem('previous_content', data.content);
        localStorage.setItem('link', data.link)
        this.props.history.push(`/comment/${data.account_username}/${data.to_username}/${data.bot_number}/${data.profile}`)
    }

    dateCompare = (firstDate, secondDate) => {
        const date1 = new Date(firstDate);
        const date2 = new Date(secondDate);

        if (date1 > date2)
            return -1;

        if (date1 < date2)
            return 1;

        return 0;
    }

    render() {
        console.log("ok",this.props.reply_comment)
        const reply_comment = this.props.reply_comment;
        const { hoveringOver } = this.state;

        if (reply_comment) {
            reply_comment.sort((a, b) => this.dateCompare(a.save_time, b.save_time));

            for (var i = 0 ; i < reply_comment.length; i ++) {
                const save_time = new Date(reply_comment[i].save_time);
                console.log("I am tim!!!", save_time);
                reply_comment[i].save_time = save_time.toLocaleString('default', { month: 'short', day: 'numeric' })
            }

        }

        return(
            <div className="table">
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: "Username", field: "to_username", width: "20%" },
                        { title: "Account Username", field: "account_username", width: "20%" },
                        { title: "Coming Time", field: "coming_time"},
                        { title: "Message Content", field: "content"},
                        { title: "Save Time", field: "save_time"},
                        // { title: "Link", field: "link"},
                        { title: "Bot Number", field: "bot_number"},
                        { title: "Browser Number", field: "profile" },
                        { title: "ID", field: "_id"}
                    ]}
                    data={reply_comment}
                    options={{
                        // paging: false,
                        // toolbar: false,
                        pageSizeOptions: [10, 25, 50],
                        pageSize: 10,
                        headerStyle: {
                          backgroundColor: "#378FC3",
                          color: "#FFF",
                          fontSize: "17px",
                          fontWeight: "bold"
                        },
                        rowStyle: rowData => ({
                            backgroundColor: this.isMarkAsRead(rowData) ? "rgba(255,255,255,0.902)" : "rgba(242,245,245,0.8)",
                            fontWeight: this.isMarkAsRead(rowData) ? "bold" : "",
                            boxShadow: rowData.tableData.id === hoveringOver ? 'inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)' : ''
                        }),
                        tableLayout: "fixed"
                    }}
                    title=""
                    components={{
                        Row: props => {
                            return (
                            <MTableBodyRow
                                {...props}
                                onMouseEnter={e => this.handleRowHover(e, props)}
                                onMouseLeave={e => this.handleRowHoverLeave(e, props)}
                            />
                            );
                        },
                    }}
                    onRowClick = {this.handleDisplayMessage}
                    // actions={[
                    //     {
                    //     icon: View,
                    //     tooltip: "View",
                    //     onClick: (event, rowData) =>
                    //         {this.handleDisplayComment(rowData)}
                    //     }
                    // ]}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reply_comment: state.data.reply_comment,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInbox)