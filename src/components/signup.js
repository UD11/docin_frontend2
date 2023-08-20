import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useMutation } from "@apollo/client";
import gql from "graphql-tag"; // Import gql from graphql-tag

export const REGISTER_MUTATION = gql`
  mutation CreateUserMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    createUser(email: $email, password: $password, username: $username) {
      success
    }
  }
`;

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const { data } = await registerMutation({
        variables: { email, password, username: name },
      });

      if (data.createUser.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#EDDBC7] font-sans">
      <div className="p-8 bg-[#F8EAD8] border border-solid border-[#A7727D] w-[400px] rounded-lg shadow-md">
        <h2 className="text-4xl font-semibold mb-4 text-center text-[#A7727D]">
          Create an Account
        </h2>
        <p className="text-sm text-gray-700 mb-6 text-center">
          Fill out the form below to get started.
        </p>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              <FaUser className="inline-block mr-2 text-[#A7727D]" />
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-100 rounded border border-solid border-[#A7727D] pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              <FaEnvelope className="inline-block mr-2 text-[#A7727D]" />
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 bg-gray-100 rounded border border-solid border-[#A7727D] pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              <FaLock className="inline-block mr-2 text-[#A7727D]" />
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-gray-100 rounded border border-solid border-[#A7727D] pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#A7727D] text-white py-3 rounded hover:bg-[#F9F5E7] hover:text-[#A7727D] transition-colors border border-solid border-[#A7727D]"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-[#A7727D] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
