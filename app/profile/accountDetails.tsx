import React, { useState, useEffect } from "react";
import TextInput from "@/components/common/textInput/textInput";
import ProFileButton from "@/components/common/button/profileButton";
import {
  doc,
  setDoc,
  DocumentReference,
  onSnapshot,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebaseConfig/firebaseConfig";
import { getAuth } from "firebase/auth";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";
import { getWebsiteUrl, getBrandDisplayName } from "@/lib/contactUs/contactUs";

const baseUrl = getWebsiteUrl();
const brandName = getBrandDisplayName();

export const metadata: Metadata = {
  title: `Account Details - ${brandName}`,
  description:
    "Manage your account details, including email, name, and phone number.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: `Account Details - ${brandName}`,
    description:
      "Manage your account details, including email, name, and phone number.",
    url: `${baseUrl}/profile`,
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: `${brandName} Group Image with Products`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Account Details - ${brandName}`,
    description: "Manage your account details, including email, name, and phone number.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: `${brandName} Group Image with Products`,
      },
    ],
  },
};

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("User not authenticated. Please log in.");
      return;
    }

    const userDoc: DocumentReference = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userDoc,
      (docSnapshot: DocumentSnapshot<DocumentData>) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFormData({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
          });
          setError(null);
          setPhoneError(null);
        } else {
          console.log("No such user found!");
          setError("No user data found.");
        }
      },
      (err) => {
        console.error("Error fetching user information:", err.message);
        setError(`Failed to load user data: ${err.message}`);
      }
    );

    return () => {
      console.log("Unsubscribing from user data listener");
      unsubscribe();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    if (name === "email") return;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "phoneNumber") {
      const phoneRegex = /^\d{0,10}$/;
      if (!phoneRegex.test(value)) {
        setPhoneError(
          "Phone number must contain only digits and be up to 10 digits long."
        );
      } else if (value.length !== 10) {
        setPhoneError("Phone number must be exactly 10 digits.");
      } else {
        setPhoneError(null);
      }
    }
  };

  const handleSave = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not authenticated.");
        setError("User not authenticated.");
        return;
      }

      const userDoc: DocumentReference = doc(db, "users", user.uid);
      await setDoc(
        userDoc,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
        },
        { merge: true }
      );

      setIsEditing(false);
      setError(null);
      setPhoneError(null);
    } catch (error: unknown) {
      console.error("Error saving user information:", error);
      setError("Failed to save user information.");
    }
  };

  const handleEditProfile = () => {
    if (isEditing) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDoc: DocumentReference = doc(db, "users", user.uid);
        // Use getDoc instead of onSnapshot with once option for one-time read
        onSnapshot(userDoc, (docSnapshot: DocumentSnapshot<DocumentData>) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setFormData({
              email: data.email || "",
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              phoneNumber: data.phoneNumber || "",
            });
            setPhoneError(null);
          }
        });
      }
    }
    setIsEditing((prev) => !prev);
  };

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-6">
        <h5 className="text-text-xl-semibold font-ibm-plex-mono text-white">
          My Information
        </h5>
        <TextInput
          type="email"
          title="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          readOnly={true}
          className="text-opacity-50"
        />
        <div className="grid grid-cols-1 custom-sm:grid-cols-2 gap-4">
          <TextInput
            type="text"
            title="First Name"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            readOnly={!isEditing}
            className={isEditing ? "text-opacity-100" : "text-opacity-50"}
          />
          <TextInput
            type="text"
            title="Last Name"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            readOnly={!isEditing}
            className={isEditing ? "text-opacity-100" : "text-opacity-50"}
          />
        </div>
        <div className="relative">
          <TextInput
            type="tel"
            title="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            readOnly={!isEditing}
            className={isEditing ? "text-opacity-100" : "text-opacity-50"}
          />
          {phoneError && isEditing && (
            <p className="mt-1 text-sm text-red-500">{phoneError}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-6">
          <ProFileButton
            label={isEditing ? "Cancel" : "Edit Profile"}
            style="primary"
            className="w-[220px]"
            onClick={handleEditProfile}
          />
          {isEditing && (
            <ProFileButton
              label="Save Changes"
              style="secondary"
              className="w-[220px]"
              onClick={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
