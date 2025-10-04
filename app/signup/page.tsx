"use client";
import ThreeDLogo from "@/components/common/3dlogo/ThreeDLogo";
import { ResponsivePageContainer } from "@/components/common/responsivePageContainer/responsivePageContainer";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import Spacer from "@/components/spacer/spacer";
import React from "react";
import TextInput from "@/components/common/textInput/textInput";
import Link from "next/link";
import Button from "@/components/common/button/button";
import { auth, db } from "@/firebaseConfig/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { getImagePath } from "@/utils/imageToCdn";

const SignupPage = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { syncCartOnLoginOrSignup } = useCart();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      console.log(firstName, email, password);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      syncCartOnLoginOrSignup();

      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) return;
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email,
        signupType: "google",
        createdAt: new Date(),
      });
      syncCartOnLoginOrSignup();
      router.push("/");
    } catch (error) {
      console.error("Google sign up error:", error);
      alert("Google sign up failed. Please try again.");
    }
  };

  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />

      <ResponsivePageContainer>
        <div className="flex justify-center">
          <div className="flex flex-col w-full max-w-[556px] bg-[#101010] border border-[#212121] rounded-lg p-6 gap-6">
            <p className="font-ibm-plex-mono text-text-xl-semibold text-white">
              Create Account
            </p>

            <TextInput
              type="text"
              title="First Name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextInput
              type="text"
              title="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextInput
              type="email"
              title="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              type="password"
              title="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button text="Sign Up" fullWidth onClick={handleSignUp} />

            <button
              className="flex flex-row justify-center gap-3 text-text-md-semibold bg-white py-[10px] w-full rounded-lg text-black"
              onClick={handleGoogleSignUp}
            >
              <div className="relative w-6 h-6">
                <Image
                  src={getImagePath("/icons/google.svg")}
                  alt="Google"
                  fill={true}
                />
              </div>
              Sign in with Google
            </button>

            <p className="font-press-start-2p text-center text-text-xs-regular text-white">
              Already have an account?{" "}
              <Link href="/login">
                <span className="">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </ResponsivePageContainer>

      <Spacer />

      <Spacer />

      <Footer />
    </div>
  );
};

export default SignupPage;
