import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import AuthService from 'server/AuthService';
import EditRequest from 'components/Modals/Requests/EditRequest';
import Certificate from 'components/Certificate/Requests';
import History from 'components/History/HistoryList';

class RequestContent extends Component {

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
      csv_data: [],
      csv_headers: [],
      dropdown1: false,
      dropdown2: false,
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
        lab: '',
        request_type: '',
        device_name: '',
        manufacturer: '',
        type: '',
        serial_number: '',
        capacity: '',
        made_in: '',
        test_reference: '',
        company_name: '',
        company_address: '',
        created: '',
        start_target: '',
        finished_target: '',
        actual_start: '',
        actual_finished: '',
        engineer_1: '',
        engineer_2: '',
        engineer_3: '',
        documentation: ''
      }],
      focus: {
        id: '',
        lab: '',
        request_type: '',
        device_name: '',
        manufacturer: '',
        type: '',
        serial_number: '',
        capacity: '',
        made_in: '',
        test_reference: '',
        company_name: '',
        company_address: '',
        created: '',
        start_target: '',
        finished_target: '',
        actual_start: '',
        actual_finished: '',
        engineer_1: '',
        engineer_2: '',
        engineer_3: '',
        documentation: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/cal_requests/' + this.props.match.params.id)
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

  handleChangeEditEngineer1 = (event, { newValue }) => {
    this.setState({
      focus: {
        ...this.state.focus,
        engineer_1: newValue
      }
    })
  }

  handleChangeEditEngineer2 = (event, { newValue }) => {
    this.setState({
      focus: {
        ...this.state.focus,
        engineer_2: newValue
      }
    })
  }

  handleChangeEditEngineer3 = (event, { newValue }) => {
    this.setState({
      focus: {
        ...this.state.focus,
        engineer_3: newValue
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

  handleChangeNewEngineer1 = (event, { newValue }) => {
    this.setState({
      new: {
        ...this.state.new,
        engineer_1: newValue
      }
    })
  }

  handleChangeNewEngineer2 = (event, { newValue }) => {
    this.setState({
      new: {
        ...this.state.new,
        engineer_2: newValue
      }
    })
  }

  handleChangeNewEngineer3 = (event, { newValue }) => {
    this.setState({
      new: {
        ...this.state.new,
        engineer_3: newValue
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
      axios.post(process.env.REACT_APP_API_PATH + '/cal_requests', this.state.new)
        .then(res => {
          this.setState({
            add: !this.state.add,
            loader: false,
            new: {
              id: '',
              lab: '',
              request_type: '',
              device_name: '',
              manufacturer: '',
              type: '',
              serial_number: '',
              capacity: '',
              made_in: '',
              test_reference: '',
              company_name: '',
              company_address: '',
              created: '',
              start_target: '',
              finished_target: '',
              actual_start: '',
              actual_finished: '',
              engineer_1: '',
              engineer_2: '',
              engineer_3: '',
              documentation: ''
            }
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.data[this.state.id].id,
            test_engineer_id: this.Auth.getProfile().id,
            cal_step_id: "REQ1",
            message: this.state.message
          }
          axios.post(process.env.REACT_APP_API_PATH + '/history', request)
            .then(() => {
              this.getData();
            })
            .catch(error => {
              alert(error);
              console.log(error);
            });
          ////////////////////////////////////////////////////////////////
          alert(res.data.message);
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
      axios.put(process.env.REACT_APP_API_PATH + '/cal_requests/' + this.state.data[this.state.id].id.replace(new RegExp("/", 'g'), "%2F"), this.state.focus)
        .then(res => {
          this.setState({
            edit: !this.state.edit,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.data[this.state.id].id,
            test_engineer_id: this.Auth.getProfile().id,
            cal_step_id: "REQ2",
            message: this.state.message
          }
          axios.post(process.env.REACT_APP_API_PATH + '/history', request)
            .then(() => {
              this.getData();
            })
            .catch(error => {
              alert(error);
              console.log(error);
            });
          ////////////////////////////////////////////////////////////////
          alert(res.data.message);
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
      axios.delete(process.env.REACT_APP_API_PATH + '/cal_requests/ever/' + id.replace(new RegExp("/", 'g'), "%2F"))
        .then(res => {
          this.setState({
            delete: !this.state.delete,
            loader: false
          })
          // INSERT HISTORY INTO DATABASE
          var request = {
            reference_id: this.state.data[this.state.id].id,
            test_engineer_id: this.Auth.getProfile().id,
            cal_step_id: "REQ3",
            message: this.state.message
          }
          axios.post(process.env.REACT_APP_API_PATH + '/history', request)
            .then(() => {
              this.getData();
            })
            .catch(error => {
              alert(error);
              console.log(error);
            });
          ////////////////////////////////////////////////////////////////
          alert(res.data.message);
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
    const role = this.Auth.getProfile().role
    const lab = this.Auth.getProfile().lab

    var viewStyle = {
      overflowWrap: 'break-word'
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>SPK Lab Kalibrasi</strong>
              </CardHeader>
              <CardBody>

                <Col xs="12" className="m-auto">
                  <Row>
                    <div className="w-100 py-2"></div>
                    <Col className="border-bottom"><strong>Isi Surat Perintah Kerja</strong></Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">No SPK</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].id}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Laboratorium Penguji</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].lab}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Tipe Pengujian</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].request_type}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Nama Perangkat</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].device_name}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Merk</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].manufacturer}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Model</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].model}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Serial Number</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].serial_number}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Kapasitas</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].capacity}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Made In</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].made_in}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Referensi Uji</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].test_reference}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Nama Perusahaan</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].company_name}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Alamat Perusahaan</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].company_address}</Col>
                    <div className="w-100 py-2"></div>

                    <div className="w-100 py-2"></div>
                    <Col className="border-bottom"><strong>Jadwal SPK</strong></Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Tanggal SPK</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.data[0].created).toLocaleDateString("en-GB")}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Target Mulai Uji</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.data[0].start_target).toLocaleDateString("en-GB")}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Target Selesai Uji</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{new Date(this.state.data[0].finished_target).toLocaleDateString("en-GB")}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Mulai Uji</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].actual_start ? new Date(this.state.data[0].actual_start).toLocaleDateString("en-GB") : "-"}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Selesai Uji</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].actual_finished ? new Date(this.state.data[0].actual_finished).toLocaleDateString("en-GB") : "-"}</Col>
                    <div className="w-100 py-2"></div>

                    <div className="w-100 py-2"></div>
                    <Col className="border-bottom"><strong>Pelaksana SPK</strong></Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Test Engineer 1</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].engineer_1}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Test Engineer 2</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].engineer_2}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="3">Test Engineer 3</Col>
                    <Col xs="9" className="border-bottom mt-auto" style={viewStyle}>{this.state.data[0].engineer_3}</Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="12" className="m-auto">
                      {role === "2" || lab === this.state.data[0].id.slice(-3) ?
                        <Button color="danger" className="position-absolute" style={{ right: '0', marginRight: '15px' }} onClick={this.toggleEditDocumentation}>
                          <i className="fa fa-pencil"></i>
                        </Button> : ""}
                      <img className="d-block w-100" src={process.env.REACT_APP_API_PATH + '/uploads/requests/' + this.state.data[0].documentation} alt='Calibration' />
                    </Col>
                    <div className="w-100 py-2"></div>

                    <Col xs="12">
                      <Certificate id={this.state.data[0].id} data={this.state.data[0]} />
                    </Col>
                  </Row>
                </Col>

                <EditRequest edit={this.state.edit} data={this.state.focus} id={this.state.id} handleChangeEditEngineer1={this.handleChangeEditEngineer1} handleChangeEditEngineer2={this.handleChangeEditEngineer2} handleChangeEditEngineer3={this.handleChangeEditEngineer3} handleEdit={this.handleEdit} handleChange={this.handleChange} loader={this.state.loader} toggleEdit={this.toggleEdit} />

              </CardBody>
            </Card>
          </Col>
          <Col xs="12" lg="4">
            <History id={this.state.data[0].id} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequestContent;