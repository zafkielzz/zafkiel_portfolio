// Site Data for Đặng Phương Nam — AI Engineer & Researcher | FPT University
export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  readingTime: number;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  year: string;
  type: string;
  description: string;
  colors: [string, string];
  image?: string;
  role: string;
  challenge: string;
  outcome: string;
  decisions: [string, string][];
  githubUrl?: string;
  demoUrl?: string;
  detail?: {
    timeline?: [string, string][];
    artifacts?: string[];
    reflection?: string;
  };
  publication?: {
    journal?: string;
    conference?: string;
    authors: string;
    date: string;
    doi?: string;
    status?: string;
    abstract: string;
    pdfUrl?: string;
  };
}

export interface PhotoItem {
  image: string;
  position?: string;
  title: string;
  description?: string;
  location?: string;
  time?: string;
  [key: string]: any;
}

export interface PhotoSheet {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: string;
  number: number;
  image: string;
  images: PhotoItem[];
  [key: string]: any;
}

export interface PartnerItem {
  slug: string;
  name: string;
  title?: string;
  detail?: string;
  [key: string]: any;
  href: string;
  type: string;
  mark: string;
  image: string;
  headline: string;
  summary: string;
  note: string;
  focus?: string[];
  year?: string;
}

export interface ContactItem {
  slug: string;
  title: string;
  detail: string;
  href: string;
  group: string;
  order: number;
}

