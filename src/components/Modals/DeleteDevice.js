import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Spinner from 'react-spinkit';

const propTypes = {
  _delete: PropTypes.bool,
  data: PropTypes.object,
  id: PropTypes.number,
  loader: PropTypes.bool,
  handleDelete: PropTypes.func,
  toggleDelete: PropTypes.func
};

const defaultProps = {
  _delete: false,
  loader: false
};

class DeleteDevice extends Component {
  render() {

    const { _delete, data, id, loader, handleDelete, toggleDelete } = this.props;

    return (
      <Modal isOpen={_delete} toggle={() => toggleDelete(id)} className={'modal-danger modal-sm'}>
        <ModalHeader toggle={() => toggleDelete(id)}>Delete Perangkat</ModalHeader>
        <ModalBody>
          Do you really want to delete {data.id}?
        </ModalBody>
        <ModalFooter>
          {loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
          <Button color="danger" onClick={() => handleDelete(data.id)}>Delete</Button>{' '}
          <Button color="secondary" onClick={() => toggleDelete(id)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteDevice.propTypes = propTypes;
DeleteDevice.defaultProps = defaultProps;

export default DeleteDevice;