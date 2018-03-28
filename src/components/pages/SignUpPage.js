import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { startCreateUserWithEmailAndPass } from '../../actions/auth';
import { LOGIN } from '../../constants/routes';

class SignUpPage extends Component {
  state = {
    email: '',
    password1: '',
    password2: '',
    error: undefined,
  };

  onChangeEmail = (event) => {
    const email = event.target.value;
    this.setState({ email });
  }

  onChangePassword = (event) => {
    const password1 = event.target.value;
    this.setState({ password1 });
  }

  onChangePassword1 = (event) => {
    const password2 = event.target.value;
    this.setState({ password2 });
  }

  doCreateUser = (email, password) => {
    this.props.createUser(email, password)
      .then(() => {
        if (this.props.authError) {
          this.setState({ error: this.props.authError });
        } else {
          this.setState({ error: undefined });
        }
      });
  }

  handleCreateUser = (event) => {
    event.preventDefault();
    const { email, password1, password2 } = this.state;
    if (email === '' || password1 === '' || password2 === '') {
      this.setState({ error: 'Please, fill out every field!' });
    } else if (password1 !== password2) {
      this.setState({ error: 'The passwords are different!' });
    } else {
      this.doCreateUser(email, password1);
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login__box mt-6">
          <div className="login__header pt-3 pb-2 px-4">
            <h3 className="text-center">Sign up</h3>
            <p className="mb-0">and start keeping track of your money</p>
          </div>
          <div className="login__body pt-4 px-3">
            <Form onSubmit={this.handleCreateUser}>
              <FormGroup>
                <Label className="sr-only" for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required="required"
                  onChange={this.onChangeEmail}
                />
              </FormGroup>
              <FormGroup>
                <Label className="sr-only" for="password1">Password 1</Label>
                <Input
                  type="password"
                  name="password1"
                  id="password1"
                  placeholder="Password"
                  required="required"
                  onChange={this.onChangePassword}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="Password again"
                  required="required"
                  onChange={this.onChangePassword1}
                />
              </FormGroup>
              { this.state.error && <p className="text-danger">{this.state.error}</p> }
              <Button color="success">Sign up</Button>
            </Form>
            <p>Already have an account? <Link to={LOGIN}>Log in</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  createUser: PropTypes.func.isRequired,
  authError: PropTypes.string,
};

SignUpPage.defaultProps = {
  authError: undefined,
};

const mapStateToProps = state => ({
  authError: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  createUser: (email, password) => dispatch(startCreateUserWithEmailAndPass(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
