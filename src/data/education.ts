import type { Localized } from '../i18n';

export interface EducationItem {
  degree: Localized;
  major: Localized;
  institution: Localized;
  location: Localized;
  period: Localized;
  status: Localized;
  description: Localized;
  focusAreas: Localized[];
  coursework: Localized[];
}

export interface PublicationItem {
  slug: string;
  /** Paper title: identical in both languages. */
  title: string;
  conference: Localized;
  role: Localized;
  date: Localized;
  status: Localized;
  abstract: Localized;
  authors: Localized[];
  paperPdf: string;
  projectSlug: string;
  postSlug: string;
  githubUrl: string;
  metrics: { label: Localized; value: Localized; note: Localized }[];
}

export interface CertificateItem {
  id: string;
  /** Official certificate name: identical in both languages. */
  title: string;
  /** Official issuer name: identical in both languages. */
  issuer: string;
  issuerBadge?: string;
  issueDate: Localized;
  credentialId?: string;
  credentialUrl?: string;
  category: Localized;
  skills: Localized[];
  summary: Localized;
  featured?: boolean;
}

export interface AcademicBadgeItem {
  id: string;
  code: string;
  title: Localized;
  issuer: Localized;
  program: Localized;
  description: Localized;
  focus: Localized[];
  credentialId?: string;
  credentialUrl?: string;
}

/** Same text in both languages (official names, technical terms). */
const same = (text: string): Localized => ({ en: text, vi: text });

export const EDUCATION_DATA: EducationItem = {
  degree: {
    en: "Bachelor of Science in Artificial Intelligence",
    vi: "Cử nhân Trí tuệ Nhân tạo"
  },
  major: { en: "Artificial Intelligence", vi: "Trí tuệ Nhân tạo" },
  institution: { en: "FPT University", vi: "Đại học FPT" },
  location: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam" },
  period: {
    en: "Oct 2023 – Dec 2026 (Expected Graduation)",
    vi: "10/2023 – 12/2026 (Dự kiến tốt nghiệp)"
  },
  status: {
    en: "Final-year Student / Senior Undergraduate",
    vi: "Sinh viên năm cuối"
  },
  description: {
    en: "Focused on research and development of modern Artificial Intelligence systems: multimodal Deep Learning, inference optimization for large and small language models (LLM/SLM), adaptive RAG routing architectures, and hardware-optimized Edge AI deployment.",
    vi: "Chuyên sâu vào nghiên cứu và phát triển hệ thống Trí tuệ Nhân tạo hiện đại: Deep Learning đa phương thức, tối ưu hóa suy luận mô hình ngôn ngữ lớn (LLM/SLM), kiến trúc định tuyến RAG thích ứng và triển khai Edge AI tối ưu phần cứng."
  },
  focusAreas: [
    {
      en: "Multimodal Deep Learning & Representation",
      vi: "Deep Learning đa phương thức & Biểu diễn dữ liệu"
    },
    {
      en: "Retrieval-Augmented Generation (RAG) & Adaptive Model Routing",
      vi: "Retrieval-Augmented Generation (RAG) & Định tuyến mô hình thích ứng"
    },
    {
      en: "Natural Language Inference (NLI) & Context Conflict Detection",
      vi: "Natural Language Inference (NLI) & Phát hiện mâu thuẫn ngữ cảnh"
    },
    {
      en: "On-device & Edge AI Inference Optimization (TFLite / INT8)",
      vi: "Tối ưu suy luận On-device & Edge AI (TFLite / INT8)"
    }
  ],
  coursework: [
    { en: "Deep Learning & Neural Networks", vi: "Deep Learning & Mạng nơ-ron" },
    { en: "Natural Language Processing (NLP)", vi: "Xử lý ngôn ngữ tự nhiên (NLP)" },
    { en: "Computer Vision & Pattern Recognition", vi: "Thị giác máy tính & Nhận dạng mẫu" },
    { en: "Advanced Data Structures & Algorithms", vi: "Cấu trúc dữ liệu & Giải thuật nâng cao" },
    {
      en: "Linear Algebra & Probability for Machine Learning",
      vi: "Đại số tuyến tính & Xác suất cho Machine Learning"
    },
    { en: "Distributed Systems & Cloud Computing", vi: "Hệ thống phân tán & Điện toán đám mây" },
    {
      en: "Software Engineering & System Architecture",
      vi: "Kỹ thuật phần mềm & Kiến trúc hệ thống"
    }
  ]
};

