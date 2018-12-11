import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    employees: []
  }

  componentWillMount = () => {
    fetch('http://localhost:8080/api/employees')
      .then(response => response.json())
      .then(employees => this.setState({ employees }))
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
                        <span>
                          <button className="btn-edit">Edit</button>
                          <button className="btn-del">Delete</button>
                        </span>
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
        <h1>Plexxis Employees</h1>
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
