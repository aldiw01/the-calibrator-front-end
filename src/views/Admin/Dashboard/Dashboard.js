import React, { Component, lazy, Suspense } from 'react';
import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import axios from 'axios';
import Spinner from 'react-spinkit';
import { Redirect, Link } from 'react-router-dom';

const Devices = lazy(() => import('components/Widgets/Devices'));
// const Calibrated = lazy(() => import('components/Widgets/Calibrated'));

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      data: {
        cal: '', cab: '', dev: '', ene: '', tra: '', tot: '',
        d_cal: '', d_cab: '', d_dev: '', d_ene: '', d_tra: '', d_tot: '',
        u_cal: '', u_cab: '', u_dev: '', u_ene: '', u_tra: '', u_tot: '',
        l_cal: '', l_cab: '', l_dev: '', l_ene: '', l_tra: '', l_tot: '',
      },
      dropdownOpen: false,
      radioSelected: 2,
      something: ''
    };

  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/devices/dashboard')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () =>
    <div className="animated fadeIn pt-1 text-center">
      <Spinner name='double-bounce' fadeIn="quarter" className="m-auto" />
    </div>

  searchDevices = (event) => {
    event.preventDefault();
    return <Redirect to={"/devices/table/all/search/" + this.state.something.replace("/", "%2f")} />
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Form onSubmit={this.searchDevices} method="post" className="form-horizontal">
              <FormGroup>
                <div className="controls">
                  <InputGroup>
                    <Input id="appendedInputButton" name="something" value={this.state.something} onChange={this.handleChange} placeholder="Search device(s) ..." type="text" required />
                    <InputGroupAddon addonType="append">
                      <Link to={"/devices/table/all/search/" + this.state.something.replace("/", "%2f")}>
                        <Button color="danger" type="submit"><i className="fa fa-search"></i></Button>
                      </Link>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-wrench', jumlah: this.state.data.cal, bagus: this.state.data.d_cal, inactive: this.state.data.cal - this.state.data.d_cal, recalibration: this.state.data.u_cal })} refMain="/devices/cal" lab="CAL" >
                Lab Kalibrasi
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-feed', jumlah: this.state.data.tra, bagus: this.state.data.d_tra, inactive: this.state.data.tra - this.state.data.d_tra, recalibration: this.state.data.u_tra })} refMain="/devices/tra" lab="TRA" >
                Lab Transmisi
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-diamond', jumlah: this.state.data.cab, bagus: this.state.data.d_cab, inactive: this.state.data.cab - this.state.data.d_cab, recalibration: this.state.data.u_cab })} refMain="/devices/cab" lab="CAB" >
                Lab Kabel
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-screen-desktop', jumlah: this.state.data.dev, bagus: this.state.data.d_dev, inactive: this.state.data.dev - this.state.data.d_dev, recalibration: this.state.data.u_dev })} refMain="/devices/dev" lab="CPE" >
                Lab Device
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-energy', jumlah: this.state.data.ene, bagus: this.state.data.d_ene, inactive: this.state.data.ene - this.state.data.d_ene, recalibration: this.state.data.u_ene })} refMain="/devices/ene" lab="ENE" >
                Lab Energi
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-globe', jumlah: this.state.data.tot, bagus: this.state.data.d_tot, inactive: this.state.data.tot - this.state.data.d_tot, recalibration: this.state.data.u_tot })} lab="%2f" >
                Total
              </Devices>
            </Suspense>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Dashboard;
