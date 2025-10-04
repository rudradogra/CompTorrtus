interface TitleWithParagraphProps {
  title: string;
  subtitle?: string;
  paragraph: string;
}

const TitleWithParagraph = ({
  title,
  subtitle,
  paragraph,
}: TitleWithParagraphProps) => {
  return (
    <div className="w-full mb-8 custom-md:mb-12 px-4">
      <div className="space-y-4">
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
    </div>
  );
};

export default TitleWithParagraph;
