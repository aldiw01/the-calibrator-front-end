import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  assets: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dataBox: PropTypes.func,
};

const defaultProps = {
  assets: [{ id: "100/CAL" }, { id: "101/CAL" }, { id: "103/CAL" }],
  dataBox: () => ({ variant: 'facebook', friends: '-', feeds: '-' }),
};

class Calibrated extends Component {
  render() {

    // eslint-disable-next-line
    const { assets, children, className, cssModule, dataBox, ...attributes } = this.props;

    // demo purposes only
    const data = dataBox();
    const variant = data.variant;

    const back = 'bg-secondary';
    const icon = variant;
    const keys = Object.keys(data);
    const vals = Object.values(data);

    const boxStyle = {
      height: '102px',
      overflowY: 'auto'
    }

    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`, back);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);

    return (
      <div className={classes}>
        <div className={classCardHeader}>
          <div className="d-flex flex-column text-center">
            <i className={icon}></i>
            <span className="text-uppercase small pt-2">
              {children}
            </span>
          </div>
        </div>
        <div className={classCardBody + " p-0"}>
          <div className="bg-dark">
            <div className="text-value">{vals[1]}</div>
            <div className="text-uppercase small">{keys[1]}</div>
          </div>
        </div>
        <div className={classCardBody + " p-0"}>
          <div className="p-0">
            <div className="box-body p-2" style={boxStyle}>
              {assets.length > 0 ?
                assets.map((item, i) =>
                  <h5 key={i}>{item.id}<br /></h5>
                ) : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Calibrated.propTypes = propTypes;
Calibrated.defaultProps = defaultProps;

export default Calibrated;
