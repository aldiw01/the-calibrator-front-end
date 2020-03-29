import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import AuthService from 'server/AuthService';
import "assets/css/certificate.css";
import telkom from 'assets/img/telkom.png';
import LP from 'assets/img/LP.png';

class VoluntaryTest extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      id: 0,
      loader: false,
      csv_data: [],
      csv_headers: [],
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
      }]
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/devices/owner/CAL')
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

  render() {
    const role = this.Auth.getProfile().role
    const lab = this.Auth.getProfile().lab
    const margin = {
      margin: "50px 75px"
    }

    return (
      <div className="animated fadeIn bg-white" style={margin}>

        {/* Header Section */}
        <Row className="mb-3">
          <Col xs="3 my-auto">
            <img src={telkom} alt="Telkom Indonesia" className="w-100" />
          </Col>
          <Col xs="6 my-auto">
            <div className="text-center">
              <strong className="text-uppercase">
                <h4 className="font-weight-bold">
                  Divisi Digital Service - Telkom
                </h4>
                Infrastructure Assurance<br />
                Laboratorium Quality Assurance<br />
              </strong>
              Jalan Gegerkalong Hilir No. 47 Bandung 40152 INDONESIA
            </div>
            <Row>
              <Col xs="5">
                Phone: 62-22-4571050
              </Col>
              <Col xs="7" className="p-0">
                Facsimile: 62-22-2013505 or 2014669
              </Col>
            </Row>
          </Col>
          <Col xs="3 my-auto">
            <img src={LP} alt="LP-490-IDN" className="w-100" />
          </Col>
        </Row>

        {/* Body Section */}
        <div style={{ borderTop: "2px solid" }}>

          {/* Title */}
          <Row className="mt-3">
            <Col xs="3"></Col>
            <Col xs="6" className="text-center">
              <h4 className="font-weight-bold mb-0">
                <u>SERTIFIKAT KALIBRASI</u>
              </h4>
              <h5>
                <em>CALIBRATION CERTIFICATE</em>
              </h5>
            </Col>
            <Col xs="3" className="p-0">
              <u>NOMOR: 067/KAL/2019</u><br />
              <em>No.</em>
            </Col>
          </Row>

          {/* Consumer Data */}
          <Row className="mt-2">
            <Col xs="12">
              <strong>DATA PEMAKAI </strong><em>(Consumer Data)</em>
              <Row className="ml-3">

                <Col xs="3">
                  <u>NAMA / COMPANY</u><br />
                  <em>Name</em>
                </Col>
                <Col xs="9 my-auto">
                  : PT. TELEKOMUNIKASI INDONESIA, TBK – TELKOM DDS
                </Col>

                <Col xs="3">
                  <u>ALAMAT</u><br />
                  <em>Address</em>
                </Col>
                <Col xs="9 my-auto">
                  : JL. GEGERKALONG HILIR NO. 47 – BANDUNG 40152
                </Col>

              </Row>
            </Col>
          </Row>

          {/* Test Measurement’s Data */}
          <Row className="mt-2">
            <Col xs="12">
              <strong>DATA ALAT UKUR </strong><em>(Test Measurement’s Data)</em>
              <Row className="ml-3">

                <Col xs="3">
                  <u>NAMA ALAT UKUR</u><br />
                  <em>Name of Test Measurements</em>
                </Col>
                <Col xs="9 my-auto">
                  : DIGITAL MULTIMETER (161/CAL)
                </Col>

                <Col xs="3">
                  <u>MERK / TIPE</u><br />
                  <em>Brand / Type</em>
                </Col>
                <Col xs="9 my-auto">
                  : IWATSU/ VOAC 92
                </Col>

                <Col xs="3">
                  <u>NOMOR SERI</u><br />
                  <em>Serial No.</em>
                </Col>
                <Col xs="9 my-auto">
                  : 00021701
                </Col>

              </Row>
            </Col>
          </Row>

          {/* Laboratory Activity’s Data */}
          <Row className="mt-2">
            <Col xs="12">
              <strong>DATA KEGIATAN LABORATORIUM </strong><em>(Laboratory Activity’s Data)</em>
              <Row className="ml-3">

                <Col xs="3">
                  <u>SUHU</u><br />
                  <em>Ambient Temperature</em>
                </Col>
                <Col xs="9 my-auto">
                  : ( 23 ± 2 ) °C
                </Col>

                <Col xs="3">
                  <u>KELEMBABAN</u><br />
                  <em>Relative Humidity</em>
                </Col>
                <Col xs="9 my-auto">
                  : 40% ~ 70%
                </Col>

                <Col xs="3">
                  <u>TANGGAL KALIBRASI</u><br />
                  <em>Date Calibrated</em>
                </Col>
                <Col xs="9 my-auto">
                  : 29 MARET 2020
                </Col>

              </Row>
            </Col>
          </Row>

          {/* Method of Calibration */}
          <Row className="mt-2">
            <Col xs="12">
              <strong>METODE KALIBRASI </strong><em>(Method of Calibration)</em><br />
              Kalibrasi dilakukan berdasarkan prosedur IAS/I/KAL/004 dengan komparasi terhadap Alat Kalibrator (lihat halaman 2).<br />
              <em>The calibration was carried out based on the IAS/I/KAL/004 procedure by comparison against the following Calibrator (see page 2).</em>
            </Col>
          </Row>

          {/* Notes */}
          <Row className="mt-2">
            <Col xs="12">
              <strong><u>CATATAN</u></strong> <em>(Notes):</em>&emsp;
              Koreksi = Nilai Standar (N<sub>STD</sub>) – Nilai Unit Under Test (N<sub>UUT</sub>)
            </Col>
          </Row>

          {/* General Statement */}
          <Row className="mt-2">
            <Col xs="12">
              <strong>PERNYATAAN UMUM </strong><em>(General Statement)</em><br />
              <u>Ketidakpastian yang dilaporkan berdasarkan pada ketidakpastian standar dikalikan faktor cakupan k = 2, dengan tingkat kepercayaan sekitar 95%. Perhitungan ketidakpastian telah sesuai dengan persyaratan yang ditentukan oleh Komite Akreditasi Nasional (KAN).</u><br />
              <em>The reported uncertainty is based on a standard uncertainty multiplied by a coverage factor k = 2, with a confidence level approximately 95%. The uncertainty evaluation has been carried out in accordance with Komite Akreditasi Nasional (KAN) requirements.</em><br />
              <u>Sertifikat ini dikeluarkan sesuai persyaratan KAN, peralatan kalibrasi telah tertelusur ke sistem Satuan Internasional atau International System of Units (SI) (Systeme international d’unites) melalui Lab. Kalibrasi TELKOM MSC Cibinong (LK-016-IDN).</u><br />
              <em>This certificate is issued in accordance with laboratory accreditation requirements of the KAN, calibration equipment have been traceable to the international System of Units (SI) (Systeme international d’unites) through Calibration Laboratory of TELKOM MSC Cibinong (LK-016-IDN).</em>
            </Col>
          </Row>

          {/* Conclusion */}
          <Row className="mt-2">
            <Col xs="12">
              <strong><u>KESIMPULAN:</u></strong><br />
              <em>Conclusion</em>
            </Col>
            <Col>
              <Row>
                <Col xs="8">
                  Berdasarkan spesifikasi alat ukur <em><u>Multimeter Digital / IWATSU/ VOAC 92</u></em>
                </Col>
                <Col xs="4" className="border-left text-right">
                  <strong>SEMUA ITEM INSPEC</strong>
                </Col>
              </Row>
              <Row>
                <Col xs="8">
                  Refer to specification of <em><u>Multimeter Digital / IWATSU/ VOAC 92</u></em>
                </Col>
                <Col xs="4" className="border-left text-right">
                  <strong>ALL ITEM INSPEC</strong>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Method of Calibration */}
          <Row className="my-2">
            <Col xs="12" className="text-center">
              Bandung, 17 September 2019<br />
              Signed for and on behalf of TELKOM DDS<br />
              <br />
              <br />
              <br />
              <br />
              <strong><u>YUSRIL SINI</u></strong><br />
              SM INFRASTRUCTURE ASSURANCE
            </Col>
          </Row>
        </div>

        {/* Footer Section */}
        <div>
          {/* Page Number */}
          <Row className="mt-2" style={{ borderTop: "2px solid" }}>
            <Col xs="6" className="text-left">
              FILE: 067-kal-19
            </Col>
            <Col sx="6" className="text-right">
              Page 1 of 3
            </Col>
          </Row>

          {/* Disclaimer */}
          <Row className="mt-2 border-top border-bottom">
            <Col xs="12" className="text-center">
              <strong><u>Dilarang memperbanyak laporan ini tanpa izin dari Laboratorium Quality Assurance – DDS – TELKOM</u></strong><br />
              <em>Do not copy this report without permission in writing from Quality Assurance Laboratory – DDS – TELKOM</em>
            </Col>
          </Row>

          {/* Form Number */}
          <Row className="mt-2">
            <Col xs="12" className="text-left">
              <strong>TLKM06/F/007 Versi 01</strong>
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

export default VoluntaryTest;