import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import Axios from "axios";
import NewProfile from "./NewProfile";

const classes = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});




export class Profiles extends Component {
  state = {
    profiles: []
  }

  componentDidMount() {
    Axios.get("/api/pro/profiles").then(res => {
      this.setState({ profiles: res.data });
    });
  }

  delProfile = profileId => {
    Axios.delete("/api/pro/profile/"+profileId).then(res =>
      this.setState({
        todos: [...this.state.profiles.filter(profile => profile.profileId !== profileId)]
      })
    );
  }

  getProfile = profileId => {
    Axios.get("/api/pro/profile/"+profileId).then(res =>
      console.log(res.data)
    );
  }
  
  render() {
    return (
      <React.Fragment>
        <NewProfile addProfile={this.props.addProfile}/>
        <ProfileTable
          profiles={this.state.profiles}
          getProfile={this.getProfile}
          delProfile={this.delProfile}
        />
      </React.Fragment>
    );
  }
}

class ProfileTable extends Component {
  render() {
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <ProfileTableHead/>
            <ProfileTableBody
              profiles={this.props.profiles}
              getProfile={this.props.getProfile}
              delProfile={this.props.delProfile}
              />
          </Table>
        </Paper>
      </div>
    )
  }
}

function ProfileTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  )
}

class ProfileTableBody extends Component {
  render() {
    return(
      <TableBody>
        {this.props.profiles.map(profile => (
          <TableRow
            key={profile.profileId}
            hover
            onClick={this.props.getProfile.bind(this, profile.profileId)}
          >
            <TableCell>{profile.profileId}</TableCell>
            <TableCell>{profile.firstName}</TableCell>
            <TableCell>{profile.lastName}</TableCell>
            <TableCell>
              <IconButton
                color="secondary"
                className={classes.margin}
                onClick={this.props.delProfile.bind(this, profile.profileId)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
}



export default Profiles;