export const POSTS: Post[] = [
  {
    "slug": "conflict-aware-rag-routing",
    "title": "Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction",
    "date": "2026-08-15T00:00:00.000Z",
    "summary": "Công trình nghiên cứu khoa học tại IEEE IS'26 (Đặng Phương Nam - Tác giả chính): Đề xuất bộ định tuyến RAG nhận thức mâu thuẫn ngữ cảnh NLI, tiết kiệm ~35% API calls trong khi bảo toàn 83.2%–92.2% F1 của Always-LLM.",
    "tags": [
      "ieee is'26",
      "research",
      "rag",
      "routing",
      "nlp",
      "llm",
      "ai"
    ],
    "content": "\nOur peer-reviewed research paper introduces Conflict-Aware RAG Routing, accepted and presented at IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems (First Author: Dang Phuong Nam).\n\n## Motivation: Beyond Retrieval Relevance\n\nAdaptive model routing can reduce the cost of Retrieval-Augmented Generation (RAG), but the routing signal must accurately identify when a compact local model is likely to fail. Traditional retrieval-aware gates use relevance or rank-based confidence (such as Reciprocal Rank Fusion - RRF). However, high retrieval confidence does not mean the retrieved passages agree.\n\nWhen evidence contains intra-context contradiction or distracting facts, small language models (SLMs) suffer severe reasoning impairment, whereas calling expensive frontier API models for every query incurs unsustainable monetary and latency costs.\n\n## Proposed Architecture: 5-Feature Conflict-Aware Router\n\nWe design a reproducible context-conflict scoring pipeline and a learned router:\n\n1. **Bidirectional NLI Contradiction Scoring**: Evaluates the top 3 parent passages using `cross-encoder/nli-deberta-v3-small` in both input orders to eliminate directional bias: $q_{ij} = [S(p_i, p_j) + S(p_j, p_i)] / 2$. The aggregate conflict score is formulated as:\n   $$C = 0.7 \\max_{q \\in Q} q + 0.3 \\text{mean}_{q \\in Q} q$$\n2. **5-Feature Random Forest**: Combines Context Conflict ($C$) with Query Length, Retrieved Context Length, Chunk Lexical Overlap, and RRF Confidence across 500 trees.\n3. **Leakage-Resistant Nested 5-Fold Calibration**: Budget cutoffs ($b \\in \\{30\\%, 50\\%, 65\\%\\}$) are selected strictly from inner out-of-fold scores to prevent data leakage onto test instances.\n\n## Empirical Benchmark on 3,000 Multi-Hop Questions\n\nWe evaluated the complete pipeline across 3,000 multi-hop reasoning questions from **MuSiQue**, **HotpotQA**, and **2WikiMultiHopQA**, pairing local **Qwen2.5-1.5B-Instruct** with API **DeepSeek-V4-Flash**:\n\n- **Primary Deployment Result**: At an approximately 65% target budget (realized usage 63.9%–65.0% LLM calls), the hybrid router **saves ~35% of API calls** while retaining **83.2%–92.2% of Always-LLM token F1** (83.8% on MuSiQue, 83.2% on HotpotQA, and 92.2% on 2Wiki).\n- **Dataset-Dependent Incremental Effect**: At the 50% budget relative to RRF alone, the hybrid changes token F1 by −1.08 on MuSiQue (95% CI [−2.38, 0.24]), −0.03 on HotpotQA (95% CI [−1.91, 1.86]), and +1.48 on 2Wiki (95% CI [0.08, 2.87], pointwise CI excludes zero).\n- **Diagnostic Subgroup Discovery (High-RRF / High-Conflict)**: In instances where retrieval confidence is high (top third RRF) but passages contradict each other (top third conflict), standard RRF incorrectly retains queries on the SLM. In this subgroup, the hybrid router intervenes effectively, achieving dramatic F1 gains of **+14.35 points on HotpotQA** ($p = 0.006$) and **+6.50 points on 2Wiki** ($p = 0.006$).\n\n<PostCallout title=\"IEEE IS'26 Acceptance & First Authorship\">\nFirst Author: Dang Phuong Nam (FPT University). Accepted and presented at The 13th IEEE International Conference on Intelligent Systems (IEEE IS'26). Full paper available in research archive (paper_93.pdf).\n</PostCallout>\n\n<PostColumns>\n  <PostColumn title=\"Research Manuscript\">\nFull paper manuscript (paper_93.pdf) available for download with complete bootstrap confidence intervals and statistical verifications.\n  </PostColumn>\n  <PostColumn title=\"Reproducible Codebase\">\nComplete experimental pipeline, nested calibration scripts, and feature extractors are open-sourced on GitHub.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 5
  },
  {
    "slug": "ai-taste-and-the-human-hand",
    "title": "AI, taste and the human hand",
    "date": "2026-08-01T00:00:00.000Z",
    "summary": "AI can make more options, but it cannot decide which detail deserves to stay. That is still a question of taste.",
    "tags": [
      "ai",
      "art",
      "blog",
      "creative coding"
    ],
    "content": "\nAI has made the first draft cheaper. Images, prompts, code fragments and variations can arrive before the coffee has cooled. That speed is useful, but it changes where the real work begins.\n\n## More options are not more direction\n\nWhen almost anything can be generated, selection becomes part of the craft. A useful creative process needs constraints: a feeling to protect, an audience to respect and a reason for every element that remains. Without those things, a hundred options simply become a more polished form of indecision.\n\nI start with a small brief before opening any tool. It can be as simple as three words, a reference image and one sentence about the response I want from a person. The brief is not there to limit surprise. It is there to give surprise somewhere useful to land.\n\n## Use the machine as a sketchbook\n\nAI is most helpful when it sits early in the process. I use it to test a composition, question an assumption or make a strange connection quickly. It can produce a rough visual direction, a first code experiment or a list of names that I would not have reached alone.\n\nThe final decision still happens slowly. I compare an output against the surrounding page, the tone of the writing and the expectations of the person reading it. A good result is not the most detailed or the most technically impressive one. It is the one that makes the larger piece more coherent.\n\n## Taste is a practice\n\nTaste is not simply preference. It is the ability to notice when something is almost right, then keep working until it becomes clear. It is shaped by references, repetition, conversations and time away from the screen.\n\nThat is why the human hand still matters. It decides when to stop, what to remove and which imperfect detail makes the work feel alive. The goal is not to make work that looks generated. The goal is to make work that feels considered.\n\n## Leave room for responsibility\n\nSpeed does not remove responsibility. Before publishing, I check where an idea came from, whether a reference is being treated fairly and whether the output is useful for the people it reaches. Tools can increase capacity, but they do not replace judgement.\n\nThe most exciting future is not one where people disappear from creative work. It is one where more people can spend their attention on the decisions that matter.\n\n<PostCallout title=\"A practical test\">\nIf a generated idea cannot explain what it is helping a reader notice, it is probably decoration rather than direction.\n</PostCallout>\n\n<PostColumns>\n  <PostColumn title=\"Let AI accelerate\">\nUse it for rough options, early language, alternate compositions and questions that widen a first draft.\n  </PostColumn>\n  <PostColumn title=\"Keep judgement human\">\nUse your own context to decide what belongs, what needs care and what should be removed entirely.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 3
  },
  {
    "slug": "autonomous-multi-agent-systems",
    "title": "Designing Multi-Agent Swarms for Autonomous Research",
    "date": "2026-06-20T00:00:00.000Z",
    "summary": "Kinh nghiệm xây dựng đồ án tốt nghiệp: Điều phối mạng lưới các agent tự trị với DAG execution, tool calling và reflection loop.",
    "tags": [
      "agents",
      "llm",
      "system architecture",
      "capstone"
    ],
    "content": "\nBuilding single-prompt LLM applications is straightforward, but coordinating a swarm of autonomous agents with deterministic guarantees is where true engineering begins.\n\n## Contract-driven Agent Protocols\n\nIn our capstone project at FPT University, we transitioned from unstructured conversation chains to strict typed contracts. Each agent—Researcher, Critic, Coder, Validator—receives and returns strictly validated JSON schemas.\n\nWhen an agent fails to meet verification rubrics, a dedicated Reflection Critic provides structured feedback rather than propagating errors downstream.\n\n## The DAG Orchestrator\n\nInstead of open-ended conversational loops that consume runaway token budgets, we modeled task execution as a Directed Acyclic Graph (DAG):\n\n- Dynamic node scheduling based on dependency resolution\n- Sub-second task dispatching with parallel execution branches\n- Checkpointed state snapshots allowing human intervention at critical checkpoints\n\n<PostCallout title=\"System Reliability\">\nDeterministic verification at agent handoff boundaries reduced cascading hallucinations by over 74% in our comparative benchmark trials.\n</PostCallout>\n",
    "readingTime": 3
  },
  {
    "slug": "optimizing-rag-hybrid-search",
    "title": "Optimizing RAG Pipelines with Hybrid Search and Reranking",
    "date": "2026-03-12T00:00:00.000Z",
    "summary": "Tại sao vector similarity thuần túy là không đủ cho enterprise search, và cách kết hợp BM25 + Cross-Encoder reranking.",
    "tags": [
      "rag",
      "nlp",
      "vector search",
      "information retrieval"
    ],
    "content": "\nCosine similarity over dense embeddings often fails on domain-specific acronyms, exact serial codes, and negative constraint queries.\n\n## The Power of Hybrid Retrieval\n\nBy pairing dense neural embeddings with classical BM25 lexical search through Reciprocal Rank Fusion (RRF), we achieved balanced recall across both conceptual queries and exact keyword lookups.\n\nPassing the top-50 candidates through a lightweight Cross-Encoder reranker prior to context injection into the prompt window significantly improved context precision and answer truthfulness.\n",
    "readingTime": 2
  },
  {
    "slug": "fpt-university-ai-journey",
    "title": "From FPT University Lab to Production AI: Key Takeaways",
    "date": "2025-11-20T00:00:00.000Z",
    "summary": "Những bài học thực tế sau 4 năm học tập và nghiên cứu AI tại Đại học FPT: Từ thuật toán trên giấy đến mô hình triển khai thực tế.",
    "tags": [
      "fptu",
      "journey",
      "education",
      "engineering"
    ],
    "content": "\nStudying Artificial Intelligence at FPT University provided a rigorous foundation in mathematical foundations, machine learning theory, and hands-on capstone engineering.\n\nThe biggest shift from university theory to production reality is realizing that 80% of machine learning success comes from data curation, latency budgeting, and robust system architecture rather than just tweaking model hyperparameters.\n",
    "readingTime": 3
  },
  {
    "slug": "designing-interfaces-that-feel-alive",
    "title": "Designing interfaces that feel alive",
    "date": "2025-08-18T00:00:00.000Z",
    "summary": "Motion is most useful when it explains change, reinforces hierarchy and gives a product a sense of response.",
    "tags": [
      "motion",
      "interface",
      "design"
    ],
    "content": "\nAn interface does not need to move constantly to feel alive. It only needs to acknowledge actions in a way that helps people understand what just happened. Response is more important than spectacle.\n\n## Motion is feedback\n\nThe best transitions make state changes legible. A panel expands from the place it was requested, a selected item carries its position, and a notification appears without stealing focus.\n",
    "readingTime": 2
  },
  {
    "slug": "tiny-web-experiments",
    "title": "Tiny web experiments, big learning",
    "date": "2025-04-14T00:00:00.000Z",
    "summary": "Small prototypes are a low-risk way to learn rendering, interaction and the limits of an idea.",
    "tags": [
      "experiments",
      "creative coding",
      "webgl"
    ],
    "content": "\nSmall prototypes are a low-risk way to learn rendering, interaction and the limits of a visual idea. They are not miniature products. They are questions with a visible answer.\n",
    "readingTime": 2
  },
  {
    "slug": "shipping-imperfect-work",
    "title": "What I learned from shipping imperfect work",
    "date": "2024-12-05T00:00:00.000Z",
    "summary": "Shipping is not the end of engineering. It is the start of a feedback loop that turns assumptions into useful information.",
    "tags": [
      "process",
      "engineering",
      "growth"
    ],
    "content": "\nShipping is not the end of engineering. It is the start of a feedback loop that turns assumptions into useful information. A project can feel complete in a private notebook and still reveal entirely new questions when real people interact with it.\n",
    "readingTime": 2
  }
];

