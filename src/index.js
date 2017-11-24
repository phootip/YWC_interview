import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Table extends React.Component {
  constructor(){
    super();
    this.state = { 
      name: 'loading',
      data: [
        // {firstName:'load',interviewRef:'ding'},
        // {firstName:'load',interviewRef:'ding'},
        // {firstName:'load',interviewRef:'ding'},
      ]
    }

    // Get API
    fetch('https://ywc15.ywc.in.th/api/interview')
    .then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({data:json});
    }).catch((ex) =>  {
      console.log('parsing failed', ex)
    })
  }

  count(){
    var c = this.state.data.length;
    console.log(c);
    if(c > 0){
      var d = Object.keys(this.state.data[0]);
      console.log(d);
      console.log(d.length);
    }
    return c;
  }

  createRow(){
    var data = this.state.data;
    // var result =  [];
    // for(var i=0;i<data.length;i++){

    // }
    var listRow = data.map((i) => 
      <tr>
        <td> {i.firstName} </td>
        <td> {i.lastName} </td>
        <td> {i.major} </td>
        <td> {i.interviewRef} </td>
      </tr>
  );
    return listRow;
  }
  
  render(){
    return(
      <div>
        <h1> This is a table we will be using</h1>
        {this.count()}
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
            {/* Creat Row Here <Row value={data[0]} />*/}
            {this.createRow()}
            
          </tbody>
        </table>
      </div>
    )
  }
}

class Row extends React.Component {
  render(){
    console.log(this.props.value);
    return(
      <tr>
        <td> {this.props.value["firstName"]} </td>
        <td> 2 </td>
        <td> 3 </td>
        <td> 4 </td>
      </tr>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('table')
);
