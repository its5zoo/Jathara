export interface LeadershipProfile {
  id: string;
  name: string;
  position: string;
  honorific?: string;
  category: "governance" | "executive" | "administration";
  imageSrc: string;
  fallbackInitials: string;
  education: string[];
  keyHighlights: string[];
  summaryBio: string;
  fullBio: string;
  institutionalQuote?: string;
}

export interface UniversityMilestone {
  year: string;
  title: string;
  description: string;
  verifiedSource: string;
}

export interface UniversityStat {
  value: string;
  label: string;
  subtext: string;
}

/**
 * Exact, verified 5 institutional leaders of GIET University, Gunupur
 * Source: https://www.giet.edu/leadership/
 */
export const GIET_LEADERSHIP_PROFILES: LeadershipProfile[] = [
  {
    id: "dr-satya-prakash-panda",
    name: "Dr. Satya Prakash Panda",
    position: "President",
    honorific: "Prof. (Dr.)",
    category: "governance",
    imageSrc: "/images/leadership/dr-satya-prakash-panda.jpg",
    fallbackInitials: "SPP",
    education: [
      "Venerable Founder Chairman of the Gandhi Group of Institutions",
      "Philanthropist, Gandhian Educationalist & Social Reformer"
    ],
    keyHighlights: [
      "Founded flagship institution GIET at Gunupur in 1997 under Vidya Bharati Educational Trust (VBET)",
      "Pioneered higher technical education in the historically underserved tribal hinterlands of South Odisha",
      "Recipient of prestigious state and national honors for distinguished services to education and social empowerment",
      "Steered the institution from its nascent beginnings to a recognized state private university"
    ],
    summaryBio:
      "Visionary founder chairman of the Gandhi Group of Institutions who pioneered higher technical education in Gunupur, transforming the tribal heartlands of Southern Odisha into a thriving academic hub.",
    fullBio:
      "Over the past 28 years, GIET University, Gunupur has achieved defining milestones towards its vision of transforming lives through comprehensive, high-quality education. It all started from scratch through the steadfast vision of Prof. (Dr) Satya Prakash Panda, the venerable founder chairman of the Gandhi Group of Institutions. A visionary academician, he dared to establish his flagship institution GIET in Gunupur — the tribal hinterland of Odisha — acting as an enduring growth engine for an overlooked region of Eastern India. Recipient of several awards for services to the nation, Dr. Panda is a humble Gandhian educationalist, philanthropist, and social worker who practices excellence in all facets of life. Known for his intellectual integrity, humanism, and open-hearted mentorship, he has inspired generations of engineers, researchers, and grassroots changemakers.",
    institutionalQuote:
      "Education in the hinterlands is not merely an academic endeavor; it is the ultimate engine of human dignity, regional transformation, and sustainable self-reliance."
  },
  {
    id: "dr-chandra-dhwaj-panda",
    name: "Dr. Chandra Dhwaj Panda",
    position: "Vice President",
    honorific: "Dr.",
    category: "governance",
    imageSrc: "/images/leadership/dr-chandra-dhwaj-panda.jpg",
    fallbackInitials: "CDP",
    education: [
      "Scholar of Economics",
      "Co-founder, Gandhi Group of Institutions (VBET)"
    ],
    keyHighlights: [
      "Co-founded the Gandhi Group of Institutions alongside Dr. Satya Prakash Panda",
      "Iconic academic figure in Eastern Indian technical education and economic thought",
      "Judiciously integrates ancient philosophical values with modern technological management",
      "Guides institutional strategy, faculty excellence, and student motivational programs"
    ],
    summaryBio:
      "Co-founder of the Gandhi Group of Institutions and scholar of economics, recognized as an iconic educator who bridges foundational Indian values with cutting-edge technology and management systems.",
    fullBio:
      "We live in a world intensely driven by knowledge, where knowledge is power. Exercising this power with diligence and dynamism is a formidable task that requires a mindset combining wisdom and professionalism — qualities personified in Dr. Chandradhwaj Panda, co-founder of the legendary Gandhi Group (owned by Vidya Bharati Educational Trust) and an iconic figure in technical education across Eastern India. Dr. Panda is characterized by a judicious blend of the values of our ancient wisdom and rapidly evolving concepts in technology and management. A distinguished scholar of Economics, an endearing professor, and a trusted friend to the common citizen, he inspires thousands of learners with his ability to lead the curious mind from knowledge to actionable wisdom.",
    institutionalQuote:
      "Knowledge becomes truly powerful only when guided by ethical wisdom, empathy for society, and relentless diligence."
  },
  {
    id: "dr-jagadish-panda",
    name: "Dr. Jagadish Panda",
    position: "Director General",
    honorific: "Dr.",
    category: "executive",
    imageSrc: "/images/leadership/dr-jagadish-panda.jpeg",
    fallbackInitials: "JP",
    education: [
      "M.Tech in Computer Science & Engineering",
      "Ph.D in Computer Science & Engineering"
    ],
    keyHighlights: [
      "Trustee of Vidya Bharati Educational Trust and executive leadership anchor of GIET University",
      "Provides strategic guidance balancing technological expansion with grassroots social responsibility",
      "Champions universal quality primary education through Gandhi Public School (GPS), Gunupur",
      "Drives international partnerships, campus digital transformation, and university research facilities"
    ],
    summaryBio:
      "Dynamic computer science scholar and institutional leader steering university development, research infrastructure, and foundational education across the Eastern Ghats.",
    fullBio:
      "GIET University draws much of its vitality and forward-looking momentum from its Director General, Dr. Jagadish Panda. An energetic and dynamic academic leader, Dr. Panda holds an M.Tech and Ph.D in Computer Science & Engineering. He exemplifies passion, technical acumen, and institutional commitment with an expansive global outlook. Serving both as a Trustee of Vidya Bharati Educational Trust and as Director General, his contributions toward the university's academic modernization and infrastructural scale are exemplary. He provides critical guidance to maintain harmony between financial growth and social responsibility, fostering team-oriented governance that invites diverse perspectives. Deeply devoted to child welfare and foundational learning, his commitment is reflected in his passionate stewardship of the Gandhi Public School (GPS) in Gunupur.",
    institutionalQuote:
      "Modern universities must balance global technological sophistication with deep community responsibility. Innovation is authentic only when it reaches the grassroots."
  },
  {
    id: "prof-goutam-ghosh",
    name: "Prof. Goutam Ghosh",
    position: "Vice Chancellor",
    honorific: "Prof.",
    category: "executive",
    imageSrc: "/images/leadership/prof-goutam-ghosh.jpg",
    fallbackInitials: "GG",
    education: [
      "Alumnus of IIT Kharagpur and IIT Delhi",
      "Former World Bank Scholar at University of Wageningen, Netherlands (Subject QS Rank #2)"
    ],
    keyHighlights: [
      "Distinguished career spanning premier academia, the Ministry of Science & Technology (Govt of India), and major biopharma industry",
      "Established landmark innovation centers including Atal Community Innovation Centre (ACIC) and BIRAC e-YUVA Innovation Centre with multi-crore public grants",
      "Led translational research resulting in India's first Dengue Vaccine candidate (collaborating with NIH, Maryland, USA; currently in Phase III trials)",
      "Raised over ₹50 Crores in research and translational development grants across his career",
      "Recipient of the Dr. Sosil Kumar Jain-AMI Award (2024); Vice President of Asian Federation of Biotechnology, Seoul"
    ],
    summaryBio:
      "IIT alumnus, former World Bank Scholar, and translational biotechnology pioneer who has led national vaccine innovation, raised over ₹50 Cr in scientific funding, and established premier incubation ecosystems.",
    fullBio:
      "Prof. Goutam Ghosh carries a unique blend of high-impact leadership spanning academia, national government, and translational biotechnology industry. He previously served as Senior Vice President and CEO of major industry enterprises and in the Ministry of Science & Technology, Government of India. A former prestigious World Bank Scholar, he conducted research and teaching at Wageningen University in the Netherlands. An alumnus of IIT Kharagpur and IIT Delhi, Prof. Ghosh has introduced sustainable academic disciplines and established pivotal innovation infrastructure, including the Atal Community Innovation Centre (ACIC) and the Biotech e-YUVA Innovation Centre supported by multi-crore public grants. In translational research and product development, he successfully spearheaded the development of multiple biological products, including India's first Dengue Vaccine in collaboration with the National Institutes of Health (NIH), Maryland, USA. He co-founded a specialized vaccine R&D venture developing vaccines for Hepatitis-E (consortium with AIIMS, THSTI, PGI Chandigarh), Chikungunya, and animal pox. Prof. Ghosh has represented India on technology missions across WHO Geneva, the Butantan Institute in Brazil, the Chinese Academy of Sciences in Wuhan, and Grenoble institutions in France through the Indian National Academy of Engineering. He is the recipient of the Dr. Sosil Kumar Jain-AMI Award (2024), serves as Vice President of the Asian Federation of Biotechnology in Seoul, and is a passionate long-distance cyclist who once pedaled from Kolkata to Kathmandu.",
    institutionalQuote:
      "True translational research bridges the gap between scientific publications in laboratories and life-saving technologies deployed in the hands of citizens."
  },
  {
    id: "dr-nv-jagannadha-rao",
    name: "Dr. N. V. Jagannadha Rao",
    position: "Registrar",
    honorific: "Dr.",
    category: "administration",
    imageSrc: "/images/leadership/dr-nv-jagannadha-rao.jpg",
    fallbackInitials: "NVJR",
    education: [
      "MBA in Management",
      "Ph.D in Management"
    ],
    keyHighlights: [
      "Over 25 years of continuous administrative, academic, and governance experience at GIET",
      "Associated with the institution since its inception in 1997",
      "Oversees university regulatory compliance, statutory governance, admissions, and policy execution",
      "Recognized for student mentoring, counseling, and alignment with modern professional market realities"
    ],
    summaryBio:
      "Foundational administrative leader with over 25 years of service at GIET since 1997, overseeing university compliance, statutory governance, and student-centered administration.",
    fullBio:
      "Dr. N. V. Jagannadha Rao is a versatile institutional administrator and thought leader with over 25 years of academic and operational experience. Holding an MBA and Ph.D in Management, Dr. Rao has served the institution faithfully since its founding in 1997. He provides the administrative backbone of GIET University, upholding regulatory integrity, institutional policies, and statutory compliance with All India Council for Technical Education (AICTE), University Grants Commission (UGC), and state government bodies. Renowned for his student-first mentorship, he actively counsels students through academic, professional, and career challenges, ensuring that university graduates emerge capable, disciplined, and industry-ready.",
    institutionalQuote:
      "Academic administration is meaningful when it ensures integrity in governance while keeping every student's aspirations, dignity, and future at the center of institutional policy."
  }
];

