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

export interface ContactItem {
  slug: string;
  title: string;
  detail: string;
  href: string;
  group: string;
  order: number;
}

export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  description: string;
  focusAreas: string[];
  coursework: string[];
}

export interface PublicationItem {
  slug: string;
  title: string;
  conference: string;
  role: string;
  date: string;
  status: string;
  abstract: string;
  authors: string[];
  paperPdf: string;
  projectSlug: string;
  postSlug: string;
  githubUrl: string;
  metrics: { label: string; value: string; note: string }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerBadge?: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  category: string;
  skills: string[];
  summary: string;
  featured?: boolean;
}

export interface AcademicBadgeItem {
  id: string;
  code: string;
  title: string;
  issuer: string;
  program: string;
  description: string;
  focus: string[];
  credentialId?: string;
  credentialUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'AI & Deep Learning' | 'LLM & RAG' | 'Computer Vision' | 'Systems & Backend' | 'Hardware & Edge';
  level: 'Core Mastery' | 'Advanced' | 'Proficient';
  summary: string;
  tags: string[];
  relatedSlug?: string;
  relatedLabel?: string;
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
      "llm"
    ],
    "content": "\nOur peer-reviewed research paper introduces Conflict-Aware RAG Routing, accepted and presented at IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems (First Author: Dang Phuong Nam).\n\n## Motivation: Beyond Retrieval Relevance\n\nAdaptive model routing can reduce the cost of Retrieval-Augmented Generation (RAG), but the routing signal must accurately identify when a compact local model is likely to fail. Traditional retrieval-aware gates use relevance or rank-based confidence (such as Reciprocal Rank Fusion - RRF). However, high retrieval confidence does not mean the retrieved passages agree.\n\nWhen evidence contains intra-context contradiction or distracting facts, small language models (SLMs) suffer severe reasoning impairment, whereas calling expensive frontier API models for every query incurs unsustainable monetary and latency costs.\n\n## Proposed Architecture: 5-Feature Conflict-Aware Router\n\nWe design a reproducible context-conflict scoring pipeline and a learned router:\n\n1. **Bidirectional NLI Contradiction Scoring**: Evaluates the top 3 parent passages using `cross-encoder/nli-deberta-v3-small` in both input orders to eliminate directional bias: $q_{ij} = [S(p_i, p_j) + S(p_j, p_i)] / 2$. The aggregate conflict score is formulated as:\n   $$C = 0.7 \\max_{q \\in Q} q + 0.3 \\text{mean}_{q \\in Q} q$$\n2. **5-Feature Random Forest**: Combines Context Conflict ($C$) with Query Length, Retrieved Context Length, Chunk Lexical Overlap, and RRF Confidence across 500 trees.\n3. **Leakage-Resistant Nested 5-Fold Calibration**: Budget cutoffs ($b \\in \\{30\\%, 50\\%, 65\\%\\}$) are selected strictly from inner out-of-fold scores to prevent data leakage onto test instances.\n\n## Empirical Benchmark on 3,000 Multi-Hop Questions\n\nWe evaluated the complete pipeline across 3,000 multi-hop reasoning questions from **MuSiQue**, **HotpotQA**, and **2WikiMultiHopQA**, pairing local **Qwen2.5-1.5B-Instruct** with API **DeepSeek-V4-Flash**:\n\n- **Primary Deployment Result**: At an approximately 65% target budget (realized usage 63.9%–65.0% LLM calls), the hybrid router **saves ~35% of API calls** while retaining **83.2%–92.2% of Always-LLM token F1** (83.8% on MuSiQue, 83.2% on HotpotQA, and 92.2% on 2Wiki).\n- **Dataset-Dependent Incremental Effect**: At the 50% budget relative to RRF alone, the hybrid changes token F1 by −1.08 on MuSiQue (95% CI [−2.38, 0.24]), −0.03 on HotpotQA (95% CI [−1.91, 1.86]), and +1.48 on 2Wiki (95% CI [0.08, 2.87], pointwise CI excludes zero).\n- **Diagnostic Subgroup Discovery (High-RRF / High-Conflict)**: In instances where retrieval confidence is high (top third RRF) but passages contradict each other (top third conflict), standard RRF incorrectly retains queries on the SLM. In this subgroup, the hybrid router intervenes effectively, achieving dramatic F1 gains of **+14.35 points on HotpotQA** ($p = 0.006$) and **+6.50 points on 2Wiki** ($p = 0.006$).\n\n<PostCallout title=\"IEEE IS'26 Acceptance & First Authorship\">\nFirst Author: Dang Phuong Nam (FPT University). Accepted and presented at The 13th IEEE International Conference on Intelligent Systems (IEEE IS'26). Full paper available in research archive (paper_93.pdf).\n</PostCallout>\n\n<PostColumns>\n  <PostColumn title=\"Research Manuscript\">\nFull paper manuscript (paper_93.pdf) available for download with complete bootstrap confidence intervals and statistical verifications.\n  </PostColumn>\n  <PostColumn title=\"Reproducible Codebase\">\nComplete experimental pipeline, nested calibration scripts, and feature extractors are open-sourced on GitHub: [RAG_Router_Via_Context_Conflict](https://github.com/RAG-Routing-Via-Context-Confliction/RAG_Router_Via_Context_Conflict).\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 5
  },
  {
    "slug": "probabilistic-stock-breakout-vietnam",
    "title": "Probabilistic Modeling of Stock Breakout Success in the Vietnamese Equity Market",
    "date": "2026-07-10T00:00:00.000Z",
    "summary": "Công trình nghiên cứu khoa học tại ICITDA 2026 (Đồng tác giả: Đặng Phương Nam): Mô hình hóa xác suất breakout thành công từ nền tích lũy trên TTCK Việt Nam bằng LightGBM và các đặc trưng VCP / SEPA, đạt Precision@10 = 90.0% trên tập out-of-sample.",
    "tags": [
      "icitda 2026",
      "research",
      "quantitative finance"
    ],
    "content": "\nOur co-authored research paper, accepted at **The 11th International Conference on Information Technology and Digital Applications (ICITDA 2026)**, formulates stock breakout prediction during price consolidation phases as an event-driven probabilistic machine learning problem on the Vietnamese equity market.\n\n<PostCallout title=\"ICITDA 2026 Acceptance & Co-Authorship\">\nAuthors: Doan Duy Long, Tran Huy Tuan, Dang Phuong Nam, Cao Van Mai (Faculty of Artificial Intelligence, FPT University, Vietnam). Accepted at the 2026 11th International Conference on Information Technology and Digital Applications (ICITDA). (Archive Manuscript · Non-presented).\n</PostCallout>\n\n## Motivation: The False Breakout Problem in Emerging Markets\n\nBreakout trading strategies—such as horizontal resistance breakouts, Donchian channels, and Mark Minervini's Specific Entry Point Analysis (SEPA)—aim to capture rapid acceleration from price consolidation bases. However, classical technical analysis relies on fixed deterministic rules (e.g. price crossing a fixed band), which frequently produce **false breakouts (bẫy tăng giá / bull traps)** in emerging equity markets like Vietnam (VNINDEX).\n\nInstead of treating every price breakout as an equally valid trade, we formulate breakout evaluation as a **probabilistic signal filtering problem**: estimating the calibrated likelihood that a given breakout event will yield a positive risk-adjusted outcome before hitting its stop-loss.\n\n## Causal Data Pipeline & Market Universe\n\nTo prevent lookahead bias and market manipulation artifacts, we enforce strict constraints:\n- **Trading Universe**: 255 liquid Vietnamese equities on HOSE/HNX with market capitalization exceeding 2,500 billion VND (2010–2026), aligned with historical VNINDEX daily data.\n- **Strict Causal Integrity**: All features at time $t$ are derived strictly using information available at $t-1$:\n  $$X_t \\leftarrow X_{t-1}$$\n- **Event Definition & Trade Simulation**: A candidate breakout is identified when the closing price exceeds a 60–100 day rolling ceiling with ATR volatility below threshold. The trade is simulated with entry at the next day's open, Take-Profit ($TP = \\text{Entry} + k \\times \\text{ATR}$), and Stop-Loss ($SL = \\text{Entry} - k \\times \\text{ATR}$) within a 120-day horizon.\n\n## SEPA-Inspired Quantitative Feature Engineering\n\nWe reformulate Minervini's discretionary SEPA methodology into quantitative, computable features:\n\n1. **Volatility Contraction Pattern (VCP)**: Measures successive narrowing of price swings within the consolidation base:\n   $$\\text{VCP Ratio} = \\frac{\\text{ATR}_{14}}{\\text{ATR}_{60}}$$\n   alongside 60-day base depth and 20-day rolling standard deviation of returns.\n2. **Relative Strength (RS Line)**: Tracks individual stock performance relative to the broader VNINDEX benchmark:\n   $$\\text{RS}_t = \\frac{P_{\\text{stock}, t}}{P_{\\text{market}, t}}$$\n   Cross-sectional percentile ranking identifies stocks exhibiting market leadership before breaking out.\n3. **Volume Dry-Up & Breakout Surge**: Compares breakout volume against its 20-day moving average:\n   $$\\text{Vol Ratio}_t = \\frac{V_t}{\\text{SMA}_{20}(V_t)}$$\n4. **Market Regime Conditioning**: VNINDEX trend slopes (MA50, MA200) and rolling drawdowns categorize market state into Downtrend, Neutral, and Uptrend.\n\n## LightGBM Modeling & Dynamic Imbalance Handling\n\nWe train a gradient boosted tree model (**LightGBM**) with 2,000 estimators, learning rate 0.02, early stopping, and dynamic class reweighting:\n$$\\text{scale\\_pos\\_weight} = \\frac{1 - p}{p}$$\nwhere $p$ is the positive class ratio. Time-series cross-validation (`TimeSeriesSplit`, 3 folds) on pre-2024 data ensures no temporal leakage.\n\n## Empirical Out-of-Sample Results (2024–2026 Test Set)\n\nThe framework is benchmarked on an out-of-sample test set from 2024 onwards consisting of 216 strictly time-separated breakout events:\n\n- **Baseline Market Win Rate**: 49.07% (near random coin-flip due to market noise and false breakouts).\n- **High-Conviction Decile Selection (Top-K)**:\n  - **Precision@10 = 0.9000 (90.00% Win Rate)** across the top 10 ranked breakout setups.\n  - **Precision@6 = 0.8333 (83.33% Win Rate)**.\n  - Top 5% percentile win rate: **90.0%**; Top 20% percentile: **74.42%**.\n- **Calibrated Threshold Strategy ($P > 0.8$)**:\n  - Sample size: 40 trades.\n  - **Win Rate: 72.5%**.\n  - **Profit Factor: 4.89** (Average return per trade **+13.94%**, Total return **5.58x**).\n- **Market Regime Robustness**:\n  - Neutral Market Regime: 29 trades, **75.86% Win Rate**.\n  - Uptrend Market Regime: 11 trades, **72.73% Win Rate**.\n\n<PostColumns>\n  <PostColumn title=\"Full Research Manuscript\">\nThe full paper manuscript (icitda_2026_stock_breakout.pdf) is publicly available for academic and quant research review.\n  </PostColumn>\n  <PostColumn title=\"Signal Ranking Insight\">\nThe model's primary value is not directional price guessing, but opportunity ranking: discarding low-probability false breakouts and concentrating capital on asymmetric upside setups.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 5
  },
  {
    "slug": "stock-multitask-transformer",
    "title": "Multi-Task Transformer for Stock Trend Prediction & Self-Rationalization",
    "date": "2026-05-18T00:00:00.000Z",
    "summary": "Đồ án tốt nghiệp tại ĐH FPT (Đặng Phương Nam - Team Leader): Thiết kế kiến trúc Decoder-Only SLM đa nhiệm xử lý dữ liệu lai (chuỗi thời gian giá, văn bản tài chính, ESG) nhằm dự báo xu hướng và tự động sinh giải trình.",
    "tags": [
      "capstone",
      "multimodal",
      "quantitative finance"
    ],
    "content": "\nOur Capstone Project at FPT University tackles a fundamental challenge in quantitative AI: bridging numerical time-series forecasting with textual qualitative reasoning through a unified, parameter-efficient architecture.\n\n## The Dual Modality Dilemma in Equity Markets\n\nQuantitative models traditionally process numerical time series (OHLCV prices, technical factors) via RNNs or specialized Transformers, while fundamental sentiment is extracted independently using LLMs. These disjoint pipelines discard crucial cross-modal correlations:\n- Price movements cannot explain *why* an anomaly occurred.\n- Large LLMs cannot reliably predict numerical volatility or risk boundaries.\n\n## Architecture: Shared Decoder-Only SLM Backbone\n\nWe propose a unified multi-task architecture built on a compact 0.5B parameter language model (Qwen2.5-0.5B) capable of running on edge or consumer GPUs (VRAM < 8GB):\n\n1. **Hybrid Modality Encoders**:\n   - **Time-Series (PatchTST)**: Price series partitioned into non-overlapping patches ($W = 30$ days) with temporal positional encodings.\n   - **Financial Text**: Earnings transcripts and MD&A filings tokenized with segment embeddings.\n   - **Continuous ESG & Fundamentals**: Continuous vector embeddings avoiding categorical discretization.\n2. **Dual-Head Multi-Task Decoding**:\n   - Classification Head: Extracts hidden states from the dedicated `[DECISION]` token for multi-class trend prediction (Up / Neutral / Down).\n   - Autoregressive Generation Head: Generates structured financial rationalization explaining the factors behind the quantitative decision.\n3. **Consistency Loss via NLI Verification**:\n   To prevent hallucinated or conflicting justifications, an auxiliary NLI loss penalizes divergence between the predicted direction and the generated explanation:\n   $$\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{trend}} + \\lambda_1 \\mathcal{L}_{\\text{gen}} + \\lambda_2 \\mathcal{L}_{\\text{consistency}}$$\n\n<PostCallout title=\"Local On-Premise Deployment\">\nDesigned for privacy-sensitive enterprise environments, the complete model runs locally on consumer-grade hardware (single NVIDIA RTX 4060, < 8GB VRAM) with 4-bit quantization, eliminating continuous cloud API costs.\n</PostCallout>\n",
    "readingTime": 4
  },
  {
    "slug": "autonomous-multi-agent-systems",
    "title": "Designing Multi-Agent Swarms for Autonomous Research",
    "date": "2026-03-20T00:00:00.000Z",
    "summary": "Nghiên cứu điều phối hệ thống Agentic AI: Điều phối mạng lưới các agent tự trị với DAG execution, tool calling và reflection loop.",
    "tags": [
      "agents",
      "llm",
      "system architecture"
    ],
    "content": "\nBuilding single-prompt LLM applications is straightforward, but coordinating a swarm of autonomous agents with deterministic guarantees is where true engineering begins.\n\n## Contract-driven Agent Protocols\n\nIn our research systems at FPT University, we transitioned from unstructured conversation chains to strict typed contracts. Each agent—Researcher, Critic, Coder, Validator—receives and returns strictly validated JSON schemas.\n\nWhen an agent fails to meet verification rubrics, a dedicated Reflection Critic provides structured feedback rather than propagating errors downstream.\n\n## The DAG Orchestrator\n\nInstead of open-ended conversational loops that consume runaway token budgets, we modeled task execution as a Directed Acyclic Graph (DAG):\n\n- Dynamic node scheduling based on dependency resolution\n- Sub-second task dispatching with parallel execution branches\n- Checkpointed state snapshots allowing human intervention at critical checkpoints\n\n<PostCallout title=\"System Reliability\">\nDeterministic verification at agent handoff boundaries reduced cascading hallucinations by over 74% in our comparative benchmark trials.\n</PostCallout>\n",
    "readingTime": 3
  },
  {
    "slug": "optimizing-rag-hybrid-search",
    "title": "Optimizing RAG Pipelines with Hybrid Search and Reranking",
    "date": "2026-01-12T00:00:00.000Z",
    "summary": "Tại sao vector similarity thuần túy là không đủ cho enterprise search, và cách kết hợp BM25 + Cross-Encoder reranking.",
    "tags": [
      "rag",
      "nlp",
      "vector search"
    ],
    "content": "\nCosine similarity over dense embeddings often fails on domain-specific acronyms, exact serial codes, and negative constraint queries.\n\n## The Power of Hybrid Retrieval\n\nBy pairing dense neural embeddings with classical BM25 lexical search through Reciprocal Rank Fusion (RRF), we achieved balanced recall across both conceptual queries and exact keyword lookups.\n\nPassing the top-50 candidates through a lightweight Cross-Encoder reranker prior to context injection into the prompt window significantly improved context precision and answer truthfulness.\n",
    "readingTime": 2
  },
  {
    "slug": "fpt-university-ai-journey",
    "title": "From FPT University Lab to Production AI: Key Takeaways",
    "date": "2025-11-20T00:00:00.000Z",
    "summary": "Những bài học thực tế sau 4 năm học tập và nghiên cứu AI tại Đại học FPT: Từ thuật toán trên giấy đến mô hình thực nghiệm và công bố khoa học.",
    "tags": [
      "fptu",
      "research"
    ],
    "content": "\nStudying Artificial Intelligence at FPT University provided a rigorous foundation in mathematical foundations, machine learning theory, and hands-on capstone engineering.\n\nThe biggest shift from university theory to production reality is realizing that 80% of machine learning success comes from data curation, latency budgeting, and robust system architecture rather than just tweaking model hyperparameters.\n",
    "readingTime": 3
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
    "outcome": "Đề xuất mô hình Random Forest 5 đặc trưng (Context Conflict C, Query Length, Context Length, Chunk Overlap, RRF Confidence) với quy trình hiệu chuẩn ngân sách lồng (nested 5-fold calibration chống rò rỉ dữ liệu). Đánh giá trên 3,000 câu hỏi multi-hop (MuSiQue, HotpotQA, 2Wiki) với Qwen2.5-1.5B-Instruct và DeepSeek-V4-Flash: ở mức ~65% lượt gọi, router tiết kiệm ~35% API calls trong khi giữ lại 83.2%–92.2% F1 của Always-LLM. Trong nhóm truy vấn có RRF cao nhưng mâu thuẫn cao (high-RRF/high-conflict), router can thiệp chuyển tiếp lên LLM, đạt F1 gain +14.35 trên HotpotQA và +6.50 trên 2Wiki so với RRF.",
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
    "slug": "probabilistic-stock-breakout-vietnam",
    "name": "Probabilistic Modeling of Stock Breakout Success in the Vietnamese Equity Market",
    "year": "2026",
    "type": "Scientific Publication · ICITDA 2026 (Accepted · Archive Manuscript)",
    "description": "Nghiên cứu khoa học được chấp thuận tại ICITDA 2026 (Đồng tác giả: Đặng Phương Nam): Mô hình hóa xác suất breakout thành công từ nền tích lũy trên TTCK Việt Nam bằng LightGBM kết hợp bộ đặc trưng Minervini SEPA / VCP, đạt Precision@10 = 90.0% và Win Rate 72.5% tại ngưỡng P > 0.8.",
    "colors": [
      "#4ade80",
      "#14532d"
    ],
    "image": "/images/collection-projects.jpg",
    "role": "Co-Author (Đồng tác giả) · Quantitative ML Researcher",
    "challenge": "Chiến lược giao dịch breakout từ nền tích lũy (consolidation base) rất phổ biến trong phân tích kỹ thuật nhưng thường xuyên gặp phải hiện tượng bẫy tăng giá (false breakouts / bull traps) tại các thị trường cận biên/mới nổi như Việt Nam (VNINDEX). Các hệ thống truyền thống (Donchian, kênh giá cố định) hoạt động mang tính định tính, thiếu xác suất định lượng và không có cơ chế lọc bỏ nhiễu cấu trúc thị trường.",
    "outcome": "Xây dựng khung mô hình hóa xác suất theo sự kiện (event-driven) trên vũ trụ 255 cổ phiếu thanh khoản cao sàn HOSE/HNX (vốn hóa > 2,500 tỷ VND) giai đoạn 2010–2026 với cấu trúc nhân quả nghiêm ngặt X_t ← X_{t-1} triệt tiêu lookahead bias. Mô hình LightGBM được tối ưu hóa cùng bộ đặc trưng SEPA / VCP nén biến động và động lượng khối lượng. Đánh giá out-of-sample nghiêm ngặt (2024–2026, 216 sự kiện breakout thực tế): Top-10 dự báo đạt Win Rate 90.00% (Precision@10 = 0.9000); tại ngưỡng xác suất P > 0.8 đạt Win Rate 72.5% với Profit Factor 4.89 và lợi nhuận bình quân +13.94%/giao dịch, duy trì độ ổn định vượt trội trong cả thị trường Neutral (Win Rate 75.86%) lẫn Uptrend (Win Rate 72.73%).",
    "decisions": [
      [
        "Causal Feature Engineering & Zero-Lookahead Pipeline",
        "Triệt tiêu hoàn toàn rò rỉ dữ liệu tương lai bằng nguyên tắc nhân quả nghiêm ngặt X_t ← X_{t-1}, đồng bộ dữ liệu OHLCV điều chỉnh của 255 cổ phiếu lớn với chỉ số VNINDEX từ 2010 đến 2026."
      ],
      [
        "Định lượng hóa chiến lược Minervini SEPA & Mô hình nén biến động (VCP)",
        "Chuyển hóa triết lý giao dịch đà tăng trưởng SEPA thành các đặc trưng toán học kiểm chứng được: tỷ số nén ATR(14)/ATR(60), độ sâu nền tích lũy 60 ngày, độ co hẹp phương sai 20 ngày, sức mạnh giá tương quan (RS Line so với VNINDEX) và tỷ lệ nổ vol breakout so với MA20."
      ],
      [
        "Hiệu chuẩn xác suất LightGBM & Lọc tín hiệu bất đối xứng (Precision@10 = 90%)",
        "Huấn luyện LightGBM với dynamic class reweighting (scale_pos_weight) và TimeSeriesSplit validation. Thay vì chỉ phân loại nhị phân thông thường, mô hình đóng vai trò bộ xếp hạng cơ hội (opportunity ranking filter), cô đọng các lệnh thắng lớn ở nhóm xác suất cao nhất (Top 5% đạt 90% Win Rate, P > 0.8 đạt Profit Factor 4.89)."
      ]
    ],
    "publication": {
      "conference": "2026 11th International Conference on Information Technology and Digital Applications (ICITDA)",
      "journal": "The 11th International Conference on Information Technology and Digital Applications (ICITDA 2026)",
      "authors": "Doan Duy Long, Tran Huy Tuan, Dang Phuong Nam (Đồng tác giả), Cao Van Mai (Faculty of Artificial Intelligence, FPT University)",
      "date": "Accepted · 2026",
      "status": "Accepted at ICITDA 2026 · Archive Manuscript (Non-presented)",
      "abstract": "This paper proposes a probabilistic modeling framework to estimate the likelihood of successful stock breakouts during price consolidation phases in the Vietnamese equity market. Formulating breakout prediction as a supervised machine learning task, we construct a causal feature set capturing price compression, volatility contraction (VCP), volume dynamics, and multi-horizon trend alignment inspired by Minervini's SEPA methodology. Evaluated on a strictly causal panel of 255 liquid Vietnamese equities (>2,500 billion VND market cap) from 2010 to 2026, the trained LightGBM model achieves strong ranking concentration on an out-of-sample test set (2024–2026, 216 breakout events). While the baseline market win rate is 49.07%, the model's Top-10 predictions achieve a 90.00% win rate (Precision@10 = 0.9000, Top-5% = 90.0%). Under a calibrated probability threshold P > 0.8, the strategy realizes a 72.5% win rate, a profit factor of 4.89, and an average trade return of +13.94%, demonstrating high regime robustness across both neutral and bullish market environments.",
      "pdfUrl": "/icitda_2026_stock_breakout.pdf"
    },
    "detail": {
      "timeline": [
        [
          "01 / MARKET PHENOMENON & CAUSAL FORMULATION",
          "Khảo sát thực trạng false breakouts trên thị trường chứng khoán Việt Nam (VNINDEX); xây dựng pipeline thu thập dữ liệu panel 255 cổ phiếu vốn hóa > 2,500 tỷ VND (2010–2026) với nguyên tắc nhân quả X_t ← X_{t-1}."
        ],
        [
          "02 / SEPA & VCP QUANTITATIVE FEATURE EXTRACTION",
          "Mô hình hóa các chỉ báo nén biến động ATR(14)/ATR(60), sức mạnh tương đối RS Line, đột biến thanh khoản và áp lực kháng cự 30 ngày; lọc cứng các cổ phiếu không đạt chuẩn đà tăng trưởng."
        ],
        [
          "03 / LIGHTGBM MODELING & OUT-OF-SAMPLE BENCHMARK",
          "Kiểm định chuỗi thời gian TimeSeriesSplit; đánh giá out-of-sample trên 216 sự kiện breakout từ năm 2024 trở đi. Bài báo được bình duyệt và chấp thuận tại hội nghị quốc tế ICITDA 2026."
        ]
      ],
      "artifacts": [
        "Full Research Manuscript (icitda_2026_stock_breakout.pdf)",
        "Strict Causal Data Ingestion & Panel Construction Pipeline",
        "SEPA / VCP Quantitative Feature Engineering Module",
        "LightGBM Probability Calibration & Regime Backtest Suite"
      ],
      "reflection": "Điểm cốt lõi của nghiên cứu định lượng tài chính không phải là cố gắng dự báo chính xác từng bước nhảy giá ngẫu nhiên, mà là đóng vai trò như một bộ lọc chất lượng (signal filter): kiên nhẫn loại bỏ các bẫy tăng giá giả và chỉ giải ngân vào những cơ hội breakout có xác suất bất đối xứng cao nhất."
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

export const CONTACTS: ContactItem[] = [
  {
    "slug": "email",
    "title": "PRIMARY EMAIL",
    "detail": "dphuongthuy7@gmail.com",
    "href": "mailto:dphuongthuy7@gmail.com",
    "group": "DIRECT CONTACT",
    "order": 1
  },
  {
    "slug": "fpt-mail",
    "title": "SECONDARY EMAIL",
    "detail": "dphuongnam2k5@gmail.com",
    "href": "mailto:dphuongnam2k5@gmail.com",
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
    "detail": "Phương Nam Đặng on LinkedIn",
    "href": "https://www.linkedin.com/in/phuongnam-dang/",
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
    "href": "https://www.facebook.com/koutarou.araki.942",
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

export const EDUCATION_DATA: EducationItem = {
  degree: "Bachelor of Science in Information Technology",
  major: "Artificial Intelligence (Trí tuệ Nhân tạo)",
  institution: "FPT University (Đại học FPT)",
  location: "Hanoi, Vietnam",
  period: "2022 – 2026 (Expected Graduation)",
  status: "Final-year Student / Senior Undergraduate",
  description: "Chuyên sâu vào nghiên cứu và phát triển hệ thống Trí tuệ Nhân tạo hiện đại: Deep Learning đa phương thức, tối ưu hóa suy luận mô hình ngôn ngữ lớn (LLM/SLM), kiến trúc định tuyến RAG thích ứng và triển khai Edge AI tối ưu phần cứng.",
  focusAreas: [
    "Multimodal Deep Learning & Representation",
    "Retrieval-Augmented Generation (RAG) & Adaptive Model Routing",
    "Natural Language Inference (NLI) & Context Conflict Detection",
    "On-device & Edge AI Inference Optimization (Jetson / TensorRT)"
  ],
  coursework: [
    "Deep Learning & Neural Networks",
    "Natural Language Processing (NLP)",
    "Computer Vision & Pattern Recognition",
    "Advanced Data Structures & Algorithms",
    "Linear Algebra & Probability for Machine Learning",
    "Distributed Systems & Cloud Computing",
    "Software Engineering & System Architecture"
  ]
};

export const PUBLICATION_DATA: PublicationItem = {
  slug: "conflict-aware-rag-routing",
  title: "Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction",
  conference: "IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems",
  role: "First Author (Tác giả chính: Đặng Phương Nam)",
  date: "August 2026",
  status: "Peer-Reviewed, Accepted & Presented",
  abstract: "Adaptive model routing reduces Retrieval-Augmented Generation (RAG) cost, but traditional retrieval confidence fails when retrieved passages contradict each other. We propose a bidirectional NLI context-conflict scoring mechanism and a 5-feature hybrid random forest router. Evaluated across 3,000 multi-hop reasoning questions (MuSiQue, HotpotQA, 2WikiMultiHopQA), our pipeline saves ~35% of frontier API calls while retaining 83.2%–92.2% of Always-LLM F1 score, with subgroup F1 gains up to +14.35 points in conflicting context scenarios.",
  authors: [
    "Đặng Phương Nam (First Author - FPT University)",
    "AI Lab Faculty & Research Mentors"
  ],
  paperPdf: "/paper_93.pdf",
  projectSlug: "conflict-aware-rag-routing",
  postSlug: "conflict-aware-rag-routing",
  githubUrl: "https://github.com/RAG-Routing-Via-Context-Confliction/RAG_Router_Via_Context_Conflict",
  metrics: [
    { label: "API Cost Saved", value: "~35%", note: "Target 65% budget calibration" },
    { label: "Always-LLM F1 Retained", value: "83.2%–92.2%", note: "MuSiQue, HotpotQA, 2Wiki" },
    { label: "Subgroup F1 Gain", value: "+14.35 pts", note: "High-conflict scenarios (p = 0.006)" },
    { label: "Benchmark Scale", value: "3,000", note: "Multi-hop reasoning questions" }
  ]
};

export const ICITDA_PUBLICATION_DATA: PublicationItem = {
  slug: "probabilistic-stock-breakout-vietnam",
  title: "Probabilistic Modeling of Stock Breakout Success during Consolidation Phases in the Vietnamese Equity Market",
  conference: "ICITDA 2026: The 11th International Conference on Information Technology and Digital Applications",
  role: "Co-Author (Đồng tác giả: Đặng Phương Nam)",
  date: "2026",
  status: "Accepted · Archive Manuscript (Non-presented)",
  abstract: "Breakout strategies from price consolidation frequently suffer from false breakouts in emerging markets. We propose a probabilistic modeling framework combining strictly causal data alignment (X_t ← X_{t-1}) over 255 liquid Vietnamese equities (2010–2026) with Minervini SEPA-inspired volatility contraction (VCP) and volume dynamics. On a 2024–2026 out-of-sample test set (216 breakout events), our LightGBM model achieves Precision@10 = 0.9000 (90.0% win rate vs. 49.07% market baseline) and a 72.5% win rate with 4.89 profit factor at P > 0.8.",
  authors: [
    "Doan Duy Long (FPT University)",
    "Tran Huy Tuan (FPT University)",
    "Đặng Phương Nam (FPT University)",
    "Cao Van Mai (Faculty of Artificial Intelligence, FPT University)"
  ],
  paperPdf: "/icitda_2026_stock_breakout.pdf",
  projectSlug: "probabilistic-stock-breakout-vietnam",
  postSlug: "probabilistic-stock-breakout-vietnam",
  githubUrl: "https://github.com/zafkielzz",
  metrics: [
    { label: "Top-10 Precision", value: "90.00%", note: "Precision@10 (vs 49.07% baseline)" },
    { label: "P > 0.8 Win Rate", value: "72.5%", note: "40 out-of-sample trades" },
    { label: "Profit Factor", value: "4.89", note: "Simulated P > 0.8 threshold" },
    { label: "Equities Universe", value: "255", note: "HOSE/HNX market cap > 2,500B VND" }
  ]
};

export const PUBLICATIONS_LIST: PublicationItem[] = [
  PUBLICATION_DATA,
  ICITDA_PUBLICATION_DATA
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "cert-rl-alberta",
    title: "Reinforcement Learning Specialization",
    issuer: "University of Alberta • Alberta Machine Intelligence Institute (Amii)",
    issueDate: "July 2026",
    credentialId: "UAlberta-Amii-RL-2026",
    credentialUrl: "https://www.coursera.org/verify/specialization/",
    category: "Advanced AI & Research",
    featured: true,
    skills: [
      "Markov Decision Processes (MDPs)",
      "Dynamic Programming",
      "Temporal-Difference Learning (TD)",
      "Q-Learning & SARSA",
      "Deep Q-Networks (DQN)",
      "Policy Gradient & Actor-Critic"
    ],
    summary: "Rigorous 4-course specialization covering mathematical foundations and algorithms of reinforcement learning, exploration vs. exploitation trade-offs, function approximation, and deep policy gradient optimization taught by Martha White & Adam White (Amii)."
  },
  {
    id: "cert-nlp-deeplearning-ai",
    title: "Natural Language Processing Specialization",
    issuer: "DeepLearning.AI",
    issueDate: "October 2025",
    credentialId: "0VK0BHTSO6JG",
    credentialUrl: "https://www.coursera.org/verify/specialization/0VK0BHTSO6JG",
    category: "Advanced AI & Research",
    featured: true,
    skills: [
      "Transformer Architectures",
      "Multi-Head Self-Attention",
      "Sequence-to-Sequence Models",
      "Word Embeddings (Word2Vec / GloVe)",
      "Question Answering & NLI",
      "DeBERTa / BERT Fine-Tuning"
    ],
    summary: "Comprehensive 4-course technical specialization covering sentiment analysis, word vectors, probabilistic language models, sequence models (LSTMs/GRUs), attention mechanisms, and Transformer fine-tuning directly relevant to NLP research."
  },
  {
    id: "cert-nvidia-dli-dl",
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA (Deep Learning Institute)",
    issueDate: "July 2025",
    credentialId: "CT2gJELTTTSKMklmVlQMuA",
    credentialUrl: "https://learn.nvidia.com/certificates?id=CT2gJELTTTSKMklmVlQMuA",
    category: "Advanced AI & Research",
    featured: true,
    skills: [
      "GPU-Accelerated Computing",
      "Convolutional Neural Networks (CNNs)",
      "Computer Vision Architectures",
      "Transfer Learning & Fine-Tuning",
      "Pretrained Model Deployment",
      "Inference Optimization"
    ],
    summary: "Hands-on competency in designing, training, and deploying deep neural networks for computer vision and NLP using PyTorch and GPU-accelerated computing on NVIDIA hardware."
  },
  {
    id: "cert-ibm-enterprise-workflow",
    title: "IBM AI Enterprise Workflow Specialization",
    issuer: "IBM",
    issueDate: "May 2026",
    credentialId: "QJRJHKA4MZEE",
    credentialUrl: "https://www.coursera.org/verify/specialization/QJRJHKA4MZEE",
    category: "Enterprise AI & Systems",
    featured: true,
    skills: [
      "Enterprise AI Lifecycle",
      "Data Ingestion & Feature Engineering",
      "Model Building & Evaluation",
      "Automated Machine Learning (AutoML)",
      "Model Serving & Containerization",
      "Model Drift & Monitoring"
    ],
    summary: "6-course specialization focusing on end-to-end operationalization of AI in enterprise production: data pipelines, feature engineering, microservice deployment, API serving, model governance, and continuous performance monitoring."
  },
  {
    id: "cert-sdlc-minnesota",
    title: "Software Development Lifecycle Specialization",
    issuer: "University of Minnesota",
    issueDate: "June 2025",
    credentialId: "B21JZZVNZP8A",
    credentialUrl: "https://www.coursera.org/verify/specialization/B21JZZVNZP8A",
    category: "Software Engineering",
    skills: [
      "SDLC Methodologies",
      "Agile & Scrum Practices",
      "Software Architecture & Design Patterns",
      "Software Testing & Quality Assurance",
      "Release Engineering & CI/CD"
    ],
    summary: "Systematic software engineering principles for architecting, designing, implementing, and delivering maintainable, production-ready software systems across iterative lifecycle phases."
  },
  {
    id: "cert-project-management-uci",
    title: "Project Management Principles and Practices Specialization",
    issuer: "University of California, Irvine (UC Irvine)",
    issueDate: "March 2026",
    credentialId: "KSNFPP5E3P4U",
    credentialUrl: "https://www.coursera.org/verify/specialization/KSNFPP5E3P4U",
    category: "Engineering & Management",
    skills: [
      "Project Scoping & Charters",
      "Work Breakdown Structure (WBS)",
      "Risk Management & Mitigation",
      "Budgeting & Schedule Planning",
      "Stakeholder Communication"
    ],
    summary: "4-course specialization covering project initiation, scope management, work breakdown structures, critical path scheduling, risk mitigation, and executive reporting for technical initiatives."
  },
  {
    id: "cert-ibm-ai-foundations",
    title: "AI Foundations for Everyone Specialization",
    issuer: "IBM",
    issueDate: "June 2025",
    credentialId: "923ZXF5S39PI",
    credentialUrl: "https://www.coursera.org/verify/specialization/923ZXF5S39PI",
    category: "AI Foundations",
    skills: [
      "AI Landscape & Taxonomies",
      "Machine Learning Fundamentals",
      "Deep Learning Intuition",
      "AI Ethics & Fairness",
      "Generative AI Concepts"
    ],
    summary: "Comprehensive survey of modern artificial intelligence capabilities, ethical governance considerations, machine learning concepts, and practical integration into enterprise ecosystems."
  }
];

export const FPT_BADGES_DATA: AcademicBadgeItem[] = [
  {
    id: "badge-ks57-1",
    code: "KS57_1",
    title: "Digital Ecosystem: From Governance to Business",
    issuer: "FPT University & Coursera",
    program: "KS57 Program: Digital Transformation for IT Talents",
    credentialId: "SOOS7JXUSz2jkuyV1Es9Eg",
    credentialUrl: "https://www.coursera.org/verify/SOOS7JXUSz2jkuyV1Es9Eg",
    description: "Equips FPT University IT students with fundamental digital transformation knowledge and competencies across key domains: public administration, business management, digital finance, and customer experience (CX/marketing). Prepares students to apply engineering expertise to real-world national digital transformation initiatives.",
    focus: [
      "Digital Governance & Public Administration",
      "Enterprise Digital Ecosystems",
      "Digital Finance & Fintech Models",
      "Customer Experience (CX) Architecture"
    ]
  },
  {
    id: "badge-ks57-2",
    code: "KS57_2",
    title: "Key Activities of Digital Transformation",
    issuer: "FPT University & Coursera",
    program: "KS57 Program: Digital Transformation for IT Talents (Part 2)",
    credentialId: "i_hoSnqiQoS4aEp6ooKECg",
    credentialUrl: "https://www.coursera.org/verify/i_hoSnqiQoS4aEp6ooKECg",
    description: "Focuses on the operational execution and core activities of digital transformation: business process re-engineering, roadmap structuring, legacy system migration, change management, and measuring digital adoption impact.",
    focus: [
      "Transformation Execution Frameworks",
      "Process Re-Engineering & Automation",
      "Enterprise Tech Adoption Roadmaps",
      "Organizational Change Management"
    ]
  }
];

export const SKILLS_DATA: SkillItem[] = [
  // AI & Deep Learning
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Deep Learning",
    level: "Core Mastery",
    summary: "Xây dựng và huấn luyện mô hình học sâu, custom loss functions, training loops, DistributedDataParallel (DDP), TensorBoard và mixed-precision (torch.cuda.amp).",
    tags: ["Deep Learning", "Tensors", "Autograd", "Model Training", "CUDA"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "IEEE IS'26 Research"
  },
  {
    id: "transformers",
    name: "Hugging Face Transformers",
    category: "AI & Deep Learning",
    level: "Core Mastery",
    summary: "Fine-tuning encoder-only & decoder models, cấu hình Custom Pipeline, tokenizers, cross-encoders cho bài toán NLI (DeBERTa-v3) và Quantization tích hợp.",
    tags: ["NLP", "Transformers", "DeBERTa", "Tokenization", "Model Hub"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "Research Pipeline"
  },
  {
    id: "scikit-learn",
    name: "Scikit-Learn & Statistical ML",
    category: "AI & Deep Learning",
    level: "Core Mastery",
    summary: "Ensemble learning (Random Forest, GBDT), nested cross-validation chống data leakage, hiệu chuẩn ngưỡng quyết định (threshold calibration) và phân tích feature importance.",
    tags: ["Random Forest", "Nested Cross-Validation", "Feature Extraction", "Evaluation"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "5-Feature Router"
  },
  {
    id: "tensorrt-onnx",
    name: "ONNX Runtime & TensorRT",
    category: "AI & Deep Learning",
    level: "Advanced",
    summary: "Chuyển đổi đồ thị tính toán PyTorch sang ONNX, tối ưu hóa layer fusion, FP16/INT8 post-training quantization để tăng tốc độ suy luận (inference speedup).",
    tags: ["Model Optimization", "FP16 / INT8", "Graph Optimization", "Inference Acceleration"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "Inference Optimization"
  },
  {
    id: "vllm-ollama",
    name: "vLLM & Local LLM Serving",
    category: "AI & Deep Learning",
    level: "Advanced",
    summary: "Triển khai serving mô hình ngôn ngữ cục bộ (Qwen, Llama, DeepSeek) với PagedAttention, continuous batching và quản lý KV cache hiệu năng cao.",
    tags: ["LLM Serving", "PagedAttention", "KV-Cache", "Qwen2.5", "High Throughput"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "SLM Deployment"
  },

  // LLM & RAG
  {
    id: "adaptive-routing",
    name: "Conflict-Aware Model Routing",
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: "Thiết kế cơ chế định tuyến thông minh giữa SLM cục bộ và API frontier model dựa trên xung đột ngữ cảnh (NLI contradiction) và ngân sách chi phí.",
    tags: ["RAG Routing", "Cost Optimization", "NLI Contradiction", "Multi-Hop Reasoning"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "IEEE IS'26 Paper"
  },
  {
    id: "nli-cross-encoders",
    name: "NLI & Cross-Encoders",
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: "Đánh giá mức độ mâu thuẫn/đồng thuận giữa các đoạn văn trích xuất (passage pairs) với kỹ thuật chấm điểm 2 chiều đối xứng loại bỏ directional bias.",
    tags: ["NLI", "Cross-Encoder", "DeBERTa-v3", "Contradiction Scoring"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "Context Conflict Score"
  },
  {
    id: "vector-dbs",
    name: "Vector Databases & Hybrid Search",
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: "Thiết lập pipeline tìm kiếm hỗn hợp kết hợp Dense Embedding (BGE / OpenAI) và Sparse BM25 cùng Reciprocal Rank Fusion (RRF) trên ChromaDB, FAISS và Milvus.",
    tags: ["ChromaDB", "FAISS", "Milvus", "Hybrid Search", "RRF Fusion"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "Retrieval Architecture"
  },
  {
    id: "langchain-llamaindex",
    name: "LangChain & LlamaIndex",
    category: "LLM & RAG",
    level: "Advanced",
    summary: "Xây dựng các agentic workflow, hierarchical chunking, multi-agent orchestration và recursive document indexing cho các bài toán phân tích tài liệu phức tạp.",
    tags: ["Agentic AI", "Tool Calling", "Document Chunking", "Workflows"]
  },
  {
    id: "eval-benchmarking",
    name: "LLM & RAG Evaluation Metrics",
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: "Đo lường độ chính xác với Token F1, Exact Match (EM), ROUGE, BLEU, kết hợp bootstrap confidence intervals 95% và paired t-tests để thẩm định thống kê nghiêm ngặt.",
    tags: ["Evaluation", "Token F1", "Bootstrap CI", "Statistical Significance"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: "MuSiQue / HotpotQA Benchmark"
  },

  // Computer Vision
  {
    id: "clip-multimodal",
    name: "Multimodal Embeddings & CLIP",
    category: "Computer Vision",
    level: "Advanced",
    summary: "Ứng dụng không gian nhúng liên hợp hình ảnh - văn bản (contrastive language-image pre-training), phân loại zero-shot và truy xuất hình ảnh theo ngữ nghĩa.",
    tags: ["CLIP", "Zero-Shot", "Joint Embeddings", "Cross-Modal Retrieval"]
  },
  {
    id: "opencv",
    name: "OpenCV & Image Processing",
    category: "Computer Vision",
    level: "Core Mastery",
    summary: "Xử lý hình ảnh thời gian thực, trích xuất đặc trưng hình thái học, biến đổi không gian màu, phát hiện cạnh và lọc nhiễu tiền xử lý cho mô hình học máy.",
    tags: ["Image Processing", "Filtering", "Edge Detection", "Real-Time Vision"]
  },
  {
    id: "cnn-vit",
    name: "CNNs & Vision Transformers (ViT)",
    category: "Computer Vision",
    level: "Advanced",
    summary: "Kiến trúc mạng tích chập sâu (ResNet, ConvNeXt) và Vision Transformers cho tác vụ nhận dạng, trích xuất đặc trưng và phân loại ảnh y tế/vật thể.",
    tags: ["ResNet", "ConvNeXt", "Vision Transformers", "Feature Extraction"]
  },
  {
    id: "generative-diffusion",
    name: "Latent Diffusion & Image Generation",
    category: "Computer Vision",
    level: "Proficient",
    summary: "Cơ chế khuếch tán không gian tiềm ẩn (Latent Diffusion), conditioning vectors, cross-attention maps và tối ưu hóa sampling steps cho tác vụ tạo ảnh.",
    tags: ["Diffusion Models", "Latent Space", "Generative AI", "Cross-Attention"]
  },

  // Systems & Backend
  {
    id: "python",
    name: "Python (Advanced & Scientific)",
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: "Ngôn ngữ chủ đạo với lập trình hướng đối tượng nâng cao, async IO, type hints (mypy), NumPy, Pandas, SciPy phục vụ nghiên cứu và sản xuất hệ thống AI.",
    tags: ["Python 3.11+", "NumPy", "Pandas", "AsyncIO", "Type Safety"]
  },
  {
    id: "fastapi",
    name: "FastAPI & AI Microservices",
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: "Xây dựng các backend API bất đồng bộ hiệu năng cao cho AI serving, streaming response (SSE / WebSocket), validation dữ liệu chặt chẽ qua Pydantic.",
    tags: ["FastAPI", "Pydantic", "Streaming APIs", "Microservices", "REST"]
  },
  {
    id: "docker",
    name: "Docker & Containerization",
    category: "Systems & Backend",
    level: "Advanced",
    summary: "Đóng gói ứng dụng AI với NVIDIA Container Toolkit (nvidia-docker), multi-stage builds tối ưu dung lượng image và đảm bảo tính tái lập (reproducibility).",
    tags: ["Docker", "NVIDIA CUDA Container", "Multi-stage Build", "Deployment"]
  },
  {
    id: "linux-bash",
    name: "Linux & Bash Scripting",
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: "Làm việc chuyên sâu trên môi trường Ubuntu/Debian, quản trị tiến trình GPU (nvidia-smi), tự động hóa pipeline nghiên cứu bằng shell scripts.",
    tags: ["Ubuntu / Debian", "Bash Shell", "GPU Monitoring", "Cron Jobs"]
  },
  {
    id: "git-github",
    name: "Git & Open Science Workflows",
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: "Quản lý mã nguồn nghiên cứu, branch workflows, release tag, open-source reproducibility artifacts và CI/CD tự động hóa kiểm thử.",
    tags: ["Git", "GitHub Actions", "Reproducibility", "Version Control"]
  },
  {
    id: "typescript-react",
    name: "TypeScript & React",
    category: "Systems & Backend",
    level: "Advanced",
    summary: "Xây dựng giao diện web phản hồi trực quan, hệ thống design system tối ưu tương tác, tích hợp visualizations và dashboards theo dõi mô hình AI.",
    tags: ["React 18", "TypeScript", "Vite", "Modern Frontend", "Interactive UI"]
  },

  // Hardware & Edge
  {
    id: "cuda-acceleration",
    name: "NVIDIA CUDA & GPU Acceleration",
    category: "Hardware & Edge",
    level: "Advanced",
    summary: "Hiểu sâu kiến trúc phần cứng GPU NVIDIA (Tensor Cores, VRAM hierarchy), lập trình tối ưu hóa bộ nhớ, mixed-precision FP16/BF16.",
    tags: ["CUDA", "Tensor Cores", "Mixed Precision", "VRAM Optimization"]
  },
  {
    id: "edge-jetson",
    name: "Edge AI & NVIDIA Jetson",
    category: "Hardware & Edge",
    level: "Advanced",
    summary: "Triển khai mô hình deep learning trên các thiết bị nhúng (NVIDIA Jetson, Edge TPUs), tối ưu hóa điện năng tiêu thụ và độ trễ mili-giây thời gian thực.",
    tags: ["NVIDIA Jetson", "Embedded AI", "Low Latency", "Edge Computing"]
  },
  {
    id: "quantization-peft",
    name: "Model Quantization (AWQ / GGUF / LoRA)",
    category: "Hardware & Edge",
    level: "Advanced",
    summary: "Nén và lượng tử hóa mô hình 4-bit / 8-bit (bitsandbytes, AWQ, GGUF/llama.cpp), huấn luyện thích ứng tham số thấp LoRA/QLoRA trên GPU cá nhân.",
    tags: ["4-bit / 8-bit", "AWQ", "GGUF", "QLoRA", "Memory Efficiency"]
  }
];

export const HARDWARE_ENVIRONMENT = [
  { label: "GPU Workstation", value: "NVIDIA RTX Series / CUDA 12.x", detail: "Primary training & inference benchmark rig" },
  { label: "Edge Hardware", value: "NVIDIA Jetson Platform", detail: "On-device lightweight vision & SLM deployments" },
  { label: "Operating System", value: "Ubuntu Linux LTS", detail: "Reproducible research pipeline & container host" },
  { label: "Runtime & Drivers", value: "CUDA + cuDNN + TensorRT", detail: "Low-latency tensor execution environment" }
];

