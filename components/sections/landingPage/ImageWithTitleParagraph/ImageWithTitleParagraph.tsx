import Image from "next/image";

interface ImageWithTitleParagraphProps {
  title: string;
  subtitle?: string;
  paragraph: string;
  imageUrl: string;
  imageAlt: string;
  reverseLayout?: boolean;
}

const ImageWithTitleParagraph = ({
  title,
  subtitle,
  paragraph,
  imageUrl,
  imageAlt,
  reverseLayout = false,
}: ImageWithTitleParagraphProps) => {
  return (
    <div className="w-full mb-8 custom-md:mb-12 px-4">
      <div
        className={`grid grid-cols-1 custom-md:grid-cols-2 gap-6 custom-md:gap-16 items-center ${
          reverseLayout ? "custom-md:grid-flow-col-dense" : ""
        }`}
      >
        {/* Content Section */}
        <div
          className={`space-y-4 ${
            reverseLayout ? "custom-md:col-start-2" : ""
          }`}
        >
          <h2 className="text-display-xs-regular custom-md:text-display-sm-regular font-press-start-2p text-white">
            {title}
          </h2>
          {subtitle && (
            <h3 className="text-text-xl-regular font-ibm-plex-mono text-textSecondary">
              {subtitle}
            </h3>
          )}
          <div
            className="text-text-md-regular font-plus-jakarta-sans text-textSecondary leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        </div>

        {/* Image Section */}
        <div
          className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden ${
            reverseLayout ? "custom-md:col-start-1" : ""
          }`}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageWithTitleParagraph;
