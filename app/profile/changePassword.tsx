/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import TextInput from "@/components/common/textInput/textInput";
import ProFileButton from "@/components/common/button/profileButton";
import { changePassword } from "@/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";

export const metadata: Metadata = {
  title: "Change Password - Menoob",
  description:
    "Change your password securely. Ensure your new password is strong and unique.",
  metadataBase: new URL("https://www.menoob.in"),
  openGraph: {
    title: "Change Password - Menoob",
    description:
      "Change your password securely. Ensure your new password is strong and unique.",
    url: "https://www.menoob.in/profile/changePassword",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Change Password - Menoob",
    description:
      "Change your password securely. Ensure your new password is strong and unique.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
};

const ChangePassword = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setPassword((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (password.newPassword !== password.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      
    const auth = getAuth();
    const user = auth.currentUser;
      const response = await changePassword(user, password.newPassword);
      if (response.success) {
        setSuccess(response.message);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-6">
        <h5 className="text-text-xl-semibold font-ibm-plex-mono text-white">
          Change Password
        </h5>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <TextInput
          type="password"
          title="Current Password"
          placeholder="Enter Your Current Password"
          value={password.currentPassword}
          onChange={(e) => handleInputChange("currentPassword", e.target.value)}
        />
        <TextInput
          type="password"
          title="New Password"
          placeholder="Enter Your New Password"
          value={password.newPassword}
          onChange={(e) => handleInputChange("newPassword", e.target.value)}
        />
        <TextInput
          type="password"
          title="Confirm New Password"
          placeholder="Re-enter Your New Password"
          value={password.confirmNewPassword}
          onChange={(e) => handleInputChange("confirmNewPassword", e.target.value)}
        />
        <ProFileButton label="Save Changes" style="secondary" onClick={handleChangePassword} />
      </div>
    </div>
  );
};

export default ChangePassword;
