import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "What programs does ERA offer?",
      answer: "ERA offers comprehensive training programs including technical skills development, soft skills training, and 6-month internship placements with our partner companies."
    },
    {
      question: "Who can apply for ERA programs?",
      answer: "Recent graduates from any accredited university can apply for our programs. We accept applications from all fields of study."
    },
    {
      question: "How long are the training programs?",
      answer: "Our training programs typically last 3-6 months, followed by a 6-month internship placement with one of our partner companies."
    },
    {
      question: "Is there a fee for the training?",
      answer: "ERA is a non-profit organization, and our programs are offered at minimal cost to ensure accessibility. Financial assistance is available for eligible candidates."
    },
    {
      question: "How can companies partner with ERA?",
      answer: "Companies can partner with ERA by offering internship placements, providing mentorship, or supporting our training programs. Contact us to learn more about partnership opportunities."
    }
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

