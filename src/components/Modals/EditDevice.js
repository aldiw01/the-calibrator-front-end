import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.object,
  dropdown1: PropTypes.bool,
  dropdown2: PropTypes.bool,
  id: PropTypes.number,
  loader: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleChange: PropTypes.func,
  toggle1: PropTypes.func,
  toggle2: PropTypes.func,
  toggleEdit: PropTypes.func
};

const defaultProps = {
  edit: false,
  loader: false
};

class EditDevice extends Component {
  render() {

    const { edit, data, dropdown1, dropdown2, id, loader, handleEdit, handleChange, toggle1, toggle2, toggleEdit } = this.props;

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
                <ButtonDropdown isOpen={dropdown1} toggle={toggle1} name="dropdown1" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.defect_status === "1" ? "Rusak" : "Bagus"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleChange} name="defect_status" value="0" >Bagus</DropdownItem>
                    <DropdownItem onClick={handleChange} name="defect_status" value="1" >Rusak</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Tanggal Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="calibration_date" value={data.calibration_date} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Akhir Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="due_date" value={data.due_date} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Periode Kalibrasi (Tahun)
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChange} name="calibration_period" value={data.calibration_period} required />
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
                Metode Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={dropdown2} toggle={toggle2} name="dropdown2" className="w-100">
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
EditDevice.defaultProps = defaultProps;

export default EditDevice;