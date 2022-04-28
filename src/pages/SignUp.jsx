import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Helmet from "../components/Helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config"
const SignUp = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
    }),
  });

  const register = async () => {
    if (
      formik.values.confirm_password === formik.values.password &&
      formik.errors.username == null
    ) {
      let token = await axios({
        method: "post",
        url: config.REACT_APP_SERVER_URL +"/users/authendication/register",
        data: {
          username: formik.values.username,
          password: formik.values.confirm_password,
        },
      });

      localStorage.setItem("accessToken", token.data.accessToken);

      if ((token.data.accessToken = true && formik.errors.username == null)) {
        props.history.push("/Login");
      }
    }
  };

  return (
    <Helmet title="Private Signup">
      <div className="App">
        <h1>Memberships</h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && (
              <p>{formik.errors.username}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p>{formik.errors.password}</p>
            )}
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            {formik.errors.confirm_password &&
              formik.touched.confirm_password && (
                <p>{formik.errors.confirm_password}</p>
              )}
          </div>
          <div>
            <button onClick={() => register()} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/Login">
          <i class="bx bx-arrow-back" style={{ fontSize: "40px" }}></i>
        </Link>
      </div>
    </Helmet>
  );
};
export default SignUp;