export const PUBLICATION_DATA: PublicationItem = {
  slug: "conflict-aware-rag-routing",
  title: "Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction",
  conference: same("IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems"),
  role: { en: "First Author", vi: "Tác giả chính" },
  date: { en: "August 2026", vi: "Tháng 8/2026" },
  status: {
    en: "Peer-Reviewed, Accepted & Presented · To appear (DOI pending)",
    vi: "Đã qua bình duyệt, được chấp nhận & đã trình bày · Sắp xuất bản (chờ DOI)"
  },
  abstract: {
    en: "Adaptive model routing reduces Retrieval-Augmented Generation (RAG) cost, but traditional retrieval confidence fails when retrieved passages contradict each other. We propose a bidirectional NLI context-conflict scoring mechanism and a 5-feature hybrid random forest router. Evaluated across 3,000 multi-hop reasoning questions (MuSiQue, HotpotQA, 2WikiMultiHopQA), our pipeline saves ~35% of frontier API calls while retaining 83.2%–92.2% of Always-LLM F1 score, with subgroup F1 gains up to +14.35 points in conflicting context scenarios.",
    vi: "Định tuyến mô hình thích ứng giúp giảm chi phí Retrieval-Augmented Generation (RAG), nhưng độ tin cậy truy xuất truyền thống thất bại khi các đoạn văn được truy xuất mâu thuẫn với nhau. Chúng tôi đề xuất cơ chế chấm điểm mâu thuẫn ngữ cảnh bằng NLI hai chiều và một router random forest lai dùng 5 đặc trưng. Đánh giá trên 3.000 câu hỏi suy luận multi-hop (MuSiQue, HotpotQA, 2WikiMultiHopQA), pipeline của chúng tôi tiết kiệm ~35% lượt gọi API frontier trong khi giữ lại 83,2%–92,2% điểm F1 của Always-LLM, với mức tăng F1 theo nhóm con lên tới +14,35 điểm trong các tình huống ngữ cảnh mâu thuẫn."
  },
  authors: [
    { en: "Đặng Phương Nam (First Author · FPT University)", vi: "Đặng Phương Nam (Tác giả chính · Đại học FPT)" },
    { en: "Tran Huy Tuan (FPT University)", vi: "Tran Huy Tuan (Đại học FPT)" },
    { en: "Doan Duy Long (FPT University)", vi: "Doan Duy Long (Đại học FPT)" },
    {
      en: "Cao Van Mai (Faculty of Artificial Intelligence, FPT University)",
      vi: "Cao Van Mai (Khoa Trí tuệ Nhân tạo, Đại học FPT)"
    }
  ],
  paperPdf: "/paper_93.pdf",
  projectSlug: "conflict-aware-rag-routing",
  postSlug: "conflict-aware-rag-routing",
  githubUrl: "https://github.com/RAG-Routing-Via-Context-Confliction/RAG_Router_Via_Context_Conflict",
  metrics: [
    {
      label: { en: "API Cost Saved", vi: "Chi phí API tiết kiệm" },
      value: same("~35%"),
      note: { en: "Target 65% budget calibration", vi: "Hiệu chỉnh theo mục tiêu ngân sách 65%" }
    },
    {
      label: { en: "Always-LLM F1 Retained", vi: "F1 Always-LLM giữ lại" },
      value: { en: "83.2%–92.2%", vi: "83,2%–92,2%" },
      note: same("MuSiQue, HotpotQA, 2Wiki")
    },
    {
      label: { en: "Subgroup F1 Gain", vi: "Mức tăng F1 nhóm con" },
      value: { en: "+14.35 pts", vi: "+14,35 điểm" },
      note: {
        en: "High-conflict scenarios (p = 0.006)",
        vi: "Tình huống mâu thuẫn cao (p = 0,006)"
      }
    },
    {
      label: { en: "Benchmark Scale", vi: "Quy mô benchmark" },
      value: { en: "3,000", vi: "3.000" },
      note: { en: "Multi-hop reasoning questions", vi: "Câu hỏi suy luận multi-hop" }
    }
  ]
};

