import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input, Row } from 'reactstrap';
import axios from 'axios';
import AuthService from 'server/AuthService';
import Spinner from 'react-spinkit';

class Certificate extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: 0,
      device_id: this.props.id,
      add: false,
      view: false,
      edit: false,
      delete: false,
      loader: false,
      data: [{
        id: '',
        device_id: '',
        calibration_date: '',
        due_date: '',
        test_engineer_id: '',
        certificate_file: ''
      }],
      focus: {
        id: '',
        device_id: this.props.id,
        calibration_date: '',
        due_date: '',
        test_engineer_id: '',
        certificate_file: ''
      },
      new: {
        id: '',
        device_id: this.props.id,
        calibration_date: '',
        due_date: '',
        test_engineer_id: '',
        certificate_file: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(localStorage.getItem('serverAPI') + '/cal_certificates/devices/' + this.state.device_id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        this.setState({
          data: [{
            id: '',
            device_id: '',
            calibration_date: '',
            due_date: '',
            test_engineer_id: '',
            certificate_file: ''
          }]
        });
      });
  }

  handleChange = (event) => {
    this.setState({
      focus: {
        ...this.state.focus,
        [event.target.name]: event.target.value
      }
    })
  }

  handleChangeNew = (event) => {
    this.setState({
      new: {
        ...this.state.new,
        [event.target.name]: event.target.value
      }
    })
  }

  handleChangeNewFile = (event) => {
    console.log(event.target.name)
    console.log(event.target.files[0])
    this.setState({
      new: {
        ...this.state.new,
        [event.target.name]: event.target.files[0]
      }
    })
  }

  handleAdd = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('id', this.state.new.id);
      data.append('device_id', this.state.new.device_id);
      data.append('calibration_date', this.state.new.calibration_date);
      data.append('due_date', this.state.new.due_date);
      data.append('test_engineer_id', this.state.new.test_engineer_id);
      data.append('certificate_file', this.state.new.certificate_file);
      axios.post(localStorage.getItem('serverAPI') + '/cal_certificates', data)
        .then(res => {
          this.setState({
            add: !this.state.add,
            loader: false,
            new: {
              id: '',
              device_id: '',
              calibration_date: '',
              due_date: '',
              test_engineer_id: '',
              certificate_file: ''
            }
          })
          alert(res.data.message);
          this.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleEdit = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      axios.put(localStorage.getItem('serverAPI') + '/cal_certificates/' + this.state.data[this.state.id].id, this.state.focus)
        .then(res => {
          this.setState({
            edit: !this.state.edit,
            loader: false,
            certificate_file: ''
          })
          alert(res.data.message);
          this.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  handleDelete = (id) => {
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      axios.delete(localStorage.getItem('serverAPI') + '/cal_certificates/ever/' + id)
        .then(res => {
          this.setState({
            delete: !this.state.delete,
            loader: false
          })
          alert(res.data.message);
          this.getData();
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  toggleAdd = () => {
    this.setState({
      add: !this.state.add,
    });
  }

  toggleEdit = (id) => {
    this.setState({
      id: id,
      edit: !this.state.edit,
      focus: this.state.data[id]
    });
  }

  toggleDelete = (id) => {
    this.setState({
      id: id,
      delete: !this.state.delete
    });
  }

  render() {
    const role = this.Auth.getProfile().role
    const lab = this.Auth.getProfile().lab

    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-history"></i><strong>Daftar Sertifikat</strong>
              {role === "2" || lab === this.props.id.slice(-3) ?
                <Button color="success" className="float-right" onClick={this.toggleAdd}>
                  Tambah{' '}
                  <i className="fa fa-plus"></i>
                </Button> : ""}
            </CardHeader>
            <CardBody>
              <ListGroup>
                {this.state.data[0].id ?
                  this.state.data.map((item, i) =>
                    <ListGroupItem action key={item.id}>
                      <div className="d-flex w-100 justify-content-between">
                        <a href={process.env.REACT_APP_API_PATH + '/uploads/cal_certificates/' + item.certificate_file} target="_blank" rel="noopener noreferrer">
                          <ListGroupItemHeading>{item.id}</ListGroupItemHeading>
                        </a>
                        {role === "2" || lab === this.props.id.slice(-3) ?
                          <div className="float-right">
                            <Button color="warning" className="mr-1" onClick={() => this.toggleEdit(i)}>
                              <i className="fa fa-pencil"></i>
                            </Button>
                            <Button color="danger" onClick={() => this.toggleDelete(i)}>
                              <i className="fa fa-minus-circle"></i>
                            </Button>
                          </div> : ""}
                      </div>
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
                    </ListGroupItem>
                  ) : "No record found"
                }
              </ListGroup>
            </CardBody>

            <Modal isOpen={this.state.add} toggle={this.toggleAdd} className={'modal-success modal-lg ' + this.props.className}>
              <Form onSubmit={this.handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
                <ModalHeader toggle={this.toggleAdd}>Sertifikat Baru</ModalHeader>
                <ModalBody className="mt-4 mx-4">
                  <FormGroup row>
                    <Col md="3">
                      No Sertifikat
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="text" onChange={this.handleChangeNew} name="id" value={this.state.new.id} className="text-uppercase" required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      No Asset
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="text" onChange={this.handleChangeNew} name="device_id" value={this.state.new.device_id} disabled />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Tanggal Kalibrasi
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="date" onChange={this.handleChangeNew} name="calibration_date" value={this.state.new.calibration_date} required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Akhir Kalibrasi
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="date" onChange={this.handleChangeNew} name="due_date" value={this.state.new.due_date} required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Engineer ID
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="text" onChange={this.handleChangeNew} name="test_engineer_id" value={this.state.new.test_engineer_id} required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      File Sertifikat
                        </Col>
                    <Col xs="12" md="9">
                      <div className="custom-file">
                        <Input type="file" className="custom-file-input" name="certificate_file" onChange={this.handleChangeNewFile} required />
                        <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.new.certificate_file ? this.state.new.certificate_file.name : ""} </Label>
                      </div>
                    </Col>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                  <Button color="success" type="submit" >Tambah</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>

            <Modal isOpen={this.state.edit} toggle={() => this.toggleEdit(this.state.id)} className={'modal-primary modal-lg ' + this.props.className}>
              <Form onSubmit={this.handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
                <ModalHeader toggle={() => this.toggleEdit(this.state.id)}>Edit Sertifikat</ModalHeader>
                <ModalBody className="mt-4 mx-4">
                  <FormGroup row>
                    <Col md="3">
                      No Asset
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="text" onChange={this.handleChange} name="id" value={this.state.focus.id} disabled />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Tanggal Kalibrasi
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="date" onChange={this.handleChange} name="calibration_date" value={this.state.focus.calibration_date} required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Akhir Kalibrasi
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="date" onChange={this.handleChange} name="due_date" value={this.state.focus.due_date} required />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      Engineer ID
                        </Col>
                    <Col xs="12" md="9">
                      <Input type="text" onChange={this.handleChange} name="test_engineer_id" value={this.state.focus.test_engineer_id} required />
                    </Col>
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                  <Button color="primary" type="submit" >Save Changes</Button>{' '}
                  <Button color="secondary" onClick={() => this.toggleEdit(this.state.id)}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>

            <Modal isOpen={this.state.delete} toggle={() => this.toggleDelete(this.state.id)} className={'modal-danger modal-sm ' + this.props.className}>
              <ModalHeader toggle={() => this.toggleDelete(this.state.id)}>Delete Sertifikat</ModalHeader>
              <ModalBody>
                Do you really want to delete this certificate?
                  </ModalBody>
              <ModalFooter>
                {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                <Button color="danger" onClick={() => this.handleDelete(this.state.data[this.state.id].id)}>Delete</Button>{' '}
                <Button color="secondary" onClick={() => this.toggleDelete(this.state.id)}>Cancel</Button>
              </ModalFooter>
            </Modal>

          </Card>
        </Col>
      </Row>
    );
  }
}

export default Certificate;