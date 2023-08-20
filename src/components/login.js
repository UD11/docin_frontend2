import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useMutation } from "@apollo/client";
import gql from "graphql-tag"; // Import gql from graphql-tag

export const LOGIN_MUTATION = gql`
  mutation LoginUserMutation($username: String!, $password: String!) {
    login_user(username: $username, password: $password) {
      success
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await loginMutation({
        variables: { username: email, password }, // Use username for the login mutation
      });
      const token = data.login.token;
      // Store token in localStorage or cookies
      // Redirect to protected route or show success message
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#EDDBC7]">
      <div className="max-w-md w-full p-8 bg-[#F8EAD8] border border-solid border-[#A7727D]">
        <h2 className="text-4xl font-semibold mb-6 text-[#A7727D]">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#A7727D]">
              <FaEnvelope className="inline-block mr-3 text-lg" />
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-solid border-[#A7727D]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#A7727D]">
              <FaLock className="inline-block mr-3 text-lg" />
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-solid border-[#A7727D]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#A7727D] text-white py-3 rounded hover:bg-[#F9F5E7] hover:text-[#A7727D] transition-colors border border-solid border-[#A7727D]"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-gray-700 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#A7727D] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
