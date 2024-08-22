import { useState } from "react";
import { Link,useNavigate,useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/profile ";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //   storing with createUserWithEmailAndPassword doesn't let you store fullname and Lastname
      // use cloud firestore instead
      // use firestore and createUserWithEmailAndPassword together
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }

      console.log("User registered successfully");
      toast.success("user logged in Successfully", {
        position: "top-center",
        onClose: () => navigate(from, { replace: true }),
        autoClose: 1200,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="grid place-content-center h-[100svh]">
      <form
        className="w-[400px]  bg-white shadow-2xl p-2"
        onSubmit={handleRegister}
      >
        <h3 className="text-center mb-4 text-2xl font-extrabold">Sign Up</h3>

        <div className="flex flex-col m-2 gap-2">
          <label className="font-bold">First name</label>
          <input
            type="text"
            className="border-[1px] border-gray text-md px-2 h-[40px]"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col m-2 gap-2">
          <label>Last name</label>
          <input
            type="text"
            className="border-[1px] border-gray text-md px-2 h-[40px]"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="flex flex-col m-2 gap-2">
          <label className="font-bold">Email address</label>
          <input
            type="email"
            className="border-[1px] border-gray text-md px-2 h-[40px]"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col m-2 gap-2">
          <label className="font-bold">Password</label>
          <input
            type="password"
            className="border-[1px] border-gray text-md px-2 h-[40px]"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col m-2">
          <button
            type="submit"
            className="bg-blue-600 p-2 text-white rounded-md text-col"
          >
            Sign Up
          </button>
        </div>
        <Link className="text-right" to="/">
          <p className=" text-[12px] mt-2 text-blue-900">Already registered</p>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
