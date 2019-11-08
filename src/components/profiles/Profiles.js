import React, { useState, useEffect, Component } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

import Axios from "axios";
import NewProfile from "./NewProfile";
import { classes } from "istanbul-lib-coverage";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  head: {
    backgroundColor:"red",
  },
  container: {
    maxWidth: "100%"
  },
  tableContainer: {
    padding: "0em 3em",
  }
});

function Profiles(props) {
  const classes = useStyles();
  const [profiles, setProfiles] = useState([]);

  const routeChange = profileId => {
    let path = "/profile/" + profileId;
    props.history.push(path);
  };

  useEffect(() => {
    Axios.get("/api/pro/profiles").then(res => {
      setProfiles(res.data);
    });
  }, []);

  // Add Profile
  const addProfile = profile => {
    Axios.post("/api/pro", {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      about: profile.about,
      fileFileId: 0
    }).then(({ data }) => setProfiles([...profiles, data]));
  };

  const delProfile = profileId => {
    Axios.delete("/api/pro/profile/" + profileId).then(res =>
      setProfiles([
        ...profiles.filter(profile => profile.profileId !== profileId)
      ])
    );
  };

  // getProfile = profileId => {
  //   Axios.get("/api/pro/profile/"+profileId).then(res => {
  //     // Redirect to profile page
  //     this.setState(() => ({ redirectToProfile: true }))
  //   });
  // }

  return (
    <React.Fragment>
      <NewProfile classes={classes} addProfile={addProfile} />
      <div className={classes.tableContainer}>
        <ProfileTable
          classes={classes}
          profiles={profiles}
          delProfile={delProfile}
          routeChange={routeChange}
        />
      </div>
    </React.Fragment>
  );
}

function ProfileTable(props) {
  return (
    <div className={props.classes.container}>
      <Paper className={props.classes.root}>
        <Table className={props.classes.table}>
          <ProfileTableHead classes={props.classes} />
          <ProfileTableBody
            classes={props.classes}
            profiles={props.profiles}
            delProfile={props.delProfile}
            routeChange={props.routeChange}
          />
        </Table>
      </Paper>
    </div>
  );
}

function ProfileTableHead() {
  return (
    <TableHead>
      <TableRow className={classes.head}>
        <TableCell>ID</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

class ProfileTableBody extends Component {
  render() {
    return (
      <TableBody>
        {this.props.profiles.map(profile => (
          <TableRow key={profile.profileId} hover>
            <TableCell
              onClick={this.props.routeChange.bind(this, profile.profileId)}
            >
              {profile.profileId}
            </TableCell>
            <TableCell
              onClick={this.props.routeChange.bind(this, profile.profileId)}
            >
              {profile.firstName}
            </TableCell>
            <TableCell
              onClick={this.props.routeChange.bind(this, profile.profileId)}
            >
              {profile.lastName}
            </TableCell>
            <TableCell>
              <IconButton
                color="secondary"
                className={this.props.classes.margin}
                onClick={this.props.routeChange.bind(this, profile.profileId)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                className={this.props.classes.margin}
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

export default withRouter(Profiles);
