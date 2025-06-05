import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "./config";

const LoginPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [p, setP] = useState("");
  const [eCheck, setEcheck] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, []); 
  useEffect(() => {
    if (employeeId.length === 0) {
      setEcheck("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_URL}/register/userCheck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({ employeeId }),
        });

        const result = await response.json();
        setEcheck(result.exists ? "" : "Invalid EmployeeId");
      } catch (error) {
        setEcheck("Error checking Employee ID");
      }
    }, 500);

    return () => clearTimeout(timeout); 
  }, [employeeId]);

  useEffect(() => {
    if (password.length === 0) {
      setP("");
      return;
    }
    if (
      !(
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
      )
    ) {
      setP("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    } else {
      setP("");
    }
  }, [password]);

  useEffect(() => {
    setIsDisabled(!(employeeId.length > 0 && password.length > 0 && !eCheck && !p));
  }, [employeeId, password, eCheck, p]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, password }),
      });

      const result = await response.json();
      console.log(result.success);
      if (result.success) {
        console.log("Data submitted successfully", result.token);
        localStorage.setItem("token",result.token);
        navigate("/dashboard");
      } else if (result.message) {
        setP(result.message);
      } else {
        throw result.error;
      }
    } catch (error) {
      alert("Error while submitting data: " + error);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(238, 233, 233)", height: "100vh" }} className="d-flex justify-content-center align-items-center">
      <div className="access p-4 bg-white shadow rounded" style={{ width: "350px" }}>
        <form>
          <input
            type="number"
            id="employeeId"
            className="form-control mb-2 input_box"
            name="employeeId"
            placeholder="Employee Id"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <div className="text-danger" style={{ fontSize: "12px" }}>{eCheck}</div>

          <input
            type="password"
            id="password"
            className="form-control mb-2 input_box"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-danger" style={{ fontSize: "12px" }}>{p}</div>

          <div className="submit-container text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary submit"
              disabled={isDisabled}
              onClick={handleClick}
            >
              Submit
            </button>
          </div>

          
          <div className="acc text-center mt-3">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); 
                navigate("/register");
              }}
              style={{ cursor: "pointer" }}
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
