import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  add: PropTypes.bool,
  data: PropTypes.object,
  handleAdd: PropTypes.func,
  handleChangeNew: PropTypes.func,
  handleChangeNewFile: PropTypes.func,
  loader: PropTypes.bool,
  toggleAdd: PropTypes.func
};

class AddRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown1: false,
      dropdown2: false
    }
  }

  toggle1 = () => {
    this.setState({
      dropdown1: !this.state.dropdown1
    });
  }

  toggle2 = () => {
    this.setState({
      dropdown2: !this.state.dropdown2
    });
  }

  render() {

    const { add, data, handleAdd, handleChangeNew, handleChangeNewFile, loader, toggleAdd } = this.props;

    return (
      <Modal isOpen={add} toggle={toggleAdd} className={'modal-success modal-lg'}>
        <Form onSubmit={handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleAdd}>Perangkat Baru</ModalHeader>
          <ModalBody className="mt-4 mx-4">

            <FormGroup row>
              <Col className="border-bottom"><strong>Isi SPK</strong></Col>
              <div className="w-100 py-2"></div>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                No SPK
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="id" value={data.id} className="text-uppercase" required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Laboratorium Penguji
                        </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={this.state.dropdown1} toggle={this.toggle1} name="dropdown1" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.lab === "" ? "Pilih Lab ..." : data.lab}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "100%", overflow: "auto" }}>
                    <DropdownItem onClick={handleChangeNew} name="lab" value="CAB" >Cable</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="lab" value="CAL" >Calibration</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="lab" value="DEV" >Device</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="lab" value="ENE" >Energy</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="lab" value="TRA" >Transmission</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tipe Pengujian
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="request_type" value={data.request_type} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Alat
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="device_name" value={data.device_name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Merk
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="manufacturer" value={data.manufacturer} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Model
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="type" value={data.type} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Serial Number
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="serial_number" value={data.serial_number} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Kapasitas
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="capacity" value={data.capacity} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Made In
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="made_in" value={data.made_in} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Referensi Pengujian
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="test_reference" value={data.test_reference} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Perusahaan
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="company_name" value={data.company_name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Alamat Perusahaan
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="company_address" value={data.company_address} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <div className="w-100 py-2"></div>
              <Col className="border-bottom"><strong>Jadwal SPK</strong></Col>
              <div className="w-100 py-2"></div>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tanggal SPK
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="created" value={data.created} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Target Mulai Uji
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="start_target" value={data.start_target} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Target Selesai Uji
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="finished_target" value={data.finished_target} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <div className="w-100 py-2"></div>
              <Col className="border-bottom"><strong>Pelaksana SPK</strong></Col>
              <div className="w-100 py-2"></div>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 1
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="engineer_1" value={data.engineer_1} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 2
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="engineer_2" value={data.engineer_2} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 3
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="engineer_3" value={data.engineer_3} required />
              </Col>
            </FormGroup>

            {/* <FormGroup row>
              <Col md="3">
                Dokumentasi
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="documentation" onChange={handleChangeNewFile} required />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{data.documentation ? data.documentation.name : ""} </Label>
                </div>
              </Col>
            </FormGroup> */}

          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="success" type="submit" >Tambah</Button>{' '}
            <Button color="secondary" onClick={toggleAdd}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal >
    );
  }
}

AddRequest.propTypes = propTypes;

export default AddRequest;