/**
 * Verified Institutional Facts & Chronology of GIET University
 * Sources: https://www.giet.edu/about-giet/ and https://www.giet.edu/why-giet/
 */
export const GIET_VERIFIED_MILESTONES: UniversityMilestone[] = [
  {
    year: "1997",
    title: "Founding by Vidya Bharati Educational Trust",
    description:
      "Established in Gunupur, Rayagada district, Odisha, as the Gandhi Institute of Engineering and Technology (GIET) with approval from the All India Council for Technical Education (AICTE), New Delhi, to pioneer high-caliber technical education in the Eastern Ghats tribal region.",
    verifiedSource: "AICTE Approval & Vidya Bharati Educational Trust Charter (1997)"
  },
  {
    year: "2005–2026",
    title: "NAAC Accreditation & NBA Recognition",
    description:
      "Accredited by the National Assessment and Accreditation Council (NAAC), with multiple B.Tech disciplines repeatedly accredited by the National Board of Accreditation (NBA) for first-rate outcome-based technical education.",
    verifiedSource: "NAAC Institutional Accreditation & NBA Programme Reports"
  },
  {
    year: "2018",
    title: "University Status Conferred by Odisha Assembly",
    description:
      "Conferred the status of a State Private University through the passage of the GIET University Act, 2018 by the Odisha Legislative Assembly, with formal recognition and concurrence by the University Grants Commission (UGC), New Delhi.",
    verifiedSource: "Odisha Gazette / GIET University Act, 2018 (Act 23 of 2018)"
  },
  {
    year: "2019",
    title: "Formal UGC Enlistment under Section 2(f)",
    description:
      "Incorporated in the official list of recognized universities maintained by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956.",
    verifiedSource: "UGC Notification & Enlistment Directory (2019)"
  },
  {
    year: "2020+",
    title: "DSIR Scientific Recognition & Innovation Centers",
    description:
      "Recognized by the Department of Scientific and Industrial Research (DSIR) as an institution of high-quality scientific research; established the Atal Community Innovation Centre (ACICGIETU) and BIRAC E-YUVA Innovation Centre to foster biotechnology and community entrepreneurship.",
    verifiedSource: "DSIR Scientific Recognition & Ministry of Science & Technology Grants"
  },
  {
    year: "2026",
    title: "Host Campus for ISF Startup Jathara 2026",
    description:
      "Selected as the official academic host campus for ISF Startup Jathara 2026 @ Dandakaranya, convening grassroots innovators, venture capital syndicates, and rural founders on its 113-acre green residential campus.",
    verifiedSource: "ISF & GIET University Official Summit Announcement"
  }
];