export const PROJECTS: ProjectDetail[] = [
  {
    "slug": "conflict-aware-rag-routing",
    "name": "Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction",
    "year": "2026",
    "type": "Scientific Publication · IEEE IS'26 (Accepted & Presented)",
    "description": "Công bố khoa học tại IEEE IS'26 (Đặng Phương Nam - Tác giả chính): Đề xuất bộ định tuyến RAG nhận thức mâu thuẫn ngữ cảnh NLI, tiết kiệm ~35% API calls trong khi giữ lại 83.2%–92.2% F1 của Always-LLM.",
    "colors": [
      "#e6aa60",
      "#5e320f"
    ],
    "image": "/images/design-desk.png",
    "role": "First Author (Tác giả chính) · AI Researcher",
    "challenge": "Các bộ định tuyến RAG thích ứng hiện nay chủ yếu dựa vào độ tương đồng hoặc điểm tin cậy xếp hạng (RRF), không đánh giá liệu các đoạn văn bản được nạp vào có mâu thuẫn dữ kiện với nhau hay không. Khi tài liệu truy xuất chứa mâu thuẫn nội tại hoặc thông tin gây nhiễu, các mô hình nhỏ gọn (SLM) rất dễ bị suy giảm suy luận, trong khi việc gọi API LLM lớn cho mọi câu hỏi gây lãng phí chi phí và độ trễ.",
    "outcome": "Được chấp thuận và trình bày tại IEEE IS'26 (The 13th IEEE International Conference on Intelligent Systems). Đề xuất mô hình Random Forest 5 đặc trưng (Context Conflict C, Query Length, Context Length, Chunk Overlap, RRF Confidence) với quy trình hiệu chuẩn ngân sách lồng (nested 5-fold calibration chống rò rỉ dữ liệu). Đánh giá trên 3,000 câu hỏi multi-hop (MuSiQue, HotpotQA, 2Wiki) với Qwen2.5-1.5B-Instruct và DeepSeek-V4-Flash: ở mức ~65% lượt gọi, router tiết kiệm ~35% API calls trong khi giữ lại 83.2%–92.2% F1 của Always-LLM. Trong nhóm truy vấn có RRF cao nhưng mâu thuẫn cao (high-RRF/high-conflict), router can thiệp chuyển tiếp lên LLM, đạt F1 gain +14.35 trên HotpotQA và +6.50 trên 2Wiki so với RRF.",
    "decisions": [
      [
        "Bidirectional NLI Context Conflict (C)",
        "Sử dụng mô hình cross-encoder/nli-deberta-v3-small chấm điểm mâu thuẫn đối xứng giữa top 3 parent chunks: q_ij = [S(pi,pj) + S(pj,pi)]/2, kết hợp C = 0.7 max(q) + 0.3 mean(q) để nắm bắt cả bất đồng cục bộ sâu sắc lẫn sự thiếu nhất quán tổng thể."
      ],
      [
        "5-Feature Random Forest & Leakage-Resistant Calibration",
        "Huấn luyện Random Forest 500 cây với quy trình Nested 5-fold cross-validation, lựa chọn ngưỡng ngân sách (30%, 50%, 65%) hoàn toàn từ inner out-of-fold scores thay vì in-sample scores để triệt tiêu rò rỉ dữ liệu."
      ],
      [
        "Diagnostic High-RRF / High-Conflict Subgroup Recovery",
        "Chứng minh mâu thuẫn ngữ cảnh đóng vai trò tín hiệu ngoại lệ giá trị: khi RRF tin cậy cao nhưng ngữ cảnh bất đồng, hybrid router chuyển hướng lên LLM, đạt F1 gain +14.35 trên HotpotQA (p = 0.006) và +6.50 trên 2Wiki (p = 0.006)."
      ]
    ],
    "githubUrl": "https://github.com/RAG-Routing-Via-Context-Confliction/RAG_Router_Via_Context_Conflict",
    "publication": {
      "conference": "The 13th IEEE International Conference on Intelligent Systems (IEEE IS'26)",
      "journal": "IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems",
      "authors": "Dang Phuong Nam (First Author / Tác giả chính), Tran Huy Tuan, Doan Duy Long, Cao Van Mai (Faculty of Artificial Intelligence, FPT University)",
      "date": "Accepted & Presented · 2026",
      "status": "Accepted & Presented at IEEE IS'26 · In Publication Process",
      "abstract": "Adaptive model routing can reduce the cost of retrieval-augmented generation (RAG), but the routing signal must identify when a small language model (SLM) is likely to fail. We study context conflict, the contradiction among retrieved passages, as one such signal. A five-feature Random Forest combines conflict with query length, retrieved-context length, chunk overlap, and Reciprocal Rank Fusion (RRF) confidence. We evaluate the pipeline on 3,000 multi-hop questions from MuSiQue, HotpotQA, and 2WikiMultiHopQA using Qwen2.5-1.5B-Instruct locally and DeepSeek-V4-Flash through an API. Nested five-fold calibration selects budget cutoffs from inner out-of-fold rather than in-sample training scores. At an approximately 65% LLM-call rate, the hybrid router saves about 35% of API calls while retaining 83.2–92.2% of the Always-LLM F1. In high-RRF/high-conflict subgroups, hybrid-minus-RRF F1 improves by +14.35 on HotpotQA and +6.50 on 2Wiki.",
      "pdfUrl": "/paper_93.pdf"
    },
    "detail": {
      "timeline": [
        [
          "01 / RESEARCH GAP & FORMULATION",
          "Khảo sát hạn chế của các bộ định tuyến RAG chỉ dựa vào độ liên quan/RRF, thiếu khả năng phát hiện mâu thuẫn giữa các bằng chứng được nạp vào."
        ],
        [
          "02 / CONFLICT SCORE & 5-FEATURE ROUTER",
          "Định nghĩa điểm số mâu thuẫn ngữ cảnh C qua DeBERTa-v3 NLI và xây dựng 5-feature Random Forest với nested 5-fold budget calibration chống rò rỉ điểm số."
        ],
        [
          "03 / BENCHMARK & IEEE IS'26 ACCEPTANCE",
          "Đánh giá thực nghiệm chặt chẽ trên 3,000 câu hỏi multi-hop với Qwen2.5-1.5B và DeepSeek-V4-Flash; bài báo được bình duyệt, chấp thuận và trình bày tại IEEE IS'26."
        ]
      ],
      "artifacts": [
        "Full Research Manuscript (paper_93.pdf)",
        "IEEE IS'26 Presentation Slides & Technical Oral Briefing",
        "Multi-Hop Benchmark Suite (MuSiQue, HotpotQA, 2Wiki)",
        "Nested 5-Fold Calibration & Out-of-Fold Evaluation Pipeline"
      ],
      "reflection": "Context conflict không phải là thước đo độ khó phổ quát cho mọi tập dữ liệu (hiệu quả thực tế phụ thuộc vào phân phối dữ liệu truy xuất). Giá trị thực tiễn cốt lõi của nghiên cứu nằm ở việc nhận diện các vùng lỗi ngoại lệ (high-RRF / high-conflict) — khi điểm tin cậy xếp hạng đánh giá sai độ phức tạp của các đoạn văn bản xung đột — để hỗ trợ can thiệp chuyển tiếp kịp thời."
    }
  },
  {
    "slug": "stock-multitask-transformer",
    "name": "Multi-Task Transformer for Stock Trend Prediction & Self-Rationalization",
    "year": "2026 (In Development)",
    "type": "Capstone Project · ĐH FPT (Đang nghiên cứu & phát triển)",
    "description": "Đồ án tốt nghiệp tại ĐH FPT (Đang phát triển): Thiết kế kiến trúc Decoder-Only SLM đa nhiệm xử lý dữ liệu lai (chuỗi thời gian giá, văn bản tài chính, ESG) nhằm dự báo xu hướng và tự động sinh giải trình.",
    "colors": [
      "#77b6ff",
      "#252ed9"
    ],
    "image": "/images/hud-002-investigation.jpg",
    "role": "Team Leader · AI System Architect (Đang nghiên cứu & phát triển)",
    "challenge": "Dự báo thị trường chứng khoán thường đòi hỏi tổng hòa từ nhiều nguồn dữ liệu không đồng nhất: chuỗi thời gian giá (OHLCV), văn bản tài chính (MD&A, Earnings Calls) và chỉ số bền vững (ESG). Các phương pháp truyền thống thường xử lý rời rạc từng nguồn dữ liệu, dẫn đến việc bỏ lỡ tương quan chéo và thiếu cơ chế tự giải trình minh bạch giữa quyết định phân loại và lý lẽ tài chính.",
    "outcome": "Đề xuất và đang hiện thực kiến trúc Shared Decoder-Only SLM (dựa trên Qwen2.5-0.5B) xử lý chuỗi biểu diễn lai từ PatchTST (chuỗi thời gian), Segment Embedding (văn bản) và Continuous Embedding (ESG). Đề xuất hàm mục tiêu Consistency Loss qua NLI để hạn chế mâu thuẫn giữa nhãn phân loại xu hướng và văn bản giải trình, hướng tới mục tiêu triển khai on-premise với chi phí phần cứng tối ưu.",
    "decisions": [
      [
        "Shared Decoder-Only SLM Backbone (Qwen2.5-0.5B)",
        "Lựa chọn mô hình ngôn ngữ nhỏ gọn làm backbone chung: trích xuất hidden state tại token đặc biệt [DECISION] cho tác vụ phân loại, đồng thời tận dụng khả năng autoregressive để sinh văn bản giải trình."
      ],
      [
        "Tầng mã hóa dữ liệu lai (Hybrid Input Layer)",
        "Thử nghiệm kết hợp patch chuỗi thời gian W=30 ngày với Temporal Positional Embedding, văn bản tài chính với Segment Embedding, và điểm ESG dạng liên tục tránh việc rời rạc hóa làm mất thứ bậc."
      ],
      [
        "Ràng buộc nhất quán qua Consistency Loss",
        "Tích hợp mô hình NLI nhỏ gọn để phạt gradient khi văn bản giải trình sinh ra mâu thuẫn về mặt logic với nhãn dự đoán xu hướng."
      ],
      [
        "Định hướng tối ưu hóa On-Premise",
        "Thiết kế hệ thống hướng tới khả năng suy luận cục bộ trên phần cứng thương mại (RTX 4060, VRAM <8GB) nhằm bảo mật dữ liệu giao dịch nội bộ và kiểm soát độ trễ."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / PROBLEM & HYPOTHESIS FORMULATION",
          "Khảo sát bài toán kết hợp đa phương thức tài chính và xây dựng giả thuyết về tính nhất quán giữa dự báo và văn bản giải trình."
        ],
        [
          "02 / PIPELINE & ARCHITECTURE DESIGN",
          "Thu thập tập dữ liệu mẫu (OHLCV, SEC 10-K/10-Q, ESG), xây dựng module tiền xử lý chống look-ahead bias và cấu trúc backbone Qwen2.5-0.5B."
        ],
        [
          "03 / EXPERIMENTAL TRAINING & REFINEMENT (IN PROGRESS)",
          "Đang huấn luyện thử nghiệm QLoRA, tinh chỉnh hàm mất mát liên kết và đo lường độ trễ suy luận trên môi trường cục bộ."
        ]
      ],
      "artifacts": [
        "Capstone Research Proposal & Technical Specification",
        "Hybrid Multimodal Ingestion & Preprocessing Pipeline",
        "Shared Decoder-Only Architecture Implementation (PyTorch)",
        "Local Evaluation & Consistency Benchmark Suite"
      ],
      "reflection": "Mô hình tài chính không thể là một chiếc hộp đen bí ẩn. Mục tiêu cốt lõi của nghiên cứu là xây dựng một cấu trúc học sâu nhỏ gọn, có khả năng tự giải trình nhất quán với quyết định định lượng mà không phụ thuộc vào các API đám mây đắt đỏ."
    }
  },
  {
    "slug": "emotional-ai",
    "name": "Emotional AI: Cognitive Architecture & Dynamic Character Simulation",
    "year": "2026 (In Development)",
    "type": "Applied AI · Cognitive Architecture (Đang phát triển)",
    "description": "Dự án nghiên cứu tác tử AI đồng hành có trạng thái cảm xúc (Đang phát triển): Kết hợp mô hình tâm lý Scherer CPM và hàm suy giảm trí nhớ ACT-R, tận dụng các thiết bị ngoại vi phụ trợ để giảm tải chi phí tính toán ngoài GPU máy chủ.",
    "colors": [
      "#f2baea",
      "#602b7a"
    ],
    "image": "/images/hud-003-profile.jpg",
    "role": "Lead AI Systems Engineer (Đang phát triển)",
    "challenge": "Phần lớn các chatbot đàm thoại hiện nay là hệ thống không trạng thái (stateless), phụ thuộc hoàn toàn vào prompt tĩnh hoặc API đám mây. Điều này khiến nhân vật dễ rơi vào tình trạng mất tính nhất quán tính cách dài hạn, cảm xúc biến đổi không có nguyên nhân rõ ràng và tốn kém chi phí suy luận liên tục.",
    "outcome": "Đang nghiên cứu và thử nghiệm kiến trúc tác tử AI có khả năng duy trì trạng thái tâm lý: Tích hợp mô hình lượng hóa cảm xúc Scherer Component Process Model (CPM) và đường cong lãng quên ACT-R. Tận dụng mạng lưới các thiết bị di động phụ trợ (auxiliary edge devices) để chạy mô hình ngôn ngữ nhỏ gọn (SLM Qwen2.5-1.5B INT4) nhằm san sẻ tải tính toán ngoài GPU máy chủ chính.",
    "githubUrl": "https://github.com/zafkielzz/Emotional_AI",
    "decisions": [
      [
        "Mô hình hóa cảm xúc Scherer CPM",
        "Định lượng phản ứng cảm xúc của nhân vật theo 4 trục nhận thức (Valence, Arousal, Control, Novelty) dựa trên ngữ cảnh sự kiện thay vì gán nhãn tĩnh."
      ],
      [
        "Cơ chế ghi nhớ & suy giảm trí nhớ ACT-R",
        "Áp dụng phương trình suy giảm luỹ thừa ACT-R: m_i(t) = ln(sum t_k^-d) để mô phỏng chân thực quy luật ghi nhớ và lãng quên thông tin theo thời gian."
      ],
      [
        "Phân phối tính toán với thiết bị phụ trợ",
        "Sử dụng các thiết bị di động biên chạy Qwen2.5-1.5B INT4 qua llama.cpp để hỗ trợ san sẻ tải suy luận cho GPU máy tính, tiết kiệm chi phí vận hành."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / COGNITIVE FRAMEWORK DESIGN",
          "Xây dựng khung toán học cho 4 trục cảm xúc Scherer CPM và mô hình trí nhớ phân tầng."
        ],
        [
          "02 / ASYNC COMMUNICATION & EDGE PROTOTYPING",
          "Thiết lập giao thức kết nối WebSocket giữa máy chủ điều phối và ứng dụng client trên thiết bị phụ trợ."
        ],
        [
          "03 / SYSTEM INTEGRATION & PROFILING (IN PROGRESS)",
          "Đang tinh chỉnh độ ổn định khi suy luận dài hạn của SLM INT4 và theo dõi mức độ trôi dạt tính cách của nhân vật."
        ]
      ],
      "artifacts": [
        "Cognitive Appraisal & Memory Decay Module",
        "Host Orchestration Service (FastAPI)",
        "Auxiliary Edge Worker Client (Flutter / llama.cpp)",
        "Character State & Emotion Inspector UI"
      ],
      "reflection": "Mô phỏng nhân vật AI thuyết phục không nằm ở những câu thoại ngẫu nhiên, mà ở việc xây dựng một hệ thống tâm lý có căn nguyên: nơi cảm xúc và ký ức biến đổi theo những quy luật toán học rõ ràng và có thể kiểm chứng."
    }
  },
  {
    "slug": "vietsign-edge-ai",
    "name": "VietSign Edge AI: On-Device Traffic Sign Detection & Classification",
    "year": "2025",
    "type": "Computer Vision · Edge AI · Android TFLite",
    "description": "Nhận diện và phân loại 48 nhóm biển báo giao thông Việt Nam thời gian thực trên thiết bị Android bằng pipeline 2 giai đoạn YOLOv8n + MobileNetV3 và ByteTrack.",
    "colors": [
      "#ffaa40",
      "#9b3010"
    ],
    "image": "/images/hud-004-cast.jpg",
    "role": "Computer Vision & Edge AI Engineer",
    "challenge": "Nhận diện và phân loại chính xác biển báo giao thông Việt Nam trực tiếp trên thiết bị di động trong điều kiện thực địa phức tạp (camera rung lắc khi di chuyển, thời tiết mưa nắng, ngược sáng, biển báo bị che khuất) với yêu cầu tốc độ thời gian thực (>= 30 FPS) mà không cần Internet.",
    "outcome": "Thử nghiệm thành công pipeline nối tầng hai giai đoạn: Giai đoạn 1 dùng YOLOv8n để xác định vùng chứa biển báo, giai đoạn 2 dùng MobileNetV3-Small phân loại chi tiết 48 nhóm biển báo theo quy chuẩn QCVN 41:2019/BGTVT. Tích hợp thuật toán ByteTrack theo dõi ID đối tượng và lượng tử hóa INT8 TFLite, đạt hiệu năng xử lý ổn định trên camera Android CameraX.",
    "githubUrl": "https://github.com/VietSign-Edge-AI/VietSign-Edge-AI",
    "decisions": [
      [
        "Two-Stage Cascaded Detection",
        "Giai đoạn 1 dùng YOLOv8n siêu nhẹ để phát hiện ROI biển báo; Giai đoạn 2 dùng MobileNetV3-Small phân loại chi tiết 48 nhóm biển báo theo quy chuẩn QCVN 41:2019/BGTVT."
      ],
      [
        "ByteTrack & Kalman Filter Tracking",
        "Lưu vết ID biển báo qua chuỗi khung hình, loại bỏ hiện tượng nhấp nháy phát hiện và bảo toàn kết quả khi biển báo bị che khuất tạm thời."
      ],
      [
        "Zero-Copy CameraX Pipeline",
        "Tối ưu hóa bộ đệm phân tích hình ảnh của Android CameraX và lượng tử hóa INT8, giảm thiểu tối đa độ trễ truyền dữ liệu."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / DATASET CURATION & STANDARDIZATION",
          "Thu thập và chuẩn hóa ảnh biển báo giao thông thực tế tại đường phố Việt Nam theo chuẩn QCVN."
        ],
        [
          "02 / MODEL TRAINING & PRUNING",
          "Huấn luyện detector YOLOv8n và MobileNetV3 classifier trên PyTorch; cắt tỉa trọng số và lượng tử hóa INT8."
        ],
        [
          "03 / ANDROID INTEGRATION & ROAD TEST",
          "Đóng gói TFLite vào ứng dụng Android native với CameraX, kiểm thử thực tế trên đường phố."
        ]
      ],
      "artifacts": [
        "TFLite INT8 Quantized Model Weights",
        "Android Native CameraX Application Source Code",
        "ByteTrack Multi-Object Tracking Module",
        "Vietnamese Traffic Sign Benchmark Report"
      ],
      "reflection": "Trong triển khai thị giác máy tính trên thiết bị di động, việc tách bài toán thành hai giai đoạn (phát hiện nhanh vùng quan tâm và phân loại chi tiết) giúp đạt tốc độ xử lý khung hình mượt mà mà vẫn đảm bảo độ chính xác phân loại trên tập biển báo đa dạng."
    }
  },
  {
    "slug": "luc-bat-poem-generator",
    "name": "Lục Bát Poem Generator: Rule-Constrained Vietnamese Poetry Generation",
    "year": "2025",
    "type": "Natural Language Processing · Fine-tuning · Constrained Decoding",
    "description": "Mô hình sinh thơ Lục Bát tiếng Việt áp dụng QLoRA fine-tuning kết hợp bộ giải mã Beam Search ràng buộc âm luật (Bằng/Trắc, số âm tiết, gieo vần).",
    "colors": [
      "#cce67f",
      "#3c6b43"
    ],
    "image": "/images/hud-001-kena.jpg",
    "role": "NLP & LLM Engineer",
    "challenge": "Thơ Lục Bát là thể thơ truyền thống của Việt Nam với các quy chuẩn luật thơ vô cùng chặt chẽ: số lượng âm tiết luân phiên (câu 6 - câu 8), quy tắc thanh điệu Bằng/Trắc tại các vị trí chẵn 2-4-6-8, và hệ thống gieo vần chéo (vần lưng, vần chân) nghiêm ngặt. Các mô hình ngôn ngữ lớn phổ thông khi sinh thơ thường bị gieo sai vần, lệch số âm tiết hoặc sai luật thanh điệu.",
    "outcome": "Huấn luyện mô hình sinh thơ tiếng Việt với QLoRA 4-bit trên tập thơ truyền thống, kết hợp cơ chế can thiệp Logit Bias theo luật ngữ âm tại bước giải mã Beam Search, giúp cải thiện đáng kể tỷ lệ tuân thủ luật Bằng/Trắc và gieo vần so với việc sinh văn bản tự do thông thường.",
    "githubUrl": "https://github.com/zafkielzz/Luc_Bat_Poem_Generator",
    "decisions": [
      [
        "Phonological Rule Masking",
        "Xây dựng ma trận mặt nạ ngữ âm (Phonetic Mask) tại bước sinh token, tự động hạ xác suất các token vi phạm thanh Bằng/Trắc hoặc sai vần."
      ],
      [
        "QLoRA Fine-tuning on Poetry Corpus",
        "Fine-tune hiệu quả tham số trên tập dữ liệu hàng nghìn bài thơ Lục Bát chọn lọc để mô hình học cách diễn đạt và nhịp thơ."
      ],
      [
        "Automated Poetic Evaluation Metric",
        "Xây dựng bộ công cụ tự động kiểm định số âm tiết, vị trí gieo vần lưng/chân và cấu trúc thanh điệu để đánh giá khách quan."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / DATA CORPUS & PHONETIC RULES",
          "Số hóa và làm sạch tập thơ Lục Bát, xây dựng từ điển luật vần và quy tắc âm luật tiếng Việt."
        ],
        [
          "02 / FINE-TUNING & CONSTRAINED DECODER",
          "Áp dụng QLoRA 4-bit và cài đặt cơ chế beam search kiểm soát logit bias theo thời gian thực."
        ],
        [
          "03 / BENCHMARK & EVALUATION",
          "Đo lường tỷ lệ chuẩn luật trên tập thơ sinh ra để đối chuẩn và tinh chỉnh bộ mặt nạ ngữ âm."
        ]
      ],
      "artifacts": [
        "Vietnamese Poetry QLoRA Adapters",
        "Constrained Beam Search Decoding Engine",
        "Automated Meter & Rhyme Checker Library",
        "Interactive Poetry Generation Playground"
      ],
      "reflection": "Cơ chế can thiệp logit bias theo quy tắc âm luật tại bước giải mã giúp mô hình tuân thủ cấu trúc thể thơ chặt chẽ hơn nhiều so với việc chỉ dựa vào khả năng học ngầm của mô hình ngôn ngữ tự do."
    }
  },
  {
    "slug": "verba-ai-meeting",
    "name": "Verba: AI-Powered Meeting Minutes & Speech-to-Text Platform",
    "year": "2025",
    "type": "Speech AI · Full-Stack Platform · LLM Summarization",
    "description": "Nền tảng hỗ trợ gỡ băng âm thanh cuộc họp và trích xuất biên bản tự động với Faster-Whisper, VAD lọc khoảng lặng, phân tách người nói và LLM tóm tắt có cấu trúc.",
    "colors": [
      "#77b6ff",
      "#0f325e"
    ],
    "image": "/images/hud-005-menu.jpg",
    "role": "Full-Stack & AI Systems Engineer",
    "challenge": "Biến các bản ghi âm cuộc họp thành tài liệu biên bản họp có cấu trúc rõ ràng (tóm tắt điều hành, các quyết định chính, danh sách công việc bàn giao - Action Items) trong điều kiện âm thanh nhiều tạp âm, người nói chen lấn và tiếng Việt tự nhiên.",
    "outcome": "Hiện thực hóa pipeline xử lý âm thanh luồng bất đồng bộ: Silero VAD lọc khoảng lặng tạp âm, Faster-Whisper ASR gỡ băng và PyAnnote phân tách người nói; tích hợp LLM tóm tắt trích xuất danh sách công việc và giao diện web Next.js hỗ trợ đồng bộ âm thanh với văn bản.",
    "githubUrl": "https://github.com/Biggbros/Verba-AI-Meeting-Recognition",
    "decisions": [
      [
        "Distributed Asynchronous Pipeline",
        "Sử dụng FastAPI kết hợp Celery và Redis để xử lý song song các tác vụ phân tích âm thanh nặng mà không gây nghẽn máy chủ web."
      ],
      [
        "Faster-Whisper & Speaker Diarization",
        "Tối ưu hóa mô hình nhận dạng giọng nói với CTranslate2 và phân cụm giọng nói người tham gia họp."
      ],
      [
        "Structured LLM Prompt Pipelines",
        "Thiết kế chuỗi prompt phân tích gỡ băng nhiều chặng: trích xuất tóm tắt điều hành, bảng phân công nhiệm vụ và lịch trình dự án."
      ],
      [
        "Audio-Text Sync Frontend",
        "Frontend Next.js cho phép nhấp vào từng câu thoại để tua ngay đến vị trí âm thanh tương ứng trong bản ghi âm."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / SPEECH PROCESSING PIPELINE",
          "Tích hợp VAD lọc tạp âm, Faster-Whisper ASR và mô hình phân tách người nói PyAnnote."
        ],
        [
          "02 / ASYNC QUEUE & BACKEND SERVICE",
          "Xây dựng hàng đợi tác vụ phân tán với Celery và Redis, quản trị lưu trữ media an toàn."
        ],
        [
          "03 / FRONTEND & REAL-TIME DASHBOARD",
          "Hoàn thiện giao diện Next.js với trình phát âm thanh đồng bộ văn bản và công cụ xuất biên bản họp."
        ]
      ],
      "artifacts": [
        "FastAPI Audio Ingestion & Diarization Microservice",
        "Next.js Interactive Meeting Dashboard",
        "Distributed Worker Task Queue (Celery/Redis)",
        "Automated Minutes Generator Engine"
      ],
      "reflection": "Để biên bản họp tự động thực sự hữu ích, khâu tiền xử lý âm thanh sạch (lọc khoảng lặng và phân cụm người nói) đóng vai trò then chốt giúp LLM nắm bắt chính xác ngữ cảnh trao đổi và phân công công việc."
    }
  },
  {
    "slug": "jobmatching-scc",
    "name": "Smart Job Matching Platform — SCC",
    "year": "2025",
    "type": "Applied AI · Semantic Search · Vector Database",
    "description": "Dự án nền tảng khớp nối ứng viên và tin tuyển dụng qua 2 giai đoạn: Tìm kiếm ngữ nghĩa bằng pgvector trên PostgreSQL và phân tích khoảng cách kỹ năng bằng LLM.",
    "colors": [
      "#9ee6b8",
      "#1c4a2a"
    ],
    "image": "/images/hud-006-event.jpg",
    "role": "AI & Backend Engineer",
    "challenge": "Khớp nối hồ sơ ứng viên (CV) và bản mô tả công việc (JD) thường dựa trên từ khóa đơn thuần, bỏ lỡ ngữ cảnh kinh nghiệm tương đương hoặc kỹ năng liên quan gián tiếp; đồng thời ứng viên gặp khó khăn trong việc biết rõ mình còn thiếu kỹ năng gì để đáp ứng vị trí mong muốn.",
    "outcome": "Xây dựng hệ thống khớp nối 2 giai đoạn: Giai đoạn 1 tìm kiếm ngữ nghĩa với pgvector (HNSW Indexing) trên PostgreSQL sử dụng Gemini Embeddings; Giai đoạn 2 phân tích khoảng cách kỹ năng (skill-gap) và đưa ra gợi ý phù hợp bằng DeepSeek LLM.",
    "githubUrl": "https://github.com/nghiadt13/EXE101-JobMatching-SCC",
    "decisions": [
      [
        "Two-Stage Hybrid Search",
        "Lọc nhanh top ứng viên bằng pgvector cosine similarity, sau đó dùng LLM để đánh giá năng lực thực chất và kinh nghiệm dự án."
      ],
      [
        "Automated Resume Parsing",
        "Bóc tách tự động các định dạng CV (PDF, DOCX) thành cấu trúc dữ liệu JSON bao gồm học vấn, kỹ năng, kinh nghiệm và chứng chỉ."
      ],
      [
        "Skill-Gap Advisory",
        "Tự động phân tích và đưa ra đề xuất lộ trình bổ sung kỹ năng cho ứng viên dựa trên các yêu cầu còn thiếu so với mô tả công việc."
      ],
      [
        "Robust Enterprise Architecture",
        "Backend NestJS theo nguyên lý Clean Architecture, cơ sở dữ liệu PostgreSQL mở rộng với pgvector, tích hợp bảo mật và phân quyền vai trò."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / DATA SCHEMA & CV PARSING",
          "Định nghĩa taxonomy kỹ năng ngành nghề và xây dựng pipeline bóc tách CV tự động về JSON Schema."
        ],
        [
          "02 / VECTOR SEARCH & HYBRID ROUTING",
          "Tích hợp pgvector vào PostgreSQL, cấu hình chỉ mục HNSW và kết nối Gemini Embedding API."
        ],
        [
          "03 / DEEPSEEK RE-RANKING & PRODUCTION",
          "Triển khai module phân tích khoảng cách kỹ năng bằng DeepSeek và hoàn thiện hệ thống NestJS API."
        ]
      ],
      "artifacts": [
        "NestJS Enterprise Backend API",
        "pgvector Semantic Search Schema & Migration Scripts",
        "Automated CV Parsing & Skill Extraction Module",
        "DeepSeek Skill-Gap Analysis Engine"
      ],
      "reflection": "Sự kết hợp giữa tìm kiếm vector để sàng lọc nhanh diện rộng và mô hình ngôn ngữ để phân tích chi tiết giúp hệ thống vừa phản hồi nhanh chóng, vừa đưa ra những gợi ý cải thiện kỹ năng cụ thể cho ứng viên."
    }
  }
];

