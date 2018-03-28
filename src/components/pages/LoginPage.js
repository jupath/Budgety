import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { startUserLogin } from '../../actions/auth';
import LoginForm from './LoginForm';
import { SIGNUP, RESET_PASS } from '../../constants/routes';

const LoginPage = ({ loginUser }) => (
  <div className="login">
    <div className="login__box mt-6">
      <div className="login__header pt-3 pb-2 px-4">
        <h3 className="text-center">Log in to your account</h3>
      </div>
      <div className="login__body pt-4 px-3">
        <Button className="login__google" onClick={loginUser}>
          Log in with Google
        </Button>
        <div className="login__separator-container py-3">
          <div className="login__separator" />
          <div className="px-2">OR</div>
          <div className="login__separator" />
        </div>
        <LoginForm />
        <p className="text-center">or <Link to={RESET_PASS}>Forgot password</Link></p>
        <p className="text-center">Don&rsquo;t have an account? <Link to={SIGNUP}>Sign up</Link></p>
      </div>
    </div>
  </div>
);

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(startUserLogin()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
