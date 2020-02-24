import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import AuthService from 'server/AuthService';
import { CSVLink } from 'react-csv';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';

class Schedules extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    this.state = {
      csv_data: [],
      csv_headers: [],
      data: [{
        id: '',
        name: '',
        manufacturer: '',
        model: '',
        calibration_date: '',
        due_date: '',
        calibration_method: '',
        documentation: '',
        regular_check_date: ''
      }],
      events: [
        {
          title: 'Lunch',
          start: new Date(2020, 1, 12),
          end: new Date(2020, 1, 12),
          allDay: true,
          desc: 'Power lunch'
        },
        {
          title: 'Beakfast',
          start: new Date(2020, 1, 12),
          end: new Date(2020, 1, 12),
          allDay: true,
          desc: 'Power lunch'
        },
        {
          title: 'Dinner',
          start: new Date(2020, 1, 12, 18),
          end: new Date(2020, 1, 12, 19),
          desc: 'Power lunch'
        }
      ],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/devices/schedule/regular_check')
      .then(res => {
        this.setState({ data: res.data });
        this.setCalendarEvents();
        this.getCSVData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  setCalendarEvents = () => {
    var events = []
    this.state.data.forEach(function (items, i) {
      if (items.id !== '') {
        events.push({
          id: 2 * i,
          title: items.id,
          manufacturer: items.manufacturer,
          model: items.model,
          start: new Date(items.regular_check_date),
          end: new Date(items.regular_check_date),
          allDay: true,
          desc: items.name,
          calibration_method: items.calibration_method
        });
        events.push({
          id: 2 * i + 1,
          title: items.id,
          manufacturer: items.manufacturer,
          model: items.model,
          start: new Date(items.due_date),
          end: new Date(items.due_date),
          allDay: true,
          desc: items.name,
          calibration_method: items.calibration_method,
          hexColor: "cf0f17",
          selectedColor: "9f0c12"
        });
      }
    });
    this.setState({
      events: events
    })
  }

  getCSVData = () => {
    var csv_headers = [
      { label: "NO", key: "no" },
      { label: "NO. ASSET", key: "id" },
      { label: "NAMA ALAT UKUR", key: "name" },
      { label: "MERK", key: "manufacturer" },
      { label: "TIPE", key: "model" },
      { label: "METODE KALIBRASI", key: "calibration_method" },
      { label: "JADWAL", key: "schedule" },
      { label: "KEGIATAN", key: "activity" },
    ];

    var csv_data = [];
    this.state.events.forEach(function (items, i) {
      if (items.id !== '') {
        csv_data.push({
          no: i + 1,
          id: items.title,
          name: items.desc,
          manufacturer: items.manufacturer,
          model: items.model,
          calibration_method: items.calibration_method,
          schedule: new Date(items.start).toLocaleDateString("en-GB"),
          activity: items.hexColor !== undefined ? "Recalibration" : "Regular check",
        });
      }
    });
    this.setState({
      csv_headers: csv_headers,
      csv_data: csv_data
    })
  }

  eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor
    if (isSelected) backgroundColor = '#' + event.selectedColor;
    else backgroundColor = '#' + event.hexColor;

    var style = {
      backgroundColor: backgroundColor,
    }

    return {
      style: style
    }
  }

  render() {
    const localizer = momentLocalizer(moment)
    const csvButton = {
      position: "absolute",
      right: "15px",
      top: "5px",
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Jadwal Regular Check</strong>
                <div className="float-right">
                  <i className="fa fa-square mr-1" style={{ color: "#cf0f17" }}></i><strong className="mr-3">Calibration Due</strong>
                  <i className="fa fa-square mr-1" style={{ color: "#3174ad" }}></i><strong className="mr-5">Regular check</strong>
                  <CSVLink data={this.state.csv_data} headers={this.state.csv_headers} className="float-right mx-2" style={csvButton}>
                    <Button color="secondary">
                      <i className="fa fa-file-excel-o"></i>
                    </Button>
                  </CSVLink>
                </div>
              </CardHeader>
              <CardBody>
                <Calendar
                  localizer={localizer}
                  events={this.state.events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  eventPropGetter={this.eventStyleGetter}
                  views={["month", "week", "day"]}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Schedules;