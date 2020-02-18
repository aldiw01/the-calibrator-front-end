import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dataBox: PropTypes.func,
  lab: PropTypes.string,
  refMain: PropTypes.string
};

const defaultProps = {
  dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-' }),
  refMain: "/devices"
};

class Devices extends Component {
  render() {

    // eslint-disable-next-line
    const { children, className, cssModule, dataBox, lab, refMain, ...attributes } = this.props;

    // demo purposes only
    const data = dataBox();
    const variant = data.variant;

    const back = 'bg-secondary';
    const icon = variant;
    const keys = Object.keys(data);
    const vals = Object.values(data);

    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`, back);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);

    return (
      <div className={classes}>
        <Link to={refMain} className="dashboard text-decoration-none text-dark">
          <div className={classCardHeader}>
            <div className="d-flex flex-column text-center">
              <i className={icon}></i>
              <span className="text-uppercase small pt-2">
                {children}
              </span>
            </div>
          </div>
          <div className={classCardBody + " p-0"}>
            <div className="bg-primary">
              <div className="text-value">{vals[1]}</div>
              <div className="text-uppercase small">{keys[1]}</div>
            </div>
          </div>
        </Link>
        <div className={classCardBody + " p-0"}>
          <Link to={"/devices/table/" + lab + "/defect/0"} className="dashboard text-decoration-none p-0">
            <div className="bg-success">
              <div className="text-value">{vals[2]}</div>
              <div className="text-uppercase small">{keys[2]}</div>
            </div>
          </Link>
          <Link to={"/devices/table/" + lab + "/defect/1"} className="dashboard text-decoration-none p-0">
            <div className="bg-danger">
              <div className="text-value">{vals[3]}</div>
              <div className="text-uppercase small">{keys[3]}</div>
            </div>
          </Link>
        </div>
        <Link to={"/devices/table/" + lab} className="dashboard text-decoration-none p-0">
          <div className={classCardBody + " p-0"}>
            <div className="bg-dark">
              <div className="text-value">{vals[4]}</div>
              <div className="text-uppercase small">{keys[4]}</div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

Devices.propTypes = propTypes;
Devices.defaultProps = defaultProps;

export default Devices;
