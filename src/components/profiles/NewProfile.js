import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

export default function NewProfile(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    
    handleClose();
  }
  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={handleOpen}
        >
          Add A New Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        className= "modalStyle"
      >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              New Profile
            </Typography>
            <FormControl className={classes.formContainer}>
              <TextField
                id="fName"
                className={classes.textField}
                label="First Name"
                margin="normal"
              />
              <TextField
                id="lName"
                className={classes.textField}
                label="Last Name"
                margin="normal"
              />
              <TextField
                id="email"
                className={classes.textField}
                label="Email"
                margin="normal"
              />
              <TextField
                id="about"
                className={classes.textField}
                label="About"
                margin="normal"
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>

      </Modal>
    </div>
  );
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },

  // card styling
  card: {
    margin: 'auto',
    marginTop: '2em',
    padding: '1em 2em',
    width: '50%',
    maxWidth: '500px',
    minWidth: '300px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },

  // form styling
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

