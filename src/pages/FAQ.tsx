
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "How is the comic book made?",
      answer: "We use advanced AI technology to transform your child's photo into a superhero character. Our artists then create personalized comic book pages featuring your child as the main hero in exciting adventures!"
    },
    {
      question: "Can I get a print copy?",
      answer: "Yes! We offer both digital and print versions. Our print copies are high-quality, full-color books printed on premium paper that will last for years to come."
    },
    {
      question: "How long does it take to create a book?",
      answer: "Digital versions are ready within 24-48 hours. Print copies take 3-5 business days for creation plus shipping time. Rush orders are available for an additional fee."
    },
    {
      question: "Can I choose different stories and themes?",
      answer: "Absolutely! We have various themes including Hanuman adventures, Marvel-inspired stories, fantasy quests, space adventures, and more. You can select the theme that best matches your child's interests."
    },
    {
      question: "What age range is this suitable for?",
      answer: "Our comic books are perfect for children aged 3-12 years. The stories are age-appropriate and designed to inspire creativity and confidence in young minds."
    },
    {
      question: "Can I include multiple children in one book?",
      answer: "Yes! We offer family packages where multiple children can be featured as a superhero team. Additional characters can be added for a small extra fee."
    },
    {
      question: "What photo requirements do you have?",
      answer: "We need a clear, high-resolution photo of your child's face. The photo should be well-lit with the child looking towards the camera. We'll guide you through the process if adjustments are needed."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with the final product, we'll work with you to make revisions or provide a full refund within 7 days of delivery."
    },
    {
      question: "Can I customize the story text?",
      answer: "Yes! You can add personal details like your child's name, favorite activities, pets, or friends to make the story even more special and personalized."
    },
    {
      question: "How do I place an order?",
      answer: "Simply visit our 'Create Your Book' page, upload your child's photo, select a theme, provide personalization details, and choose your package. Payment is secure and processing begins immediately!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-comic text-purple-600 mb-4">Frequently Asked Questions 🤔</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about creating personalized comic books.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-3xl font-comic text-center text-purple-600">
                Everything You Need to Know 📖
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-purple-100 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-purple-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="py-8">
                <h3 className="text-2xl font-comic text-blue-600 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">
                  Can't find the answer you're looking for? Our friendly team is here to help!
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="/contact" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                  >
                    Contact Us 📧
                  </a>
                  <a 
                    href="https://wa.me/919346147336" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
                  >
                    WhatsApp 💬
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
