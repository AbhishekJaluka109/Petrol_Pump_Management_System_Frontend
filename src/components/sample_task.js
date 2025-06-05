  import React, { useState, useEffect } from "react";
  import { Calendar, momentLocalizer, Views } from "react-big-calendar";
  import moment from "moment";
  import "react-big-calendar/lib/css/react-big-calendar.css";
  import { Button, Modal } from "react-bootstrap";
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import BASE_URL from "./config";
  import Delete from "./deleteData";

  const TaskCalendar = () => {
    const [fields, setFields] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const localizer = momentLocalizer(moment);

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        alert("Unauthorized access!");
        navigate("/");
      }
    }, []);

    useEffect(() => {
      setFields([]);

      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            "Content-Type": "application/json",
            Authorization: token,
          };
          const [fieldsRes, valuesRes] = await Promise.all([
            fetch(`${BASE_URL}/Task/fields`, { method: "GET", headers }),
            fetch(`${BASE_URL}/Task`, { method: "GET", headers }),
          ]);

          const fieldsData = await fieldsRes.json();
          const valuesData = await valuesRes.json();

          if (!fieldsData.success || !valuesData.success) {
            alert("Access Denied");
            return;
          }
          console.log(valuesData.data);
          setFields(fieldsData.data);
          setTasks(
              valuesData.data.map(task => ({
                ...task,
                start: new Date(task.start),
                end: new Date(task.end),
              }))
            );
        } catch (error) {
          alert("Error fetching data");
          console.error("Fetch error:", error);
        }
      };

      fetchData();
      console.log(tasks);
    }, []);

    const handleSelectEvent = (event) => {
      console.log(event); 
      setSelectedTask(event);
      setShowModal(true);
    };

    const handlePrint = () => {
      window.print();
    };

    const handleDelete = async () => {
      if (selectedTask) {
        const success = await Delete(selectedTask._id, "Task");
        if (success) {
          setTasks((prev) => prev.filter((task) => task._id !== selectedTask._id));
          setShowModal(false);
        }
      }
    };

    return (
      <div className="container" style={{ padding: "20px" }}>
        <div className="d-flex justify-content-between mb-3">
          <Link to="Form" className="btn btn-success" style={{ marginLeft: "20px" }}>
            New
          </Link>
          <Button onClick={handlePrint} className="btn btn-success">
            Print
          </Button>
        </div>

        <h2 className="text-center mb-3">Tasks</h2>

        <Calendar
          localizer={localizer}
          events={tasks}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          onSelectEvent={handleSelectEvent}
          components={{
            event: ({ event }) => (
              <div>
                <strong>{event.employee_id}</strong>
              </div>
            ),
          }}
        />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTask && (
              <>
                <p><strong>Date:</strong> {moment(selectedTask.start).format("YYYY-MM-DD")}</p>
                <p><strong>Start time:</strong> {moment(selectedTask.start).format("HH:mm")}</p>
                <p><strong>End time:</strong> {moment(selectedTask.end).format("HH:mm")}</p>
                <p><strong>Employee ID:</strong> {selectedTask.employee_id}</p>
                <p><strong>Description:</strong> {selectedTask.description}</p>
                <p><strong>Pump_No:</strong> {selectedTask.pump_no}</p>
                <p><strong>Cash Provided At Start:</strong> {selectedTask.cashProvidedAtStart}</p>
                <p><strong>Cash Collected:</strong> {selectedTask.cashcollected}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedTask && (
              <Link
                to={`Edit/${selectedTask._id}`}
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                Edit
              </Link>
            )}
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  export default TaskCalendar;
