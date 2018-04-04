import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { LOGIN } from '../../constants/routes';
import { startSendPasswordResetEmail } from '../../actions/auth';

export class ResetPasswordPage extends Component {
  state = {
    error: '',
    message: '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.error !== nextProps.authError) {
      this.setState({ error: nextProps.authError });
    }

    if (this.state.message !== nextProps.authMessage) {
      this.setState({ message: nextProps.authMessage });
    }
  }

  handleResetPassword = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    if (email !== '') {
      this.props.resetPassword(email);
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login__box mt-6">
          <div className="login__header pt-3 pb-2 px-4">
            <h3 className="text-center">Reset password</h3>
          </div>
          <div className="login__body pt-4 px-3">
            <Form onSubmit={this.handleResetPassword}>
              <FormGroup>
                <Label className="sr-only" for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address..."
                  required="required"
                />
              </FormGroup>
              {this.state.error && <p className="text-danger">{this.state.error}</p>}
              {this.state.message && <p className="text-success">{this.state.message}</p>}
              <Button color="success">Reset password</Button>
              <div className="text-center"><Link to={LOGIN}>or Log in</Link></div>
            </Form>
          </div>
        </div>
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
  authError: '',
  authMessage: '',
};

const mapStateToProps = state => ({
  authError: state.auth.error,
  authMessage: state.auth.authMessage,
});

const mapDispathToProps = dispatch => ({
  resetPassword: email => dispatch(startSendPasswordResetEmail(email)),
});

export default connect(mapStateToProps, mapDispathToProps)(ResetPasswordPage);
