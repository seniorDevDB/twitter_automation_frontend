import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-bootstrap';
import MaterialTable, { Column, MTableBodyRow, TablePagination } from "material-table";

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
import CircularProgress from '@material-ui/core/CircularProgress';
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

class Lead extends Component {
    constructor() {
        super();

        this.state = {
            hoveringOver: ""
        };
    }

    async componentDidMount() {
      if( this.props.success === true ) return ;
      this.props.getAllData();
    }

    render() {
        const used_lead = this.props.used_lead;
        // this.exportToCSV();
        if ( this.props.success !== true ) {
          return (
              <div className="lds-grid">
                  <div style={{marginTop: "100px"}}><CircularProgress /></div>
              </div>
          )
        }

        return(
            <div className="table">
                <MaterialTable
                components={{
                    Pagination: props => {
                      return (
                        <td>
                          <table
                            style={{
                              position: 'fixed',
                              bottom: 0,
                              left: 0,
                              width: '100%',
                            }}
                          >
                            <tbody>
                              <tr>
                                <TablePagination {...props} />
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      );
                    },
                  }}
                    icons={tableIcons}
                    columns={[
                        { title: "Username", field: "username", width: "20%" },
                        { title: "Bot Number", field: "bot_number", width: "20%" },
                        { title: "DM", field: "dm"},
                        { title: "DM Expired", field: "dm_expired"},
                        { title: "Comment", field: "comment"},
                        { title: "Comment Expired", field: "comment_expired"},
                        { title: "Follow", field: "follow"},
                    ]}
                    data={used_lead}
                    options={{
                        pageSizeOptions: [10, 25, 50],
                        pageSize: 10,
                        headerStyle: {
                          backgroundColor: "#378FC3",
                          color: "#FFF",
                          fontSize: "17px",
                          fontWeight: "bold"
                        },
                        tableLayout: "fixed"
                    }}
                    components={{
                    }}
                    title="Lead"
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    success: state.success,
    used_lead: state.data.used_lead,
    bot_number: state.bot
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getAllData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lead)