export const GIET_VERIFIED_STATS: UniversityStat[] = [
  {
    value: "28+",
    label: "Years of Academic Distinction",
    subtext: "Founded in 1997 by Vidya Bharati Educational Trust"
  },
  {
    value: "113.03",
    label: "Acres Eco-Friendly Campus",
    subtext: "Nestled along the Bansadhara River in the Eastern Ghats"
  },
  {
    value: "300+",
    label: "Distinguished Faculty Members",
    subtext: "Experienced professors, doctoral researchers & mentors"
  },
  {
    value: "4,000+",
    label: "Students on Campus",
    subtext: "Enrolled across engineering, agriculture, sciences & management"
  },
  {
    value: "40+",
    label: "Academic & Professional Programmes",
    subtext: "Diploma, undergraduate, postgraduate & doctoral degrees"
  },
  {
    value: "98%",
    label: "Alumni Employed or Founded Startups",
    subtext: "Global network of technocrats, researchers & founders"
  }
];

export const GIET_ACADEMIC_SCHOOLS = [
  {
    name: "School of Engineering & Technology",
    desc: "Flagship school offering advanced engineering disciplines, smart computing laboratories, robotics centers, and core engineering tracks with multi-term NBA accreditations.",
    badge: "Flagship School"
  },
  {
    name: "School of Agriculture",
    desc: "ICAR-accredited agricultural education, regional soil and agronomy testbeds, organic crop trials, and bio-input farming support for local rural communities.",
    badge: "ICAR Accredited"
  },
  {
    name: "School of Sciences",
    desc: "Advanced basic and applied sciences, biotechnology, environmental chemistry, and material sciences driving DSIR-recognized laboratory investigations.",
    badge: "Research Focused"
  },
  {
    name: "School of Management Studies",
    desc: "Undergraduate and MBA programmes focused on rural agribusiness, financial management, digital supply chains, and social entrepreneurship.",
    badge: "Enterprise & Strategy"
  },
  {
    name: "School of Humanities & Social Sciences",
    desc: "Interdisciplinary study of regional economics, indigenous culture, language technologies, and policy for Eastern Ghats development.",
    badge: "Community & Culture"
  },
  {
    name: "School of Pharmacy & School of Nursing",
    desc: "Healthcare and pharmaceutical training approved by the Pharmacy Council of India and Indian Nursing Council, supporting healthcare access in South Odisha.",
    badge: "Healthcare & Lifesciences"
  }
];

export const GIET_INNOVATION_ECOSYSTEM = [
  {
    title: "Atal Community Innovation Centre (ACIC)",
    desc: "NITI Aayog-supported ACICGIETU fostering grassroots innovation, community technology transfer, and youth enterprise across the unserved districts of Odisha.",
    tag: "NITI Aayog / ACIC"
  },
  {
    title: "BIRAC E-YUVA Innovation Centre",
    desc: "Biotechnology Industry Research Assistance Council (BIRAC) supported centre empowering student entrepreneurs with biotech and life sciences testbeds.",
    tag: "Biotechnology & Healthcare"
  },
  {
    title: "Technology Business Incubator (TBI) & Incubatex",
    desc: "Comprehensive pre-incubation and startup acceleration pipeline providing prototyping space, seed grants, intellectual property counseling, and investor connections.",
    tag: "Startup Acceleration"
  },
  {
    title: "DSIR Scientific & Industrial Research Facility",
    desc: "Recognized as a Scientific and Industrial Research Organization (SIRO) by the Department of Scientific and Industrial Research, Ministry of Science & Technology.",
    tag: "Government Recognized"
  }
];
