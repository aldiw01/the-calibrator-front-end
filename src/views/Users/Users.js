import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import AuthService from '../../server/AuthService';

function UserRow(props) {
  const user = props.user

  const getRole = (id) => {
    return id === '3' ? 'Super Admin' :
      id === '2' ? 'Staff' :
        id === '1' ? 'Pending' :
          id === '0' ? 'Unverified' :
            'Inactive'
  }

  const getBadge = (id) => {
    return id === '3' ? 'primary' :
      id === '2' ? 'success' :
        id === '1' ? 'warning' :
          id === '0' ? 'danger' :
            'dark'
  }

  const getStatus = (id) => {
    return id === '3' ? 'Super' :
      id === '2' ? 'Active' :
        id === '1' ? 'Pending' :
          id === '0' ? 'Unverified' :
            'Inactive'
  }
  console.log(new Date(user.created).toLocaleDateString())
  if (user !== undefined)
    return (
      <tr key={user.id.toString()}>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{getRole(user.status)}</td>
        <td>{new Date(user.created).toLocaleDateString('en-GB')}</td>
        <td><Badge color={getBadge(user.status)}>{getStatus(user.status)}</Badge></td>
      </tr>
    )
}

class Users extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/admin/login';
    }
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get(localStorage.getItem('serverAPI') + '/admin')
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const userList = this.state.data;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Admin List
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col">role</th>
                      <th scope="col">registered</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <UserRow key={index} user={user} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
