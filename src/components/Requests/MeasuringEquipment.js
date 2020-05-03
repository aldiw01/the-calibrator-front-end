import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import Spinner from 'react-spinkit';
import AuthService from 'server/AuthService';

const propTypes = {
  id: PropTypes.any,
  data: PropTypes.any,
  getData: PropTypes.func,
};

const defaultProps = {
  data: [{
    request_id: '',
    device_name: '',
    manufacturer: '',
    model: '',
    serial_number: '',
    device_id: ''
  }]
};

class MeasuringEquipment extends Component {
  constructor(props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      data: this.props.data,
      edit: false,
      index: '',
      measuring_equipment: false,
      message: '',
      num_row: this.props.data.length || 1
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.data !== prevProps.data) {
      this.setState({
        data: this.props.data,
        num_row: this.props.data.length || 1
      })
    }
  }

  handleChange = (event) => {
    var items = this.state.data;
    var name = event.target.name.replace(/[0-9]/g, "")
    var index = event.target.name.replace(/[^0-9]/g, "")
    items[index] = {
      ...items[index],
      [name]: event.target.value
    }
    this.setState({
      edit: true,
      items
    })
  }

  handleAddRow = () => {
    var items = this.state.data.push({
      request_id: this.props.id,
      device_name: '',
      manufacturer: '',
      model: '',
      serial_number: '',
      device_id: ''
    });
    this.setState({
      items,
      num_row: this.state.num_row + 1
    })
  }

  handleRemoveRow = (id) => {
    if (this.state.data[id].id) {
      if (window.confirm("You will create change(s) on database. Are you sure?")) {
        this.setState({ loader: true });
        axios.delete(process.env.REACT_APP_API_PATH + '/measuring_equipment/ever/' + this.state.data[id].id)
          .then(res => {
            const message = this.state.data[id].device_id;
            var items = this.state.data.splice(id, 1);
            if (this.state.data.length === 0) {
              items = [{
                request_id: this.props.id,
                device_name: '',
                manufacturer: '',
                model: '',
                serial_number: '',
                device_id: ''
              }]
            }
            this.setState({
              edit: false,
              loader: false,
              items,
              num_row: this.state.num_row - 1
            })
            // INSERT HISTORY INTO DATABASE
            var request = {
              reference_id: this.props.id,
              test_engineer_id: this.Auth.getProfile().id,
              cal_step_id: "MEQ3",
              message: message
            }
            axios.post(process.env.REACT_APP_API_PATH + '/history', request)
              .then(() => {
                this.props.getData();
              })
              .catch(error => {
                alert(error);
                console.log(error);
              });
            ////////////////////////////////////////////////////////////////
            alert(res.data.message);
          })
          .catch(error => {
            alert(error);
            console.log(error);
          });
      }
    } else {
      const items = this.state.data.splice(id, 1);
      this.setState({
        items,
        num_row: this.state.num_row - 1
      })
    }
  }

  toggleMeq = (event) => {
    event.preventDefault();
    this.setState({
      measuring_equipment: !this.state.measuring_equipment,
    });
  }

  handleMeq = (event) => {
    event.preventDefault();
    if (window.confirm("You will create change(s) on database. Are you sure?")) {
      this.setState({ loader: true });
      var i = 0, message = [];
      for (; i < this.state.data.length - 1; i++) {
        if (this.state.data[i].id) {
          // ID is assigned by API, if ID was exist then it's already in database. Proceed Edit API
          axios.put(process.env.REACT_APP_API_PATH + '/measuring_equipment/' + this.state.data[i].id, this.state.data[i])
            .catch(error => {
              alert(error);
              console.log(error);
            });
        } else {
          axios.post(process.env.REACT_APP_API_PATH + '/measuring_equipment/', this.state.data[i])
            .catch(error => {
              alert(error);
              console.log(error);
            });
        }
        message.push(this.state.data[i].device_id);
      }
      message.push(this.state.data[i].device_id);
      if (this.state.data[i].id) {
        // ID is assigned by API, if ID was exist then it's already in database. Proceed Edit API
        axios.put(process.env.REACT_APP_API_PATH + '/measuring_equipment/' + this.state.data[i].id, this.state.data[i])
          .then(res => {
            this.setState({
              edit: false,
              measuring_equipment: !this.state.measuring_equipment,
              loader: false
            })
            // INSERT HISTORY INTO DATABASE
            var request = {
              reference_id: this.props.id,
              test_engineer_id: this.Auth.getProfile().id,
              cal_step_id: "MEQ2",
              message: message.toString()
            }
            axios.post(process.env.REACT_APP_API_PATH + '/history', request)
              .then(() => {
                this.props.getData();
              })
              .catch(error => {
                alert(error);
                console.log(error);
              });
            ////////////////////////////////////////////////////////////////
            alert(res.data.message);
          })
          .catch(error => {
            alert(error);
            console.log(error);
          });
      } else {
        axios.post(process.env.REACT_APP_API_PATH + '/measuring_equipment/', this.state.data[i])
          .then(res => {
            this.setState({
              edit: false,
              measuring_equipment: !this.state.measuring_equipment,
              loader: false
            })
            // INSERT HISTORY INTO DATABASE
            var request = {
              reference_id: this.props.id,
              test_engineer_id: this.Auth.getProfile().id,
              cal_step_id: "MEQ1",
              message: message.toString()
            }
            axios.post(process.env.REACT_APP_API_PATH + '/history', request)
              .then(() => {
                this.props.getData();
              })
              .catch(error => {
                alert(error);
                console.log(error);
              });
            ////////////////////////////////////////////////////////////////
            alert(res.data.message);
          })
          .catch(error => {
            alert(error);
            console.log(error);
          });
      }
    }
  }

  render() {

    const { id } = this.props;

    return (
      <React.Fragment>
        <Button color="dark" onClick={this.toggleMeq} className="w-100 mb-2" >Input Measuring Equipment</Button>

        <Modal isOpen={this.state.measuring_equipment} toggle={this.toggleMeq} className={'modal-dark modal-xl'}>
          <Form onSubmit={this.handleMeq} method="post" className="form-horizontal">
            <ModalHeader toggle={this.toggleMeq}>Measuring Equipment SPK {id}</ModalHeader>
            <ModalBody className="mt-4 mx-4">

              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>No Asset</th>
                    <th>Nama Alat</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Serial Number</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(this.state.num_row)].map((x, i) =>
                    <tr key={i}>
                      <td className="px-1"><Button color="danger" onClick={() => this.handleRemoveRow(i)} className="w-100">{i + 1}</Button></td>
                      <td className="px-1"><Input type="text" onChange={this.handleChange} name={"device_id" + i} value={this.state.data[i].device_id} required /></td>
                      <td className="px-1"><Input type="text" onChange={this.handleChange} name={"device_name" + i} value={this.state.data[i].device_name} required /></td>
                      <td className="px-1"><Input type="text" onChange={this.handleChange} name={"manufacturer" + i} value={this.state.data[i].manufacturer} required /></td>
                      <td className="px-1"><Input type="text" onChange={this.handleChange} name={"model" + i} value={this.state.data[i].model} required /></td>
                      <td className="px-1"><Input type="text" onChange={this.handleChange} name={"serial_number" + i} value={this.state.data[i].serial_number} required /></td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <Button color="success" onClick={this.handleAddRow} className="w-100">Tambah Equipment</Button>

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
              {this.state.loader ? <Spinner name='double-bounce' fadeIn="quarter" /> : ""}
              <Button color="primary" type="submit" disabled={!this.state.edit} >Simpan</Button>{' '}
              <Button color="secondary" onClick={this.toggleMeq}>Cancel</Button>
            </ModalFooter>
          </Form>
        </Modal>

      </React.Fragment>
    );
  }
}

MeasuringEquipment.propTypes = propTypes;
MeasuringEquipment.defaultProps = defaultProps;

export default MeasuringEquipment;