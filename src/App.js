import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {employees: [],
                  id:'',
                  name:''
                };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount = () => {
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(employees => this.setState({ employees }))
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);


   var employee = {
     id: data.get("id"),
     name: data.get("name"),
     code: data.get("code"),
     profession: data.get("profession"),
     color: data.get("color"),
     city: data.get("city"),
     branch: data.get("branch"),
     assigned: data.get("assigned")

   }
   this.state.employees.push(employee);
   this.setState(this.state.employees);
   document.getElementById("empForm").reset();

 }

  render() {
    const {employees} = this.state;

    console.log(this.state);


    function employees_header(){
      return(
        employees.map(employee => (

          <tr key={employee.id}>
            {
              Object.keys(employee).map(key =>{
                if(employee.id === 1){
                  return(
                  <th key={key}>
                    { key }
                  </th>
                  )
                }else {
                  return(null);
                }
              }
              )
            }
          </tr>
        ))
      )
    }

    function employees_func(){
      return(

        employees.map(employee => (

          <tr key={employee.id}>
            {
              Object.keys(employee).map(key =>

                  { if(key !== "assigned"){
                    return(
                      <td key={key}>
                        { String(employee[key]) }
                      </td>
                    )
                  }else{
                    return(
                      <td key={key}>
                        { String(employee[key]) }
                          <button className="btn-del">Delete</button>
                      </td>

                    )
                  }
                }
              )
            }
          </tr>
        ))
      )
    }

    return (
      <div className="App">
        <h1>Plexxis Employees</h1><br/>
          <form onSubmit={this.handleSubmit} id="empForm">
            <label htmlFor="id">id :<input type="text" name="id" size="2"  /></label>
            <label htmlFor="name">name :<input type="text" name="name" size="15" /></label>
            <label htmlFor="code">code :<input type="text" name="code" size="5" /></label>
            <label htmlFor="profession">profession :<input type="text" name="profession" size="15" /></label>
            <label htmlFor="color">color :<input type="text" name="color" size="5" /></label>
            <label htmlFor="city">city :<input type="text" name="city" size="10" /></label>
            <label htmlFor="branch">branch :<input type="text" name="branch" size="10" /></label>
            <label htmlFor="assigned">assigned :<input type="text" name="assigned" size="4" /></label>
            <input className="btn-create" type="submit"  value="Submit"/>
          </form><br/>
        <table>
          <tbody>
        {employees_header()}
        {employees_func()}
          </tbody>
      </table>
      </div>
    );
  }
}

export default App;
