import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    const { email, userType } = JSON.parse(user);
    setUserType(userType);
    axios
      .get("/api/user/get-profile", {
        params: {
          email,
          userType,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="container">
        <div className="display-6">Just a sec...</div>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="display-3">Your Profile</h1>
      <div className="my-3 py-3">
        <div className="row mb-3 fs-5">
          <div className="col-6 fw-bold">Name</div>
          <div className="col-6">{user.name}</div>
        </div>
        {userType === "staff" ? (
          <div className="row mb-3 fs-5">
            <div className="col-6 fw-bold">Staff ID</div>
            <div className="col-6">{user.staffId}</div>
          </div>
        ) : (
          <div className="row mb-3 fs-5">
            <div className="col-6 fw-bold">Register No.</div>
            <div className="col-6">{user.registerNo}</div>
          </div>
        )}
        <div className="row mb-3 fs-5">
          <div className="col-6 fw-bold">Department</div>
          <div className="col-6">{user.department}</div>
        </div>
        {userType === "student" && (
          <div className="row mb-3 fs-5">
            <div className="col-6 fw-bold">Year</div>
            <div className="col-6">{user.year}</div>
          </div>
        )}
        <div className="row mb-3 fs-5">
          <div className="col-6 fw-bold">Email</div>
          <div className="col-6">{user.email}</div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
