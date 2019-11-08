import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MySnackbar from "../layout/MySnackbar";
import InfoSnackbar from "../layout/InfoSnackbar";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function ProfileDetails(props) {
  const classes = useStyles();
  const [profile, setProfile] = useState({
    profileId: "",
    firstName: "",
    lastName: "",
    email: "",
    about: ""
  });
  const [evaluation, setEvaluation] = useState({
    reviewer: "",
    rating: "",
    technologies: "",
    interviewDate: new Date(),
    email: "",
    profileProfileId: 0
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openInfoSnackbar, setOpenInfoSnackbar] = useState(false);

  useEffect(() => {
    // grab id from url path param
    const profileId = props.match.params.profileId;

    // get profile
    getProfile(profileId);

    // get evaluation
    getEvaluation(profileId);
  }, [props.match.params.profileId]);

  // const routeChange = () => {
  //   props.history.goBack();
  // };

  const onChange = e => {
    e.persist();
    setProfile(profile => ({
      ...profile,
      [e.target.name]: e.target.value
    }));
  };

  const evaluationOnChange = e => {
    e.persist();
    setEvaluation(evaluation => ({
      ...evaluation,
      [e.target.name]: e.target.value
    }));
  };

  const handleDateChange = date => {
    setEvaluation(evaluation => ({
      ...evaluation,
      "interviewDate": date
    }));
  };

  const getProfile = profileId => {
    axios.get("/api/pro/profile/" + profileId).then(res => {
      setProfile(res.data);
    });
  };

  const updateProfile = profile => {
    axios.put("/api/pro", profile);
  };

  const undoProfileChanges = profileId => {
    getProfile(profileId);
    setOpenInfoSnackbar(true);
  };

  const onSubmitProfile = e => {
    e.preventDefault();
    updateProfile(profile);
    setOpenSnackbar(true);
  };

  const addEvaluation = evaluation => {
    console.log(evaluation);
    axios
      .post("/api/eval", {
        evaluationId: profile.profileId,
        reviewer: evaluation.reviewer,
        rating: evaluation.rating,
        technologies: evaluation.technologies,
        interviewDate: evaluation.interviewDate,
        profileProfileId: profile.profileId
      })
      .then(({ data }) => setEvaluation(data));
  };

  // const getEvaluation = profileId => {
  //   axios.get("/api/eval/evaluation/" + profileId).then(res => {
  //     setEvaluation(res.data);
  //   });
  // };

  const getEvaluation = profileId => {
    axios.get("/api/eval/evaluations").then(({ data }) => {
      const result = data.filter(
        // eslint-disable-next-line
        evaluation => evaluation.profileProfileId == profileId
      );
      if (result.length > 0) {
        
        setEvaluation(result.pop());
      }
    });
  };

  const updateEvaluation = evaluation => {
    axios.put("/api/eval", evaluation);
  };

  const undoEvaluationChanges = profileId => {
    getEvaluation(profileId);
    setOpenInfoSnackbar(true);
  };

  const onSubmitEvaluation = e => {
    e.preventDefault();
    console.log(evaluation);
    evaluation.evaluationId
      ? updateEvaluation(evaluation)
      : addEvaluation(evaluation);
    setOpenSnackbar(true);
  };

  return (
    <div className={classes.container}>
      <MySnackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
      <InfoSnackbar
        open={openInfoSnackbar}
        onClose={() => setOpenInfoSnackbar(false)}
      />
      <ProfileCard
        profile={profile}
        onChange={onChange}
        onSubmit={onSubmitProfile}
        undoChanges={undoProfileChanges}
      />
      <EvaluationCard
        evaluation={evaluation}
        onChange={evaluationOnChange}
        handleDateChange={handleDateChange}
        onSubmit={onSubmitEvaluation}
        undoChanges={undoEvaluationChanges}
      />
    </div>
  );
}

function ProfileCard(props) {
  const classes = useStyles();
  const { profile, onSubmit, onChange, undoChanges } = props;
  return (
    <div>
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
              multiline
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
              onClick={onSubmit}
            >
              Save Changes
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={undoChanges.bind(this, profile.profileId)}
            >
              Undo Changes
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}

function EvaluationCard(props) {
  const classes = useStyles();
  const { evaluation, onChange, onSubmit, undoChanges, handleDateChange } = props;
  return (
    <div>
      <Card className={classes.card}>
        <form className={classes.formContainer} onSubmit={onSubmit}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              Evaluation
            </Typography>
            <TextField
              name="reviewer"
              value={evaluation.reviewer}
              className={classes.textField}
              label="Reviewer"
              margin="normal"
              onChange={onChange}
            />
            <TextField
              name="rating"
              value={evaluation.rating}
              className={classes.textField}
              label="Rating"
              margin="normal"
              type="number"
              onChange={onChange}
            />
            <TextField
              name="technologies"
              value={evaluation.technologies}
              className={classes.textField}
              label="Technologies"
              margin="normal"
              onChange={onChange}
            />
            {/* <TextField
              name="interviewDate"
              value={evaluation.interviewDate}
              className={classes.textField}
              label="Interview Date"
              margin="normal"
              onChange={onChange}
            /> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="interviewDate"
                value={evaluation.interviewDate}
                className={classes.textField}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Interview Date"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onSubmit}
            >
              Save Changes
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={undoChanges.bind(this, evaluation.evaluationId)}
            >
              Undo Changes
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: "2em"
  },
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
    width: "100%"
  }
}));

export default withRouter(ProfileDetails);
