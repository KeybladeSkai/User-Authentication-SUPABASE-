import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation;
  const from = location.state?.from.pathname || "/";
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("error loading out:", error.message);
    }
  };
  return (
    <div className="h-[100vh] grid place-content-center">
      <div>
        {userDetails ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={userDetails.photo}
                width={"40%"}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              {/* <p>Last Name: {userDetails.lastName}</p> */}
            </div>
            <button className="btn btn-primary bg-green-400 p-2 rounded-sm text-white mt-2"  onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
