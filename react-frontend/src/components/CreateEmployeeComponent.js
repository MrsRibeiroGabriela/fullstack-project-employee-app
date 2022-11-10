import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createEmployee } from "../actions/employees";
//import http from "../http-common";
//import employeeService from "../services/EmployeeService"

const CreateEmployeeComponent = () => {
  const initialTutorialState = {
    firstName: "",
    lastName: "",
    emailId: "",
  };
  const [employee, setEmployee] = useState(initialTutorialState);
  //const [submitted, setSubmitted] = useState(false);
  //const [data, setData] = useState([]);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    const { firstName, lastName, emailId } = employee;

    dispatch(createEmployee(firstName, lastName, emailId))
      .then(data => {
        setEmployee({
          firstName: data.firstName,
          lastName: data.lastName,
          emailId: data.emailId,
        });
        //setSubmitted(true);
        console.log(data);
        navigate(`/employees`);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let employeeData = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     emailId: emailId,
  //   };
  //   http.post("/employees", employeeData).then((res) => {
  //     console.log(res);
  //     setData([res.employeeData, ...data]);
  //     setFirstName("");
  //     setLastName("");
  //     setEmailId("");
  //     navigate(`/employees`);
  //   });
  // };

  const cancelForm = () => {
    let path = `/employees`;
    navigate(path);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">
            <h3 className="text-center mt-3">Add Employee</h3>
            <div className="card-body">
              <form >
                <div className="form-group mb-3">
                  <label htmlFor="firstName">First Name: </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={employee.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="lastName">Last Name: </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={employee.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="emailId">Email Id: </label>
                  <input
                    type="email"
                    id="emailId"
                    placeholder="Email Adress"
                    name="emailId"
                    className="form-control"
                    value={employee.emailId}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-success"
                  onClick={saveEmployee}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancelForm}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
