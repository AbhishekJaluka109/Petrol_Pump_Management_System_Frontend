import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Delete from "./deleteData";

const Records = (props) => {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [fieldValues, setFieldValues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert(localStorage.getItem("token"));
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
          fetch(`https://petrol-pump-management-system-backend-vmp6.onrender.com/${props.module}/fields`, { method: "GET", headers }),
          fetch(`https://petrol-pump-management-system-backend-vmp6.onrender.com/${props.module}`, { method: "GET", headers }),
        ]);

        const fieldsData = await fieldsRes.json();
        const valuesData = await valuesRes.json();

        if (!fieldsData.success || !valuesData.success) {
          alert("Access Denied");
          return;
        }

        setFields(fieldsData.data);
        setValues(valuesData.data);
        setFilteredValues(valuesData.data);
      } catch (error) {
        alert(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.module]);

  const handlePrint = () => {
    window.print();
  };

  const getUniqueValues = (field) => {
    return [...new Set(values.map((item) => item[field]))];
  };

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);

    const filteredData = values.filter((item) =>
      Object.keys(updatedFilters).every(
        (key) => updatedFilters[key] === "" || item[key] == updatedFilters[key]
      )
    );

    setFilteredValues(filteredData);
  };

  const handleSortChange = (e) => {
    const field = e.target.value;
    setSortField(field);

    const sortedData = [...filteredValues].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });

    setFilteredValues(sortedData);
  };

  useEffect(() => {
    if (selectedField) {
      const uniqueVals = getUniqueValues(selectedField);
      setFieldValues(uniqueVals);
    } else {
      setFieldValues([]);
    }
  }, [selectedField]);

  return (
    <div className="container table-container" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
        <Link to="Form" className="btn btn-success" style={{ marginLeft: "20px" }}>
          New
        </Link>
        <button className="btn btn-success" onClick={handlePrint} style={{ marginRight: "20px" }}>
          Print
        </button>
      </div>

      <h2 className="text-center" style={{ paddingBottom: "20px" }}>{props.module} Records</h2>

      
      <div className="d-flex gap-3 mb-3 align-items-center justify-content-end">
        <Form.Select
          onChange={(e) => {
            setSelectedField(e.target.value);
            setSelectedValue("");
          }}
          value={selectedField}
          style={{ width: "200px" }}
        >
          <option value="">Select Field</option>
          {fields.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </Form.Select>

        <Form.Select
          onChange={(e) => {
            const value = e.target.value;
            setSelectedValue(value);
            handleFilterChange(selectedField, value);
          }}
          value={selectedValue}
          style={{ width: "200px" }}
          disabled={!selectedField}
        >
          <option value="">Select Value</option>
          {fieldValues.map((value, index) => (
            <option key={index} value={value}>{value}</option>
          ))}
        </Form.Select>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setFilters({});
            setSelectedField("");
            setSelectedValue("");
            setFilteredValues(values);
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <Form.Select
          onChange={handleSortChange}
          value={sortField}
          style={{ width: "200px" }}
        >
          <option value="" disabled>Sort by...</option>
          {fields.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </Form.Select>
      </div>

      
      <div className="table-responsive">
        <Table striped bordered hover responsive="lg" className="table-fixed">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              {fields.map((field) => (
                <th key={field}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredValues.map((value, index) => (
              <tr key={index}>
                <td>
                  <Link to={`Edit/${value._id}`}>
                    <EditIcon />
                  </Link>
                </td>
                <td>
                  <IconButton
                    onClick={async () => {
                      const success = await Delete(value._id, props.module);
                      if (success) {
                        setValues((prev) => prev.filter((item) => item._id !== value._id));
                        setFilteredValues((prev) => prev.filter((item) => item._id !== value._id));
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
                {fields.map((field) => (
                  <td key={field}>{JSON.stringify(value[field])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Records;
