import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import View from "./message/View";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/auth/login/student");
    }
    setUser(user);
  }, []);
  if (user) return <View />;
};
export default Home;
