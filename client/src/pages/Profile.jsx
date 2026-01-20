import Button from "@/components/Button";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col max-w-lg justify-center items-center mx-auto py-7">
      <h1 className="font-semibold text-3xl text-center mb-4">Profile</h1>
      <form className="w-full space-y-4 md:space-y-6">
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="rounded-full w-24 h-24 mx-auto"
        />
        <InputField
          labeltext="Username"
          labelfor="username"
          type="text"
          name="username"
          id="username"
          value={currentUser.username}
        />
        <InputField
          labeltext="Email"
          labelfor="email"
          type="email"
          name="email"
          id="email"
          value={currentUser.email}
        />
        <PasswordField
          labelfor="password"
          labeltext="Password"
          name="password"
          id="password"
        />
        <Button>Submit</Button>
        <div className="flex justify-between">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
