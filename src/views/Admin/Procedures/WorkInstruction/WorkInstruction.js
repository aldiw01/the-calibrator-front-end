import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import AuthService from 'server/AuthService';
import { CSVLink } from "react-csv";
import AddDocument from 'components/Modals/Documents/AddDocument';
import EditDocument from 'components/Modals/Documents/EditDocument';
import DeleteDocument from 'components/Modals/Documents/DeleteDocument';

class WorkInstruction extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: 0,
      add: false,
      edit: false,
      delete: false,
      loader: false,
      csv_data: [],
      csv_headers: [],
      dropdown1: false,
      dropdown2: false,
      data: [{
        id: '',
        name: '',
        effective_date: '',
        pic: '',
        version: '',
        file: ''
      }],
      focus: {
        id: '',
        name: '',
        effective_date: '',
        pic: '',
        version: '',
        file: ''
      },
      new: {
        id: '',
        name: '',
        effective_date: '',
        pic: '',
        version: '',
        file: ''
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const lab = this.props.match.url.slice(-3) === "/wi" ? '%2fI' : this.props.match.url.slice(-3)
    axios.get(process.env.REACT_APP_API_PATH + '/procedures/type/' + lab)
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
      { label: "NO. DOKUMEN", key: "id" },
      { label: "NAMA DOKUMEN", key: "name" },
      { label: "TANGGAL BERLAKU", key: "effective_date" },
      { label: "VERSION", key: "version" },
      { label: "PIC", key: "pic" }
    ];

    var csv_data = [];
    this.state.data.forEach(function (items, i) {
      if (items.id !== '') {
        csv_data.push({
          no: i + 1,
          id: items.id,
          name: items.name,
          effective_date: items.effective_date,
          version: items.version,
          pic: items.pic
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

  handleChangeFile = (event) => {
    this.setState({
      focus: {
        ...this.state.focus,
        [event.target.name]: event.target.files[0]
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
      data.append('effective_date', this.state.new.effective_date);
      data.append('pic', this.state.new.pic);
      data.append('version', this.state.new.version);
      data.append('file', this.state.new.file);
      axios.post(process.env.REACT_APP_API_PATH + '/procedures', data)
        .then(res => {
          if (res.data.success) {
            this.setState({
              add: !this.state.add,
              loader: false,
              new: {
                id: '',
                name: '',
                effective_date: '',
                pic: '',
                version: '',
                file: ''
              }
            })
          } else {
            this.setState({
              loader: false
            })
          }
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
      data.append('id', this.state.focus.id);
      data.append('name', this.state.focus.name);
      data.append('effective_date', this.state.focus.effective_date);
      data.append('pic', this.state.focus.pic);
      data.append('version', this.state.focus.version);
      data.append('file', this.state.focus.file);
      axios.put(process.env.REACT_APP_API_PATH + '/procedures/' + this.state.data[this.state.id].id.replace(new RegExp("/", 'g'), "%2F"), data)
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
      axios.delete(process.env.REACT_APP_API_PATH + '/procedures/ever/' + id.replace(new RegExp("/", 'g'), "%2F"))
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
          label: 'No Dokumen',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Version',
          field: 'version',
          sort: 'asc'
        },
        {
          label: 'Nama Dokumen',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Tanggal Berlaku',
          field: 'effective_date',
          sort: 'asc'
        },
        {
          label: 'PIC',
          field: 'pic',
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
    let toggleEdit = this.toggleEdit;
    let toggleDelete = this.toggleDelete;
    data.rows.forEach(function (items, i) {
      if (items.id !== '') {
        rows.push({
          no: i + 1,
          id: items.id,
          version: items.version,
          name: items.name,
          effective_date: items.effective_date,
          pic: items.pic,
          actions: <React.Fragment>
            <a href={process.env.REACT_APP_API_PATH + '/uploads/procedures/' + items.file} target="_blank" rel="noopener noreferrer" title="View Data" className="px-3 py-1 mr-1 btn btn-primary"><i className="fa fa-folder-open"></i></a>
            {role === "2" || lab === "CAB" ?
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
                <i className="fa fa-align-justify"></i><strong>Panduan Mutu</strong>
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

                <AddDocument add={this.state.add} data={this.state.new} handleAdd={this.handleAdd} handleChangeNew={this.handleChangeNew} handleChangeNewFile={this.handleChangeNewFile} loader={this.state.loader} toggleAdd={this.toggleAdd} />

                <EditDocument edit={this.state.edit} data={this.state.focus} id={this.state.id} handleEdit={this.handleEdit} handleChange={this.handleChange} handleChangeFile={this.handleChangeFile} loader={this.state.loader} toggleEdit={this.toggleEdit} />

                <DeleteDocument _delete={this.state.delete} data={this.state.focus} id={this.state.id} handleDelete={this.handleDelete} loader={this.state.loader} toggleDelete={this.toggleDelete} />

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WorkInstruction;