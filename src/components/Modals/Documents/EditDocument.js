import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleChangeFile: PropTypes.func,
  handleEdit: PropTypes.func,
  id: PropTypes.number,
  loader: PropTypes.bool,
  toggleEdit: PropTypes.func
};

class EditDevice extends Component {

  render() {

    const { edit, data, handleChange, handleChangeFile, handleEdit, id, loader, toggleEdit } = this.props;

    return (
      <Modal isOpen={edit} toggle={() => toggleEdit(id)} className={'modal-primary modal-lg'}>
        <Form onSubmit={handleEdit} method="post" encType="multipart/form-data" className="form-horizontal">
          <ModalHeader toggle={() => toggleEdit(id)}>Edit Dokumen</ModalHeader>
          <ModalBody className="mt-4 mx-4">

            <FormGroup row>
              <Col md="3">
                No Dokumen *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="id" value={data.id} disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Version *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="version" value={data.version} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Dokumen *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="name" value={data.name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Tanggal Berlaku *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="effective_date" value={data.effective_date} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                PIC *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChange} name="pic" value={data.pic} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                File *
              </Col>
              <Col xs="12" md="9">
                <div className="custom-file">
                  <Input type="file" className="custom-file-input" name="file" onChange={handleChangeFile} />
                  <Label className="custom-file-label" htmlFor="customFileLang" style={{ overflow: "hidden", whiteSpace: "nowrap" }} >{data.file ? data.file.name ? data.file.name : data.file : ""} </Label>
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