export const SHEETS: PhotoSheet[] = [
  {
    "slug": "contact-sheet-001",
    "title": "HUD Game Studies",
    "description": "A personal archive of interesting work by others: game screens, interface ideas and memorable design moments.",
    "date": "2026-08-09",
    "kind": "contact-sheet",
    "number": 1,
    "seedVersion": 2,
    "image": "/images/hud-001-kena.jpg",
    "images": [
      {
        "image": "/images/hud-001-kena.jpg",
        "position": "center",
        "title": "Forest menu",
        "description": "A quiet title screen that makes navigation feel like entering a place.",
        "location": "Kena: Bridge of Spirits",
        "time": "Opening screen"
      },
      {
        "image": "/images/hud-002-investigation.jpg",
        "position": "center",
        "title": "Evidence in the light",
        "description": "Maps, tapes and shadows build a scene before the player reads a single clue.",
        "location": "Investigation interface",
        "time": "00:22"
      },
      {
        "image": "/images/hud-003-profile.jpg",
        "position": "center",
        "title": "Character dossier",
        "description": "A profile screen framed as a pinned case file: identity, memory and choice.",
        "location": "Narrative character UI",
        "time": "Profile select"
      },
      {
        "image": "/images/hud-004-cast.jpg",
        "position": "center",
        "title": "Cast on the desk",
        "description": "Portrait cards turn a character roster into a tactile collection of stories.",
        "location": "Hero collection screen",
        "time": "Campaign launch"
      },
      {
        "image": "/images/hud-005-menu.jpg",
        "position": "center",
        "title": "New game ritual",
        "description": "Paper panels and bold options make the first decision feel ceremonial.",
        "location": "Start menu",
        "time": "New session"
      },
      {
        "image": "/images/hud-006-event.jpg",
        "position": "center",
        "title": "Event map",
        "description": "Tickets, location pins and layered cards turn a schedule into a journey.",
        "location": "Live event interface",
        "time": "Event briefing"
      },
      {
        "image": "/images/hud-007-entry.jpg",
        "position": "center",
        "title": "Enter your world",
        "description": "A name-entry screen that treats the player as part of the scene.",
        "location": "Onboarding interface",
        "time": "First entry"
      }
    ],
    "createdAt": "2026-08-09T16:00:00.000Z"
  },
  {
    "slug": "aaa",
    "title": "Barista & Sweet Things",
    "description": "A small café study of iced coffee, soft light, pastries and the quiet work behind a sweet counter.",
    "date": "2026-08-09",
    "kind": "contact-sheet",
    "number": 2,
    "seedVersion": 2,
    "image": "/images/barista-001-strawberry-cake.jpg",
    "images": [
      {
        "image": "/images/barista-001-strawberry-cake.jpg",
        "position": "center",
        "title": "Strawberry interval",
        "description": "Iced latte, matcha and three slices of cake sharing the afternoon table.",
        "location": "Café terrace",
        "time": "14:12"
      },
      {
        "image": "/images/barista-002-coffee-table.jpg",
        "position": "center",
        "title": "Coffee with company",
        "description": "Layered lattes and small desserts collected around a slow conversation.",
        "location": "Neighbourhood café",
        "time": "15:05"
      },
      {
        "image": "/images/barista-003-waffle.jpg",
        "position": "center",
        "title": "Waffle, two blacks",
        "description": "A scoop of vanilla over a warm waffle beside clean, dark coffee.",
        "location": "Counter table",
        "time": "16:18"
      },
      {
        "image": "/images/barista-004-iced-coffee.jpg",
        "position": "center",
        "title": "Ice & caramel",
        "description": "The small rituals of a drink: ice, crema, cutlery and a sweet plate.",
        "location": "Window seat",
        "time": "16:42"
      },
      {
        "image": "/images/barista-005-dessert.jpg",
        "position": "center",
        "title": "Dessert after dark",
        "description": "Cold milk coffee, ice cream and the last bite before the lights go low.",
        "location": "Night café",
        "time": "20:16"
      },
      {
        "image": "/images/barista-006-late-notes.jpg",
        "position": "center",
        "title": "Notes before shift",
        "description": "A late desk, a notebook and the calm focus that carries into tomorrow.",
        "location": "Home studio",
        "time": "22:47"
      },
      {
        "image": "/images/barista-007-donut-prep.jpg",
        "position": "center",
        "title": "Donut prep",
        "description": "A barista finishing each small detail before the first customer arrives.",
        "location": "Bakery counter",
        "time": "08:36"
      }
    ],
    "createdAt": "2026-08-09T17:00:00.000Z"
  }
];

