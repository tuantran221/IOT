import React, { useState } from "react";
import axios from "axios";
import Helmet from "../components/Helmet";
import { Link } from "react-router-dom";
import config from "../config"
const Lognin = (props) => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "Password or Email incorrect",
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    try {
      let token = await axios({
        method: "post",
        url: config.REACT_APP_SERVER_URL+"/users/authendication/login",
        data: { username: uname.value, password: pass.value },
      });

      localStorage.setItem("accessToken", token.data.accessToken);
      console.log("result", token.data.success);
      if ((token.data.accessToken = true)) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.log("token---", err.message);

      if (err.message != null) {
        setErrorMessages({ name: "pass", message: errors.uname });
      }
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
  if (isSubmitted === true) {
    props.history.push("/Private");
  }

  return (
    <Helmet title="Private Login">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>

      <div className="linkto">
        <Link to="/SignUp">you don't have an account? </Link>
      </div>
    </Helmet>
  );
};
export default Lognin;