export const ICITDA_PUBLICATION_DATA: PublicationItem = {
  slug: "probabilistic-stock-breakout-vietnam",
  title: "Probabilistic Modeling of Stock Breakout Success during Consolidation Phases in the Vietnamese Equity Market",
  conference: same("ICITDA 2026: The 11th International Conference on Information Technology and Digital Applications"),
  role: { en: "Co-Author", vi: "Đồng tác giả" },
  date: same("2026"),
  status: {
    en: "Accepted · Archive Manuscript (Non-presented)",
    vi: "Được chấp nhận · Bản thảo lưu trữ (không trình bày)"
  },
  abstract: {
    en: "Breakout strategies from price consolidation frequently suffer from false breakouts in emerging markets. We propose a probabilistic modeling framework combining strictly causal data alignment (X_t ← X_{t-1}) over 255 liquid Vietnamese equities (2010–2026) with Minervini SEPA-inspired volatility contraction (VCP) and volume dynamics. On a 2024–2026 out-of-sample test set (216 breakout events), our LightGBM model achieves Precision@10 = 0.9000 (90.0% win rate vs. 49.07% market baseline) and a 72.5% win rate with 4.89 profit factor at P > 0.8.",
    vi: "Chiến lược breakout từ vùng tích lũy giá thường gặp phải breakout giả ở các thị trường mới nổi. Chúng tôi đề xuất một framework mô hình hóa xác suất, kết hợp căn chỉnh dữ liệu nhân quả nghiêm ngặt (X_t ← X_{t-1}) trên 255 cổ phiếu Việt Nam có thanh khoản cao (2010–2026) với đặc trưng co hẹp biến động (VCP) lấy cảm hứng từ Minervini SEPA và động lực khối lượng. Trên tập kiểm tra out-of-sample 2024–2026 (216 sự kiện breakout), mô hình LightGBM của chúng tôi đạt Precision@10 = 0,9000 (tỷ lệ thắng 90,0% so với baseline thị trường 49,07%) và tỷ lệ thắng 72,5% với profit factor 4,89 tại P > 0,8."
  },
  authors: [
    { en: "Doan Duy Long (FPT University)", vi: "Doan Duy Long (Đại học FPT)" },
    { en: "Tran Huy Tuan (FPT University)", vi: "Tran Huy Tuan (Đại học FPT)" },
    { en: "Đặng Phương Nam (FPT University)", vi: "Đặng Phương Nam (Đại học FPT)" },
    {
      en: "Cao Van Mai (Faculty of Artificial Intelligence, FPT University)",
      vi: "Cao Van Mai (Khoa Trí tuệ Nhân tạo, Đại học FPT)"
    }
  ],
  paperPdf: "/icitda_2026_stock_breakout.pdf",
  projectSlug: "probabilistic-stock-breakout-vietnam",
  postSlug: "probabilistic-stock-breakout-vietnam",
  githubUrl: "https://github.com/zafkielzz",
  metrics: [
    {
      label: { en: "Top-10 Precision", vi: "Precision Top-10" },
      value: { en: "90.00%", vi: "90,00%" },
      note: { en: "Precision@10 (vs 49.07% baseline)", vi: "Precision@10 (so với baseline 49,07%)" }
    },
    {
      label: { en: "P > 0.8 Win Rate", vi: "Tỷ lệ thắng P > 0,8" },
      value: { en: "72.5%", vi: "72,5%" },
      note: { en: "40 out-of-sample trades", vi: "40 giao dịch out-of-sample" }
    },
    {
      label: same("Profit Factor"),
      value: { en: "4.89", vi: "4,89" },
      note: { en: "Simulated P > 0.8 threshold", vi: "Mô phỏng tại ngưỡng P > 0,8" }
    },
    {
      label: { en: "Equities Universe", vi: "Tập cổ phiếu" },
      value: same("255"),
      note: {
        en: "HOSE/HNX market cap > 2,500B VND",
        vi: "Vốn hóa HOSE/HNX > 2.500 tỷ VND"
      }
    }
  ]
};

export const PUBLICATIONS_LIST: PublicationItem[] = [
  PUBLICATION_DATA,
  ICITDA_PUBLICATION_DATA
];

