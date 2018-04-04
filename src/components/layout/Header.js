import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { LOGIN } from '../../constants/routes';
import { startUserLogout } from '../../actions/auth';

export const Header = ({ userLogout, userName, uid }) => (
  <header className="header">
    <div className="container header__content">
      <div className="pt-3 pb-1">
        <Link to={LOGIN}><p className="header__logo">Budgety</p></Link>
        <p>Keep track of your money</p>
      </div>
      {
        uid &&
        <div className="header__logout py-2">
          { userName &&
            <p className="mr-3 pb-2 pb-sm-0">
              Hello,<br className="d-block d-sm-none" /> {userName}!
            </p>
          }
          <Button className="float-right" color="danger" onClick={userLogout}>Log out</Button>
        </div>
      }
    </div>
  </header>
);

Header.propTypes = {
  userLogout: PropTypes.func,
  userName: PropTypes.string,
  uid: PropTypes.string,
};

Header.defaultProps = {
  userName: undefined,
  userLogout: undefined,
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
