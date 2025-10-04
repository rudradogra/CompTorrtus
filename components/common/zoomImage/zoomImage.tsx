"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      containerRef.current!.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    imageRef.current!.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    imageRef.current!.style.transform = "scale(2)";
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    imageRef.current!.style.transform = "scale(1)";
    imageRef.current!.style.transformOrigin = "center center";
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden w-full h-[320px] custom-sm:h-[600px] rounded-lg shadow-sm"
    >
      {isHovered && (
        <div className="absolute inset-0 bg-black/5 pointer-events-none z-10 transition-opacity duration-300" />
      )}

      <Image
        ref={imageRef}
        src={src}
        fill
        alt={alt}
        className="object-fill w-full h-full transition-transform duration-300 ease-in-out select-none"
      />
    </div>
  );
}
