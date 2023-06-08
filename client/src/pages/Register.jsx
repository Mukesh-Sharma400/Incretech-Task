import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../actions/auth";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    dispatch(signup(data, navigate));
  };

  return (
    <div
      className="bg-light rounded-3 border shadow-lg mx-auto p-5"
      style={{ maxWidth: "700px" }}
    >
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className="text-center mb-3">Register</h2>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              {...register("firstname", {
                required: { value: true, message: "First Name is Required" },
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9_]{5,10}$/,
                  message: "Invalid First Name Format",
                },
              })}
            />
            <small className="text-danger">{errors.firstname?.message}</small>
          </div>
          <div className="col mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              {...register("lastname", {
                required: { value: true, message: "First Last is Required" },
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9_]{5,10}$/,
                  message: "Invalid Last Name Format",
                },
              })}
            />
            <small className="text-danger">{errors.lastname?.message}</small>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              {...register("email", {
                required: { value: true, message: "Email is Required" },
                pattern: {
                  // eslint-disable-next-line
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid Email Name Format",
                },
              })}
            />
            <small className="text-danger">{errors.email?.message}</small>
          </div>
          <div className="col mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Contact Number"
              {...register("contact", {
                required: {
                  value: true,
                  message: "Contact Number is Required",
                },
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid Contact Format",
                },
              })}
            />
            <small className="text-danger">{errors.contact?.message}</small>
          </div>
        </div>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            {...register("password", {
              required: { value: true, message: "Password is Required" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                message: "Invalid Password Format",
              },
            })}
          />
          <span className="input-group-text" onClick={handleShowPassword}>
            {showPassword ? (
              <i className="bi bi-eye-slash-fill"></i>
            ) : (
              <i className="bi bi-eye-fill"></i>
            )}
          </span>
        </div>
        <p className="mb-3">
          <small className="text-danger">{errors.password?.message}</small>
        </p>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
