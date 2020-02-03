import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, ButtonDropdown, Card, CardBody, CardFooter, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from 'reactstrap';
import axios from 'axios';
import AuthService from '../../../server/AuthService';
import Spinner from 'react-spinkit';

import bgImage from "assets/img/landing-bg.jpg";

class Register extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      address: '',
      badge: 'info',
      badgeVisible: false,
      citizen_id: '',
      dropdown: false,
      email: '',
      fileImage: '',
      gender: "Select Gender",
      isAddressClicked: false,
      isEmailClicked: false,
      isGoodAddress: false,
      isGoodEmail: false,
      isGoodGender: false,
      isGoodKTP: false,
      isGoodName: false,
      isGoodPassword: false,
      isGoodPhone: false,
      isLoggedin: false,
      isKTPClicked: false,
      isNameClicked: false,
      isPasswordClicked: false,
      isPasswordConfirmed: false,
      isPhoneClicked: false,
      isRegisteredEmail: false,
      loader: false,
      message: '',
      name: '',
      password: '',
      passwordVal: '',
      phone: ''
    }
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      this.setState({
        isLoggedin: true
      })
    }
  }

  toggle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  }

  onDismiss = () => {
    this.setState({ badgeVisible: false });
  }

  handleCheckUsername = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.value.length)
    if (event.target.value.length > 5) {
      this.setState({
        isGoodName: true
      })
    } else {
      this.setState({
        isGoodName: false
      })
    }
  }

  handleCheckPassword = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.value.length > 5) {
      this.setState({
        isGoodPassword: true
      })
    } else {
      this.setState({
        isGoodPassword: false
      })
    }

    if ((event.target.value === this.state.passwordVal) && (event.target.value.length > 5)) {
      this.setState({ isPasswordConfirmed: true });
    } else {
      this.setState({ isPasswordConfirmed: false });
    }
  }

  handleChangeAndCheckEmail = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    let validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validate.test(event.target.value)) {
      this.setState({
        isGoodEmail: true
      })

      const data = {
        email: event.target.value
      }

      axios.post(localStorage.getItem('serverAPI') + '/check-user-registered', data, {
      }).then(res => {
        if (res.data.success) {
          this.setState({ isRegisteredEmail: true });
        } else {
          this.setState({ isRegisteredEmail: false });
        }
      });
    } else {
      this.setState({
        isGoodEmail: false
      })
    }
  }

  handleConfirmPassword = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if ((this.state.password === event.target.value) && (event.target.value.length > 5)) {
      this.setState({ isPasswordConfirmed: true });
    } else {
      this.setState({ isPasswordConfirmed: false });
    }
  }

  handleCheckPhone = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.value.length > 5) {
      this.setState({ isGoodPhone: true });
    } else {
      this.setState({ isGoodPhone: false });
    }
  }

  handleCheckAddress = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.value.length > 5) {
      this.setState({ isGoodAddress: true });
    } else {
      this.setState({ isGoodAddress: false });
    }
  }

  handleCheckKTP = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.value.length === 16 && !isNaN(event.target.value)) {
      this.setState({
        isGoodKTP: true
      })
    } else {
      this.setState({
        isGoodKTP: false
      })
    }
  }

  handleCheckCaptureKTP = (event) => {
    this.setState({ [event.target.name]: event.target.files[0] })
  }

  handleSubmit = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('phone', this.state.phone);
    data.append('gender', this.state.gender);
    data.append('address', this.state.address);
    data.append('citizen_id', this.state.citizen_id);
    data.append('fileImage', this.state.fileImage);
    axios.post(localStorage.getItem('serverAPI') + '/user', data)
      .then(res => {
        if (res.data.success) {
          this.setState({
            address: '',
            badge: 'success',
            badgeVisible: true,
            citizen_id: '',
            dropdown: false,
            email: '',
            fileImage: '',
            gender: "Select Gender",
            isAddressClicked: false,
            isEmailClicked: false,
            isGoodAddress: false,
            isGoodEmail: false,
            isGoodGender: false,
            isGoodKTP: false,
            isGoodName: false,
            isGoodPassword: false,
            isGoodPhone: false,
            isLoggedin: false,
            isKTPClicked: false,
            isNameClicked: false,
            isPasswordClicked: false,
            isPasswordConfirmed: false,
            isPhoneClicked: false,
            isRegisteredEmail: false,
            loader: false,
            message: 'Account registered successfully. Please check your e-mail to activate your account.',
            name: '',
            password: '',
            passwordVal: '',
            phone: ''
          })
        } else {
          this.setState({
            badgeVisible: true,
            loader: false,
            message: res.data.message,
            badge: 'warning'
          })
          // alert(res.data.message);
          console.log(res.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      this.state.isLoggedin ? <Redirect to="/dashboard" /> :
        <React.Fragment>
          <div style={{ backgroundImage: "url('" + bgImage + "')", backgroundSize: "cover" }}>
            <div className="app align-items-center">
              <Container>
                <Row className="w-75 m-auto">
                  <Col xs="12">
                    <Alert color={this.state.badge} isOpen={this.state.badgeVisible} toggle={this.onDismiss}>
                      {this.state.message}
                    </Alert>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="9" lg="7" xl="6">
                    <Card className="mx-4">
                      <CardBody className="p-4">
                        <Form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                          <h1>Register</h1>
                          <p className="text-muted">Create your account</p>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Full Name" autoComplete="name" name="name" value={this.state.name} className={!this.state.isNameClicked ? "" : this.state.isGoodName ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isNameClicked: true })} onChange={this.handleCheckUsername} required />
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input type="email" placeholder="Email" autoComplete="email" name="email" value={this.state.email} className={!this.state.isEmailClicked ? "" : this.state.isGoodEmail && !this.state.isRegisteredEmail ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isEmailClicked: true })} onChange={this.handleChangeAndCheckEmail} required />
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" autoComplete="new-password" name="password" value={this.state.password} className={!this.state.isPasswordClicked ? "" : this.state.isGoodPassword ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isPasswordClicked: true })} onChange={this.handleCheckPassword} required />
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Repeat password" autoComplete="new-password" name="passwordVal" value={this.state.passwordVal} className={!this.state.isPasswordClicked ? "" : this.state.isPasswordConfirmed ? "is-valid" : "is-invalid"} onChange={this.handleConfirmPassword} required />
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-phone"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="phone" placeholder="Phone" name="phone" value={this.state.phone} className={!this.state.isPhoneClicked ? "" : this.state.isGoodPhone ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isPhoneClicked: true })} onChange={this.handleCheckPhone} required />
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-venus-mars"></i>
                              </InputGroupText>
                            </InputGroupAddon>

                            <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggle} style={{ flex: "auto" }}>
                              <DropdownToggle className="text-left">
                                {this.state.gender}
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => this.setState({ gender: "Male", isGoodGender: true })}>Male</DropdownItem>
                                <DropdownItem onClick={() => this.setState({ gender: "Female", isGoodGender: true })}>Female</DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>
                          </InputGroup>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-location-pin"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Address" name="address" value={this.state.address} className={!this.state.isAddressClicked ? "" : this.state.isGoodAddress ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isAddressClicked: true })} onChange={this.handleCheckAddress} required />
                          </InputGroup>

                          <InputGroup className="mb-1">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-id-card-o"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="No. KTP" name="citizen_id" value={this.state.citizen_id} className={!this.state.isKTPClicked ? "" : this.state.isGoodKTP ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isKTPClicked: true })} onChange={this.handleCheckKTP} required />
                          </InputGroup>
                          <InputGroup className="mb-4 input-group border rounded p-1">
                            <div className="custom-file">
                              <Input type="file" className="custom-file-input" name="fileImage" onChange={this.handleCheckCaptureKTP} required />
                              <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{this.state.fileImage ? this.state.fileImage.name : ""} </Label>
                            </div>
                          </InputGroup>

                          <Button color="success" block type="submit" disabled={!this.state.isGoodName || !this.state.isGoodPassword || this.state.isRegisteredEmail || !this.state.isPasswordConfirmed || !this.state.isGoodAddress || !this.state.isGoodGender || !this.state.isGoodPhone || !this.state.isGoodKTP || !this.state.fileImage || this.state.loader} >
                            {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" /> : "Create Account"}
                          </Button>
                          <Link to="/login">
                            <Button color="danger" className="w-100 mt-4" active tabIndex={-1}>Login</Button>
                          </Link>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <span className="float-right"><a href="mailto:imvlaboratory@gmail.com" target="_blank" rel="noopener noreferrer" className="text-danger">{process.env.REACT_APP_NAME}</a> &copy; {new Date().getFullYear()} {process.env.REACT_APP_ORGANIZATION}</span>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default Register;
