import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Label, Form, FormGroup, Input } from 'reactstrap';
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

class AddDevice extends Component {

  render() {

    const { add, data, handleAdd, handleChangeNew, handleChangeNewFile, loader, toggleAdd } = this.props;

    return (
      <Modal isOpen={add} toggle={toggleAdd} className={'modal-success modal-lg'}>
        <Form onSubmit={handleAdd} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={toggleAdd}>Dokumen Baru</ModalHeader>

          <ModalBody className="mt-4 mx-4">
            <FormGroup row>
              <Col md="3">
                No Dokumen *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="id" value={data.id} className="text-uppercase" required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Version *
              </Col>
              <Col xs="12" md="9">
                <Input type="number" onChange={handleChangeNew} name="version" value={data.version} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Dokumen *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="name" value={data.name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tanggal Berlaku *
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="effective_date" value={data.effective_date} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                PIC *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="pic" value={data.pic} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                File *
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="file" onChange={handleChangeNewFile} required />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden" }} >{data.file ? data.file.name : ""} </Label>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="6">
                <div className="w-100"></div>
                <strong className="text-danger">
                  * Required Element
                </strong>
              </Col>
              <Col xs="6">
                <small>
                  <strong className="float-right">
                    Note: Hanya file (pdf/doc), max 5 MB.
                    </strong>
                </small>
              </Col>
            </FormGroup>

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

AddDevice.propTypes = propTypes;

export default AddDevice;