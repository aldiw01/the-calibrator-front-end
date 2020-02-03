import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import AuthService from '../../../server/AuthService';
import axios from 'axios';

class ResetPassword extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      email: '',
      password: '',
      passwordVal: '',
      isGoodPassword: false,
      isLoggedin: false,
      isPasswordConfirmed: false,
      status: '',
      loader: false
    }
  }

  componentDidMount() {
    const waktu = new Date().valueOf();
    if (this.Auth.loggedIn()) {
      this.setState({
        isLoggedin: true
      })
    }
    if (this.props.match.params.token !== undefined) {
      axios.get(localStorage.getItem('serverAPI') + '/forgot-password/get-token/' + this.props.match.params.token, {
      }).then(res => {
        if (!res.data.message) {
          if (waktu > res.data[0].expired) {
            window.alert("Token was expired");
            window.location.href = '/login';
          } else {
            this.setState({
              email: res.data[0].email,
              status: this.state.status
            });
          }
        } else {
          window.alert(res.data.message);
          window.location.href = '/login';
        }
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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

  handleConfirmPassword = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if ((this.state.password === event.target.value) && (event.target.value.length > 5)) {
      this.setState({ isPasswordConfirmed: true });
    } else {
      this.setState({ isPasswordConfirmed: false });
    }
  }

  handleFormSubmit = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    const req = {
      email: this.state.email,
      password: this.state.password,
      token: this.props.match.params.token
    }
    if (this.state.status === '0') {
      axios.put(localStorage.getItem('serverAPI') + '/forgot-password/edit-password', req, {
      }).then(res => {
        window.alert(res.data.message);
        window.location.href = '/login';
      });
    } else {
      axios.put(localStorage.getItem('serverAPI') + '/forgot-password/edit-password-admin', req, {
      }).then(res => {
        window.alert(res.data.message);
        window.location.href = '/admin/login';
      });
    }
  }

  render() {
    return (
      this.state.isLoggedin ? <Redirect to="/dashboard" /> :
        <React.Fragment>
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="6">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form method="post" onSubmit={this.handleFormSubmit}>
                          <h1>Reset Password</h1>
                          <p className="text-muted">Enter new password for your account.</p>

                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" autoComplete="new-password" name="password" value={this.state.password} className={!this.state.isPasswordClicked ? "" : this.state.isGoodPassword ? "is-valid" : "is-invalid"} onFocus={() => this.setState({ isPasswordClicked: true })} onChange={this.handleCheckPassword} required />
                          </InputGroup>

                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Repeat password" autoComplete="new-password" name="passwordVal" value={this.state.passwordVal} className={!this.state.isPasswordClicked ? "" : this.state.isPasswordConfirmed ? "is-valid" : "is-invalid"} onChange={this.handleConfirmPassword} required />
                          </InputGroup>

                          <Row>
                            <Col className="d-flex justify-content-center">
                              <Button color="primary" className="px-4" disabled={!this.state.isGoodPassword || !this.state.isPasswordConfirmed}>Set Password</Button>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </CardGroup>
                  <Card>
                    <CardFooter>
                      <span className="float-right"><a href="mailto:imvlaboratory@gmail.com" target="_blank" rel="noopener noreferrer">Safe-T</a> &copy; {new Date().getFullYear()} IMV Laboratory</span>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
    );
  }
}

export default ResetPassword;