const CAT_ADVANCED_AI: Localized = { en: "Advanced AI & Research", vi: "AI nâng cao & Nghiên cứu" };
const CAT_ENTERPRISE_AI: Localized = { en: "Enterprise AI & Systems", vi: "AI doanh nghiệp & Hệ thống" };
const CAT_SOFTWARE_ENG: Localized = { en: "Software Engineering", vi: "Kỹ thuật phần mềm" };
const CAT_ENG_MANAGEMENT: Localized = { en: "Engineering & Management", vi: "Kỹ thuật & Quản lý" };
const CAT_AI_FOUNDATIONS: Localized = { en: "AI Foundations", vi: "Nền tảng AI" };

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-rl-alberta",
    title: "Reinforcement Learning Specialization",
    issuer: "University of Alberta • Alberta Machine Intelligence Institute (Amii)",
    issueDate: { en: "July 2026", vi: "Tháng 7/2026" },
    credentialId: "6YIVZZJXFS9D",
    credentialUrl: "https://www.coursera.org/verify/specialization/6YIVZZJXFS9D",
    category: CAT_ADVANCED_AI,
    featured: true,
    skills: [
      { en: "Markov Decision Processes (MDPs)", vi: "Quá trình quyết định Markov (MDP)" },
      { en: "Dynamic Programming", vi: "Quy hoạch động" },
      same("Temporal-Difference Learning (TD)"),
      same("Q-Learning & SARSA"),
      same("Deep Q-Networks (DQN)"),
      same("Policy Gradient & Actor-Critic")
    ],
    summary: {
      en: "Rigorous 4-course specialization covering mathematical foundations and algorithms of reinforcement learning, exploration vs. exploitation trade-offs, function approximation, and deep policy gradient optimization taught by Martha White & Adam White (Amii).",
      vi: "Chuỗi 4 khóa học chuyên sâu về nền tảng toán học và thuật toán của reinforcement learning, đánh đổi giữa exploration và exploitation, xấp xỉ hàm và tối ưu deep policy gradient, do Martha White & Adam White (Amii) giảng dạy."
    }
  },
  {
    id: "cert-nlp-deeplearning-ai",
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    issueDate: { en: "October 2025", vi: "Tháng 10/2025" },
    credentialId: "0VK0BHTSO6JG",
    credentialUrl: "https://www.coursera.org/verify/specialization/0VK0BHTSO6JG",
    category: CAT_ADVANCED_AI,
    featured: true,
    skills: [
      { en: "Transformer Architectures", vi: "Kiến trúc Transformer" },
      same("Multi-Head Self-Attention"),
      { en: "Sequence-to-Sequence Models", vi: "Mô hình Sequence-to-Sequence" },
      same("Word Embeddings (Word2Vec / GloVe)"),
      same("Question Answering & NLI"),
      same("DeBERTa / BERT Fine-Tuning")
    ],
    summary: {
      en: "Comprehensive 4-course technical specialization covering sentiment analysis, word vectors, probabilistic language models, sequence models (LSTMs/GRUs), attention mechanisms, and Transformer fine-tuning directly relevant to NLP research.",
      vi: "Chuỗi 4 khóa học kỹ thuật toàn diện về phân tích cảm xúc, word vector, mô hình ngôn ngữ xác suất, mô hình chuỗi (LSTM/GRU), cơ chế attention và fine-tune Transformer, liên quan trực tiếp đến nghiên cứu NLP."
    }
  },
  {
    id: "cert-nvidia-dli-dl",
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA (Deep Learning Institute)",
    issueDate: { en: "July 2025", vi: "Tháng 7/2025" },
    credentialId: "CT2gJELTTTSKMklmVlQMuA",
    credentialUrl: "https://learn.nvidia.com/certificates?id=CT2gJELTTTSKMklmVlQMuA",
    category: CAT_ADVANCED_AI,
    featured: true,
    skills: [
      { en: "GPU-Accelerated Computing", vi: "Tính toán tăng tốc bằng GPU" },
      { en: "Convolutional Neural Networks (CNNs)", vi: "Mạng nơ-ron tích chập (CNN)" },
      { en: "Computer Vision Architectures", vi: "Kiến trúc Computer Vision" },
      same("Transfer Learning & Fine-Tuning"),
      { en: "Pretrained Model Deployment", vi: "Triển khai mô hình pretrained" },
      { en: "Inference Optimization", vi: "Tối ưu suy luận" }
    ],
    summary: {
      en: "Hands-on competency in designing, training, and deploying deep neural networks for computer vision and NLP using PyTorch and GPU-accelerated computing on NVIDIA hardware.",
      vi: "Năng lực thực hành thiết kế, huấn luyện và triển khai mạng nơ-ron sâu cho computer vision và NLP bằng PyTorch và tính toán tăng tốc GPU trên phần cứng NVIDIA."
    }
  },
  {
    id: "cert-ibm-enterprise-workflow",
    title: "IBM AI Enterprise Workflow Specialization",
    issuer: "IBM",
    issueDate: { en: "May 2026", vi: "Tháng 5/2026" },
    credentialId: "QJRJHKA4MZEE",
    credentialUrl: "https://www.coursera.org/verify/specialization/QJRJHKA4MZEE",
    category: CAT_ENTERPRISE_AI,
    featured: true,
    skills: [
      { en: "Enterprise AI Lifecycle", vi: "Vòng đời AI doanh nghiệp" },
      { en: "Data Ingestion & Feature Engineering", vi: "Thu nạp dữ liệu & Feature Engineering" },
      { en: "Model Building & Evaluation", vi: "Xây dựng & Đánh giá mô hình" },
      same("Automated Machine Learning (AutoML)"),
      { en: "Model Serving & Containerization", vi: "Model serving & Container hóa" },
      { en: "Model Drift & Monitoring", vi: "Model drift & Giám sát" }
    ],
    summary: {
      en: "6-course specialization focusing on end-to-end operationalization of AI in enterprise production: data pipelines, feature engineering, microservice deployment, API serving, model governance, and continuous performance monitoring.",
      vi: "Chuỗi 6 khóa học tập trung vào vận hành AI end-to-end trong môi trường production doanh nghiệp: data pipeline, feature engineering, triển khai microservice, API serving, quản trị mô hình và giám sát hiệu năng liên tục."
    }
  },
  {
    id: "cert-sdlc-minnesota",
    title: "Software Development Lifecycle Specialization",
    issuer: "University of Minnesota",
    issueDate: { en: "June 2025", vi: "Tháng 6/2025" },
    credentialId: "B21JZZVNZP8A",
    credentialUrl: "https://www.coursera.org/verify/specialization/B21JZZVNZP8A",
    category: CAT_SOFTWARE_ENG,
    skills: [
      { en: "SDLC Methodologies", vi: "Phương pháp luận SDLC" },
      { en: "Agile & Scrum Practices", vi: "Thực hành Agile & Scrum" },
      { en: "Software Architecture & Design Patterns", vi: "Kiến trúc phần mềm & Design Pattern" },
      { en: "Software Testing & Quality Assurance", vi: "Kiểm thử phần mềm & Đảm bảo chất lượng" },
      same("Release Engineering & CI/CD")
    ],
    summary: {
      en: "Systematic software engineering principles for architecting, designing, implementing, and delivering maintainable, production-ready software systems across iterative lifecycle phases.",
      vi: "Các nguyên lý kỹ thuật phần mềm có hệ thống để kiến trúc, thiết kế, hiện thực và bàn giao các hệ thống phần mềm dễ bảo trì, sẵn sàng production qua các giai đoạn vòng đời lặp."
    }
  },
  {
    id: "cert-project-management-uci",
    title: "Project Management Principles and Practices Specialization",
    issuer: "University of California, Irvine (UC Irvine)",
    issueDate: { en: "March 2026", vi: "Tháng 3/2026" },
    credentialId: "KSNFPP5E3P4U",
    credentialUrl: "https://www.coursera.org/verify/specialization/KSNFPP5E3P4U",
    category: CAT_ENG_MANAGEMENT,
    skills: [
      { en: "Project Scoping & Charters", vi: "Xác định phạm vi & Project Charter" },
      { en: "Work Breakdown Structure (WBS)", vi: "Cấu trúc phân rã công việc (WBS)" },
      { en: "Risk Management & Mitigation", vi: "Quản lý & Giảm thiểu rủi ro" },
      { en: "Budgeting & Schedule Planning", vi: "Lập ngân sách & Kế hoạch tiến độ" },
      { en: "Stakeholder Communication", vi: "Giao tiếp với các bên liên quan" }
    ],
    summary: {
      en: "4-course specialization covering project initiation, scope management, work breakdown structures, critical path scheduling, risk mitigation, and executive reporting for technical initiatives.",
      vi: "Chuỗi 4 khóa học về khởi tạo dự án, quản lý phạm vi, cấu trúc phân rã công việc, lập lịch theo đường găng, giảm thiểu rủi ro và báo cáo cấp quản lý cho các dự án kỹ thuật."
    }
  },
  {
    id: "cert-ibm-ai-foundations",
    title: "AI Foundations for Everyone Specialization",
    issuer: "IBM",
    issueDate: { en: "June 2025", vi: "Tháng 6/2025" },
    credentialId: "923ZXF5S39PI",
    credentialUrl: "https://www.coursera.org/verify/specialization/923ZXF5S39PI",
    category: CAT_AI_FOUNDATIONS,
    skills: [
      { en: "AI Landscape & Taxonomies", vi: "Bức tranh & Phân loại AI" },
      { en: "Machine Learning Fundamentals", vi: "Nền tảng Machine Learning" },
      { en: "Deep Learning Intuition", vi: "Trực giác về Deep Learning" },
      { en: "AI Ethics & Fairness", vi: "Đạo đức & Công bằng trong AI" },
      { en: "Generative AI Concepts", vi: "Khái niệm Generative AI" }
    ],
    summary: {
      en: "Comprehensive survey of modern artificial intelligence capabilities, ethical governance considerations, machine learning concepts, and practical integration into enterprise ecosystems.",
      vi: "Tổng quan toàn diện về năng lực của trí tuệ nhân tạo hiện đại, các vấn đề quản trị đạo đức, khái niệm machine learning và việc tích hợp thực tế vào hệ sinh thái doanh nghiệp."
    }
  }
];

