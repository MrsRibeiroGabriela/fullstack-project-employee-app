import http from "../http-common";

const getEmployees = () => http.get("/employees");

const createEmployee = (employee) => http.post("/employees", employee);

const getEmployeeById = (employeeId) => http.get(`/employees/${employeeId}`);

const updateEmployee = (employeeId, employee) => http.put(`/employees/${employeeId}`, employee);

const deleteEmployee = (employeeId) => http.delete(`/employees/${employeeId}`);

const EmployeeService = {
  getEmployees,
  createEmployee, 
  getEmployeeById,
  updateEmployee, 
  deleteEmployee
}

export default EmployeeService;
