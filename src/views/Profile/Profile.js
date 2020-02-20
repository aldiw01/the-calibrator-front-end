import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import AuthService from '../../server/AuthService';
import axios from 'axios';
import Spinner from 'react-spinkit';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      loader: false,
      photo: '',
      profile_photo: '',
      toggle_edit: false,
      data: [{
        NIK: '',
        Name: '',
        Email: '',
        Lab: '',
        Role: '',
        Registered: '',
        Updated: ''
      }]
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/engineers/' + this.Auth.getProfile().id)
      .then(res => {
        const roleID = ["", "Staff", "Super Admin", "", "", "", "", "", "", "Inactive"];
        const role = roleID[res.data[0].role];
        this.setState({
          photo: res.data[0].photo,
          data: [{
            NIK: res.data[0].id,
            Name: res.data[0].name,
            Email: res.data[0].email,
            Lab: res.data[0].lab,
            Role: role,
            Registered: new Date(res.data[0].registered).toLocaleString('en-GB'),
            Updated: new Date(res.data[0].updated).toLocaleString('en-GB')
          }]
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChangeFile = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0]
    })
  }

  toggleEdit = () => {
    this.setState({
      toggle_edit: !this.state.toggle_edit,
      profile_photo: ''
    });
  }

  handleEdit = (event) => {
    event.preventDefault();
    if (window.confirm("You will change your profile picture. Are you sure?")) {
      this.setState({ loader: true });
      const data = new FormData();
      data.append('profile_photo', this.state.profile_photo);
      axios.put(process.env.REACT_APP_API_PATH + '/engineers/photo/' + this.Auth.getProfile().id, data)
        .then(res => {
          this.setState({
            toggle_edit: !this.state.toggle_edit,
            loader: false,
            profile_photo: ''
          })
          alert(res.data.message);
          window.location.reload()
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  }

  render() {
    const user = this.state.data[0];
    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    const photo_url = this.state.photo ? this.state.photo : "test.jpg"

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={7}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User id: {this.state.data[0].NIK}</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <tbody>
                    {
                      userDetails.map(([key, value]) => {
                        return (
                          <tr key={key}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={5}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Profile Photo</strong>
                <Button color="danger" className="float-right" onClick={() => this.setState({ toggle_edit: true })}>
                  <i className="fa fa-pencil"></i>
                </Button>
              </CardHeader>
              <CardBody>
                <img src={process.env.REACT_APP_API_PATH + '/uploads/engineers/' + photo_url} className="img-fluid img-thumbnail rounded mx-auto d-block" alt="My profile" />
              </CardBody>

              <Modal isOpen={this.state.toggle_edit} toggle={this.toggleEdit} className={'modal-danger ' + this.props.className}>
                <Form onSubmit={this.handleEdit} method="post" encType="multipart/form-data">
                  <ModalHeader toggle={this.toggleEdit}>Choose Profile Photo</ModalHeader>
                  <ModalBody className="modal-body-display">
                    <Col xs="12" className="m-auto">
                      <Row>
                        <div className="custom-file">
                          <Input type="file" className="custom-file-input" name="profile_photo" onChange={this.handleChangeFile} required />
                          <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.profile_photo ? this.state.profile_photo.name : ""} </Label>
                        </div>
                      </Row>
                    </Col>
                  </ModalBody>
                  <ModalFooter>
                    {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
                    <Button color="danger" type="submit" >Submit</Button>
                    <Button color="secondary" onClick={this.toggleEdit}>Close</Button>
                  </ModalFooter>
                </Form>
              </Modal>

            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
