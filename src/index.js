import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import Autosuggest from 'react-autosuggest';
import myjson from './ywc15.json';
// import './buttons.css';
// for boucing in animation
var time = 0;
var data = [];
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return data.filter(i => regex.test(i.firstName));
}


class Table extends React.Component {
  constructor(){
    super();
    this.state = { 
      data: myjson,
      // data:[],
      suggestion: [],
      active : 'CT',
      sortOrder : 0,
      sortBy:"interviewRef"
    };
    this.editTable = this.editTable.bind(this);

    // Get API
    // fetch('https://ywc15.ywc.in.th/api/interview')
    // .then((response) => {
    //   return response.json()
    // }).then((json) => {
    //   this.setState({data:json});
    //   // update outside would be too fast
    //   data = this.state.data;
    // }).catch((ex) =>  {
    //   console.log('parsing failed', ex)
    // })

    // // update data for autoSuggestion
    data = this.state.data;
  }

  createRow(){
    time = 0;
    var data = [];
    if(this.state.active !== '')data = this.state.data;
    else data = this.state.suggestion;
    data.sort((a,b)=>{
      return (a[this.state.sortBy] < b[this.state.sortBy]? -1:1)}
    );
    if(this.state.sortOrder === 1) data.reverse();
    if(this.state.active !== ''){
      return data
      .filter((i) => i.interviewRef.slice(0,2) === this.state.active)
      .map((i) => {
        return <Row value={i} key={i.interviewRef} wait={1000}/>
      });
    }else{
      return data.map((i) => {
        return <Row value={i} key={i.interviewRef} wait={1000}/>
      });
    }
    
  }
  
  editTable(code,suggestion){
    this.setState({active:code});
    this.setState({suggestion:suggestion});

  }

  iconRender(sortBy){
    if(this.state.sortBy === sortBy)
      if(this.state.sortOrder) return "fa-sort-asc";
      else return "fa-sort-desc";
    else return "fa-sort";
  }

  iconClick(sortBy){
    if(this.state.sortBy === sortBy){
      if(this.state.sortOrder === 1) this.setState({sortOrder:0})
      else this.setState({sortOrder:1})
    }
    else{
      this.setState({sortBy:sortBy,sortOrder:0})
    }
  }

  render(){
    return(
      <div>
        <App editTable={this.editTable}/>
        <ButtonBlock editTable={this.editTable}/>
        <table className="table table-striped">
          <thead>
            <tr>
              <th> Firstname <Icon icon={this.iconRender('firstName')} onClick={()=>this.iconClick('firstName')}/> </th>
              <th> Lastname <Icon icon={this.iconRender('lastName')} onClick={()=>this.iconClick('lastName')}/> </th>
              <th> Major <Icon icon={this.iconRender('major')} onClick={()=>this.iconClick('major')}/> </th>
              <th> interviewRef <Icon icon={this.iconRender('interviewRef')} onClick={()=>this.iconClick('interviewRef')}/> </th>
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
  constructor(props){
    super(props)
    this.state = {
      status:"hidden",
      class:"bounceInUp animated "
    }

    setTimeout(()=>{
      this.setState({status:""})
    },time)
    time += 100;
  }
  render(){
    return(
      <tr className={this.state.class+this.state.status}>
        <td> {this.props.value.firstName} </td>
        <td> {this.props.value.lastName} </td>
        <td> {this.props.value.major} </td>
        <td> {this.props.value.interviewRef} </td>
      </tr>
    );
  }
}
class ButtonBlock extends React.Component{

  buttonClick(code){
    this.setState({active:code});
    this.props.onClick(code);
  }

  renderButton(name,code){
    return(
      <Button 
        value={name}
        onClick={() => this.props.editTable(code)}
      />
    )
  }

  render(){
    return(
      <div>
        {this.renderButton("content","CT")}
        {this.renderButton("design","DS")}
        {this.renderButton("marketing","MK")}
        {this.renderButton("programing","PG")}
      </div>
    )
  }
}
class Button extends React.Component{
  render(){
    return(
        <button className="button button--wayra button--border-thick button--text-upper button--size-s"
        onClick={()=> this.props.onClick()}>
          {this.props.value}
        </button>
    )
  }
}
class Icon extends React.Component{
  render(){
    const iconStyle = {float:'right',marginRight:20}
    const fa = "fa ";
    return(
      <i className={fa+this.props.icon} aria-hidden="true" style={iconStyle} onClick={()=>this.props.onClick()}></i>
    )
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      a:0
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion(suggestion) {
    return (
      <span>{suggestion.firstName +" "+ suggestion.lastName}</span>
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.firstName +" "+ suggestion.lastName;
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.editTable("",[suggestion]);
    this.setState({a:1});
  }

  onSubmit = (e) => {
    if(typeof e !== "undefined") e.preventDefault();
    if(this.state.a===0 && this.state.value!=="") this.props.editTable("",this.state.suggestions);
    else this.setState({a:0})
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search with name",
      value,
      onChange: this.onChange
    };

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-group">
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
          <span className="input-group-addon"><i className="fa fa-search fa-fw fa-2x"></i></span>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
);
