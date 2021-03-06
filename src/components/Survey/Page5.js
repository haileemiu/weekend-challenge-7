import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = ({
  
});

class Page5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // redirect to do another survey
      toPage1: false,
      callComplete: false,
      callSuccess: false
    }
  }
  sendFeedback = () => {
    // Post to router on page load
    axios({
      method: 'POST',
      url: '/feedback',
      data: this.props.feedback
    }).then(response => {
      this.setState({ callComplete: true, callSuccess: true })
    }).catch(error => {
      this.setState({ callComplete: true, callSuccess: false })
    })
  }

  componentDidMount() {
    this.sendFeedback();
  }

  handleClick = () => {
    this.setState({
      toPage1: true
    })
  }

  render() {
    if (this.state.toPage1 === true) {
      return <Redirect to='/page1' />
    }

    if (!this.state.callComplete) {
      return <p>Submitting Responses...</p>;
    }

    if (!this.state.callSuccess) {
     
      return (
        <div>
          <p>Could not submit responses to server!</p>
          <button onClick={this.sendFeedback}>Retry</button>
        </div>
      )
    }

    return (
      <div>
        <h1>THANK YOU!</h1>
        <h3>Your response has been submitted.</h3>
        {/* <button onClick={this.handleClick}>Leave New Feedback</button> */}

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={this.handleClick}>
          Leave New Feedback
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feedback: state.feedback
})

// export default connect(mapStateToProps)(Page5);

Page5.propTypes = {
  classes: PropTypes.object.isRequired
};

const styledForm = withStyles(styles)(Page5);

export default connect(mapStateToProps)(styledForm);