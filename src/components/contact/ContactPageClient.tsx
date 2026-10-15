"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  AlertCircle 
} from "lucide-react";
import { EVENT_METADATA } from "@/data/eventData";
import { Container } from "@/components/common/Container";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";

export function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "General Summit Enquiry",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "staged" | "error";
    message?: string;
  }>({ status: "idle" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        status: "error",
        message: "Please fill out all required fields.",
      });
      return;
    }

    setFormStatus({
      status: "staged",
      message: `Thank you, ${formData.name}. Your inquiry has been received for processing. For immediate official correspondence, you may also write directly to our secretariat at ${EVENT_METADATA.contactEmail}.`,
    });
  };

  return (
    <div className="w-full">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#0d281e] via-[#103327] to-[#081a14] text-[#fcfbf8] py-16 sm:py-24 border-b border-[#1b5341]/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#256f57]/20 rounded-full blur-3xl pointer-events-none" />
        <Container size="default" className="relative z-10 text-center">
          <Badge variant="gold" size="md" className="mb-4">
            Secretariat & Helplines
          </Badge>

          <h1 className="font-serif font-black text-3.5xl sm:text-5xl md:text-6xl text-[#fcfbf8] tracking-tight leading-tight">
            Contact & Secretariat Helpdesk
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#c8d1cd] max-w-2xl mx-auto leading-relaxed">
            Get in touch for institutional delegations, speaker confirmations, academic partnerships, and travel coordination for December 2026.
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#fcfbf8]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <Badge variant="terracotta" size="sm">
                Official Channels
              </Badge>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#103327]">
                Official Secretariat Information
              </h2>

              <p className="text-sm text-[#4a5752] leading-relaxed">
                Contact the summit coordination offices across the International Startup Foundation and GIET University Gunupur campus.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#f7f4ec] text-[#143e30] border border-[#dfd6c4] flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#c25e38]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#103327]">
                      Email Secretariat
                    </h3>
                    <p className="text-xs text-[#7e8d87] mt-0.5">Primary channel for delegations & queries</p>
                    <a
                      href={`mailto:${EVENT_METADATA.contactEmail}`}
                      className="text-sm font-semibold text-[#143e30] hover:text-[#c25e38] transition-colors mt-1 inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      {EVENT_METADATA.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#f7f4ec] text-[#143e30] border border-[#dfd6c4] flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#256f57]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#103327]">
                      Campus Helpline
                    </h3>
                    <p className="text-xs text-[#7e8d87] mt-0.5">GIET University reception desk</p>
                    <a
                      href={`tel:${EVENT_METADATA.helplinePhone.replace(/\s+/g, "")}`}
                      className="text-sm font-semibold text-[#143e30] hover:text-[#c25e38] transition-colors mt-1 inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      {EVENT_METADATA.helplinePhone}
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#f7f4ec] text-[#143e30] border border-[#dfd6c4] flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#be9740]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#103327]">
                      Summit Campus Address
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5752] mt-1 leading-relaxed">
                      GIET University Campus, Goboriguda, Po-Kharling, Gunupur, Rayagada District, Odisha 765022, India.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#e6dfd1] shadow-xs flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#f7f4ec] text-[#143e30] border border-[#dfd6c4] flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#143e30]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#103327]">
                      Secretariat Hours
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
                      Monday to Saturday • 9:30 AM – 5:30 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-[#ffffff] rounded-3xl p-8 sm:p-10 border border-[#e6dfd1] shadow-xs space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#103327]">
                    Send an Inquiry to the Organizing Team
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5752] mt-1">
                    Fill in your details below. We welcome questions regarding tracks, roundtables, and logistics.
                  </p>
                </div>

                {formStatus.status === "staged" ? (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Notice: Inquiry Submitted
                    </div>
                    <p>{formStatus.message}</p>
                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setFormStatus({ status: "idle" });
                          setFormData({
                            name: "",
                            email: "",
                            organization: "",
                            subject: "General Summit Enquiry",
                            message: "",
                          });
                        }}
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold text-[#161e1b] mb-1">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Dr. / Mr. / Ms. Name"
                          className="w-full px-4 py-2.5 bg-[#fcfbf8] border border-[#e6dfd1] rounded-xl text-xs sm:text-sm text-[#161e1b] focus:outline-none focus:ring-2 focus:ring-[#143e30]"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#161e1b] mb-1">
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@organization.org"
                          className="w-full px-4 py-2.5 bg-[#fcfbf8] border border-[#e6dfd1] rounded-xl text-xs sm:text-sm text-[#161e1b] focus:outline-none focus:ring-2 focus:ring-[#143e30]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-org" className="block text-xs font-semibold text-[#161e1b] mb-1">
                          Organization / Institution
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Company, University or Fund"
                          className="w-full px-4 py-2.5 bg-[#fcfbf8] border border-[#e6dfd1] rounded-xl text-xs sm:text-sm text-[#161e1b] focus:outline-none focus:ring-2 focus:ring-[#143e30]"
                        />
                      </div>

                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#161e1b] mb-1">
                          Inquiry Subject
                        </label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#fcfbf8] border border-[#e6dfd1] rounded-xl text-xs sm:text-sm text-[#161e1b] focus:outline-none focus:ring-2 focus:ring-[#143e30]"
                        >
                          <option value="General Summit Enquiry">General Summit Enquiry</option>
                          <option value="Startup Pitch & Exhibition">Startup Pitch & Exhibition</option>
                          <option value="Investor Delegation">Investor Delegation</option>
                          <option value="Speaker Nomination">Speaker Nomination</option>
                          <option value="Corporate / GCC Partnership">Corporate / GCC Partnership</option>
                          <option value="Travel & Accommodation Support">Travel & Accommodation Support</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-[#161e1b] mb-1">
                        Message Details *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your enquiry, delegation size, or questions..."
                        className="w-full px-4 py-2.5 bg-[#fcfbf8] border border-[#e6dfd1] rounded-xl text-xs sm:text-sm text-[#161e1b] focus:outline-none focus:ring-2 focus:ring-[#143e30]"
                      />
                    </div>

                    {formStatus.status === "error" && (
                      <p className="text-xs text-rose-600 font-medium">
                        {formStatus.message}
                      </p>
                    )}

                    <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
                      <Send className="w-4 h-4 mr-2" />
                      <span>Dispatch Inquiry</span>
                    </Button>

                    <p className="text-[11px] text-[#7e8d87] pt-2">
                      Official response time: The secretariat reviews and acknowledges inquiries within 1–2 business days.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
