import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retrieveEmployees, deleteEmployee } from "../actions/employees";

const ListEmployeeComponent = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveEmployees());
  }, [dispatch]);

  const editEmployee = (id) => {
    let path = `/update-employee/${id}`;
    navigate(path);
  };

  const removeEmployee = (id) => {
    dispatch(deleteEmployee(id))
      .then(() => {
        navigate("/employees");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddEmployee = () => {
    let path = `/add-employee`;
    navigate(path);
  };

  const viewEmployee = (id) => {
    let path = `/view-employee/${id}`;
    navigate(path);
  };

  return (
    <div>
      <h2 className="text-center mt-5">Employees List</h2>
      <div className="col mb-3">
        <button className="btn btn-primary" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>
      {employees.length > 0 ? (
      <div className="row">
        <table className="table table-hover table-bordered mb-5">
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          
            <tbody className="table-group-divider">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName}</td>
                  <td> {employee.emailId}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      onClick={() => viewEmployee(employee.id)}
                      className="btn btn-success"
                    >
                      View
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => removeEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      ):(<p>No employees to be displayed!</p>)}
    </div>
  );
};

export default ListEmployeeComponent;
