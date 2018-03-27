import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LOGIN } from '../../constants/routes';
import { startSendPasswordResetEmail } from '../../actions/auth';

class ResetPasswordPage extends Component {
  state = {
    error: undefined,
    message: undefined,
  }

  doResetPassword = (email) => {
    this.props.resetPassword(email)
      .then(() => {
        if (this.props.authError) {
          this.setState({ error: this.props.authError });
        } else if (this.props.authMessage) {
          this.setState({ error: this.props.authMessage });
        }
      });
  }

  handleResetPassword = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    if (email === '') {
      this.setState({ error: 'Please, fill out the field!' });
    } else {
      this.doResetPassword(email);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleResetPassword}>
          <input
            type="email"
            name="email"
            required="required"
          />
          {this.state.error && <p>{this.state.error}</p>}
          {this.state.message && <p>{this.state.message}</p>}
          <button>Reset password</button>
          <Link to={LOGIN}>Log in</Link>
        </form>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authMessage: PropTypes.string,
};

ResetPasswordPage.defaultProps = {
  authError: undefined,
  authMessage: undefined,
};

const mapStateToProps = state => ({
  authError: state.auth.error,
  authMessage: state.auth.authMessage,
});

const mapDispathToProps = dispatch => ({
  resetPassword: email => dispatch(startSendPasswordResetEmail(email)),
});

export default connect(mapStateToProps, mapDispathToProps)(ResetPasswordPage);
