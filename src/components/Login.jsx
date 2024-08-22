// import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../firebase";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(email);
  console.log(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      toast.success("user logged in Successfully", {
        position: "top-center",
        onClose: () => navigate(from, { replace: true }),
        autoClose: 1200,
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className="grid place-content-center h-[100svh]">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white shadow-2xl p-2"
      >
        <h3 className="text-center mb-4 text-2xl font-extrabold">Login</h3>

        <div className="flex flex-col m-2 gap-2">
          <label className="font-bold">Email address</label>
          <input
            type="text"
            className="border-[1px] border-gray text-md px-2 h-[40px]"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col m-2 gap-2">
          <label className="font-bold">Password</label>
          <input
            type="password"
            className="border-[1px] border-gray text-md px-2 h-[40px]"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col m-2">
          <button className="bg-blue-600 p-2 text-white rounded-md text-col">
            Submit
          </button>
          <Link className="self-end" to="/signUp">
            <p className=" text-[12px] mt-2 text-blue-900">New user?</p>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
