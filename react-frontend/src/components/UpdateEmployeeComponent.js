import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import http from "../http-common";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../actions/employees";
import employeeService from "../services/EmployeeService";

const UpdateEmployeeComponent = () => {
  const initialTutorialState = {
    firstName: "",
    lastName: "",
    emailId: "",
  };
  const [currentEmployee, setCurrentEmployee] = useState(initialTutorialState);
  //const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();

  const getEmployee = id => {
    employeeService.getEmployeeById(id)
      .then(response => {
        setCurrentEmployee(response.data);
        console.log('Current info => ' + JSON.stringify(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployee(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };
  
  // const updateStatus = () => {
  //   const data = {
  //     id: currentEmployee.id,
  //     firstName: currentEmployee.firstName,
  //     lastName: currentEmployee.lastName,
  //     emailId: currentEmployee.emailId,
  //   };

  //   dispatch(updateStatus(currentEmployee.id, data))
  //     .then(response => {
  //       console.log(response);
  //       setCurrentEmployee({ ...currentEmployee})
  //       // setCurrentEmployee({ ...currentEmployee, published: status });
  //       // setMessage("The status was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const updateContent = (e) => {
    e.preventDefault();
    dispatch(updateEmployee(currentEmployee.id, currentEmployee))
      .then(response => {
        console.log('Updated info => ' + JSON.stringify(response));
        navigate(`/employees`);
        //setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const cancelForm = () => {
    let path = `/employees`;
    navigate(path);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 mt-5">
            <h3 className="text-center mt-3">Update Employee</h3>
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
                    value={currentEmployee.firstName}
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
                    value={currentEmployee.lastName}
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
                    value={currentEmployee.emailId}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={updateContent}
                >
                  Update
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

export default UpdateEmployeeComponent