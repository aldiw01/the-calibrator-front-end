import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Certificate from 'components/Certificate/Certificate';
import Spinner from 'react-spinkit';
import axios from 'axios';

const propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  id: PropTypes.number,
  toggleView: PropTypes.func,
  view: PropTypes.bool,
};

class ViewDevice extends Component {
  constructor(props) {
    super(props)
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
      axios.put(process.env.REACT_APP_API_PATH + '/devices/documentation/' + this.props.data.id.replace("/", "%2F"), data)
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
      axios.put(process.env.REACT_APP_API_PATH + '/devices/manual_file/' + this.props.data.id.replace("/", "%2F"), data)
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
      axios.put(process.env.REACT_APP_API_PATH + '/devices/spec_file/' + this.props.data.id.replace("/", "%2F"), data)
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

    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <React.Fragment>
        <Modal isOpen={view} toggle={() => toggleView(id)} className={'modal-primary modal-lg'}>
          <ModalHeader toggle={() => toggleView(id)}>Data Perangkat</ModalHeader>
          <ModalBody className="modal-body-display">
            <Col xs="12" className="m-auto">
              <Row>
                <Col xs="3">No Asset</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.id}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Nama Alat</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.name}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Merk</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.manufacturer}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Model</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.model}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Serial Number</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.serial_number}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Status</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.defect_status === "1" ? "Rusak" : "Bagus"}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Tanggal Kalibrasi</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(data.calibration_date).toLocaleDateString()}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Akhir Kalibrasi</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(data.due_date).toLocaleDateString()}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Periode Kalibrasi</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.calibration_period} Tahun</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Penanggung Jawab</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.supervisor}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Tanggal Pembelian</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(data.issue_date).toLocaleDateString()}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Pengecekan Antara</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.test_interval}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">Metode Kalibrasi</Col>
                <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{data.calibration_method}</Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">File Manual</Col>
                <Col xs="8" className="border-bottom mt-auto" style={viewStyle}>
                  <a href={process.env.REACT_APP_API_PATH + '/uploads/devices/' + data.manual_file} target="_blank" rel="noopener noreferrer">{data.manual_file}</a>
                </Col>
                <Col xs="1" className="mt-auto">
                  <Button color="light" className="position-absolute" style={{ right: '0', top: '-35px' }} onClick={this.toggleEditManual}>
                    <i className="fa fa-pencil"></i>
                  </Button>
                </Col>
                <div className="w-100 py-2"></div>
                <Col xs="3">File Spesifikasi</Col>
                <Col xs="8" className="border-bottom mt-auto" style={viewStyle}>
                  <a href={process.env.REACT_APP_API_PATH + '/uploads/devices/' + data.spec_file} target="_blank" rel="noopener noreferrer">{data.spec_file}</a>
                </Col>
                <Col xs="1" className="mt-auto">
                  <Button color="light" className="position-absolute" style={{ right: '0', top: '-35px' }} onClick={this.toggleEditSpecification}>
                    <i className="fa fa-pencil"></i>
                  </Button>
                </Col>
                <div className="w-100 py-2"></div>
                <Col xs="12" className="m-auto">
                  <Button color="danger" className="position-absolute" style={{ right: '0', marginRight: '15px' }} onClick={this.toggleEditDocumentation}>
                    <i className="fa fa-pencil"></i>
                  </Button>
                  <img className="d-block w-100" src={process.env.REACT_APP_API_PATH + '/uploads/devices/' + data.documentation} alt='Calibration' />
                </Col>
                <div className="w-100 py-2"></div>
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

ViewDevice.propTypes = propTypes;

export default ViewDevice;