export const PARTNERS: PartnerItem[] = [
  {
    "slug": "genkaiz",
    "name": "Genkaiz",
    "href": "https://genkaiz.net/",
    "type": "CREATIVE PARTNER",
    "mark": "G",
    "image": "/images/genkaiz-preview.png",
    "headline": "A gaming space built around discovery.",
    "summary": "Genkaiz is a Vietnamese platform focused on game accounts and related player services.",
    "note": "Its energetic game-first identity brings a different kind of digital culture into this archive: fast, specific and community-driven.",
    "focus": [
      "Gaming culture",
      "Digital community",
      "Creative partner"
    ]
  },
  {
    "slug": "guga-studio",
    "name": "Guga Studio",
    "href": "https://gugastudio.org/",
    "type": "CREATIVE PARTNER",
    "mark": "GS",
    "image": "/images/guga-preview.png",
    "headline": "Small figures with a collector’s sense of detail.",
    "summary": "Guga Studio creates collector-grade chibi figurines for people who enjoy character, craft and playful objects.",
    "note": "A partnership space for celebrating tactile work, character design and the joy of objects made with care.",
    "focus": [
      "Character culture",
      "Collectible design",
      "Creative partner"
    ]
  },
  {
    "slug": "oto-chat",
    "name": "oto.chat",
    "href": "https://www.oto.chat/",
    "type": "MEDIA SUPPORT",
    "mark": "Oto",
    "image": "/images/oto-preview.png",
    "headline": "A small AI companion for the desktop.",
    "summary": "oto.chat presents Oto, an AI desktop pet designed to make everyday desktop time a little more playful.",
    "note": "Supporting the communication side of this space through an approachable, character-led digital presence.",
    "focus": [
      "AI companion",
      "Digital character",
      "Media support"
    ],
    "title": "oto.chat",
    "detail": "",
    "group": "MEDIA SUPPORT",
    "order": "",
    "description": "oto.chat presents Oto, an AI desktop pet designed to make everyday desktop time a little more playful.",
    "date": "2026-08-05",
    "createdAt": "2026-08-05T16:08:59.289Z"
  }
];

