import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  add: PropTypes.bool,
  data: PropTypes.object,
  dropdown1: PropTypes.bool,
  dropdown2: PropTypes.bool,
  loader: PropTypes.bool,
  handleAdd: PropTypes.func,
  handleChangeNew: PropTypes.func,
  handleChangeNewFile: PropTypes.func,
  toggle1: PropTypes.func,
  toggle2: PropTypes.func,
  toggleAdd: PropTypes.func
};

const defaultProps = {
  add: false,
  loader: false
};

class AddDevice extends Component {
  render() {

    const { add, data, dropdown1, dropdown2, loader, handleAdd, handleChangeNew, handleChangeNewFile, toggle1, toggle2, toggleAdd } = this.props;

    return (
      <Modal isOpen={add} toggle={toggleAdd} className={'modal-success modal-lg'}>
        <Form onSubmit={handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleAdd}>Perangkat Baru</ModalHeader>
          <ModalBody className="mt-4 mx-4">
            <FormGroup row>
              <Col md="3">
                No Asset
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="id" value={data.id} className="text-uppercase" required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Nama Alat
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="name" value={data.name} required />
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
                <Input type="text" onChange={handleChangeNew} name="model" value={data.model} required />
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
                Kondisi Alat
                        </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={dropdown1} toggle={toggle1} name="dropdown1" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.defect_status === "1" ? "Rusak" : "Bagus"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleChangeNew} name="defect_status" value="0" >Bagus</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="defect_status" value="1" >Rusak</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Tanggal Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="calibration_date" value={data.calibration_date} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Akhir Kalibrasi
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="due_date" value={data.due_date} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Periode Kalibrasi (Tahun)
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChangeNew} name="calibration_period" value={data.calibration_period} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Penanggung Jawab
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="supervisor" value={data.supervisor} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Tanggal Pembelian
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="issue_date" value={data.issue_date} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Interval Test
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChangeNew} name="test_interval" value={data.test_interval} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Metode Kalibrasi
                        </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={dropdown2} toggle={toggle2} name="dropdown2" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.calibration_method ? data.calibration_method : "Pilih metode"}
                  </DropdownToggle>
                  <DropdownMenu required>
                    <DropdownItem onClick={handleChangeNew} name="calibration_method" value="Internal" >Internal</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="calibration_method" value="Eksternal" >Eksternal</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                File Manual
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="manual_file" onChange={handleChangeNewFile} />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{data.manual_file ? data.manual_file.name : ""} </Label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                File Spesifikasi
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="spec_file" onChange={handleChangeNewFile} />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{data.spec_file ? data.spec_file.name : ""} </Label>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                Dokumentasi
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="documentation" onChange={handleChangeNewFile} required />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{data.documentation ? data.documentation.name : ""} </Label>
                </div>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
            <Button color="success" type="submit" >Tambah</Button>{' '}
            <Button color="secondary" onClick={toggleAdd}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

AddDevice.propTypes = propTypes;
AddDevice.defaultProps = defaultProps;

export default AddDevice;