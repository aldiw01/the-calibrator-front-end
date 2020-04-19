import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  // data: PropTypes.any,
  id: PropTypes.any
};

class HistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        reference_id: '',
        name: '',
        action: '',
        info: '',
        step_number: '',
        message: '',
        created: ''
      }]
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.id !== prevProps.id) {
      this.getData();
    }
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/history/reference/' + this.props.id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        this.setState({
          data: [{
            reference_id: '',
            name: '',
            action: '',
            info: '',
            step_number: '',
            message: '',
            created: ''
          }]
        });
      });
  }

  render() {

    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-history"></i><strong>Record History</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                {this.state.data[0].reference_id ?
                  this.state.data.map((item, i) =>
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