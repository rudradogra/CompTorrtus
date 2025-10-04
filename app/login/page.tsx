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
import {
  signInWithEmailAndPassword,
  sendResetEmail,
} from "@/firebaseConfig/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { db, auth } from "@/firebaseConfig/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useCart } from "@/hooks/useCart";
import { getImagePath } from "@/utils/imageToCdn";

const ShippingPolicyPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { syncCartOnLoginOrSignup } = useCart();

  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      if (user) {
        syncCartOnLoginOrSignup();
      }
      router.push("/");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please check your credentials.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset your password.");
      return;
    }
    const response = await sendResetEmail(email);
    alert(response.message);
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) return;
      // Save user data to Firestore (create or update)
      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
          email: user.email,
          signupType: "google",
          createdAt: new Date(),
        },
        { merge: true }
      );
      syncCartOnLoginOrSignup();
      router.push("/");
    } catch (error) {
      console.error("Google sign in error:", error);
      alert("Google sign in failed. Please try again.");
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
              Login
            </p>

            <TextInput
              type="email"
              title="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-[10px]">
              <TextInput
                type="password"
                title="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link href="#" onClick={handleForgotPassword}>
                <p className="text-end font-ibm-plex-mono text-text-sm-medium text-white">
                  Forgot Password?
                </p>
              </Link>
            </div>

            <Button text="Sign In" fullWidth onClick={handleSignIn} />

            <button
              className="flex flex-row justify-center gap-3 text-text-md-semibold bg-white py-[10px] w-full rounded-lg text-black"
              onClick={handleGoogleSignIn}
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

            <Link href="/signup">
              <p className="font-press-start-2p text-center text-text-xs-regular text-white">
                Create Account
              </p>
            </Link>
          </div>
        </div>
      </ResponsivePageContainer>

      <Spacer />

      <Spacer />

      <Footer />
    </div>
  );
};

export default ShippingPolicyPage;
