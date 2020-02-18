import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AuthService from 'server/AuthService';
import Spinner from 'react-spinkit';
import Certificate from 'components/Certificate/Certificate';

class Cable extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: 0,
      add: false,
      view: false,
      edit: false,
      delete: false,
      loader: false,
      certificate: [{
        id: '',
        device_id: '',
        calibration_date: '',
        due_date: '',
        test_engineer_id: '',
        certificate_file: ''
      }],
      data: [{
        id: '',
        name: '',
        manufacturer: '',
        model: '',
        serial_number: '',
        defect_status: '',
        calibration_date: '',
        due_date: '',
        calibration_period: '',
        supervisor: '',
        issue_date: '',
        test_interval: '',
        calibration_method: '',
        manual_file: '',
        spec_file: '',
        documentation: ''
      }],
      focus: {
        id: '',
        name: '',
        manufacturer: '',
        model: '',
        serial_number: '',
        defect_status: '',
        calibration_date: '',
        due_date: '',
        calibration_period: '',
        supervisor: '',
        issue_date: '',
        test_interval: '',
        calibration_method: '',
        manual_file: '',
        spec_file: '',
        documentation: ''
      },
      new: {
        id: '',
        name: '',
        manufacturer: '',
        model: '',
        serial_number: '',
        defect_status: '',
        calibration_date: '',
        due_date: '',
        calibration_period: '',
        supervisor: '',
        issue_date: '',
        test_interval: '',
        calibration_method: '',
        manual_file: '',
        spec_file: '',
        documentation: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/devices/owner/CAB')
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
      data.append('name', this.state.new.name);
      data.append('manufacturer', this.state.new.manufacturer);
      data.append('model', this.state.new.model);
      data.append('serial_number', this.state.new.serial_number);
      data.append('defect_status', this.state.new.defect_status);
      data.append('calibration_date', this.state.new.calibration_date);
      data.append('due_date', this.state.new.due_date);
      data.append('calibration_period', this.state.new.calibration_period);
      data.append('supervisor', this.state.new.supervisor);
      data.append('issue_date', this.state.new.issue_date);
      data.append('test_interval', this.state.new.test_interval);
      data.append('calibration_method', this.state.new.calibration_method);
      data.append('manual_file', this.state.new.manual_file);
      data.append('spec_file', this.state.new.spec_file);
      data.append('documentation', this.state.documentation);
      axios.post(process.env.REACT_APP_API_PATH + '/devices', data)
        .then(res => {
          this.setState({
            add: !this.state.add,
            loader: false,
            new: {
              id: '',
              name: '',
              manufacturer: '',
              model: '',
              serial_number: '',
              defect_status: '',
              calibration_date: '',
              due_date: '',
              calibration_period: '',
              supervisor: '',
              issue_date: '',
              test_interval: '',
              calibration_method: '',
              manual_file: '',
              spec_file: '',
              documentation: ''
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
      axios.put(process.env.REACT_APP_API_PATH + '/devices/' + this.state.data[this.state.id].id.replace("/", "%2F"), this.state.focus)
        .then(res => {
          this.setState({
            edit: !this.state.edit,
            loader: false,
            documentation: ''
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
      axios.delete(process.env.REACT_APP_API_PATH + '/devices/ever/' + id.replace("/", "%2F"))
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
    if (id !== this.state.id) {
      axios.get(process.env.REACT_APP_API_PATH + '/cal_certificates/devices/' + this.state.data[id].id.replace("/", "%2F"))
        .then(res => {
          this.setState({ certificate: res.data });
        })
        .catch(error => {
          this.setState({
            certificate: [{
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
    const role = this.Auth.getProfile().role
    var viewStyle = {
      overflowWrap: 'break-word'
    }

    const data = {
      columns: [
        {
          label: 'No',
          field: 'no',
          sort: 'asc'
        },
        {
          label: 'No Asset',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Nama Alat',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Merk',
          field: 'manufacturer',
          sort: 'asc'
        },
        {
          label: 'Model',
          field: 'model',
          sort: 'asc'
        },
        {
          label: 'Akhir Kalibrasi',
          field: 'due_date',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'defect_status',
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
          no: i + 1,
          id: items.id,
          name: items.name,
          manufacturer: items.manufacturer,
          model: items.model,
          due_date: items.due_date,
          defect_status: items.defect_status === "1" ? "Rusak" : "Bagus",
          actions: <React.Fragment>
            <button title="View Data" className="px-3 py-1 mr-1 btn btn-primary" onClick={() => toggleView(i)}><i className="fa fa-search"></i></button>
            {role === "2" ?
              <React.Fragment>
                <button title="Edit Data" className="px-3 py-1 mr-1 btn btn-warning" onClick={() => toggleEdit(i)}><i className="fa fa-pencil"></i></button>
                <button title="Delete Data" className="px-3 py-1 mr-1 btn btn-danger" onClick={() => toggleDelete(i)}><i className="fa fa-minus-circle"></i></button>
              </React.Fragment> : ""}
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
                <i className="fa fa-align-justify"></i><strong>Perangkat Lab Kabel</strong>
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
                  entriesOptions={[10, 50, 100, 1000]}
                // paginationLabel={["<", ">"]}
                />

                <Modal isOpen={this.state.add} toggle={this.toggleAdd} className={'modal-success modal-lg ' + this.props.className}>
                  <Form onSubmit={this.handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
                    <ModalHeader toggle={this.toggleAdd}>Perangkat Baru</ModalHeader>
                    <ModalBody className="mt-4 mx-4">
                      <FormGroup row>
                        <Col md="3">
                          No Asset
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChangeNew} name="id" value={this.state.new.id} className="text-uppercase" required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Nama Alat
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChangeNew} name="name" value={this.state.new.name} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Merk
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChangeNew} name="manufacturer" value={this.state.new.manufacturer} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Model
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="model" value={this.state.new.model} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Serial Number
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="serial_number" value={this.state.new.serial_number} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Kondisi Alat
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="defect_status" value={this.state.new.defect_status} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Tanggal Kalibrasi
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="calibration_date" value={this.state.new.calibration_date} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Akhir Kalibrasi
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChangeNew} name="due_date" value={this.state.new.due_date} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Periode Kalibrasi (Tahun)
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="calibration_period" value={this.state.new.calibration_period} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Penanggung Jawab
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChangeNew} name="supervisor" value={this.state.new.supervisor} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Tanggal Pembelian
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="issue_date" value={this.state.new.issue_date} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Interval Test
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="test_interval" value={this.state.new.test_interval} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Metode Kalibrasi
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="number" onChange={this.handleChangeNew} name="calibration_method" value={this.state.new.calibration_method} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          File Manual
                        </Col>
                        <Col xs="12" md="9">
                          <div className="custom-file">
                            <Input type="file" className="custom-file-input" name="manual_file" onChange={this.handleChangeNewFile} required />
                            <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.new.manual_file ? this.state.new.manual_file.name : ""} </Label>
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          File Spesifikasi
                        </Col>
                        <Col xs="12" md="9">
                          <div className="custom-file">
                            <Input type="file" className="custom-file-input" name="spec_file" onChange={this.handleChangeNewFile} required />
                            <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.new.spec_file ? this.state.new.spec_file.name : ""} </Label>
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Dokumentasi
                        </Col>
                        <Col xs="12" md="9">
                          <div className="custom-file">
                            <Input type="file" className="custom-file-input" name="documentation" onChange={this.handleChangeNewFile} required />
                            <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.new.documentation ? this.state.new.documentation.name : ""} </Label>
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
                  <ModalHeader toggle={() => this.toggleView(this.state.id)}>Data Perangkat</ModalHeader>
                  <ModalBody className="modal-body-display">
                    <Col xs="12" className="m-auto">
                      <Row>
                        <Col xs="3">No Asset</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.id}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Nama Alat</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.name}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Merk</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.manufacturer}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Model</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.model}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Serial Number</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.serial_number}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Status</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.defect_status === "1" ? "Rusak" : "Bagus"}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Tanggal Kalibrasi</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.focus.calibration_date).toLocaleDateString()}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Akhir Kalibrasi</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.focus.due_date).toLocaleDateString()}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Periode Kalibrasi</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.calibration_period} Tahun</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Penanggung Jawab</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.supervisor}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Tanggal Pembelian</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.focus.issue_date).toLocaleDateString()}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Pengecekan Antara</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.test_interval}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">Metode Kalibrasi</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.focus.calibration_method}</Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">File Manual</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>
                          <a href={process.env.REACT_APP_API_PATH + '/uploads/devices/' + this.state.focus.manual_file} target="_blank" rel="noopener noreferrer">{this.state.focus.manual_file}</a>
                        </Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="3">File Spesifikasi</Col>
                        <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>
                          <a href={process.env.REACT_APP_API_PATH + '/uploads/devices/' + this.state.focus.spec_file} target="_blank" rel="noopener noreferrer">{this.state.focus.spec_file}</a>
                        </Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="12" className="m-auto">
                          <img className="d-block w-100" src={process.env.REACT_APP_API_PATH + '/uploads/devices/' + this.state.focus.documentation} alt='Cable' />
                        </Col>
                        <div className="w-100 py-2"></div>
                        <Col xs="12">
                          <Certificate id={this.state.data[this.state.id].id} />
                        </Col>
                      </Row>
                    </Col>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggleView(this.state.id)}>Close</Button>
                  </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.edit} toggle={() => this.toggleEdit(this.state.id)} className={'modal-primary modal-lg ' + this.props.className}>
                  <Form onSubmit={this.handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
                    <ModalHeader toggle={() => this.toggleEdit(this.state.id)}>Edit Perangkat</ModalHeader>
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
                          Nama Alat
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="name" value={this.state.focus.name} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Merk
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="manufacturer" value={this.state.focus.manufacturer} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Model
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="model" value={this.state.focus.model} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Serial Number
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="serial_number" value={this.state.focus.serial_number} required />
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
                          Periode Kalibrasi (Tahun)
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="calibration_period" value={this.state.focus.calibration_period} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Penanggung Jawab
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="supervisor" value={this.state.focus.supervisor} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Tanggal Pembelian
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="date" onChange={this.handleChange} name="issue_date" value={this.state.focus.issue_date} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Pengecekan Antara
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="test_interval" value={this.state.focus.test_interval} required />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          Metode Kalibrasi
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="text" onChange={this.handleChange} name="calibration_method" value={this.state.focus.calibration_method} required />
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
                  <ModalHeader toggle={() => this.toggleDelete(this.state.id)}>Delete Perangkat</ModalHeader>
                  <ModalBody>
                    Do you really want to delete {this.state.data[this.state.id].id}?
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

export default Cable;