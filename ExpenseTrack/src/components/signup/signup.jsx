import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Password } from "primereact/password";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase"; 
import { doc, setDoc } from "firebase/firestore";
import CustomToast from "../Ui-components/Toast"; 


const SignUp = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const toast = useRef(null);

  const handleSignUp = async (event) => {
    event.preventDefault(); // <- important to prevent page reload

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Update profile with username (displayName)
      await updateProfile(userCredential.user, {
        displayName: userName,
      });

      // Optionally, save extra user info to Firestore
       await setDoc(doc(db, "users", userCredential.user.uid), {
        username: userName,
        email: email,
      });

      // Get JWT token
      const token = await userCredential.user.getIdToken();
      console.log("JWT Token (Signup):", token);

      
      toast.current.show({
        servity:"success",
        summary: 'Success', 
        detail: 'Signup successful! You can now sign in.', 
      })

      // clear form fields
      setEmail("");
      setPassword("");
      setUserName("");

    } catch (error) {
      console.error("Signup Error:", error.message);

      // Show error toast
      toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: "Signup Failed", 
      });
    }
  };

  return (
    <>
      {/* Toast container */}
      <CustomToast ref={toast} />

      <section className="d-flex min-vh-100 align-items-center justify-content-center">
        <div className="card align-middle border-md mx-auto w-25">
          <div className="card-body w-100 p-4 pb-5">
            <h5 className="card-title fs-2 text-center mb-3">SignUp</h5>
            <form onSubmit={handleSignUp}>
              <div className="d-flex flex-column gap-2 mb-3">
                <label htmlFor="username">Username</label>
                <InputText
                  id="username"
                  aria-describedby="username-help"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column gap-2 mb-3">
                <label htmlFor="email">Email</label>
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="d-flex flex-column gap-2 mb-4 pb-2">
                <label htmlFor="password">Password</label>
                <Password
                  id="password"
                  feedback={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary mx-auto w-100 p-2 mb-3"
              >
                Submit
              </button>
            </form>

            <div className="text-center">
              <span>have an account? </span>
              <Link to="/signin" className="text-decoration-none">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
