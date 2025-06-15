import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, P } from "./typography";
import { Mail, Phone } from "lucide-react";

export const Pros = () => (
  <div className="max-w-[60em]">
    <div className="flex flex-col content-center justify-center gap-4 p-2 py-8">
      <H1>FDA & USDA Food Recalls, Withdrawals, and Safety Alerts – Your Proactive Legal Resource</H1>
      <P>
        <strong>At Juris Law Group, P.C., we believe that staying ahead of regulatory challenges is as critical as reacting to them.</strong> Our Recall Center delivers real-time updates from the U.S. Food and Drug Administration (FDA) and the U.S. Department of Agriculture (USDA) to help food and beverage companies monitor product recalls, withdrawals, and safety alerts. By leveraging data directly from these authoritative APIs, we empower your business to proactively detect risk factors and implement preventive measures alongside responsive legal counsel.
      </P>
      <Separator />
      <H2>What Is a Food Recall?</H2>
      <P>A food recall is initiated when a product must be withdrawn from the market due to health risks or regulatory non-compliance. Recalls can occur for a variety of reasons:</P>
      <ul>
        <li><strong>Contamination</strong> by pathogens (e.g., Listeria, Salmonella)</li>
        <li><strong>Undeclared allergens</strong> or incorrect labeling</li>
        <li><strong>Presence of foreign materials</strong> (plastic, metal glass)</li>
        <li><strong>Production facility violations</strong> (GMP issues, sanitation deficiencies)</li>
      </ul>
      <P>Recalls are categorized into three classes:</P>
      <ul>
        <li><strong>Class I Recall:</strong> Indicates a reasonable probability that the use of the product will cause serious adverse health consequences or death.</li>
        <li><strong>Class II Recall:</strong> Suggests that use may cause temporary or medically reversible health effects.</li>
        <li><strong>Class III Recall</strong> Reflects minor violations unlikely to cause adverse health effects.</li>
      </ul>
      <P>At Juris Law Group, P.C., we provide legal guidance that covers every phase—from immediate response to long-term prevention strategies.</P>
      <Separator />
      <H2>Why Food Companies Should Monitor Recalls, Withdrawals, and Safety Alerts</H2>
      <H3>Proactive Monitoring is Your Best Defense</H3>
      <P>Staying informed about current FDA and USDA actions is not only essential for reaction but also for proactive risk management. Regular review of recall data offers crucial insights that help you strengthen your operational and compliance frameworks. Here’s why monitoring is a strategic imperative:</P>
      <ul>
        <li><strong>Detect Emerging Trends:</strong> Understand which issues&mdash;whether it’s recurring microbial contamination or labeling errors&mdash;are prompting regulatory action. This enables you to adjust your quality assurance protocols early.</li>
        <li><strong>Anticipate Supply Chain Vulnerabilities:</strong> By observing recalls across the industry, you can identify weak links in your own supply chain, ensuring that suppliers and co-packers adhere to stringent safety standards.</li>
        <li><strong>Benchmark and Innovate:</strong> Use recall data to benchmark your own practices against industry trends. This proactive approach helps refine your production processes and prevents avoidable mistakes.</li>
        <li><strong>Enhance Readiness:</strong> Continuous review of recall incidents prepares your team to respond swiftly and decisively, minimizing legal exposure and protecting your brand.</li>
        <li><strong>Build Credibility and Trust:</strong> A proactive stance on compliance demonstrates to regulators, retailers, and consumers that your company is committed to upholding the highest safety standards.</li>
      </ul>
      <P> Juris Law Group, P.C. not only assists with immediate recall responses but also helps you develop robust, proactive recall management plans tailored to your operational realities.</P>
      <Separator />
      <H2>Our Proactive & Reactive Recall Legal Services</H2>
      <P>We offer a full spectrum of services designed to help you navigate recalls—and prevent them from occurring. Our services include:</P>
      <ul>
        <li><strong>Real-Time Recall Monitoring:</strong> Auto-populated feeds from the openFDA Food Enforcement Reports and USDA FSIS Recall APIs to keep you informed at all times.</li>
        <li><strong>Comprehensive Recall Management Plans:</strong> Develop proactive recall readiness plans, including standard operating procedures, staff training, and supplier audits.</li>
        <li><strong>Crisis Response & Communication:</strong> Immediate legal counsel for drafting press releases, regulatory notifications, and managing communication with retailers and distributors when a recall occurs.</li>
        <li><strong>Supply Chain & Contract Audits:</strong> Review co-manufacturer and supplier agreements to identify vulnerabilities that could lead to recall-triggering incidents.</li>
        <li><strong>Regulatory Compliance Audits:</strong> Periodic reviews of your operational compliance with FDA/USDA guidelines and industry best practices.</li>
        <li><strong>Benchmarking & Trend Analysis:</strong> Regular reports on industry recall trends that help you benchmark your practices and implement improvements before problems occur.</li>
      </ul>
      <Separator />
      <H2>Live Recall Feed from FDA and USDA</H2>
      <P>Below you will find a live, dynamic feed updated directly from the <a href="https://open.fda.gov/apis/food/enforcement/">openFDA Food Enforcement API</a> and the <a href="https://www.fsis.usda.gov/science-data/developer-resources/recall-api">USDA FSIS Recall API</a>. You can filter recalls by agency, recall class, product type, or search by keyword. Each listing includes:</P>
      <ul>
        <li><strong>Recall Date</strong></li>
        <li><strong>Product Name</strong></li>
        <li><strong>Reason for Recall</strong></li>
        <li><strong>Affected Regions</strong></li>
        <li><strong>Direct Link</strong> to the official FDA or USDA notice</li>
        <li><strong>Quick Access:</strong> "Need Legal Help?" option for immediate consultation</li>
      </ul>
      <Separator />
      <H2>FAQ – Essential Food Recall Legal Questions</H2>
      <H3>How do I know if my product has been recalled?</H3>
      <P>Search this page or review the live feed for your product name. If a recall is listed, contact us immediately for an assessment of your compliance obligations and potential exposure.</P>
      <H3>What are the legal risks of ignoring a recall?</H3>
      <P>Ignoring a recall can result in significant civil penalties, criminal liability, loss of market registration, and severe brand damage. Regulatory bodies may issue warning letters, observe serious violations, or even initiate lawsuits.</P>
      <H3>How can I prepare for future recalls?</H3>
      <P>Juris Law Group, P.C. assists companies with proactive recall readiness, including comprehensive compliance audits, supplier contract reviews, staff training, and the creation of detailed recall response plans. Our proactive strategies are designed to mitigate risk and avoid costly enforcement actions.</P>
      <Separator />
      <H3>Take Action: Protect Your Brand and Business</H3>
      <H2>Was Your Product Recalled? Or Are You Simply Looking to Stay Ahead?</H2>
      <P>Juris Law Group, P.C. represents food and beverage companies in both reactive and proactive legal strategies. Let us help you navigate recalls, strengthen your supply chain, and build robust compliance measures to ensure your brand remains resilient.</P>
      <div className="flex flex-wrap gap-3"><a href="tel:+18006805559" className="flex items-center text-stone-100 "><Button className="bg-[#086AAB] hover:bg-[#055589] hover:text-stone-100"><Phone size={16} />Schedule a Consultation</Button></a><a href="mailto:connect@jurislawgroup.com" className="flex items-center text-stone-100"><Button className="bg-[#086AAB] hover:bg-[#055589] hover:text-stone-100"><Mail size={16} /> Contact Our Recall Team</Button></a></div>
    </div>
  </div>
)
