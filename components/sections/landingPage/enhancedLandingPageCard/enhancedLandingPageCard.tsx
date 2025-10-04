import React from "react";
import Image from "next/image";

interface EnhancedLandingPageCardProps {
  title: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  metaDescription?: string;
  onCardClick?: () => void;
}

const EnhancedLandingPageCard: React.FC<EnhancedLandingPageCardProps> = ({
  title,
  heroImageUrl,
  heroImageAlt,
  metaDescription,
  onCardClick,
}) => (
  <div
    className="bg-black border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:border-gray-600 transition-colors"
    onClick={onCardClick}
  >
    {/* Hero Image */}
    {heroImageUrl && (
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt || title}
          fill
          className="object-cover"
        />
      </div>
    )}

    {/* Content */}
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <span className="text-pink text-text-sm-regular border-x border-pink border-t border-b-2 px-2 py-1 uppercase font-ibm-plex-mono w-fit">
          Landing Page
        </span>
        <h3 className="text-white text-text-xl-regular font-press-start-2p leading-tight pt-4 line-clamp-1">
          {title}
        </h3>
      </div>

      {metaDescription && (
        <p className="text-textSecondary text-text-md-regular font-anonymous-pro line-clamp-3">
          {metaDescription}
        </p>
      )}

      <button
        className="bg-white text-black py-3 px-6 text-text-md-regular font-ibm-plex-mono hover:bg-gray-100 transition-colors"
        // onClick={(e) => {
        //   e.stopPropagation();
        //   onCardClick?.();
        // }}
        type="button"
      >
        View Details
      </button>
    </div>
  </div>
);

export default EnhancedLandingPageCard;
