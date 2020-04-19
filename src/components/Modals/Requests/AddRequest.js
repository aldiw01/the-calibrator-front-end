import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Spinner from 'react-spinkit';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const propTypes = {
  add: PropTypes.bool,
  data: PropTypes.object,
  handleAdd: PropTypes.func,
  handleChangeNew: PropTypes.func,
  handleChangeNewEngineer1: PropTypes.func,
  handleChangeNewEngineer2: PropTypes.func,
  handleChangeNewEngineer3: PropTypes.func,
  handleChangeNewFile: PropTypes.func,
  loader: PropTypes.bool,
  toggleAdd: PropTypes.func
};

class AddRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{
        id: '',
        name: '',
        lab: '',
        email: '',
        role: '',
        photo: '',
        registered: '',
        updated: ''
      }],
      dropdown1: false,
      dropdown2: false,
      suggestions1: [],
      suggestions2: [],
      suggestions3: []
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/engineers')
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
      });
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

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  // ================================================================
  // Suggestions 1
  onSuggestionsFetchRequested1 = ({ value }) => {
    this.setState({
      suggestions1: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested1 = () => {
    this.setState({
      suggestions1: []
    });
  };

  // ================================================================
  // Suggestions 2
  onSuggestionsFetchRequested2 = ({ value }) => {
    this.setState({
      suggestions2: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested2 = () => {
    this.setState({
      suggestions2: []
    });
  };

  // ================================================================
  // Suggestions 3
  onSuggestionsFetchRequested3 = ({ value }) => {
    this.setState({
      suggestions3: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested3 = () => {
    this.setState({
      suggestions3: []
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const regex = new RegExp(`${inputValue}`, 'gi')

    return inputLength === 0 ? [] : this.state.data.filter(item =>
      item.id.match(regex) || item.name.match(regex)
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.id;

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.id} - {suggestion.name}
    </div>
  );

  renderInputComponent = inputProps => (
    <Input {...inputProps} />
  );

  renderInputComponentRequired = inputProps => (
    <Input {...inputProps} required />
  );

  render() {

    const { add, data, handleAdd, handleChangeNew, handleChangeNewEngineer1, handleChangeNewEngineer2, handleChangeNewEngineer3, loader, toggleAdd } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps1 = {
      placeholder: 'Type an Engineer 1 ...',
      value: data.engineer_1,
      name: "engineer_1",
      onChange: handleChangeNewEngineer1
    };

    const inputProps2 = {
      placeholder: 'Type an Engineer 2 ...',
      value: data.engineer_2,
      name: "engineer_2",
      onChange: handleChangeNewEngineer2
    };

    const inputProps3 = {
      placeholder: 'Type an Engineer 3 ...',
      value: data.engineer_3,
      name: "engineer_3",
      onChange: handleChangeNewEngineer3
    };

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
                No SPK *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="id" value={data.id} className="text-uppercase" required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Laboratorium Penguji *
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
                Tipe Pengujian *
              </Col>
              <Col xs="12" md="9">
                <ButtonDropdown isOpen={this.state.dropdown2} toggle={this.toggle2} name="dropdown2" className="w-100">
                  <DropdownToggle className="text-left">
                    {data.request_type === "" ? "Pilih Tipe Pengujian ..." : data.request_type}
                  </DropdownToggle>
                  <DropdownMenu style={{ width: "100%", overflow: "auto" }}>
                    <DropdownItem onClick={handleChangeNew} name="request_type" value="QA" >QA - Quality Assurance</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="request_type" value="TA" >TA - Test Approval</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="request_type" value="VT" >VT - Voluntary Test</DropdownItem>
                    <DropdownItem onClick={handleChangeNew} name="request_type" value="CAL" >CAL - Calibration</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Alat *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="device_name" value={data.device_name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Merk *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="manufacturer" value={data.manufacturer} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Model *
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
                <Input type="text" onChange={handleChangeNew} name="serial_number" value={data.serial_number} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Kapasitas
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="capacity" value={data.capacity} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Made In
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="made_in" value={data.made_in} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Referensi Pengujian
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="test_reference" value={data.test_reference} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Nama Perusahaan *
              </Col>
              <Col xs="12" md="9">
                <Input type="text" onChange={handleChangeNew} name="company_name" value={data.company_name} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Alamat Perusahaan *
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
                Tanggal SPK *
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="created" value={data.created} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Target Mulai Uji *
              </Col>
              <Col xs="12" md="9">
                <Input type="date" onChange={handleChangeNew} name="start_target" value={data.start_target} required />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Target Selesai Uji *
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
                Engineer 1 *
              </Col>
              <Col xs="12" md="9">
                <Autosuggest
                  suggestions={this.state.suggestions1}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested1}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested1}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps1}
                  renderInputComponent={this.renderInputComponentRequired}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 2
              </Col>
              <Col xs="12" md="9">
                <Autosuggest
                  suggestions={this.state.suggestions2}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested2}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested2}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps2}
                  renderInputComponent={this.renderInputComponent}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                Engineer 3
              </Col>
              <Col xs="12" md="9">
                <Autosuggest
                  suggestions={this.state.suggestions3}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested3}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested3}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps3}
                  renderInputComponent={this.renderInputComponent}
                />
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