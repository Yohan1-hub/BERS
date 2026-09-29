"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Logo from "@/components/Logo";
import {
  Printer,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileText,
  BarChart3,
  Phone,
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";

const NAV = [
  { id: "summary", label: "Executive Summary" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "The BERS Solution" },
  { id: "pricing", label: "Investment & Pricing" },
  { id: "team", label: "The BERS Team" },
];

const CONTACT = {
  phone: "+1 (401) 436-2753",
  email: "yohan.ariza@bersinstitute.org",
  website: "bersinstitute.org",
  address: "8208 Cathy Ann St, Orlando, FL 32818",
};

export default function KiteProposalPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "BERS Institute - Regulatory Compliance & Odor Mitigation Plan - Kite Technology",
    pageStyle: "@page { size: letter; margin: 12mm; }",
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 print:hidden lg:hidden">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-900">
          BERS Institute · Proposal
        </span>
        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <Printer className="h-4 w-4" /> Print / PDF
        </button>
      </div>

      {/* Sticky sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-slate-200 bg-white p-6 print:hidden lg:flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-900">
          <span className="text-lg font-black italic text-amber-400">BERS</span>
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Confidential Proposal
        </p>
        <nav className="mt-6 space-y-0.5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowRight className="h-3 w-3 text-amber-500" />
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => handlePrint()}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <Printer className="h-4 w-4" /> Print / Download PDF
        </button>

        <div className="mt-auto rounded-lg border border-slate-200 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Contact</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            <Phone className="h-3.5 w-3.5 text-amber-500" /> {CONTACT.phone}
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-xs text-slate-600">
            <Mail className="h-3.5 w-3.5 text-amber-500" /> {CONTACT.email}
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-xs text-slate-600">
            <Globe className="h-3.5 w-3.5 text-amber-500" /> {CONTACT.website}
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-60">
        <div
          ref={contentRef}
          className="mx-auto max-w-[56rem] px-5 py-10 sm:px-10 sm:py-14"
        >
          {/* COVER */}
          <section id="cover" className="flex min-h-[85vh] flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6">
                <Logo className="h-16 w-auto" />
                <p className="text-right text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Private &amp; Confidential
                </p>
              </div>

              <div className="mt-16 sm:mt-24">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                  Proposal for Compliance &amp; Operations
                </p>
                <h1 className="mt-4 font-merriweather text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                  Regulatory Compliance &amp; Odor Mitigation Plan
                </h1>
                <p className="mt-4 max-w-xl text-lg text-slate-600">
                  A Proprietary Methodology for High-Load Waste Facilities
                </p>
              </div>

              <div className="mt-12 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Prepared for</p>
                  <p className="mt-1 font-merriweather text-lg font-bold text-slate-900">Kite Technology</p>
                  <p className="text-sm text-slate-500">Kissimmee, Florida</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Prepared by</p>
                  <p className="mt-1 font-merriweather text-lg font-bold text-slate-900">BERS Institute LLC</p>
                  <p className="text-sm text-slate-500">Orlando, Florida · September 29, 2026</p>
                </div>
              </div>
            </div>

            <p className="mt-12 border-t border-slate-200 pt-4 text-[11px] leading-relaxed text-slate-400">
              This document is confidential and prepared exclusively for the review of Kite Technology.
              It contains commercially sensitive information and shall not be distributed, reproduced, or
              disclosed without the written consent of BERS Institute LLC.
            </p>
          </section>

          {/* EXECUTIVE SUMMARY */}
          <section id="summary" className="print:break-before-page">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">01 · Executive Summary</p>
            <h2 className="mt-2 font-merriweather text-3xl font-black text-slate-900">A Determined Return to Compliance</h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                Kite Technology is operating under acute regulatory and operational pressure. The facility
                is subject to a monetary fine imposed by the Florida Department of Environmental Protection
                (FDEP), a Cease and Desist order issued by Osceola County, and a regulatory directive to
                submit a formal Odor Management Plan.
              </p>
              <p>
                The conventional treatments currently in place have not produced a stable resolution.
                Recurring odor complaints indicate that the underlying operational condition persists, and
                each unresolved complaint compounds regulatory exposure, neighbor relations, and the risk
                of escalating enforcement action.
              </p>
              <p>
                BERS Institute LLC proposes a disciplined, two-phase engagement built on the{" "}
                <strong className="text-slate-900">BERS Proprietary Environmental Protocol</strong>:
                a low-risk <strong className="text-slate-900">Diagnostic &amp; Pilot Assessment</strong> that
                establishes viability with objective, empirical data, followed by{" "}
                <strong className="text-slate-900">Full-Scale Implementation &amp; FDEP Compliance</strong>,
                ending in a formal Odor Management Plan prepared for regulatory submission.
              </p>
              <p>
                Our engagement model is data-driven and outcome-focused: we resolve the conditions that drive
                complaints and restore the facility to a defensible compliance position. This document
                describes the challenge, the proposed methodology, the commercial structure, and the team
                assigned to deliver it.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Regulatory relief", sub: "FDEP & Osceola County" },
                { icon: BarChart3, label: "Data-driven proof", sub: "Pre- vs. post-pilot metrics" },
                { icon: FileText, label: "Formal compliance", sub: "Odor Management Plan" },
              ].map((c) => (
                <div key={c.label} className="break-inside-avoid rounded-lg border border-slate-200 bg-white p-4">
                  <c.icon className="h-6 w-6 text-slate-900" />
                  <p className="mt-3 text-sm font-bold text-slate-900">{c.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{c.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* THE CHALLENGE */}
          <section id="challenge" className="print:break-before-page">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">02 · The Challenge</p>
            <h2 className="mt-2 font-merriweather text-3xl font-black text-slate-900">
              Enforcement Is Active, and the Clock Is Running
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                Despite the continued application of conventional market treatments, odor reports have not
                been resolved. This is not a question of treatment intensity but of suitability: the
                operational matrix at this facility requires a site-specific approach, not a commodity
                solution.
              </p>
              <p>The following factors define the exposure and the required response:</p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  title: "FDEP monetary fine",
                  desc: "A financial penalty is already in place. Repeat violations raise the severity and cost of enforcement.",
                },
                {
                  title: "Osceola County Cease and Desist",
                  desc: "An active order restricts operations. Continuity cannot be assured while the underlying condition persists.",
                },
                {
                  title: "Mandated Odor Management Plan",
                  desc: "The facility must submit a plan acceptable to regulators. A credible, implementable plan is a prerequisite to closure.",
                },
                {
                  title: "Persistent neighbor complaints",
                  desc: "Continued complaints extend regulatory scrutiny and erode community and reputational standing.",
                },
                {
                  title: "Undefined long-term remedy",
                  desc: "Repeated reliance on conventional treatments has not delivered a stable, verifiable outcome.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg border border-accent-600/30 bg-accent-50/60 p-4"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
              A decisive, site-specific intervention — supported by data and executed under a proprietary
              compliance framework — is required to stabilize the facility and restore its operating position.
            </p>
          </section>

          {/* THE BERS SOLUTION */}
          <section id="solution" className="print:break-before-page">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">03 · The BERS Solution</p>
            <h2 className="mt-2 font-merriweather text-3xl font-black text-slate-900">
              The BERS Proprietary Environmental Protocol
            </h2>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-700">
              <p>
                BERS Institute applies a <strong className="text-slate-900">Site-Specific Remediation Methodology</strong>{" "}
                governed by a <strong className="text-slate-900">Proprietary Compliance Framework</strong>. At its core, the
                Protocol deploys a <strong className="text-slate-900">Targeted Odor Neutralization System</strong> across
                defined operational zones through a validated sequence of diagnostic and implementation stages.
              </p>
              <p>
                Consistent with our practice, BERS does not disclose the composition or mechanism of its
                proprietary methods. We are engaged to deliver measurable outcomes — regulatory relief, odor
                elimination, and reduced VOC indicators — not to explain the technology. Every stage is
                documented, tracked, and reported in regulatory language your stakeholders will understand.
              </p>
            </div>

            {/* Phase 1 */}
            <div className="mt-8 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-base font-black text-amber-400">
                    1
                  </span>
                  <div>
                    <h3 className="font-merriweather text-lg font-black text-slate-900">
                      Proprietary Diagnostic &amp; Pilot Assessment
                    </h3>
                    <p className="text-xs font-medium text-slate-500">Low-Risk Entry · Flat Fee · $495</p>
                  </div>
                </div>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  Proof of Concept
                </span>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-400">Deliverables</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "On-site facility walkthrough and operational review",
                    "Baseline odor and VOC assessment across critical operational zones",
                    "Controlled application of the BERS Proprietary Environmental Protocol at a single designated test site",
                    "Comprehensive Technical Diagnostic Report comparing pre- and post-pilot empirical data",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Outcome: </span>
                  A clear, objective Go/No-Go viability determination and the empirical foundation for
                  full-scale implementation.
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="mt-6 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-base font-black text-amber-400">
                    2
                  </span>
                  <div>
                    <h3 className="font-merriweather text-lg font-black text-slate-900">
                      Full-Scale Implementation &amp; FDEP Compliance
                    </h3>
                    <p className="text-xs font-medium text-slate-500">The Core Solution · Starting at $8,500</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white">
                  Regulatory Submission
                </span>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm font-bold uppercase tracking-wide text-slate-400">Deliverables</p>
                <ul className="mt-3 space-y-2">
                  {[
                    "Full deployment of the proprietary protocol across all critical operational zones",
                    "Continuous performance monitoring with periodic odor and VOC verification",
                    "Operational staff training on the Proprietary Compliance Framework",
                    "Delivery of a formal Odor Management Plan formatted for FDEP and Osceola County regulatory submission",
                  ].map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span className="font-bold text-slate-900">Activation: </span>
                  Phase 2 proceeds only where Phase 1 confirms viability. Investment is customized based on
                  the empirical findings of the diagnostic stage.
                </div>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section id="pricing" className="print:break-before-page">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">04 · Investment &amp; Pricing</p>
            <h2 className="mt-2 font-merriweather text-3xl font-black text-slate-900">A Low-Risk Path to a Full Solution</h2>

            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-slate-700">
              The commercial structure is designed to remove the risk of engagement: you evaluate the
              methodology with a modest, fixed-cost pilot before committing to full-scale implementation.
              BERS invests its own performance on the data the diagnostic produces.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="break-inside-avoid rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Phase 1 · Diagnostic &amp; Pilot
                </p>
                <p className="mt-3 font-merriweather text-4xl font-black text-slate-900">$495</p>
                <p className="text-sm font-medium text-slate-500">Flat fee</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> On-site assessment &amp; baseline data</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Controlled pilot application</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Technical Diagnostic Report</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Objective Go/No-Go determination</li>
                </ul>
              </div>
              <div className="break-inside-avoid rounded-xl border-2 border-slate-900 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                  Phase 2 · Full Implementation
                </p>
                <p className="mt-3 font-merriweather text-4xl font-black text-slate-900">$8,500</p>
                <p className="text-sm font-medium text-slate-500">Starting price · scoped by Phase 1</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Full-scale protocol deployment</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Continuous monitoring &amp; verification</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Staff training on compliance framework</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" /> Formal Odor Management Plan for submission</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              No scientific or proprietary disclosures are included at any price point. BERS protects the
              intellectual property of its methodology; clients purchase outcomes, evidence, and regulatory
              deliverable documents.
            </p>
          </section>

          {/* TEAM */}
          <section id="team" className="print:break-before-page">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">05 · The BERS Institute Team</p>
            <h2 className="mt-2 font-merriweather text-3xl font-black text-slate-900">
              Delivered by Specialists in Complex Compliance
            </h2>

            <div className="mt-8 space-y-4">
              <div className="break-inside-avoid flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-lg font-black text-amber-400">
                  YA
                </div>
                <div>
                  <h3 className="font-merriweather text-lg font-black text-slate-900">Yohan Mauricio Ariza Aguilar</h3>
                  <p className="text-sm font-semibold text-amber-600">
                    Principal EHS &amp; Risk Management Consultant / Director
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Sixteen-plus years in risk management, ISO standards, and environmental compliance. Leads
                    the strategic engagement, regulatory interface, and client governance from assessment
                    through regulatory submission.
                  </p>
                </div>
              </div>

              <div className="break-inside-avoid flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-lg font-black text-amber-400">
                  AS
                </div>
                <div>
                  <h3 className="font-merriweather text-lg font-black text-slate-900">Alex Smith</h3>
                  <p className="text-sm font-semibold text-amber-600">
                    Lead Environmental &amp; Technical Specialist
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Designs the proprietary, site-specific remediation protocols for complex industrial
                    matrices and translates diagnostic data into engineered implementation programs.
                  </p>
                </div>
              </div>

              <div className="break-inside-avoid flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-lg font-black text-amber-400">
                  A&amp;S
                </div>
                <div>
                  <h3 className="font-merriweather text-lg font-black text-slate-900">
                    Alexander &amp; Santiago
                  </h3>
                  <p className="text-sm font-semibold text-amber-600">
                    Senior Environmental Field Engineers &amp; Data Analysts
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Execute on-site VOC monitoring, structured data logging, and regulatory compliance
                    reporting, ensuring empirical rigor at every stage of the engagement.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing / next steps */}
            <div className="mt-10 break-inside-avoid rounded-xl bg-slate-900 p-8 text-white">
              <h3 className="font-merriweather text-xl font-black">Next Steps</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                BERS recommends initiating Phase 1 within the current enforcement window to establish a
                documented remediation path. Scheduling is limited and is assigned by regulatory urgency.
                This proposal remains valid for 30 days from the date of issue.
              </p>
              <div className="mt-6 grid gap-3 border-t border-slate-700 pt-5 sm:grid-cols-3">
                <p className="flex items-center gap-2 text-xs text-slate-300">
                  <Phone className="h-4 w-4 text-amber-400" /> {CONTACT.phone}
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-300">
                  <Mail className="h-4 w-4 text-amber-400" /> {CONTACT.email}
                </p>
                <p className="flex items-center gap-2 text-xs text-slate-300">
                  <Globe className="h-4 w-4 text-amber-400" /> {CONTACT.website}
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-5">
              <p className="text-[11px] text-slate-400">
                BERS Institute LLC · {CONTACT.address}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                {CONTACT.website}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}