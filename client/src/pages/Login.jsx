import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { signin } from "../actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    dispatch(signin(data, navigate));
  };

  return (
    <div
      className="bg-light rounded-3 border shadow-lg mx-auto p-5"
      style={{ maxWidth: "700px" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Toaster />
        <h2 className="text-center mb-3">Login</h2>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
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
          <label htmlFor="floatingEmail">Email Address</label>
          <small className="text-danger">{errors.email?.message}</small>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is Required" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
                message: "Invalid Password Format",
              },
            })}
          />
          <label htmlFor="floatingPassword">Password</label>
          <small className="text-danger">{errors.password?.message}</small>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
