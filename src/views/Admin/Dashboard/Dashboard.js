import React, { Component, lazy, Suspense } from 'react';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import Spinner from 'react-spinkit';

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
    };

  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(localStorage.getItem('serverAPI') + '/devices/dashboard')
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

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-wrench', jumlah: this.state.data.cal, baik: this.state.data.cal - this.state.data.d_cal, rusak: this.state.data.d_cal, uncalibrated: this.state.data.u_cal })} assets={this.state.data.l_cal} refMain="/devices/cal" lab="CAL" >
                Lab Kalibrasi
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-feed', jumlah: this.state.data.tra, baik: this.state.data.tra - this.state.data.d_tra, rusak: this.state.data.d_tra, uncalibrated: this.state.data.u_tra })} assets={this.state.data.l_tra} refMain="/devices/tra" lab="TRA" >
                Lab Transmisi
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-diamond', jumlah: this.state.data.cab, baik: this.state.data.cab - this.state.data.d_cab, rusak: this.state.data.d_cab, uncalibrated: this.state.data.u_cab })} assets={this.state.data.l_cab} refMain="/devices/cab" lab="CAB" >
                Lab Kabel
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-screen-desktop', jumlah: this.state.data.dev, baik: this.state.data.dev - this.state.data.d_dev, rusak: this.state.data.d_dev, uncalibrated: this.state.data.u_dev })} assets={this.state.data.l_dev} refMain="/devices/dev" lab="CPE" >
                Lab Device
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-energy', jumlah: this.state.data.ene, baik: this.state.data.ene - this.state.data.d_ene, rusak: this.state.data.d_ene, uncalibrated: this.state.data.u_ene })} assets={this.state.data.l_ene} refMain="/devices/ene" lab="ENE" >
                Lab Energi
              </Devices>
            </Suspense>
          </Col>

          <Col xs="12" md="6" lg="2">
            <Suspense fallback={this.loading()}>
              <Devices dataBox={() => ({ variant: 'icon-globe', jumlah: this.state.data.tot, baik: this.state.data.tot - this.state.data.d_tot, rusak: this.state.data.d_tot, uncalibrated: this.state.data.u_tot })} assets={this.state.data.l_tot} lab="%2F" >
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
