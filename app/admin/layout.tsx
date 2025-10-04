"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebaseConfig";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isLoginPage = pathname?.includes("/admin/login");

      const isAdminEmail = user?.email === "mail@menoob.in";

      if (!user && !isLoginPage) {
        router.push("/admin/login");
      } else if (user && !isAdminEmail) {
        auth.signOut().then(() => {
          console.log("User:", user?.email);

          alert("Unauthorized access. Only admin can access this page.");
          router.push("/admin/login");
        });
      } else if (user && isLoginPage && isAdminEmail) {
        router.push("/admin/dashboard");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <div className="h-screen">{children}</div>;
}
