import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Certificate from 'components/Certificate/Requests';
import Spinner from 'react-spinkit';
import axios from 'axios';
import AuthService from 'server/AuthService';

const propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  id: PropTypes.number,
  toggleView: PropTypes.func,
  view: PropTypes.bool,
};

class ViewRequest extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      documentation: '',
      edit_documentation: false,
      edit_manual: false,
      edit_specification: false,
      loader: false,
      manual_file: false,
      spec_file: false
    }
  }

  handleChangeFile = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }

  toggleEditDocumentation = () => {
    this.setState({
      edit_documentation: !this.state.edit_documentation,
      documentation: ''
    });
  }

  toggleEditManual = () => {
    this.setState({
      edit_manual: !this.state.edit_manual,
      manual_file: ''
    });
  }

  toggleEditSpecification = () => {
    this.setState({
      edit_specification: !this.state.edit_specification,
      spec_file: ''
    });
  }

  handleEditDocumentation = (event) => {
    event.preventDefault();
    if (window.confirm("You will change documentation picture. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('documentation', this.state.documentation);
      axios.put(process.env.REACT_APP_API_PATH + '/devices/documentation/' + this.props.data.id.replace(new RegExp("/", 'g'), "%2F"), data)
        .then(res => {
          this.setState({
            edit_documentation: !this.state.edit_documentation,
            loader: false,
            documentation: ''
          })
          alert(res.data.message);
          this.props.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleEditManual = (event) => {
    event.preventDefault();
    if (window.confirm("You will change manual file. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('manual_file', this.state.manual_file);
      axios.put(process.env.REACT_APP_API_PATH + '/devices/manual_file/' + this.props.data.id.replace(new RegExp("/", 'g'), "%2F"), data)
        .then(res => {
          this.setState({
            edit_manual: !this.state.edit_manual,
            loader: false,
            manual_file: ''
          })
          alert(res.data.message);
          this.props.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleEditSpecification = (event) => {
    event.preventDefault();
    if (window.confirm("You will change specification file. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('spec_file', this.state.spec_file);
      axios.put(process.env.REACT_APP_API_PATH + '/devices/spec_file/' + this.props.data.id.replace(new RegExp("/", 'g'), "%2F"), data)
        .then(res => {
          this.setState({
            edit_specification: !this.state.edit_specification,
            loader: false,
            spec_file: ''
          })
          alert(res.data.message);
          this.props.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  render() {

    const { data, id, toggleView, view } = this.props;
    // const role = this.Auth.getProfile().role
    // const lab = this.Auth.getProfile().lab

    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <React.Fragment>
        <Modal isOpen={view} toggle={() => toggleView(id)} className={'modal-primary modal-lg'}>
          <ModalHeader toggle={() => toggleView(id)}>Data SPK</ModalHeader>
          <ModalBody className="modal-body-display">
            <Col xs="12" className="m-auto">
              <Row>
                <div className="w-100 py-2"></div>
                <Col className="border-bottom"><strong>Isi Surat Perintah Kerja</strong></Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">No SPK</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.id}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Laboratorium Penguji</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.lab}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Tipe Pengujian</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.request_type}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Nama Perangkat</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.device_name}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Merk</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.manufacturer}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Model</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.type}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Serial Number</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.serial_number}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Kapasitas</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.capacity}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Made In</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.made_in}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Referensi Uji</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.test_reference}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Nama Perusahaan</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.company_name}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Alamat Perusahaan</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.company_address}</Col>
                <div className="w-100 py-2"></div>

                <div className="w-100 py-2"></div>
                <Col className="border-bottom"><strong>Jadwal SPK</strong></Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Tanggal SPK</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(data.created).toLocaleDateString("en-GB")}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Target Mulai Uji</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(data.start_target).toLocaleDateString("en-GB")}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Target Selesai Uji</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(data.finished_target).toLocaleDateString("en-GB")}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Mulai Uji</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.actual_start ? new Date(data.actual_start).toLocaleDateString("en-GB") : "-"}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Selesai Uji</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.actual_finished ? new Date(data.actual_finished).toLocaleDateString("en-GB") : "-"}</Col>
                <div className="w-100 py-2"></div>

                <div className="w-100 py-2"></div>
                <Col className="border-bottom"><strong>Pelaksana SPK</strong></Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Test Engineer 1</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.engineer_1}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Test Engineer 2</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.engineer_2}</Col>
                <div className="w-100 py-2"></div>

                <Col xs="3">Test Engineer 3</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.engineer_3}</Col>
                <div className="w-100 py-2"></div>

                {/* <Col xs="12" className="m-auto">
                  {role === "2" || lab === data.id.slice(-3) ?
                    <Button color="danger" className="position-absolute" style={{ right: '0', marginRight: '15px' }} onClick={this.toggleEditDocumentation}>
                      <i className="fa fa-pencil"></i>
                    </Button> : ""}
                  <img className="d-block w-100" src={process.env.REACT_APP_API_PATH + '/uploads/devices/' + data.documentation} alt='Calibration' />
                </Col>
                <div className="w-100 py-2"></div> */}

                <Col xs="12">
                  <Certificate id={data.id} />
                </Col>
              </Row>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggleView(id)}>Close</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.edit_documentation} toggle={this.toggleEditDocumentation} className={'modal-danger'}>
          <Form onSubmit={this.handleEditDocumentation} method="post" encType="multipart/form-data">
            <ModalHeader toggle={this.toggleEditDocumentation}>Choose Documentation Photo</ModalHeader>
            <ModalBody className="modal-body-display">
              <Col xs="12" className="m-auto">
                <Row>
                  <div className="custom-file">
                    <Input type="file" className="custom-file-input" name="documentation" onChange={this.handleChangeFile} required />
                    <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.documentation ? this.state.documentation.name : ""} </Label>
                  </div>
                  <small>
                    <strong>
                      Note: Hanya file (jpg/jpeg/png), max 1 MB.
                    </strong>
                  </small>
                </Row>
              </Col>
            </ModalBody>
            <ModalFooter>
              {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
              <Button color="danger" type="submit" >Submit</Button>
              <Button color="secondary" onClick={this.toggleEditDocumentation}>Close</Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal isOpen={this.state.edit_manual} toggle={this.toggleEditManual} className={'modal-danger'}>
          <Form onSubmit={this.handleEditManual} method="post" encType="multipart/form-data">
            <ModalHeader toggle={this.toggleEditManual}>Choose Manual File</ModalHeader>
            <ModalBody className="modal-body-display">
              <Col xs="12" className="m-auto">
                <Row>
                  <div className="custom-file">
                    <Input type="file" className="custom-file-input" name="manual_file" onChange={this.handleChangeFile} required />
                    <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.manual_file ? this.state.manual_file.name : ""} </Label>
                  </div>
                  <small>
                    <strong>
                      Note: Hanya file (jpg/jpeg/png/pdf/doc), max 5 MB.
                    </strong>
                  </small>
                </Row>
              </Col>
            </ModalBody>
            <ModalFooter>
              {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
              <Button color="danger" type="submit" >Submit</Button>
              <Button color="secondary" onClick={this.toggleEditManual}>Close</Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal isOpen={this.state.edit_specification} toggle={this.toggleEditSpecification} className={'modal-danger'}>
          <Form onSubmit={this.handleEditSpecification} method="post" encType="multipart/form-data">
            <ModalHeader toggle={this.toggleEditSpecification}>Choose Specification File</ModalHeader>
            <ModalBody className="modal-body-display">
              <Col xs="12" className="m-auto">
                <Row>
                  <div className="custom-file">
                    <Input type="file" className="custom-file-input" name="spec_file" onChange={this.handleChangeFile} required />
                    <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.spec_file ? this.state.spec_file.name : ""} </Label>
                  </div>
                  <small>
                    <strong>
                      Note: Hanya file (jpg/jpeg/png/pdf/doc), max 5 MB.
                    </strong>
                  </small>
                </Row>
              </Col>
            </ModalBody>
            <ModalFooter>
              {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
              <Button color="danger" type="submit" >Submit</Button>
              <Button color="secondary" onClick={this.toggleEditSpecification}>Close</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

ViewRequest.propTypes = propTypes;

export default ViewRequest;