import React, { Component } from 'react';
import { Alert, Button, ButtonDropdown, Card, CardBody, CardFooter, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import AuthService from '../../../server/AuthService';
import Spinner from 'react-spinkit';

class Register extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn() || this.Auth.getProfile().role !== "2") {
      window.location = '/login';
    }
    this.state = {
      address: '',
      badge: 'info',
      badgeVisible: false,
      dropdown: false,
      email: '',
      lab: "Select Lab",
      isEmailClicked: false,
      isGoodEmail: false,
      isGoodLab: false,
      isGoodName: false,
      isGoodNIK: false,
      isGoodPassword: false,
      isNameClicked: false,
      isNIKClicked: false,
      isPasswordClicked: false,
      isPasswordConfirmed: false,
      isRegisteredNIK: false,
      loader: false,
      message: '',
      name: '',
      nik: '',
      password: '',
      passwordVal: ''
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
    if (event.target.value.length > 3) {
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

  handleCheckNIK = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.value.length > 5) {
      this.setState({ isGoodNIK: true });
    } else {
      this.setState({ isGoodNIK: false });
    }

    const data = {
      id: event.target.value
    }
    axios.post(process.env.REACT_APP_API_PATH + '/accounts/check-user-registered', data, {
    }).then(res => {
      if (res.data.success) {
        this.setState({ isRegisteredNIK: true });
      } else {
        this.setState({ isRegisteredNIK: false });
      }
    });
  }

  handleSubmit = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    const data = {
      id: this.state.nik,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      lab: this.state.lab
    }
    axios.post(process.env.REACT_APP_API_PATH + '/engineers', data)
      .then(res => {
        if (res.data.success) {
          this.setState({
            address: '',
            badge: 'success',
            badgeVisible: true,
            dropdown: false,
            email: '',
            lab: "Select Lab",
            isEmailClicked: false,
            isGoodEmail: false,
            isGoodLab: false,
            isGoodName: false,
            isGoodNIK: false,
            isGoodPassword: false,
            isNameClicked: false,
            isNIKClicked: false,
            isPasswordClicked: false,
            isPasswordConfirmed: false,
            isRegisteredNIK: false,
            loader: false,
            message: 'Account registered successfully.',
            name: '',
            nik: '',
            password: '',
            passwordVal: ''
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
      <React.Fragment>
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
                  <Form method="post" onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-eye"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" placeholder="NIK" name="nik" value={this.state.nik} className={!this.state.isNIKClicked ? "" : this.state.isGoodNIK && !this.state.isRegisteredNIK ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isNIKClicked: true })} onChange={this.handleCheckNIK} required />
                    </InputGroup>

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
                      <Input type="email" placeholder="Email" autoComplete="email" name="email" value={this.state.email} className={!this.state.isEmailClicked ? "" : this.state.isGoodEmail ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isEmailClicked: true })} onChange={this.handleChangeAndCheckEmail} required />
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
                          <i className="icon-heart"></i>
                        </InputGroupText>
                      </InputGroupAddon>

                      <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggle} style={{ flex: "auto" }}>
                        <DropdownToggle className="text-left">
                          {this.state.lab}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => this.setState({ lab: "CAB", isGoodLab: true })}>Cable</DropdownItem>
                          <DropdownItem onClick={() => this.setState({ lab: "CAL", isGoodLab: true })}>Calibration</DropdownItem>
                          <DropdownItem onClick={() => this.setState({ lab: "CPE", isGoodLab: true })}>Device</DropdownItem>
                          <DropdownItem onClick={() => this.setState({ lab: "ENE", isGoodLab: true })}>Energy</DropdownItem>
                          <DropdownItem onClick={() => this.setState({ lab: "TRA", isGoodLab: true })}>Transmission</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </InputGroup>

                    <Button color="danger" block type="submit" disabled={!this.state.isGoodName || !this.state.isGoodPassword || this.state.isRegisteredNIK || !this.state.isPasswordConfirmed || !this.state.isGoodLab || this.state.loader} >
                      {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" /> : "Create Account"}
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter>
                  <span className="float-right"><a href="mailto:imvlaboratory@gmail.com" target="_blank" rel="noopener noreferrer" className="text-danger">{process.env.REACT_APP_NAME}</a> &copy; {new Date().getFullYear()} {process.env.REACT_APP_ORGANIZATION}</span>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Register;
