import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from "react-router-dom";
import { Password } from "primereact/password";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import CustomToast from "../Ui-components/Toast"; 

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log("JWT Token (Login):", token);

    // store JWT token in localStorage
      localStorage.setItem('token', token);

      // Fetch user details from Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
        toast.current.show({
            servity:"success",
            summary: 'Success', 
            detail: 'Login successfull!.', 
        })

        console.log("User Data from Firestore:", userData);

        // Optionally, you can save userData to context or state here

        // Redirect to dashboard after successful login
        navigate("/dashboard"); 
      } else {
        console.log("No such user document in Firestore!");

        toast.current.show({
            servity:"Error",
            summary: "Error",
            detail: "Login Failed",
        })
        // Handle missing user document if needed
      }
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <>
        <CustomToast ref={toast} />

        <section className="d-flex min-vh-100 align-items-center justify-content-center">
        <div className="card align-middle border-md mx-auto w-25">
            <div className="card-body w-100 p-4 pb-5">
            <h5 className="card-title fs-2 text-center mb-3">Login</h5>
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gap-2 mb-3">
                <label htmlFor="email">Email</label>
                <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="email-help"
                />
                </div>
                <div className="d-flex flex-column gap-2 mb-4 pb-2">
                <label htmlFor="password">Password</label>
                <Password
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
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-decoration-none">
                Sign up
                </Link>
            </div>
            </div>
        </div>
        </section>
    </>
  );
}


export default SignIn;
