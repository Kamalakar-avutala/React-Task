import React, { useState, useRef } from "react";
import TextInputField from "../../molecules/TextInputField";
import PasswordInput from "../../molecules/PasswordInput";
import Button from "../../atom/Button";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase"; 
import { doc, setDoc } from "firebase/firestore";
import CustomToast from "../../atom/Toast"; 


const SignUp = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const toast = useRef(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validate username
    if (!userName || userName.length < 6) {
      newErrors.userName = 'Username must be at least 5 characters long';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    if (!password || password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.current.show({
        severity: "warn",
        summary: "Validation Error",
        detail: "Please check all fields",
      });
      return;
    }

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
      <section className="d-flex min-vh-100 align-items-center justify-content-center">
        <CustomToast ref={toast} />
        <div className="card align-middle border-md mx-auto w-25">
          <div className="card-body w-100 p-4 pb-5">
            <h5 className="card-title fs-2 text-center mb-3">SignUp</h5>
            <form onSubmit={handleSignUp} className="gap-4 d-flex flex-column">
              <TextInputField
                id="username"
                label="Username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  setErrors({ ...errors, userName: '' });
                }}
                error={errors.userName ? { message: errors.userName } : null}
                required
              />
              <TextInputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
                error={errors.email ? { message: errors.email } : null}
                required
              />

              <PasswordInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
                error={errors.password ? { message: errors.password } : null}
                feedback={false}
                required
              />
              <Button
                type="submit"
                className="mb-3"
              >
                Submit
              </Button>
            </form>

            <div className="text-center">
              <span>have an account? </span>
              <Link to="/Login" className="text-decoration-none">
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
