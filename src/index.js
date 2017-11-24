import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

class Table extends React.Component {
  constructor(){
    super();
    this.state = { 
      name: 'loading',
      data: [
        {firstName:'load',interviewRef:'ding'},
        {firstName:'load',interviewRef:'ding'},
        {firstName:'load',interviewRef:'ding'},
      ]
    }
    fetch('https://ywc15.ywc.in.th/api/interview')
    .then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json[0]['firstName']);
      this.setState({name:json[0]['firstName']});
      this.setState({data:json});
    }).catch((ex) =>  {
      console.log('parsing failed', ex)
    })
  }

  render(){
    var data = [];
    for(var i=0;i<5;i++){
      this.state.data[i];
    }

    return(
      <div>
        <h1> This is a table we will be using</h1>
        <h3> example of getting data :{this.state.data[0]['interviewRef']} </h3>
        <table className="table">
          <thead>
            <tr>
              <th> Firstname </th>
              <th> Lastname </th>
              <th> Major </th>
              <th> interviewRef </th>
            </tr>
          </thead>
          <tbody>
            <Row />
            <tr>
              <td> {this.state.data[2]['firstName']} </td>
              <td> {this.state.data[2]['lastName']} </td>
              <td> {this.state.data[2]['major']} </td>
              <td> {this.state.data[2]['interviewRef']} </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

class Row extends React.Component {
  render(){
    return(
      <div>hello</div>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('table')
);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