export const CONTACTS: ContactItem[] = [
  {
    "slug": "email",
    "title": "PRIMARY EMAIL",
    "detail": "phuongnam.ai.work@gmail.com",
    "href": "mailto:phuongnam.ai.work@gmail.com",
    "group": "DIRECT CONTACT",
    "order": 1
  },
  {
    "slug": "fpt-mail",
    "title": "FPT UNIVERSITY MAIL",
    "detail": "namdp.fptu@gmail.com",
    "href": "mailto:namdp.fptu@gmail.com",
    "group": "DIRECT CONTACT",
    "order": 2
  },
  {
    "slug": "resume-cv",
    "title": "CURRICULUM VITAE (CV)",
    "detail": "Download PDF Resume (2026)",
    "href": "/cv.pdf",
    "group": "DIRECT CONTACT",
    "order": 3
  },
  {
    "slug": "github",
    "title": "GITHUB PROFILE",
    "detail": "github.com/zafkielzz",
    "href": "https://github.com/zafkielzz",
    "group": "WORK & CODE",
    "order": 4
  },
  {
    "slug": "linkedin",
    "title": "LINKEDIN",
    "detail": "Đặng Phương Nam on LinkedIn",
    "href": "https://linkedin.com",
    "group": "SOCIAL CHANNELS",
    "order": 5
  },
  {
    "slug": "scholar",
    "title": "RESEARCH & PUBLICATION",
    "detail": "IEEE IS'26 Conference Paper",
    "href": "/work/conflict-aware-rag-routing",
    "group": "WORK & CODE",
    "order": 6
  },
  {
    "slug": "facebook",
    "title": "FACEBOOK",
    "detail": "Đặng Phương Nam",
    "href": "https://facebook.com",
    "group": "SOCIAL CHANNELS",
    "order": 7
  }
];

