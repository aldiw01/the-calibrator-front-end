import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from 'react-spinkit';
import AuthService from 'server/AuthService';
import MeasuringEquipment from 'components/Requests/MeasuringEquipment';
import RawData from 'components/Requests/RawData';

const propTypes = {
  data: PropTypes.any,
  getData: PropTypes.func,
  id: PropTypes.any,
  measuring_equipment: PropTypes.any
};

class Actions extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService()
    this.state = {
      accept: false,
      date: '',
      loader: false,
      message: '',
      reject: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAccept = (event) => {
    event.preventDefault();
    this.setState({ loader: true });
    // INSERT HISTORY INTO DATABASE
    var request = {
      reference_id: this.props.id,
      test_engineer_id: this.Auth.getProfile().id,
      cal_step_id: "REQ" + this.props.request_type + (parseInt(this.props.data.step_number) + 1),
      message: this.state.message
    }
    axios.post(process.env.REACT_APP_API_PATH + '/history', request)
      .then((res) => {
        this.setState({
          loader: false,
          accept: false
        })
        alert(res.data.message);
        this.props.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
    ////////////////////////////////////////////////////////////////
  }

  handleReject = (event) => {
    event.preventDefault();
    this.setState({ loader: true });
    // INSERT HISTORY INTO DATABASE
    var request = {
      reference_id: this.props.id,
      test_engineer_id: this.Auth.getProfile().id,
      cal_step_id: "REQ" + this.props.request_type + (parseInt(this.props.data.step_number) - 1),
      message: this.state.message
    }
    axios.post(process.env.REACT_APP_API_PATH + '/history', request)
      .then((res) => {
        this.setState({
          loader: false,
          reject: false
        })
        alert(res.data.message);
        this.props.getData();
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
    ////////////////////////////////////////////////////////////////
  }

  toggleAccept = (event) => {
    event.preventDefault();
    this.setState({
      accept: !this.state.accept,
    });
  }

  toggleReject = () => {
    this.setState({
      reject: !this.state.reject,
    });
  }

  render() {

    const { data, id, measuring_equipment } = this.props

    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-history"></i><strong>Action</strong>
            </CardHeader>
            <CardBody>
              {data.step_number === "5" ?
                ""
                :
                data.step_number === "4" ?
                  ""
                  :
                  data.step_number === "3" ?
                    <Row>
                      <Col xs="12">
                        <MeasuringEquipment id={id} data={measuring_equipment} getData={this.props.getData} />
                        {/* <RawData id={id} data={measuring_equipment} getData={this.props.getData} /> */}
                        <Form action="" method="post" onSubmit={this.toggleAccept} className="form-horizontal">
                          <FormGroup>
                            <div className="mt-3 d-flex justify-content-between">
                              <Button color="danger" onClick={this.toggleReject} style={{ minWidth: "45%" }}>Reject</Button>
                              <Button type="submit" color="success" style={{ minWidth: "45%" }}>Accept</Button>
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    :
                    data.step_number === "2" ?
                      <Row>
                        <Col xs="12">
                          <Form action="" method="post" onSubmit={this.toggleAccept} className="form-horizontal">
                            <Label>Evaluasi hasil uji fungsi</Label>
                            <Input type="textarea" rows="3" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Input your message" required />
                            <div className="mt-3 d-flex justify-content-between">
                              <Button color="danger" onClick={this.toggleReject} style={{ minWidth: "45%" }}>Reject</Button>
                              <Button type="submit" color="success" style={{ minWidth: "45%" }}>Accept</Button>
                            </div>
                          </Form>
                        </Col>
                      </Row>
                      :
                      <Row>
                        <Col xs="12">
                          <Form action="" method="post" onSubmit={this.toggleAccept} className="form-horizontal">
                            <Label>Pilih tanggal uji fungsi</Label>
                            <Input type="date" name="date" value={this.state.date} onChange={this.handleChange} required />
                            <Input className="mt-2" type="textarea" rows="3" name="message" value={this.state.message} onChange={this.handleChange} placeholder="Input your message" required />
                            <div className="mt-3 d-flex justify-content-between">
                              <Button color="danger" onClick={this.toggleReject} style={{ minWidth: "45%" }}>Reject</Button>
                              <Button type="submit" color="success" style={{ minWidth: "45%" }}>Accept</Button>
                            </div>
                          </Form>
                        </Col>
                      </Row>
              }
            </CardBody>

            <Modal isOpen={this.state.accept} toggle={this.toggleAccept} className={'modal-success modal-sm'}>
              <ModalHeader toggle={this.toggleAccept}>SPK Action</ModalHeader>
              <ModalBody>
                Proses status SPK {id}?
              </ModalBody>
              <ModalFooter>
                {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                <Button color="success" onClick={this.handleAccept}>Proceed</Button>{' '}
                <Button color="secondary" onClick={this.toggleAccept}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.reject} toggle={this.toggleReject} className={'modal-danger modal-sm'}>
              <ModalHeader toggle={this.toggleReject}>SPK Action</ModalHeader>
              <ModalBody>
                Proses status SPK {id}?
              </ModalBody>
              <ModalFooter>
                {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                <Button color="danger" onClick={this.handleReject}>Reject</Button>{' '}
                <Button color="secondary" onClick={this.toggleReject}>Cancel</Button>
              </ModalFooter>
            </Modal>

          </Card>
        </Col>
      </Row>
    );
  }
}

Actions.propTypes = propTypes;

export default Actions;