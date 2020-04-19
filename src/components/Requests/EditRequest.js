import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
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

class EditRequest extends Component {
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

    const { edit, data, handleChange, handleEdit, id, loader, toggleEdit } = this.props;

    return (
      <Modal isOpen={edit} toggle={() => toggleEdit(id)} className={'modal-primary modal-lg'}>
        <Form onSubmit={handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={() => toggleEdit(id)}>Edit Perangkat</ModalHeader>
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
                <Input type="text" onChange={handleChange} name="id" value={data.id} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Laboratorium Penguji
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="lab" value={data.lab} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tipe Pengujian
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="request_type" value={data.request_type} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Alat *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="device_name" value={data.device_name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Merk *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="manufacturer" value={data.manufacturer} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Model *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="type" value={data.type} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Serial Number
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="serial_number" value={data.serial_number} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Kapasitas
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="capacity" value={data.capacity} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Made In
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="made_in" value={data.made_in} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Referensi Pengujian
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="test_reference" value={data.test_reference} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Perusahaan *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="company_name" value={data.company_name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Alamat Perusahaan *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="company_address" value={data.company_address} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <div className="w-100 py-2"></div>
              <Col className="border-bottom"><strong>Jadwal SPK</strong></Col>
              <div className="w-100 py-2"></div>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tanggal SPK *
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="created" value={data.created} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Target Mulai Uji *
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="start_target" value={data.start_target} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Target Selesai Uji *
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="finished_target" value={data.finished_target} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Mulai Uji
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="actual_start" value={data.actual_start} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Selesai Uji
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChange} name="actual_finished" value={data.actual_finished} />
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
                <Input type="text" onChange={handleChange} name="engineer_1" value={data.engineer_1} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 2
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="engineer_2" value={data.engineer_2} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 3
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="engineer_3" value={data.engineer_3} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <div className="w-100 py-2"></div>
                <strong className="text-danger">
                  * Required Element
                </strong>
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

EditRequest.propTypes = propTypes;

export default EditRequest;