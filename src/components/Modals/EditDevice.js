import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleEdit: PropTypes.func,
  id: PropTypes.number,
  loader: PropTypes.bool,
  toggleEdit: PropTypes.func
};

class EditDevice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown1: false,
      dropdown2: false,
      dropdown3: false
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

  toggle3 = () => {
    this.setState({
      dropdown3: !this.state.dropdown3
    });
  }

  render() {

    const { edit, data, handleChange, handleEdit, id, loader, toggleEdit } = this.props;

    return (
      <Modal isOpen={edit} toggle={() => toggleEdit(id)} className={'modal-primary modal-lg'}>
        <Form onSubmit={handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={() => toggleEdit(id)}>Edit Perangkat</ModalHeader>
          <ModalBody className="mt-4 mx-4">
            <FormGroup row>
              <Col md="3">
                No Asset
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="id" value={data.id} disabled />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Nama Alat
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="name" value={data.name} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Merk
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="manufacturer" value={data.manufacturer} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Model
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="model" value={data.model} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Serial Number
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="serial_number" value={data.serial_number} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Status
              </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={this.state.dropdown1} toggle={this.toggle1} name="dropdown1" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.defect_status === "0" ? "Bagus" : data.defect_status === "1" ? "Rusak" : "Tidak Dipakai"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleChange} name="defect_status" value="0" >Bagus</DropdownItem>
                    <DropdownItem onClick={handleChange} name="defect_status" value="1" >Rusak</DropdownItem>
                    <DropdownItem onClick={handleChange} name="defect_status" value="2" >Tidak Dipakai</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Tanggal Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="calibration_date" value={data.calibration_date} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Akhir Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="due_date" value={data.due_date} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Periode Kalibrasi (Tahun)
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChange} name="calibration_period" value={data.calibration_period} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Penanggung Jawab
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="supervisor" value={data.supervisor} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Tanggal Pembelian
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="issue_date" value={data.issue_date} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Pengecekan Antara
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="test_interval" value={data.test_interval} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Objek Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={this.state.dropdown2} toggle={this.toggle2} name="dropdown2" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.calibration_object === "1" ? "TRUE" : "FALSE"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleChange} name="calibration_object" value="1" >TRUE</DropdownItem>
                    <DropdownItem onClick={handleChange} name="calibration_object" value="0" >FALSE</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Metode Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={this.state.dropdown3} toggle={this.toggle3} name="dropdown3" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.calibration_method}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleChange} name="calibration_method" value="Internal" >Internal</DropdownItem>
                    <DropdownItem onClick={handleChange} name="calibration_method" value="Eksternal" >Eksternal</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="primary" type="submit" >Save Changes</Button>{' '}
            <Button color="secondary" onClick={() => toggleEdit(id)}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

EditDevice.propTypes = propTypes;

export default EditDevice;