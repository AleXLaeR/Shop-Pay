import { SyntheticEvent, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from './ProductAccordion.styles';

interface ProductAccordionProps {
  desc?: string;
  details?: Record<string, string>[];
  faq?: Record<string, string>[];
}

export default function ProductAccordion({ desc, details, faq }: ProductAccordionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className=" mt-4">
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className="border-0 font-bold"
      >
        <AccordionSummary
          className="bg-transparent"
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <span>Details</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex-between text-grey-dark">
            <p className="capitalize line-clamp-5 md:line-clamp-none">
              <span className="italic underline text-black-lighter mr-1">Description:</span>
              {desc ?? 'No description Provided.'}
            </p>
          </div>
        </AccordionDetails>
        <AccordionDetails className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-2">
          {details?.map(({ name, value }) => (
            <div
              key={name}
              className="flex justify-between text-grey-dark border-b border-b-grey-light"
            >
              <span>{name}:</span>
              <span className="text-left break-words w-[20ch]">{value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        className="border-0 font-bold"
      >
        <AccordionSummary
          className="bg-transparent"
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <span>Frequently asked Questions (FAQ)</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="grid grid-cols-1 gap-y-3 text-grey-dark max-h-[500px] overflow-auto">
            {faq && faq.length > 0 ? (
              [{ question: 'sdgsdfg', answer: 'sdfgdfg' }].map(({ question, answer }, idx) => (
                <div
                  key={idx}
                  className="min-w-[320px] flex flex-col gap-4 text-grey-dark border-b-2 border-b-grey-light mr-2"
                >
                  <span className="w-fit border-b border-b-grey-lighter pr-1">
                    <span className="text-lg italic text-black-lighter mr-3">Question:</span>
                    {question.endsWith(' ?') ? question : `${question} ?`}
                  </span>
                  <span className="break-words">
                    <span className="text-lg italic underline underline-offset-2 text-black-lighter mr-2">
                      Answer:
                    </span>
                    {answer}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-center py-3">Nothing here... YET</span>
                <button type="button" className="btn-outlined w-56">
                  Submit A Question
                </button>
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
