import React from "react";
import { ArrowRight } from "lucide-react";
import { FAQ_ITEMS } from "@/data/eventData";
import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";
import { FAQAccordion } from "../faq/FAQAccordion";
import { Button } from "../common/Button";

export function HomeFAQ() {
  const homeFaqs = FAQ_ITEMS.slice(0, 5);

  return (
    <section className="py-20 bg-[#fcfbf8] border-b border-[#e6dfd1]">
      <Container size="default">
        <SectionHeading
          eyebrow="Key Information"
          title="Frequently Asked Questions"
          subtitle="Answers to common queries regarding the summit schedule, participant eligibility, transit, and registration status."
        />

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={homeFaqs} defaultOpenId="faq-1" />

          <div className="mt-10 p-6 rounded-2xl bg-[#f7f4ec] border border-[#ede7db] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-serif font-bold text-base text-[#103327]">
                Have More Questions?
              </h4>
              <p className="text-xs sm:text-sm text-[#4a5752] mt-0.5">
                Browse our complete FAQ repository or get in touch directly with the secretariat.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button href="/faq" variant="outline" size="sm">
                <span>All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button href="/contact" variant="primary" size="sm">
                <span>Contact Desk</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
