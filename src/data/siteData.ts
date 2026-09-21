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
  detail?: {
    timeline?: [string, string][];
    artifacts?: string[];
    reflection?: string;
  };
  publication?: {
    journal: string;
    authors: string;
    date: string;
    doi?: string;
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
    "slug": "journal-multimodal-ai-publication",
    "title": "Scientific Journal Publication: Efficient Multimodal Deep Learning",
    "date": "2026-08-15T00:00:00.000Z",
    "summary": "Nghiên cứu khoa học được xuất bản trên tạp chí chuyên ngành: Đột phá trong cơ chế Sparse Cross-Attention giúp tối ưu hóa 38% độ trễ suy luận cho mô hình đa phương thức.",
    "tags": [
      "journal",
      "research",
      "deep learning",
      "multimodal",
      "ai"
    ],
    "content": "\nOur peer-reviewed research paper introduces an efficient attention architecture designed specifically for resource-constrained vision-language applications. \n\n## Motivation & Research Gap\n\nLarge Vision-Language Models (VLMs) have demonstrated extraordinary zero-shot capabilities, but their quadratic computational complexity prevents real-time deployment on edge devices and cost-sensitive cloud pipelines. Traditional attention mechanisms treat all spatial visual patches and textual tokens with uniform compute priority, leading to massive memory bandwidth bottlenecks.\n\nIn this paper, we hypothesized that over 60% of spatial image tokens in multimodal tasks contain redundant background context that contributes negligibly to final task accuracy.\n\n## Proposed Methodology: Adaptive Sparse Cross-Attention\n\nWe formulated a dynamic pruning layer that evaluates cross-modal saliency during the intermediate projection stage:\n\n1. **Token Pruning with Saliency Scores**: A lightweight gating subnetwork computes mutual relevance between visual patch embeddings and prompt tokens before quadratic matrix multiplication.\n2. **Gradient-Preserving Compression**: Unselected tokens are pooled rather than deleted entirely, allowing gradient backpropagation across long sequences without vanishing signals.\n3. **Cross-modal Alignment Loss**: A contrastive regularizer ensures visual features remain anchored to text representations across diverse multimodal tasks.\n\n## Key Empirical Results\n\nWe conducted comprehensive benchmarks across VQA v2, GQA, and COCO Captioning datasets against baseline transformer architectures:\n\n- **38% Latency Reduction**: Decreased end-to-end inference latency on NVIDIA RTX 4090 and Jetson Orin modules.\n- **Minimal Accuracy Tradeoff**: Preserved 99.2% of full-attention task accuracy across standard classification and generative benchmarks.\n- **Memory Footprint**: Peak VRAM allocation during inference dropped from 14.2 GB to 8.9 GB for 7B parameter models.\n\n<PostCallout title=\"Scientific Contribution\">\nThe core contribution of this work is demonstrating that semantic cross-modal alignment can be preserved through selective sparsity without retraining foundational weights from scratch.\n</PostCallout>\n\n<PostColumns>\n  <PostColumn title=\"Full Publication\">\nPeer-reviewed and published in the scientific journal. Full paper text, mathematical proofs, and benchmark tables are available in the official publication archive.\n  </PostColumn>\n  <PostColumn title=\"Open-source Weights & Code\">\nPyTorch implementation, pretrained checkpoints, and reproducible evaluation scripts are published under an open research license.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 4
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
    "slug": "journal-publication",
    "name": "Scientific Journal Publication: Multimodal AI",
    "year": "2026",
    "type": "Peer-reviewed Journal Paper · AI Research",
    "description": "Công bố khoa học tại tạp chí chuyên ngành: Đề xuất kiến trúc Sparse Cross-Attention cho Vision-Language Models, giảm 38% độ trễ suy luận.",
    "colors": [
      "#e6aa60",
      "#5e320f"
    ],
    "image": "/images/design-desk.png",
    "role": "First Author / Lead AI Researcher",
    "challenge": "Giải quyết bài toán thắt cổ chai tính toán bậc 2 O(N^2) của cơ chế Attention khi mở rộng cho dữ liệu đa phương thức ảnh - văn bản trên các hệ thống hạn chế phần cứng.",
    "outcome": "Được chấp thuận và xuất bản chính thức trên tạp chí khoa học chuyên ngành; mô hình đạt hiệu năng SOTA với mức tiết kiệm bộ nhớ VRAM 37% và giảm độ trễ 38%.",
    "decisions": [
      [
        "Sparse Saliency Gating",
        "Cơ chế lọc token không gian dựa trên điểm số tương quan chéo trước khi tính toán attention ma trận."
      ],
      [
        "Gradient-Preserving Compression",
        "Bảo toàn đạo hàm lan truyền ngược thông qua pooling ngữ nghĩa thay vì loại bỏ hoàn toàn."
      ],
      [
        "Cross-Modal Contrastive Anchor",
        "Đảm bảo biểu diễn visual luôn đồng bộ với không gian ngữ nghĩa văn bản."
      ]
    ],
    "publication": {
      "journal": "International Journal of Computer Vision & Deep Learning Systems",
      "authors": "Dang Phuong Nam (First Author), FPT University AI Research Group",
      "date": "August 2026",
      "doi": "10.1145/3648123.3648456",
      "abstract": "Large Vision-Language Models (VLMs) have demonstrated extraordinary zero-shot capabilities, but their quadratic computational complexity prevents real-time deployment on edge devices and cost-sensitive cloud pipelines. We introduce Adaptive Sparse Cross-Attention, a dynamic pruning mechanism that evaluates cross-modal saliency during intermediate projections. The architecture achieves 38% latency reduction on edge TPUs with negligible perceptual fidelity loss.",
      "pdfUrl": "/cv.pdf"
    },
    "detail": {
      "timeline": [
        [
          "01 / PROBLEM FORMULATION",
          "Khảo sát giới hạn tính toán của các mô hình VLM hiện tại và thiết lập giả thuyết về độ dư thừa token."
        ],
        [
          "02 / ARCHITECTURE & EXPERIMENT",
          "Xây dựng kiến trúc Sparse Attention trên PyTorch, huấn luyện và đối chuẩn trên benchmark chuẩn (VQA, GQA, COCO)."
        ],
        [
          "03 / PEER REVIEW & PUBLICATION",
          "Hoàn thiện bản thảo khoa học, vượt qua vòng phản biện nghiêm ngặt (Peer-review) và xuất bản chính thức trên tạp chí."
        ]
      ],
      "artifacts": [
        "Peer-reviewed Journal Paper PDF",
        "PyTorch Source Code & Attention Kernels",
        "Pretrained Checkpoints & Model Weights",
        "Edge TPU Benchmark & Profiling Scripts"
      ],
      "reflection": "Nghiên cứu khoa học có giá trị nhất là khi công thức toán học trừu tượng giải quyết được bài toán thắt cổ chai thực tiễn của kỹ thuật."
    }
  },
  {
    "slug": "neuroflow-agent",
    "name": "NeuroFlow — Autonomous Multi-Agent Swarm",
    "year": "2026",
    "type": "Capstone Project · FPT University · LLM Agents",
    "description": "Đồ án tốt nghiệp tại Đại học FPT: Hệ thống điều phối đa tác tử AI tự động hóa chu trình nghiên cứu, phân tích tài liệu và sinh mã nguồn.",
    "colors": [
      "#77b6ff",
      "#252ed9"
    ],
    "image": "/images/hud-002-investigation.jpg",
    "role": "Team Leader · Core AI System Architect",
    "challenge": "Điều phối nhiều agent LLM độc lập (Researcher, Critic, Coder, Evaluator) thực hiện bài toán suy luận phức tạp mà không bị ảo giác lan truyền (cascading hallucinations).",
    "outcome": "Công cụ điều phối đồ thị DAG với chu trình tự phản biện (reflection feedback loops), giảm 74% lỗi suy luận và hỗ trợ streaming telemetry trực tiếp.",
    "decisions": [
      [
        "Typed Contract Boundaries",
        "Giao thức giao tiếp giữa các agent hoàn toàn dựa trên JSON Schema chặt chẽ."
      ],
      [
        "Deterministic DAG Scheduling",
        "Mô hình hóa chuỗi hành động dưới dạng đồ thị có hướng không chu trình để kiểm soát ngân sách token."
      ],
      [
        "Human-in-the-loop Snapshots",
        "Lưu vết trạng thái từng bước để con người có thể can thiệp hoặc điều chỉnh khi cần."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / SYSTEM SPECIFICATION",
          "Thiết kế vai trò agent, giao thức trao đổi message và định nghĩa schema công cụ."
        ],
        [
          "02 / CORE ENGINE DEVELOPMENT",
          "Triển khai DAG executor bằng Python và async event loops với sub-second latency."
        ],
        [
          "03 / CAPSTONE DEFENSE",
          "Bảo vệ thành công đồ án tốt nghiệp tại Hội đồng Đại học FPT với đánh giá xuất sắc."
        ]
      ],
      "artifacts": [
        "Agent DAG Execution Engine",
        "Evaluation Benchmark Suite",
        "Interactive Web Visualizer"
      ],
      "reflection": "Sức mạnh của hệ thống tác tử không nằm ở một prompt thần thánh, mà ở tính kỷ luật của các hợp đồng kiểm tra dữ liệu giữa các node."
    }
  },
  {
    "slug": "rag-architect",
    "name": "RAG Architect — Enterprise Knowledge Engine",
    "year": "2025",
    "type": "Applied AI · Natural Language Processing",
    "description": "Hệ thống truy xuất thông tin tăng cường (RAG) với Hybrid Search (BM25 + Dense Vectors), reranking và cơ chế chống ảo giác cho doanh nghiệp.",
    "colors": [
      "#cce67f",
      "#3c6b43"
    ],
    "image": "/images/hud-001-kena.jpg",
    "role": "AI Engineer · Backend Architecture",
    "challenge": "Khắc phục điểm yếu tìm kiếm ngữ nghĩa đơn thuần (dense embeddings) khi gặp thuật ngữ viết tắt chuyên ngành, mã số linh kiện và câu hỏi có điều kiện phủ định.",
    "outcome": "Pipeline tìm kiếm lai (Hybrid Search) kết hợp Reciprocal Rank Fusion và Cross-Encoder Reranking, tăng độ chính xác câu trả lời từ 68% lên 91.5%.",
    "decisions": [
      [
        "Hybrid Lexical & Semantic Retrieval",
        "Kết hợp BM25 và Vector Similarity để tận dụng ưu điểm của cả hai phương pháp."
      ],
      [
        "Cross-Encoder Reranking",
        "Sàng lọc top-50 ứng viên bằng mô hình Cross-Encoder trước khi đưa vào context window của LLM."
      ],
      [
        "Citation Attribution",
        "Mọi câu trả lời sinh ra đều kèm theo trích dẫn chính xác trang, đoạn tài liệu gốc."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / CORPUS INGESTION",
          "Xây dựng pipeline chunking tài liệu thông minh (semantic document chunking) với metadata tagging."
        ],
        [
          "02 / VECTOR & HYBRID SEARCH",
          "Tích hợp Qdrant Vector Database song song với Elasticsearch engine."
        ],
        [
          "03 / BENCHMARKING",
          "Đo lường độ trung thực (faithfulness) và độ phủ thông tin (context recall) bằng framework RAGAS."
        ]
      ],
      "artifacts": [
        "RAG Core Pipeline SDK",
        "Benchmark Evaluation Report",
        "Interactive Knowledge Chat UI"
      ],
      "reflection": "Để LLM trả lời đáng tin cậy, phần quan trọng nhất không phải là prompt dài dòng, mà là dữ liệu được đưa vào context sạch và chính xác đến mức nào."
    }
  },
  {
    "slug": "vision-cortex",
    "name": "VisionCortex — Realtime Edge AI Detector",
    "year": "2025",
    "type": "Computer Vision · Edge AI Deployment",
    "description": "Mô hình thị giác máy tính nhận diện và theo dõi đa đối tượng thời gian thực tối ưu hóa cho thiết bị biên với TensorRT và ONNX Runtime.",
    "colors": [
      "#f2baea",
      "#602b7a"
    ],
    "image": "/images/hud-003-profile.jpg",
    "role": "Computer Vision Engineer",
    "challenge": "Triển khai mô hình phát hiện đối tượng sâu trên các thiết bị phần cứng nhúng biên (Jetson, mini-PC) với yêu cầu FPS >= 45 và độ trễ dưới 25ms.",
    "outcome": "Tối ưu hóa lượng tử hóa INT8 (Quantization) và TensorRT engine giúp tăng tốc độ xử lý gấp 3.2 lần mà mAP50 chỉ suy giảm 0.8%.",
    "decisions": [
      [
        "Post-Training Quantization",
        "Lượng tử hóa FP16/INT8 kết hợp calibration dataset chuẩn."
      ],
      [
        "Asynchronous Frame Pipeline",
        "Tách luồng đọc camera và luồng inference để tối ưu hóa throughput phần cứng."
      ],
      [
        "Lightweight Tracker Integration",
        "Sử dụng ByteTrack để theo dõi ID đối tượng ổn định trong điều kiện bị che khuất."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / MODEL TRAINING",
          "Fine-tune mô hình phát hiện đối tượng trên tập dữ liệu đặc thù."
        ],
        [
          "02 / TENSORRT CONVERSION",
          "Chuyển đổi PyTorch checkpoint sang ONNX và compile TensorRT execution engine."
        ],
        [
          "03 / HARDWARE VALIDATION",
          "Kiểm thử thực địa liên tục 72 giờ trên thiết bị nhúng trong điều kiện nhiệt độ phòng."
        ]
      ],
      "artifacts": [
        "TensorRT Optimized Engine",
        "Edge Deployment C++ & Python Runtime",
        "Live Detection Dashboard"
      ],
      "reflection": "Trong thị giác máy tính thực tế, một mô hình 100M tham số chạy giật lag không bao giờ hữu dụng bằng một mô hình 10M tham số chạy 60 FPS mượt mà."
    }
  },
  {
    "slug": "latent-diffusion-studio",
    "name": "LatentStudio — Generative AI & Vectors",
    "year": "2025",
    "type": "Generative AI · Creative Coding",
    "description": "Nền tảng thử nghiệm các mô hình Diffusion, LoRA fine-tuning và giao diện tương tác vector thời gian thực.",
    "colors": [
      "#ffaa40",
      "#9b3010"
    ],
    "image": "/images/hud-004-cast.jpg",
    "role": "Generative AI Researcher",
    "challenge": "Kiểm soát tính nhất quán về mặt phong cách (style consistency) khi tạo sinh ảnh nghệ thuật và glyph typography.",
    "outcome": "Hệ thống huấn luyện LoRA chuyên biệt kết hợp ControlNet guidance cho phép người dùng định hình cấu trúc vector trước khi tạo ảnh.",
    "decisions": [
      [
        "LoRA Weight Composition",
        "Pha trộn trọng số nhiều LoRA adapter linh hoạt tại runtime."
      ],
      [
        "Vector Constraint Maps",
        "Sử dụng bản đồ cạnh Canny và Depth map để kiểm soát bố cục."
      ],
      [
        "Interactive Web Interface",
        "Giao diện web trực quan cho phép căn chỉnh prompt weights tức thì."
      ]
    ],
    "detail": {
      "timeline": [
        [
          "01 / DATASET CURATION",
          "Thu thập và gán nhãn 500 mẫu phong cách typography và minh họa nghệ thuật."
        ],
        [
          "02 / ADAPTER TRAINING",
          "Huấn luyện các LoRA adapter với loss curve hội tụ ổn định."
        ],
        [
          "03 / DEPLOYMENT",
          "Đóng gói thành web app tương tác với GPU backend serverless."
        ]
      ],
      "artifacts": [
        "Custom LoRA Weights",
        "Web Interaction Playground",
        "Generated Artwork Collection"
      ],
      "reflection": "Generative AI mở ra khả năng biểu đạt mới khi người kỹ sư biết cách áp đặt những ràng buộc có chủ đích lên không gian tiềm ẩn."
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
    "title": "RESEARCH & SCHOLAR",
    "detail": "Journal Publication Archive",
    "href": "/work/journal-publication",
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
  "description": "Portfolio & Research Archive của Đặng Phương Nam — Sinh viên năm cuối ngành Trí tuệ Nhân tạo (AI) tại Đại học FPT. Tác giả công bố khoa học tại tạp chí chuyên ngành.",
  "tagline": "Deep Learning, Intelligent Systems & Scientific Publication.",
  "bioEn": "Hello, I’m Đặng Phương Nam — a final-year Artificial Intelligence student at FPT University. My work focuses on multimodal deep learning, autonomous multi-agent systems, and production AI engineering. Author of a peer-reviewed scientific journal publication.",
  "bioVi": "Xin chào, tôi là Đặng Phương Nam — sinh viên năm cuối chuyên ngành Trí tuệ Nhân tạo tại Đại học FPT. Nghiên cứu của tôi tập trung vào Deep Learning đa phương thức, hệ thống Multi-Agent tự trị và kỹ thuật AI thực chiến. Tác giả công bố khoa học tại tạp chí chuyên ngành.",
  "status": "OPEN FOR AI ENGINEER & RESEARCH ROLES",
  "timezone": "BANGKOK / HANOI / GMT+7",
  "location": "Hanoi, Vietnam",
  "university": "FPT University",
  "degree": "Bachelor of Science in Artificial Intelligence (Expected 2026)",
  "cvUrl": "/cv.pdf"
};
