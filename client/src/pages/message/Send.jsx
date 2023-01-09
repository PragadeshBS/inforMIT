import { useState } from "react";
import axios from "axios";
import CheckboxTree from "react-checkbox-tree";
import InputWithLabel from "../../components/form/InputWithLabel";

const Send = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const departments = [
    "All departments",
    "AERO",
    "AUTO",
    "ECE",
    "EIE",
    "CT",
    "IT",
    "PT",
    "RPT",
  ];
  const years = ["All years", "1", "2", "3", "4"];
  const [checkedDepartments, setCheckedDepartments] = useState([]);
  const [checkedPeople, setCheckedPeople] = useState([]);
  const [checkedYear, setCheckedYear] = useState([]);

  const updateDept = (checked) => {
    if (checked.includes("All departments")) {
      setCheckedDepartments(departments);
    } else {
      setCheckedDepartments(checked);
    }
  };
  const updateYears = (checked) => {
    if (checked.includes("All years")) {
      setCheckedYear(years);
    } else {
      setCheckedYear(checked);
    }
  };

  const departmentOptions = departments.map((department) => {
    return { value: department, label: department };
  });
  const peopleOptions = [
    { value: "students", label: "Students" },
    { value: "staffs", label: "Staffs" },
  ];
  const yearOptions = years.map((year) => {
    return { value: year, label: year };
  });

  const submit = (e) => {
    e.preventDefault();
    console.log(title + " " + message);
    console.log(checkedPeople);
    const finalDepartments = checkedDepartments.filter(
      (dept) => dept !== "All departments"
    );
    console.log(finalDepartments);
    const finalYears = checkedYear.filter((year) => year !== "All years");
    console.log(finalYears);

    axios
      .post("/api/message/send", {
        sender: JSON.parse(localStorage.getItem("user")).email,
        departments: finalDepartments,
        years: finalYears,
        forStaffs: checkedPeople.includes("staffs"),
        forStudents: checkedPeople.includes("students"),
        title: title,
        content: message,
      })
      .then((res) => {
        setSuccess("Announcement made successfully");
      });
  };
  return (
    <div className="container">
      <div className="w-75 border rounded p-3 my-5 mx-auto">
        <div>
          <h1 className="display-6">Make a new announcement</h1>
          <form>
            <InputWithLabel
              inputType="text"
              val={title}
              toUpdate={setTitle}
              label="Title"
            />
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                placeholder="Leave a message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="row">
              <div className="col-6">
                <div>
                  <h5>Choose applicable departments</h5>
                  <CheckboxTree
                    nodes={departmentOptions}
                    checked={checkedDepartments}
                    onCheck={updateDept}
                  />
                </div>
              </div>
              <div className="col-6">
                <div>
                  <h5>Choose applicable People</h5>
                  <CheckboxTree
                    nodes={peopleOptions}
                    checked={checkedPeople}
                    onCheck={(checked) => {
                      setCheckedPeople(checked);
                    }}
                  />
                </div>
                {checkedPeople.includes("students") && (
                  <div>
                    <h5>Choose applicable Student Years</h5>
                    <CheckboxTree
                      nodes={yearOptions}
                      checked={checkedYear}
                      onCheck={updateYears}
                    />
                  </div>
                )}
              </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="text-center">
              <button className="btn btn-primary" onClick={(e) => submit(e)}>
                Make announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Send;
