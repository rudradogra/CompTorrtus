import React from 'react';
import { PolicyData, PolicySection, getCancellationAndRefundPolicy } from '@/lib/menoob/menoobPolicies';
import ThreeDLogo from '@/components/common/3dlogo/ThreeDLogo';
import Header from '@/components/layout/header/header';
import Spacer from '@/components/spacer/spacer';
import { ResponsivePageContainer } from '@/components/common/responsivePageContainer/responsivePageContainer';
import Footer from '@/components/layout/footer/footer';
import SectionHeading from '@/components/common/sectionHeading/sectionHeading';

interface PolicyContentProps {
  policyType: string;
}

const PolicyContent: React.FC<PolicyContentProps> = ({ policyType }) => {
  // Get policy data based on type
  const getPolicyData = (): PolicyData => {
    switch (policyType) {
      case 'cancellationAndRefund':
        return getCancellationAndRefundPolicy();
      default:
        throw new Error(`Unknown policy type: ${policyType}`);
    }
  };

  const policyData = getPolicyData();
  const renderSection = (section: PolicySection, index: number) => {
    switch (section.type) {
      case 'paragraph':
        return (
          <div key={index}>
            <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
              {section.title}
            </h2>
            <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
              {section.content}
            </p>
          </div>
        );

      case 'list':
        return (
          <div key={index}>
            <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
              {section.title}
            </h2>
            <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.title && <strong>{item.title}</strong>}
                  {item.title && ' '}
                  <span dangerouslySetInnerHTML={{ 
                    __html: item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }} />
                </li>
              ))}
            </ul>
          </div>
        );

      case 'mixed':
        return (
          <div key={index}>
            <h2 className="font-ibm-plex-mono text-text-md-medium text-white mt-8 mb-2">
              {section.title}
            </h2>
            {section.description && (
              <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
                <span dangerouslySetInnerHTML={{ 
                  __html: section.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                }} />
              </p>
            )}
            <ul className="list-disc pl-5 font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4 space-y-2">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex}>
                  {item.title && <strong>{item.title}</strong>}
                  {item.title && ' '}
                  <span dangerouslySetInnerHTML={{ 
                    __html: item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }} />
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <ThreeDLogo />
      <Header type="default" />
      <Spacer />
      <ResponsivePageContainer>
        <div className="">
          <div className="flex justify-center">
            <SectionHeading title={policyData.title} />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="font-ibm-plex-mono text-text-md-medium text-white">
              Updated at: {policyData.lastUpdated}
            </div>
          </div>
          
          <div className="mt-8">
            <p className="font-ibm-plex-mono text-text-md-regular text-textSecondary mb-4">
              {policyData.description}
            </p>

            {policyData.sections.map((section, index) => renderSection(section, index))}
          </div>
        </div>
      </ResponsivePageContainer>
      <Spacer />
      <Footer />
    </div>
  );
};

export default PolicyContent;