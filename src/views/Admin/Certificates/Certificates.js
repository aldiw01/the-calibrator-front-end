import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AuthService from 'server/AuthService';
import Spinner from 'react-spinkit';

class Certificates extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: '',
      add: false,
      view: false,
      edit: false,
      delete: false,
      loader: false,
      certificate_file: '',
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
        device_id: '',
        calibration_date: '',
        due_date: '',
        test_engineer_id: '',
        certificate_file: ''
      },
      new: {
        id: '',
        device_id: '',
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
    axios.get(localStorage.getItem('serverAPI') + '/cal_certificates')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
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

  handleChangeEditFile = (event) => {
    this.setState({
      certificate_file: event.target.files[0]
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
      const data = new FormData();
      data.append('device_id', this.state.new.device_id);
      data.append('calibration_date', this.state.new.calibration_date);
      data.append('due_date', this.state.new.due_date);
      data.append('test_engineer_id', this.state.new.test_engineer_id);
      data.append('certificate_file', this.state.new.certificate_file);
      axios.put(localStorage.getItem('serverAPI') + '/cal_certificates/' + this.state.data[this.state.id].id, data)
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

  toggleView = (id) => {
    this.setState({
      id: id,
      view: !this.state.view,
      focus: this.state.data[id]
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
      delete: !this.state.delete,
      focus: this.state.data[id]
    });
  }

  render() {
    var viewStyle = {
      overflowWrap: 'break-word'
    }

    const data = {
      columns: [
        {
          label: 'No Sertifikat',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'No Asset',
          field: 'device_id',
          sort: 'asc'
        },
        {
          label: 'Tanggal Kalibrasi',
          field: 'calibration_date',
          sort: 'asc'
        },
        {
          label: 'Akhir Kalibrasi',
          field: 'due_date',
          sort: 'asc'
        },
        {
          label: 'Engineer ID',
          field: 'test_engineer_id',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: this.state.data
    }

    var rows = [];
    let toggleView = this.toggleView;
    let toggleEdit = this.toggleEdit;
    let toggleDelete = this.toggleDelete;
    data.rows.forEach(function (items, i) {
      if (items.id !== '') {
        rows.push({
          id: items.id,
          device_id: items.device_id,
          calibration_date: items.calibration_date,
          due_date: items.due_date,
          test_engineer_id: items.test_engineer_id,
          actions: <React.Fragment>
            <button title="View Data" className="px-3 py-1 mr-1 btn btn-primary" onClick={() => toggleView(i)}><i className="fa fa-search"></i></button>
            <button title="Edit Data" className="px-3 py-1 mr-1 btn btn-warning" onClick={() => toggleEdit(i)}><i className="fa fa-pencil"></i></button>
            <button title="Delete Data" className="px-3 py-1 mr-1 btn btn-danger" onClick={() => toggleDelete(i)}><i className="fa fa-minus-circle"></i></button>
          </React.Fragment>
        });
      }
    });
    const dataFix = {
      columns: data.columns,
      rows: rows
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Daftar Sertifikat</strong>
                <Button color="success" className="float-right" onClick={this.toggleAdd}>
                  Tambah{' '}
                  <i className="fa fa-plus"></i>
                </Button>
              </CardHeader>
              <CardBody>
                <MDBDataTable
                  striped
                  bordered
                  small
                  data={dataFix}
                // paginationLabel={["<", ">"]}
                />

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
                          <Input type="text" onChange={this.handleChangeNew} name="device_id" value={this.state.new.device_id} required />
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

                <Modal isOpen={this.state.view} toggle={() => this.toggleView(this.state.id)} className={'modal-primary modal-lg ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleView(this.state.id)}>Data Sertifikat</ModalHeader>
                  <ModalBody className="modal-body-display">
                    <Col xs="12" className="m-auto">
                      <Row>
                        <Col xs="5" sm="4">No Sertifikat</Col>
                        <Col xs="7" sm="8" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.id}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="5" sm="4">No Asset</Col>
                        <Col xs="7" sm="8" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.device_id}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="5" sm="4">Tanggal Kalibrasi</Col>
                        <Col xs="7" sm="8" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.focus.calibration_date).toLocaleDateString()}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="5" sm="4">Akhir Kalibrasi</Col>
                        <Col xs="7" sm="8" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.focus.due_date).toLocaleDateString()}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="5" sm="4">Engineer ID</Col>
                        <Col xs="7" sm="8" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.test_engineer_id}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="5" sm="4">File Sertifikat</Col>
                        <Col xs="7" sm="8" className="border-bottom mt-auto" style={viewStyle}>
                          <a target="_blank" rel="noopener noreferrer" href={process.env.REACT_APP_API_PATH + '/uploads/cal_certificates/' + this.state.focus.certificate_file} alt='Certificates'>{this.state.focus.certificate_file}
                          </a>
                        </Col>
                        <div className="w-100 py-2"></div>
                      </Row>
                    </Col>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggleView(this.state.id)}>Close</Button>
                  </ModalFooter>
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
                          <Input type="text" onChange={this.handleChange} name="id" value={this.state.focus.id} required />
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
                      <FormGroup row>
                        <Col md="3">
                          File Sertifikat
                        </Col>
                        <Col xs="12" md="9">
                          <div className="custom-file">
                            <Input type="file" className="custom-file-input" name="certificate_file" onChange={this.handleChangeEditFile} />
                            <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.certificate_file ? this.state.certificate_file.name : ""} </Label>
                          </div>
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

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Certificates;