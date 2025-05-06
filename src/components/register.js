import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [p, setP] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cp, setCp] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [eCheck,setEcheck]=useState("");
  const navigate = useNavigate();


  useEffect(()=>{if(localStorage.getItem('token')){
    navigate('/');
  }
},[]);
  

  useEffect(() => {
      if (employeeId.length === 0) {
        setEcheck("");
        return;
      }
  
      const timeout = setTimeout(async () => {
        try {
          const response = await fetch("https://petrol-pump-management-system-backend-vmp6.onrender.com/register/userCheck", {
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
    if(password.length===0){
        setP("");
        return;
    }
    if (
      !( password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password))
    ) {
      setP("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    } else {
      setP("");
    }
  }, [password]);

  useEffect(() => {
    if(cpassword===""){
        return;
    }
    if (password === cpassword) {
      setCp("");
    } else {
      setCp("Passwords don't match");
    }
  }, [password, cpassword]);

  useEffect(() => {
    setIsDisabled(!(employeeId.length > 0 && password.length > 0  && cpassword.length>0 && eCheck.length===0 && p.length===0 && cp.length===0));
  }, [employeeId, password, cpassword,eCheck,p,cp]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://petrol-pump-management-system-backend-vmp6.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, password }), 
      });

      const result = await response.json();
      if (result.success) {
        alert("User Registered Successfully");
        navigate("/");
      } else {
        alert("Failed to submit data: " + result.message);
      }
    } catch (error) {
      alert("Error while submitting data: " + error);
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(238, 233, 233)", height: "100vh" }} className="d-flex justify-content-center align-items-center">
      <div className="access p-4 bg-white shadow rounded" style={{ width: "350px" }}>
        <div className="logo_container text-center mb-3">
          {/* <img src="/images/icon.png" alt="Logo" className="logo" style={{ width: "80px" }} /> */}
        </div>
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
          <div className="text-danger" style={{fontSize: "12px"}}>{eCheck}</div>
          <input
            type="password"
            id="password"
            className="form-control mb-2 input_box"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-danger" style={{fontSize: "12px"}}>{p}</div>
          <input
            type="password"
            id="cpassword"
            className="form-control mb-2 input_box"
            name="cpassword"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <div className="text-danger" style={{fontSize: "12px"}}>{cp}</div>
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
            Have an account?{" "}
            <a href="" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
