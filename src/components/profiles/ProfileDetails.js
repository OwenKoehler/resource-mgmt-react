import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function ProfileDetails(props) {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    about: ''
  });

  useEffect(profileId => {
    Axios.get("/api/pro/profile/30").then(res => {
      setProfile(res.data);
    });
  }, []);

  const onChange = e => {
    e.persist();
    setProfile(profile => ({
      ...profile,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = e => {
    e.preventDefault();
    // other logic
  };

  return (
    <div>
      <ProfileCard profile={profile} onChange={onChange} />
    </div>
  );
}

function ProfileCard(props) {
  const classes = useStyles();
  const { profile, onSubmit, onChange } = props;
  return (
    <Card className={classes.card}>
      <form className={classes.formContainer} onSubmit={onSubmit}>
        <CardContent>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Profile Details
          </Typography>
          <TextField
            name="firstName"
            value={profile.firstName}
            className={classes.textField}
            label="First Name"
            margin="normal"
            onChange={onChange}
          />
          <TextField
            name="lastName"
            value={profile.lastName}
            className={classes.textField}
            label="Last Name"
            margin="normal"
            onChange={onChange}
          />
          <TextField
            name="email"
            value={profile.email}
            className={classes.textField}
            label="Email"
            margin="normal"
            onChange={onChange}
          />
          <TextField
            name="about"
            value={profile.about}
            className={classes.textField}
            label="About"
            margin="normal"
            onChange={onChange}
          />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            Back
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    margin: theme.spacing(2)
  },
  input: {
    display: "none"
  },

  // card styling
  card: {
    margin: "auto",
    marginTop: "2em",
    padding: "1em 2em",
    width: "40%",
    maxWidth: "500px",
    minWidth: "300px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  },

  // form styling
  formContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
