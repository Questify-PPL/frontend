import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { listFAQ } from "@/lib/constant";

const FAQSection = () => {
  return (
    <Accordion type="multiple" className="flex flex-col w-full">
      {listFAQ.map((faq, index) => (
        <AccordionItem key={index} value={`faq-${index + 1}`} data-testid={`faq-${index + 1}`}>
          <AccordionTrigger data-testid={`faq-trigger-${index + 1}`}>{faq.trigger}</AccordionTrigger>
          <AccordionContent className="text-[#32636A]" data-testid={`faq-content-${index + 1}`}>{faq.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
};

export default FAQSection;