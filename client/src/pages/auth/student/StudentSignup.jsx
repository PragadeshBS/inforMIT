import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../../../components/form/InputWithLabel";
import Select from "react-select";
import axios from "axios";

const StudentSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const updateDept = (selectionDept) => {
    setDepartment(selectionDept);
  };

  const updateYear = (selectionYear) => {
    setYear(selectionYear);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError("");
    if (
      name === "" ||
      registerNo === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      department === "" ||
      year == ""
    ) {
      setError("Fill all the required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    axios
      .post("/api/auth/student-signup", {
        name,
        registerNo,
        email,
        department: department["value"],
        password,
        year: year["value"],
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const departmentOptions = [
    { value: "AERO", label: "AERO" },
    { value: "AUTO", label: "AUTO" },
    { value: "ECE", label: "ECE" },
    { value: "EIE", label: "EIE" },
    { value: "CT", label: "CT" },
    { value: "IT", label: "IT" },
    { value: "PT", label: "PT" },
    { value: "RPT", label: "RPT" },
  ];
  const yearOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];
  return (
    <div className="container">
      <div className="mx-auto border rounded p-3 my-3 w-50">
        <div className="display-6 my-3">Student Sign Up</div>
        <form>
          <InputWithLabel
            label="Name"
            inputType="text"
            val={name}
            toUpdate={setName}
            required={true}
          />
          <InputWithLabel
            label="Register no."
            val={registerNo}
            toUpdate={setRegisterNo}
            inputType="text"
            required={true}
          />
          <div className="mb-3">
            <label className="form-label">Department</label>
            <Select
              value={department}
              onChange={updateDept}
              options={departmentOptions}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Year</label>
            <Select value={year} onChange={updateYear} options={yearOptions} />
          </div>
          <InputWithLabel
            label="Email"
            val={email}
            toUpdate={setEmail}
            inputType="email"
            required={true}
          />
          <InputWithLabel
            label="Password"
            val={password}
            toUpdate={setPassword}
            inputType="password"
            required={true}
          />
          <InputWithLabel
            label="Confirm Password"
            val={confirmPassword}
            toUpdate={setConfirmPassword}
            inputType="password"
            required={true}
          />
          {error !== "" && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          <div className="text-center">
            <button onClick={(e) => submitForm(e)} className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div>
            <div className="small">
              Already have an account?{" "}
              <Link to="/auth/login/student">Login</Link>
            </div>
            <div className="small">
              Staff? <Link to="/auth/signup/staff">Student sign up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StudentSignup;