export const SITE_METADATA = {
  "name": "ĐẶNG PHƯƠNG NAM",
  "title": "Đặng Phương Nam — AI Engineer & Researcher | FPT University",
  "eyebrow": "ĐẶNG PHƯƠNG NAM · FPT UNIVERSITY · AI LAB",
  "description": "Portfolio & Research Archive của Đặng Phương Nam — Sinh viên năm cuối ngành Trí tuệ Nhân tạo (AI) tại Đại học FPT. Tác giả chính (First Author) công bố khoa học tại IEEE IS'26.",
  "tagline": "Deep Learning, Intelligent Systems & Scientific Publication.",
  "bioEn": "Hello, I’m Đặng Phương Nam — a final-year Artificial Intelligence student at FPT University. My research focuses on multimodal deep learning, adaptive RAG routing, and on-device Edge AI. First Author of accepted & presented paper at IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems.",
  "bioVi": "Xin chào, tôi là Đặng Phương Nam — sinh viên năm cuối chuyên ngành Trí tuệ Nhân tạo tại Đại học FPT. Nghiên cứu của tôi tập trung vào Deep Learning đa phương thức, định tuyến RAG thích ứng và Edge AI tối ưu phần cứng. Tác giả chính của công trình nghiên cứu khoa học được chấp thuận và trình bày tại hội nghị quốc tế IEEE IS'26.",
  "status": "OPEN FOR AI ENGINEER & RESEARCH ROLES",
  "timezone": "BANGKOK / HANOI / GMT+7",
  "location": "Hanoi, Vietnam",
  "university": "FPT University",
  "degree": "Bachelor of Science in Artificial Intelligence (Expected 2026)",
  "cvUrl": "/cv.pdf"
};
