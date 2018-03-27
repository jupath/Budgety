import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startUserLogout } from '../../actions/auth';

const Header = ({ userLogout, userName, uid }) => (
  <header>
    <div className="container header__content">
      <div>
        <h2>Budgety</h2>
        <p>Keep track of your money</p>
      </div>
      {
        uid &&
        <div>
          { userName && <p>Hello, {userName}!</p> }
          <button onClick={userLogout}>Log out</button>
        </div>
      }
    </div>
  </header>
);

Header.propTypes = {
  userLogout: PropTypes.func.isRequired,
  userName: PropTypes.string,
  uid: PropTypes.string,
};

Header.defaultProps = {
  userName: undefined,
  uid: undefined,
};

const mapStateToProps = state => ({
  userName: state.auth.name,
  uid: state.auth.uid,
});

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(startUserLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
