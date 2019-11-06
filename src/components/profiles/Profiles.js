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
import IconButton from "@material-ui/core/IconButton";

import Axios from "axios";
import NewProfile from "./NewProfile";

const classes = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  container: {
    maxWidth: "20%"
  }
});

function Profiles(props) {
  const [profiles, setProfiles] = useState([]);

  const routeChange = (profileId) => {
    let path = '/profile/'+profileId;
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

  const getProfile = () => {};

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
      <NewProfile addProfile={addProfile} />
      <ProfileTable
        profiles={profiles}
        getProfile={getProfile}
        delProfile={delProfile}
        routeChange={routeChange}
      />
    </React.Fragment>
  );
}

function ProfileTable(props) {
  return (
    <div className={classes.container}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <ProfileTableHead />
          <ProfileTableBody
            profiles={props.profiles}
            getProfile={props.getProfile}
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
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
}

class ProfileTableBody extends Component {
  render() {
    return (
      <TableBody>
        {this.props.profiles.map(profile => (
          <TableRow
            key={profile.profileId}
            hover
            onClick={this.props.routeChange.bind(this, profile.profileId)}
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

export default withRouter(Profiles);
