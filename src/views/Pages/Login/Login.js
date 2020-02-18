import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import AuthService from '../../../server/AuthService';
import axios from 'axios';
import Spinner from 'react-spinkit';

import bgImage from "assets/img/landing-bg.jpg";

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      nik: '',
      password: '',
      isAlertVisible: false,
      isLoggedin: false,
      message: '',
      forgotPassword: false,
      emailRecovery: '',
      loader: false,
      loader2: false
    }
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      this.setState({
        isLoggedin: true
      })
    }
    if (this.props.match.params.id !== undefined) {
      const req = {
        token: this.props.match.params.id
      };
      axios.post(process.env.REACT_APP_API_PATH + '/user/verify-token', req, {
      }).then(res => {
        this.setState({
          isAlertVisible: res.data.success,
          message: res.data.message
        });
      })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onDismiss = () => {
    this.setState({ isAlertVisible: false });
  }

  onToggle = () => {
    this.setState({ forgotPassword: !this.state.forgotPassword });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = (event) => {
    this.setState({ loader: true });
    event.preventDefault();
    this.Auth.login(this.state.nik, this.state.password)
      .then(res => {
        if (res.data.success) {
          this.setState({ loader: false });
          this.props.history.push("/dashboard");
        } else {
          this.setState({ loader: false });
          alert(res.data.err);
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      })
  }

  handleForgotPassword = (event) => {
    this.setState({ loader2: true });
    event.preventDefault();
    const req = { email: this.state.emailRecovery };
    axios.post(process.env.REACT_APP_API_PATH + '/forgot-password', req)
      .then(res => {
        this.setState({
          forgotPassword: !this.state.forgotPassword,
          isAlertVisible: true,
          message: res.data.message,
          loader2: false
        });
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
            <div className="app flex-row align-items-center">
              <Container>
                <Row className="w-75 m-auto">
                  <Col xs="12">
                    <Alert color="info" isOpen={this.state.isAlertVisible} toggle={this.onDismiss}>
                      {this.state.message}
                    </Alert>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md="8">
                    <CardGroup>
                      <Card className="p-4">
                        <CardBody>
                          <Form method="post" onSubmit={this.handleFormSubmit}>
                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>@</InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="NIK" autoComplete="username" name="nik" onChange={this.handleChange} required />
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={this.handleChange} required />
                            </InputGroup>
                            <Row>
                              <Col xs="6" className="d-flex">
                                <Button color="danger" className="px-4" disabled={this.state.loader}>Login</Button>
                                {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" /> : ""}
                              </Col>
                              <Col xs="6" className="text-right">
                                <Button onClick={this.onToggle} color="link" className="px-0 text-danger">Forgot password?</Button>
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card className="text-white bg-dark py-5 d-md-down-none" style={{ width: '44%' }}>
                        <CardBody className="text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>Register first if you don't have accont yet.</p>
                            <Link to="/register">
                              <Button color="danger" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                            </Link>
                          </div>
                        </CardBody>
                      </Card>
                    </CardGroup>
                    <Card>
                      <CardFooter>
                        <span className="float-right"><a href="mailto:imvlaboratory@gmail.com" target="_blank" rel="noopener noreferrer" className="text-danger">{process.env.REACT_APP_NAME}</a> &copy; {new Date().getFullYear()} {process.env.REACT_APP_ORGANIZATION}</span>
                      </CardFooter>
                    </Card>

                    <Modal isOpen={this.state.forgotPassword} toggle={this.onToggle} className={'modal-danger'}>
                      <ModalHeader toggle={this.onToggle}>Forgot Password</ModalHeader>
                      <Form method="post" className="form-horizontal" onSubmit={this.handleForgotPassword}>
                        <ModalBody>
                          <p>Type your email to recover your account.</p>
                          <FormGroup row>
                            <Col md="3" className="m-auto">
                              <Label htmlFor="hf-email">Email</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="email" onChange={this.handleChange} name="emailRecovery" value={this.state.emailRecovery} required />
                            </Col>
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          {this.state.loader2 ? <Spinner name='double-bounce' fadeIn="quarter" className="ml-auto" /> : ""}
                          <Button color="danger" disabled={this.state.loader2}>Recover</Button>{' '}
                          <Button color="secondary" onClick={this.onToggle}>Cancel</Button>
                        </ModalFooter>
                      </Form>
                    </Modal>

                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </React.Fragment>
    );
  }
}

export default Login;
