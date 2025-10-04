import AboutSection from "@/components/sections/aboutSection/aboutSection";
import Collection from "@/components/sections/collection/collection";
import Footer from "@/components/layout/footer/footer";
import Spacer from "@/components/spacer/spacer";
import Header from "@/components/layout/header/header";
import ThreeDLogo from "@/components/common/3dlogo/ThreeDLogo";
import HeroSection from "@/components/common/heroSection/heroSection";
// import Banner from "@/components/sections/banner/banner";
import { Metadata } from "next";
import { getImagePath } from "@/utils/imageToCdn";

export const metadata: Metadata = {
  title: "Menoob - A gamer’s true identity.",
  description: "A gamer’s true identity.",
  metadataBase: new URL("https://www.menoob.in"),
  openGraph: {
    title: "Menoob - A gamer’s true identity.",
    description: "A gamer’s true identity.",
    url: "https://www.menoob.in",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menoob - A gamer’s true identity.",
    description: "A gamer’s true identity.",
    images: [
      {
        url: getImagePath("/common/group/1.jpg"),
        alt: "Menoob Group Image with Products",
      },
    ],
  },
};

export default function Home() {
  //test
  return (
    <div>
      <div className="hidden custom-md:flex">
        <ThreeDLogo />
      </div>

      <Header type="dynamic" />

      <div className="w-full relative h-screen" id="hero-section">
        <HeroSection />
      </div>
      <Collection />
      {/* <Banner /> */}

      <Spacer />
      <AboutSection />
      <Spacer />
      <Footer />
    </div>
  );
}