export const FPT_BADGES_DATA: AcademicBadgeItem[] = [
  {
    id: "badge-ks57-1",
    code: "KS57_1",
    title: { en: "Digital Ecosystem: From Governance to Business", vi: "Hệ sinh thái số (từ quản lý đến kinh doanh)" },
    issuer: { en: "FPT University & Coursera", vi: "Đại học FPT & Coursera" },
    program: {
      en: "KS57 Program: Digital Transformation for IT Talents",
      vi: "Chương trình KS57: Chuyển đổi số cho nhân tài CNTT"
    },
    credentialId: "SOOS7JXUSz2jkuyV1Es9Eg",
    credentialUrl: "https://www.coursera.org/verify/SOOS7JXUSz2jkuyV1Es9Eg",
    description: {
      en: "Equips FPT University IT students with fundamental digital transformation knowledge and competencies across key domains: public administration, business management, digital finance, and customer experience (CX/marketing). Prepares students to apply engineering expertise to real-world national digital transformation initiatives.",
      vi: "Trang bị cho sinh viên CNTT Đại học FPT kiến thức và năng lực nền tảng về chuyển đổi số trong các lĩnh vực trọng yếu: hành chính công, quản trị doanh nghiệp, tài chính số và trải nghiệm khách hàng (CX/marketing). Chuẩn bị cho sinh viên vận dụng chuyên môn kỹ thuật vào các sáng kiến chuyển đổi số quốc gia thực tế."
    },
    focus: [
      { en: "Digital Governance & Public Administration", vi: "Quản trị số & Hành chính công" },
      { en: "Enterprise Digital Ecosystems", vi: "Hệ sinh thái số doanh nghiệp" },
      { en: "Digital Finance & Fintech Models", vi: "Tài chính số & Mô hình Fintech" },
      { en: "Customer Experience (CX) Architecture", vi: "Kiến trúc trải nghiệm khách hàng (CX)" }
    ]
  },
  {
    id: "badge-ks57-2",
    code: "KS57_2",
    title: { en: "Key Activities of Digital Transformation", vi: "Các hoạt động then chốt của chuyển đổi số" },
    issuer: { en: "FPT University & Coursera", vi: "Đại học FPT & Coursera" },
    program: {
      en: "KS57 Program: Digital Transformation for IT Talents (Part 2)",
      vi: "Chương trình KS57: Chuyển đổi số cho nhân tài CNTT (Phần 2)"
    },
    credentialId: "i_hoSnqiQoS4aEp6ooKECg",
    credentialUrl: "https://www.coursera.org/verify/i_hoSnqiQoS4aEp6ooKECg",
    description: {
      en: "Focuses on the operational execution and core activities of digital transformation: business process re-engineering, roadmap structuring, legacy system migration, change management, and measuring digital adoption impact.",
      vi: "Tập trung vào việc triển khai vận hành và các hoạt động cốt lõi của chuyển đổi số: tái thiết kế quy trình nghiệp vụ, xây dựng lộ trình, chuyển đổi hệ thống cũ (legacy), quản trị thay đổi và đo lường tác động của việc ứng dụng công nghệ số."
    },
    focus: [
      { en: "Transformation Execution Frameworks", vi: "Framework triển khai chuyển đổi" },
      { en: "Process Re-Engineering & Automation", vi: "Tái thiết kế quy trình & Tự động hóa" },
      { en: "Enterprise Tech Adoption Roadmaps", vi: "Lộ trình ứng dụng công nghệ doanh nghiệp" },
      { en: "Organizational Change Management", vi: "Quản trị thay đổi tổ chức" }
    ]
  }
];
