"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Faq {
  question: string;
  answer: string;
}

interface FaqsProps {
  faqs: Faq[];
}

const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
  const [visibleFaqs, setVisibleFaqs] = useState<number[]>([]);

  const toggleFaqVisibility = (index: number) => {
    setVisibleFaqs((prev) => (prev.includes(index) ? [] : [index]));
  };

  return (
    <div className="max-w-[700px] mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          onClick={() => toggleFaqVisibility(index)}
          role="button"
          className={`flex flex-col gap-2 py-8 ${
            index !== faqs.length - 1
              ? "border-b-[0.5px] py-4 border-strokeColor border-opacity-50"
              : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="text-text-sm-medium custom-sm:text-text-md-medium font-ibm-plex-mono text-white">
              {faq.question}
            </p>
            <button onClick={() => toggleFaqVisibility(index)}>
              {visibleFaqs.includes(index) ? (
                <ChevronUpIcon
                  className="w-5 h-5 text-white"
                  onClick={() => toggleFaqVisibility(index)}
                />
              ) : (
                <ChevronDownIcon
                  className="w-5 h-5 text-white"
                  onClick={() => toggleFaqVisibility(index)}
                />
              )}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              visibleFaqs.includes(index) ? "max-h-[500px]" : "max-h-0"
            }`}
          >
            <p className="text-text-sm-regular custom-sm:text-text-md-regular font-ibm-plex-mono text-textSecondary pb-2">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faqs;
