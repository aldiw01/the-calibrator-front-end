import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AuthService from 'server/AuthService';
import { CSVLink } from "react-csv";
import AddDevice from 'components/Modals/AddDevice';
import ViewDevice from 'components/Modals/ViewDevice';
import EditDevice from 'components/Modals/EditDevice';
import DeleteDevice from 'components/Modals/DeleteDevice';

class Energy extends Component {

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
    axios.get(process.env.REACT_APP_API_PATH + '/devices/owner/ENE')
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
      { label: "NO. ASSET", key: "id" },
      { label: "NAMA ALAT UKUR", key: "name" },
      { label: "MERK", key: "manufacturer" },
      { label: "TIPE", key: "model" },
      { label: "NO. SERI", key: "serial_number" },
      { label: "KONDISI", key: "defect_status" },
      { label: "BUKU MANUAL", key: "manual" },
      { label: "TANGGAL KALIBRASI", key: "calibration_date" },
      { label: "AKHIR KALIBRASI", key: "due_date" },
      { label: "PER KALIBRASI", key: "calibration_period" },
      { label: "PENANGGUNG JAWAB", key: "supervisor" },
      { label: "METODE KALIBRASI", key: "calibration_method" },
      { label: "TANGGAL PEMBELIAN", key: "issue_date" }
    ];

    var csv_data = [];
    this.state.data.forEach(function (items, i) {
      if (items.id !== '') {
        csv_data.push({
          no: i + 1,
          id: items.id,
          name: items.name,
          manufacturer: items.manufacturer,
          model: items.model,
          serial_number: items.serial_number,
          defect_status: items.defect_status === "1" ? "Rusak" : "Bagus",
          manual: items.manual_file ? "Ada" : "Tidak Ada",
          calibration_date: items.calibration_date,
          due_date: items.due_date,
          calibration_period: items.calibration_period,
          supervisor: items.supervisor,
          calibration_method: items.calibration_method,
          issue_date: items.issue_date
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
      data.append('documentation', this.state.new.documentation);
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
      axios.put(process.env.REACT_APP_API_PATH + '/devices/' + this.state.data[this.state.id].id.replace(new RegExp("/", 'g'), "%2F"), this.state.focus)
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
      axios.delete(process.env.REACT_APP_API_PATH + '/devices/ever/' + id.replace(new RegExp("/", 'g'), "%2F"))
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
          defect_status: items.defect_status === "1" ? "Rusak" : "Aktif",
          actions: <React.Fragment>
            <button title="View Data" className="px-3 py-1 mr-1 btn btn-primary" onClick={() => toggleView(i)}><i className="fa fa-folder-open"></i></button>
            {role === "2" || lab === "ENE" ?
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
                <i className="fa fa-align-justify"></i><strong>Perangkat Lab Energi</strong>
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

                <AddDevice add={this.state.add} data={this.state.new} handleAdd={this.handleAdd} handleChangeNew={this.handleChangeNew} handleChangeNewFile={this.handleChangeNewFile} loader={this.state.loader} toggleAdd={this.toggleAdd} />

                <ViewDevice data={this.state.focus} getData={this.getData} id={this.state.id} toggleView={this.toggleView} view={this.state.view} />

                <EditDevice edit={this.state.edit} data={this.state.focus} id={this.state.id} handleEdit={this.handleEdit} handleChange={this.handleChange} loader={this.state.loader} toggleEdit={this.toggleEdit} />

                <DeleteDevice _delete={this.state.delete} data={this.state.focus} id={this.state.id} handleDelete={this.handleDelete} loader={this.state.loader} toggleDelete={this.toggleDelete} />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Energy;