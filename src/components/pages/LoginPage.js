import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { startUserLogin } from '../../actions/auth';
import LoginForm from './LoginForm';
import { SIGNUP, RESET_PASS } from '../../constants/routes';

const LoginPage = ({ loginUser }) => (
  <div>
    <button onClick={loginUser}>Login with Google</button>
    <p>OR</p>
    <LoginForm />
    <p>or <Link to={RESET_PASS}>Forgot password</Link></p>
    <p>Don&rsquo;t have an account? <Link to={SIGNUP}>Sign up</Link></p>
  </div>
);

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch(startUserLogin()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
