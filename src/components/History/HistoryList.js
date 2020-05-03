import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.any,
  getData: PropTypes.func,
  id: PropTypes.any
};

class HistoryList extends Component {
  render() {

    const { data } = this.props;

    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-history"></i><strong>Record History</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                {data[0].reference_id ?
                  data.map((item, i) =>
                    <ListGroupItem action key={i}>
                      <div className="d-flex w-100 justify-content-between">
                        <ListGroupItemHeading>{item.action}</ListGroupItemHeading>
                        <small>{new Date(item.created).toLocaleString('en-GB')}</small>
                      </div>
                      <span>
                        {item.name + " " + item.info}
                        {item.message ? <span className="font-weight-bold">{" : " + item.message}</span> : ""}
                      </span>
                    </ListGroupItem>
                  ) : "No record found"
                }
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

HistoryList.propTypes = propTypes;

export default HistoryList;