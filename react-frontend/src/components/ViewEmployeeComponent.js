import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import employeeService from "../services/EmployeeService";
import { ArrowLeft } from "react-bootstrap-icons";

const ViewEmployeeComponent = () => {
  const initialTutorialState = {
    firstName: "",
    lastName: "",
    emailId: "",
  };
  const [employee, setEmployee] = useState(initialTutorialState);
  let navigate = useNavigate();
  const { id } = useParams();
  const getEmployeeInfo = (id) => {
    employeeService
      .getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
        console.log("Employee infos => " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployeeInfo(id);
  }, [id]);
  return (
    <div>
      <div className="card col-md-6 offset-md-3 mt-5">
        <h3 className="text-center mt-3">View Employee Details</h3>
        <div className="card-body text-center">
          <div className="row">
            <label className="text-primary">Employee First Name:</label>
            <p>{employee.firstName}</p>
            <label className="text-primary">Employee Last Name:</label>
            <p>{employee.lastName}</p>
            <label className="text-primary">Email Adress:</label>
            <p>{employee.emailId}</p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>
            <ArrowLeft /> Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
