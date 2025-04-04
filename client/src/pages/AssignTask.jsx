import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import WEB_URL from "../config";
import { Modal, Button, Form, Table } from "react-bootstrap";

const AssignTask = () => {
  const [mydata, setMyData] = useState([]);
  const [input, setInput] = useState({ title: "", description: "", duration: "" });
  const [empId, setEmpId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (empid) => {
    setEmpId(empid);
    setShow(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const api = `${WEB_URL}/admin/assigntask`;
      await axios.post(api, { empid: empId, ...input });
      message.success("Task assigned successfully");
      setInput({ title: "", description: "", duration: "" });
      setShow(false);
    } catch (error) {
      console.error(error);
      message.error("Failed to assign task");
    }
  };

  const loadData = async () => {
    try {
      const api = `${WEB_URL}/admin/assigntaskdisplay`;
      const response = await axios.get(api);
      setMyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4">
      <h3 className="mb-4">Assign Task to Employees</h3>
      <div className="table-responsive">
        <Table striped bordered hover className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Assign Task</th>
            </tr>
          </thead>
          <tbody>
            {mydata.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>
                  <Button variant="success" onClick={() => handleShow(emp._id)}>
                    Assign
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Assign Task Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTaskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={input.title}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="description"
                value={input.description}
                onChange={handleInput}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTimeDuration">
              <Form.Label>Time Duration (hours)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter duration"
                name="duration"
                value={input.duration}
                onChange={handleInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignTask;
