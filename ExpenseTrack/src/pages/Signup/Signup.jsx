import React, { useRef } from "react";
import { useForm } from "react-hook-form";
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
  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, {
        displayName: data.userName,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: data.userName,
        email: data.email,
      });

      const token = await userCredential.user.getIdToken();
      console.log("JWT Token (Signup):", token);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Signup successful! You can now sign in.",
      });

      reset(); // Clear form after successful signup
    } catch (error) {
      console.error("Signup Error:", error.message);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Signup Failed",
      });
    }
  };

  return (
    <section className="d-flex min-vh-100 align-items-center justify-content-center">
      <CustomToast ref={toast} />
      <div className="card align-middle border-md mx-auto w-25">
        <div className="card-body w-100 p-4 pb-5">
          <h5 className="card-title fs-2 text-center mb-3">SignUp</h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-4 d-flex flex-column"
          >
            <TextInputField
              id="username"
              label="Username"
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 6,
                  message: "Username must be at least 6 characters long",
                },
              })}
              error={errors.userName ? { message: errors.userName.message } : null}
            />

            <TextInputField
              id="email"
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={errors.email ? { message: errors.email.message } : null}
            />

            <PasswordInput
              id="password"
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) =>
                  /(?=.*[A-Za-z])(?=.*\d)/.test(value) ||
                  "Password must contain both letters and numbers",
              })}
              error={errors.password ? { message: errors.password.message } : null}
              feedback={false}
            />

            <Button type="submit" className="mb-3">
              Submit
            </Button>
          </form>

          <div className="text-center">
            <span>have an account? </span>
            <Link to="/login" className="text-decoration-none">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
