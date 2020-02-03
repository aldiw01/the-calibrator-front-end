import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row } from 'reactstrap';

class Certificate extends Component {
  render() {
    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-history"></i><strong>Daftar Sertifikat</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                {this.props.certificate[0].id ?
                  this.props.certificate.map(item =>
                    <ListGroupItem action key={item.id}>
                      <div className="d-flex w-100 justify-content-between">
                        <a href={process.env.REACT_APP_API_PATH + '/uploads/cal_certificates/' + item.certificate_file} target="_blank" rel="noopener noreferrer">
                          <ListGroupItemHeading>{item.id}</ListGroupItemHeading>
                        </a>
                        {/* <small>{new Date(item.calibration_date).toLocaleString('en-GB')}</small> */}
                      </div>
                      <ListGroupItemText>
                        <Row>
                          <Col xs="3">Tanggal Kalibrasi</Col>
                          <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{item.calibration_date}</Col>
                          <div className="w-100 py-2"></div>
                          <Col xs="3">Akhir Kalibrasi</Col>
                          <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{item.due_date}</Col>
                          <div className="w-100 py-2"></div>
                          <Col xs="3">ID Engineer</Col>
                          <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{item.test_engineer_id}</Col>
                        </Row>
                      </ListGroupItemText>
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

export default Certificate;