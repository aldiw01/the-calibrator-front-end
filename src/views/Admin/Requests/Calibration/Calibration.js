import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AuthService from 'server/AuthService';
import { CSVLink } from 'react-csv';
import AddRequest from 'components/Modals/Requests/AddRequest';
import ViewRequest from 'components/Modals/Requests/ViewRequest';
import EditRequest from 'components/Modals/Requests/EditRequest';
import DeleteRequest from 'components/Modals/Requests/DeleteRequest';

class Calibration extends Component {

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
        test_report: ''
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
        test_report: ''
      },
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
        test_report: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/cal_requests')
      .then(res => {
        this.setState({ data: res.data });
        this.getCSVData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCSVData = () => {
    var csv_headers = [
      { label: "NO", key: "no" },
      { label: "NO. SPK", key: "id" },
      { label: "LAB", key: "lab" },
      { label: "TIPE PENGUJIAN", key: "request_type" },
      { label: "NAMA ALAT UKUR", key: "name" },
      { label: "MERK", key: "manufacturer" },
      { label: "MODEL", key: "type" },
      { label: "NO. SERI", key: "serial_number" },
      { label: "KAPASITAS", key: "capacity" },
      { label: "MADE IN", key: "made_in" },
      { label: "REFERENSI UJI", key: "test_reference" },
      { label: "NAMA PERUSAHAAN", key: "company_name" },
      { label: "ALAMAT PERUSAHAAN", key: "company_address" },
      { label: "TANGGAL SPK", key: "created" },
      { label: "TARGET MULAI", key: "start_target" },
      { label: "TARGET SELESAI", key: "finished_target" },
      { label: "ACTUAL START", key: "actual_start" },
      { label: "ACTUAL FINISHED", key: "actual_finished" },
      { label: "ENGINEER 1", key: "engineer_1" },
      { label: "ENGINEER 2", key: "engineer_2" },
      { label: "ENGINEER 3", key: "engineer_3" }
    ];

    var csv_data = [];
    this.state.data.forEach(function (items, i) {
      if (items.id !== '') {
        csv_data.push({
          no: i + 1,
          id: items.id,
          lab: items.lab,
          request_type: items.request_type,
          device_name: items.device_name,
          manufacturer: items.manufacturer,
          type: items.type,
          serial_number: items.serial_number,
          capacity: items.capacity,
          made_in: items.made_in,
          test_reference: items.test_reference,
          company_name: items.company_name,
          company_address: items.company_address,
          created: items.created,
          start_target: items.start_target,
          finished_target: items.finished_target,
          actual_start: items.actual_start,
          actual_finished: items.actual_finished,
          engineer_1: items.engineer_1,
          engineer_2: items.engineer_2,
          engineer_3: items.engineer_3
        });
      }
    });
    this.setState({
      csv_headers: csv_headers,
      csv_data: csv_data
    })
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
      // const data = new FormData();
      // data.append('id', this.state.new.id);
      // data.append('lab', this.state.new.lab);
      // data.append('request_type', this.state.new.request_type);
      // data.append('device_name', this.state.new.device_name);
      // data.append('manufacturer', this.state.new.manufacturer);
      // data.append('type', this.state.new.type);
      // data.append('serial_number', this.state.new.serial_number);
      // data.append('capacity', this.state.new.capacity);
      // data.append('made_in', this.state.new.made_in);
      // data.append('test_reference', this.state.new.test_reference);
      // data.append('company_name', this.state.new.company_name);
      // data.append('company_address', this.state.new.company_address);
      // data.append('created', this.state.new.created);
      // data.append('start_target', this.state.new.start_target);
      // data.append('finished_target', this.state.new.finished_target);
      // data.append('actual_start', this.state.new.actual_start);
      // data.append('actual_finished', this.state.new.actual_finished);
      // data.append('engineer_1', this.state.new.engineer_1);
      // data.append('engineer_2', this.state.new.engineer_2);
      // data.append('engineer_3', this.state.new.engineer_3);
      // data.append('test_report', this.state.new.test_report);
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
              test_report: ''
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
      axios.put(process.env.REACT_APP_API_PATH + '/cal_requests/' + this.state.data[this.state.id].id.replace(new RegExp("/", 'g'), "%2F"), this.state.focus)
        .then(res => {
          this.setState({
            edit: !this.state.edit,
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

  handleDelete = (id) => {
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      axios.delete(process.env.REACT_APP_API_PATH + '/cal_requests/ever/' + id.replace(new RegExp("/", 'g'), "%2F"))
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
    const role = this.Auth.getProfile().role
    const lab = this.Auth.getProfile().lab

    const data = {
      columns: [
        {
          label: 'No',
          field: 'no',
          sort: 'asc'
        },
        {
          label: 'No SPK',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Nama Alat',
          field: 'device_name',
          sort: 'asc'
        },
        {
          label: 'Target Selesai',
          field: 'finished_target',
          sort: 'asc'
        },
        {
          label: 'Sisa Waktu',
          field: 'remaining_time',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'PIC',
          field: 'engineer',
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
          device_name: items.device_name,
          finished_target: items.finished_target,
          remaining_time: Math.floor((new Date(items.finished_target) - new Date()) / (24 * 60 * 60 * 1000)),
          status: items.test_report === "" ? "On Progress" : "Finished",
          engineer: items.engineer_1,
          actions: <React.Fragment>
            <button title="View Data" className="px-3 py-1 mr-1 btn btn-primary" onClick={() => toggleView(i)}><i className="fa fa-folder-open"></i></button>
            {role === "2" || lab === "CAL" ?
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

    const csvButton = {
      position: "absolute",
      right: "20px",
      top: "5px",
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>SPK Lab Kalibrasi</strong>
                <div style={csvButton}>
                  <Button color="success" className="float-right" onClick={this.toggleAdd}>
                    Tambah{' '}
                    <i className="fa fa-plus"></i>
                  </Button>
                  <CSVLink data={this.state.csv_data} headers={this.state.csv_headers} className="float-right mx-2">
                    <Button color="secondary">
                      <i className="fa fa-file-excel-o"></i>
                    </Button>
                  </CSVLink>
                </div>
              </CardHeader>
              <CardBody>
                <MDBDataTable
                  striped
                  bordered
                  small
                  data={dataFix}
                  entriesOptions={[10, 50, 100, 1000]}
                />

                <AddRequest add={this.state.add} data={this.state.new} handleAdd={this.handleAdd} handleChangeNew={this.handleChangeNew} handleChangeNewFile={this.handleChangeNewFile} loader={this.state.loader} toggleAdd={this.toggleAdd} handleChangeNewEngineer1={this.handleChangeNewEngineer1} handleChangeNewEngineer2={this.handleChangeNewEngineer2} handleChangeNewEngineer3={this.handleChangeNewEngineer3} />

                <ViewRequest data={this.state.focus} getData={this.getData} id={this.state.id} toggleView={this.toggleView} view={this.state.view} />

                <EditRequest edit={this.state.edit} data={this.state.focus} id={this.state.id} handleChangeEditEngineer1={this.handleChangeEditEngineer1} handleChangeEditEngineer2={this.handleChangeEditEngineer2} handleChangeEditEngineer3={this.handleChangeEditEngineer3} handleEdit={this.handleEdit} handleChange={this.handleChange} loader={this.state.loader} toggleEdit={this.toggleEdit} />

                <DeleteRequest _delete={this.state.delete} data={this.state.focus} id={this.state.id} handleDelete={this.handleDelete} loader={this.state.loader} toggleDelete={this.toggleDelete} />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Calibration;