import axios from "axios";

// post request for user login
const loginPost = async (user) => {
  console.log("user", user);
  return await axios
    .post("http://localhost:5000/api/login", user)
    .then((res) => res) // return response
    .catch((err) => err.response);
};

export { loginPost };
