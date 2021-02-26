import axios from "axios";

const axiosInstance = axios.create({baseURL: "http://3.140.95.106:5000"})

export const login = (user) => {
    console.log("login function called");
    return axiosInstance
      .post("login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        console.log("login from backend");
        console.log(res.data);
        if (res.data.error) {
          return res.data;
        } else {
            localStorage.setItem("usertoken", res.data.token);
            return res.data.token;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };