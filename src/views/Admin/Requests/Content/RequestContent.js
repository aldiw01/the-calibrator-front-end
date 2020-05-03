import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import axios from 'axios';
import AuthService from 'server/AuthService';
import DetailRequest from 'components/Requests/DetailRequest';
import EditRequest from 'components/Requests/EditRequest';
import StatusBar from 'components/Widgets/StatusBar';
import History from 'components/History/HistoryList';
import Actions from 'components/Requests/Actions';
import { Redirect } from 'react-router-dom';

class RequestContent extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: 0,
      edit: false,
      loader: false,
      csv_data: [],
      csv_headers: [],
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
      },
      history: [{
        reference_id: '',
        name: '',
        action: '',
        info: '',
        step_number: '',
        message: '',
        created: ''
      }],
      request_step: [{
        step_number: 1,
        step_name: ''
      }],
      measuring_equipment: [{
        id: '',
        request_id: this.props.match.params.id.replace(new RegExp("%2F", 'g'), "/"),
        device_name: '',
        manufacturer: '',
        model: '',
        serial_number: '',
        device_id: ''
      }]
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/cal_requests/' + this.props.match.params.id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(process.env.REACT_APP_API_PATH + '/history/reference/' + this.props.match.params.id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ history: res.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(process.env.REACT_APP_API_PATH + '/history/request_step/' + this.props.match.params.id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ request_step: res.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(process.env.REACT_APP_API_PATH + '/measuring_equipment/request/' + this.props.match.params.id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ measuring_equipment: res.data });
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

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
      focus: this.state.data[0]
    });
  }

  render() {
    const role = this.Auth.getProfile().role
    const lab = this.Auth.getProfile().lab

    const editButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <div className="animated fadeIn">

        {role === "2" || role === "3" || role === "7" || lab === this.props.match.params.lab.toUpperCase() ?

          <Row>
            <Col xs="12">
              <StatusBar id="CAL" percent={(this.state.request_step[0].step_number - 1) * 25} />
            </Col>
            <Col xs="12" lg="8">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i><strong>SPK Lab Kalibrasi</strong>
                  <button title="Edit Data" className="btn btn-warning" style={editButton} onClick={this.toggleEdit}><i className="fa fa-pencil"></i></button>
                </CardHeader>
                <CardBody>

                  <DetailRequest data={this.state.data[0]} />

                  <EditRequest edit={this.state.edit} data={this.state.focus} id={this.state.id} handleChangeEditEngineer1={this.handleChangeEditEngineer1} handleChangeEditEngineer2={this.handleChangeEditEngineer2} handleChangeEditEngineer3={this.handleChangeEditEngineer3} handleEdit={this.handleEdit} handleChange={this.handleChange} loader={this.state.loader} toggleEdit={this.toggleEdit} />

                </CardBody>
              </Card>
            </Col>
            <Col xs="12" lg="4">
              <Actions id={this.state.data[0].id} getData={this.getData} data={this.state.request_step[0]} request_type={this.state.data[0].request_type} measuring_equipment={this.state.measuring_equipment} />
              <History id={this.state.data[0].id} getData={this.getData} data={this.state.history} />
            </Col>
          </Row>
          : <Redirect to="/404" />}
      </div>
    );
  }
}

export default RequestContent;