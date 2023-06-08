import toast from "react-hot-toast";
import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes";

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
    toast.error(`${error.response.data.message}`);
    if (`${error.response.data.message}` === "User Already Exists") {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
    toast.error(`${error.response.data.message}`);
  }
};
