import type { Localized } from '../i18n';

export interface SkillItem {
  id: string;
  name: Localized;
  category: 'AI & Deep Learning' | 'LLM & RAG' | 'Computer Vision' | 'Systems & Backend' | 'Hardware & Edge';
  level: 'Core Mastery' | 'Advanced' | 'Proficient';
  summary: Localized;
  tags: string[];
  relatedSlug?: string;
  relatedLabel?: Localized;
}

/** Display labels for the category filter keys. */
export const SKILL_CATEGORY_LABELS: Record<SkillItem['category'], Localized> = {
  'AI & Deep Learning': { en: 'AI & Deep Learning', vi: 'AI & Deep Learning' },
  'LLM & RAG': { en: 'LLM & RAG', vi: 'LLM & RAG' },
  'Computer Vision': { en: 'Computer Vision', vi: 'Thị giác máy tính' },
  'Systems & Backend': { en: 'Systems & Backend', vi: 'Hệ thống & Backend' },
  'Hardware & Edge': { en: 'Hardware & Edge', vi: 'Phần cứng & Edge' }
};

/** Display labels for skill levels. */
export const SKILL_LEVEL_LABELS: Record<SkillItem['level'], Localized> = {
  'Core Mastery': { en: 'Core Mastery', vi: 'Thành thạo chuyên sâu' },
  Advanced: { en: 'Advanced', vi: 'Nâng cao' },
  Proficient: { en: 'Proficient', vi: 'Thành thạo' }
};

export const SKILLS_DATA: SkillItem[] = [
  // AI & Deep Learning
  {
    id: "pytorch",
    name: { en: "PyTorch", vi: "PyTorch" },
    category: "AI & Deep Learning",
    level: "Core Mastery",
    summary: {
      en: "Building and training deep learning models with custom loss functions, training loops, DistributedDataParallel (DDP), TensorBoard and mixed precision (torch.cuda.amp).",
      vi: "Xây dựng và huấn luyện mô hình học sâu, custom loss functions, training loops, DistributedDataParallel (DDP), TensorBoard và mixed-precision (torch.cuda.amp)."
    },
    tags: ["Deep Learning", "Tensors", "Autograd", "Model Training", "CUDA"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "IEEE IS'26 Research", vi: "Nghiên cứu IEEE IS'26" }
  },
  {
    id: "transformers",
    name: { en: "Hugging Face Transformers", vi: "Hugging Face Transformers" },
    category: "AI & Deep Learning",
    level: "Core Mastery",
    summary: {
      en: "Fine-tuning encoder-only and decoder models, configuring custom pipelines, tokenizers, cross-encoders for NLI tasks (DeBERTa-v3) and built-in quantization.",
      vi: "Fine-tuning encoder-only & decoder models, cấu hình Custom Pipeline, tokenizers, cross-encoders cho bài toán NLI (DeBERTa-v3) và Quantization tích hợp."
    },
    tags: ["NLP", "Transformers", "DeBERTa", "Tokenization", "Model Hub"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "Research Pipeline", vi: "Pipeline nghiên cứu" }
  },
  {
    id: "scikit-learn",
    name: { en: "Scikit-Learn & Statistical ML", vi: "Scikit-Learn & ML thống kê" },
    category: "AI & Deep Learning",
    level: "Core Mastery",
    summary: {
      en: "Ensemble learning (Random Forest, GBDT), nested cross-validation to prevent data leakage, decision threshold calibration and feature importance analysis.",
      vi: "Ensemble learning (Random Forest, GBDT), nested cross-validation chống data leakage, hiệu chuẩn ngưỡng quyết định (threshold calibration) và phân tích feature importance."
    },
    tags: ["Random Forest", "Nested Cross-Validation", "Feature Extraction", "Evaluation"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "5-Feature Router", vi: "Router 5 đặc trưng" }
  },
  {
    id: "tensorrt-onnx",
    name: { en: "ONNX Runtime & TensorRT", vi: "ONNX Runtime & TensorRT" },
    category: "AI & Deep Learning",
    level: "Advanced",
    summary: {
      en: "Converting PyTorch compute graphs to ONNX, optimizing layer fusion, and applying FP16/INT8 post-training quantization for inference speedup.",
      vi: "Chuyển đổi đồ thị tính toán PyTorch sang ONNX, tối ưu hóa layer fusion, FP16/INT8 post-training quantization để tăng tốc độ suy luận (inference speedup)."
    },
    tags: ["Model Optimization", "FP16 / INT8", "Graph Optimization", "Inference Acceleration"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "Inference Optimization", vi: "Tối ưu hóa inference" }
  },
  {
    id: "vllm-ollama",
    name: { en: "vLLM & Local LLM Serving", vi: "vLLM & serving LLM cục bộ" },
    category: "AI & Deep Learning",
    level: "Advanced",
    summary: {
      en: "Serving local language models (Qwen, Llama, DeepSeek) with PagedAttention, continuous batching and high-performance KV cache management.",
      vi: "Triển khai serving mô hình ngôn ngữ cục bộ (Qwen, Llama, DeepSeek) với PagedAttention, continuous batching và quản lý KV cache hiệu năng cao."
    },
    tags: ["LLM Serving", "PagedAttention", "KV-Cache", "Qwen2.5", "High Throughput"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "SLM Deployment", vi: "Triển khai SLM" }
  },

  // LLM & RAG
  {
    id: "adaptive-routing",
    name: { en: "Conflict-Aware Model Routing", vi: "Định tuyến mô hình nhận biết xung đột" },
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: {
      en: "Designing intelligent routing between a local SLM and a frontier API model based on context conflict (NLI contradiction) and cost budget.",
      vi: "Thiết kế cơ chế định tuyến thông minh giữa SLM cục bộ và API frontier model dựa trên xung đột ngữ cảnh (NLI contradiction) và ngân sách chi phí."
    },
    tags: ["RAG Routing", "Cost Optimization", "NLI Contradiction", "Multi-Hop Reasoning"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "IEEE IS'26 Paper", vi: "Bài báo IEEE IS'26" }
  },
  {
    id: "nli-cross-encoders",
    name: { en: "NLI & Cross-Encoders", vi: "NLI & Cross-Encoders" },
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: {
      en: "Measuring contradiction/agreement between retrieved passage pairs with symmetric bidirectional scoring that removes directional bias.",
      vi: "Đánh giá mức độ mâu thuẫn/đồng thuận giữa các đoạn văn trích xuất (passage pairs) với kỹ thuật chấm điểm 2 chiều đối xứng loại bỏ directional bias."
    },
    tags: ["NLI", "Cross-Encoder", "DeBERTa-v3", "Contradiction Scoring"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "Context Conflict Score", vi: "Điểm xung đột ngữ cảnh" }
  },
  {
    id: "vector-dbs",
    name: { en: "Vector Databases & Hybrid Search", vi: "Vector Database & Hybrid Search" },
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: {
      en: "Building hybrid search pipelines that combine dense embeddings (BGE / OpenAI) and sparse BM25 with Reciprocal Rank Fusion (RRF) on ChromaDB, FAISS and Milvus.",
      vi: "Thiết lập pipeline tìm kiếm hỗn hợp kết hợp Dense Embedding (BGE / OpenAI) và Sparse BM25 cùng Reciprocal Rank Fusion (RRF) trên ChromaDB, FAISS và Milvus."
    },
    tags: ["ChromaDB", "FAISS", "Milvus", "Hybrid Search", "RRF Fusion"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "Retrieval Architecture", vi: "Kiến trúc truy xuất" }
  },
  {
    id: "langchain-llamaindex",
    name: { en: "LangChain & LlamaIndex", vi: "LangChain & LlamaIndex" },
    category: "LLM & RAG",
    level: "Advanced",
    summary: {
      en: "Building agentic workflows, hierarchical chunking, multi-agent orchestration and recursive document indexing for complex document analysis tasks.",
      vi: "Xây dựng các agentic workflow, hierarchical chunking, multi-agent orchestration và recursive document indexing cho các bài toán phân tích tài liệu phức tạp."
    },
    tags: ["Agentic AI", "Tool Calling", "Document Chunking", "Workflows"]
  },
  {
    id: "eval-benchmarking",
    name: { en: "LLM & RAG Evaluation Metrics", vi: "Metric đánh giá LLM & RAG" },
    category: "LLM & RAG",
    level: "Core Mastery",
    summary: {
      en: "Measuring accuracy with Token F1, Exact Match (EM), ROUGE and BLEU, combined with 95% bootstrap confidence intervals and paired t-tests for rigorous statistical validation.",
      vi: "Đo lường độ chính xác với Token F1, Exact Match (EM), ROUGE, BLEU, kết hợp bootstrap confidence intervals 95% và paired t-tests để thẩm định thống kê nghiêm ngặt."
    },
    tags: ["Evaluation", "Token F1", "Bootstrap CI", "Statistical Significance"],
    relatedSlug: "conflict-aware-rag-routing",
    relatedLabel: { en: "MuSiQue / HotpotQA Benchmark", vi: "Benchmark MuSiQue / HotpotQA" }
  },

  // Computer Vision
  {
    id: "clip-multimodal",
    name: { en: "Multimodal Embeddings & CLIP", vi: "Embedding đa phương thức & CLIP" },
    category: "Computer Vision",
    level: "Advanced",
    summary: {
      en: "Applying joint image–text embedding spaces (contrastive language-image pre-training), zero-shot classification and semantic image retrieval.",
      vi: "Ứng dụng không gian nhúng liên hợp hình ảnh - văn bản (contrastive language-image pre-training), phân loại zero-shot và truy xuất hình ảnh theo ngữ nghĩa."
    },
    tags: ["CLIP", "Zero-Shot", "Joint Embeddings", "Cross-Modal Retrieval"]
  },
  {
    id: "opencv",
    name: { en: "OpenCV & Image Processing", vi: "OpenCV & xử lý ảnh" },
    category: "Computer Vision",
    level: "Core Mastery",
    summary: {
      en: "Real-time image processing, morphological feature extraction, color space transforms, edge detection and noise filtering as preprocessing for machine learning models.",
      vi: "Xử lý hình ảnh thời gian thực, trích xuất đặc trưng hình thái học, biến đổi không gian màu, phát hiện cạnh và lọc nhiễu tiền xử lý cho mô hình học máy."
    },
    tags: ["Image Processing", "Filtering", "Edge Detection", "Real-Time Vision"]
  },
  {
    id: "cnn-vit",
    name: { en: "CNNs & Vision Transformers (ViT)", vi: "CNN & Vision Transformers (ViT)" },
    category: "Computer Vision",
    level: "Advanced",
    summary: {
      en: "Deep convolutional architectures (ResNet, ConvNeXt) and Vision Transformers for recognition, feature extraction and medical/object image classification.",
      vi: "Kiến trúc mạng tích chập sâu (ResNet, ConvNeXt) và Vision Transformers cho tác vụ nhận dạng, trích xuất đặc trưng và phân loại ảnh y tế/vật thể."
    },
    tags: ["ResNet", "ConvNeXt", "Vision Transformers", "Feature Extraction"]
  },
  {
    id: "generative-diffusion",
    name: { en: "Latent Diffusion & Image Generation", vi: "Latent Diffusion & tạo sinh hình ảnh" },
    category: "Computer Vision",
    level: "Proficient",
    summary: {
      en: "Latent diffusion mechanics, conditioning vectors, cross-attention maps and sampling-step optimization for image generation.",
      vi: "Cơ chế khuếch tán không gian tiềm ẩn (Latent Diffusion), conditioning vectors, cross-attention maps và tối ưu hóa sampling steps cho tác vụ tạo ảnh."
    },
    tags: ["Diffusion Models", "Latent Space", "Generative AI", "Cross-Attention"]
  },

  // Systems & Backend
  {
    id: "python",
    name: { en: "Python (Advanced & Scientific)", vi: "Python (nâng cao & khoa học)" },
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: {
      en: "Primary language: advanced object-oriented programming, async IO, type hints (mypy), NumPy, Pandas and SciPy for AI research and production systems.",
      vi: "Ngôn ngữ chủ đạo với lập trình hướng đối tượng nâng cao, async IO, type hints (mypy), NumPy, Pandas, SciPy phục vụ nghiên cứu và sản xuất hệ thống AI."
    },
    tags: ["Python 3.11+", "NumPy", "Pandas", "AsyncIO", "Type Safety"]
  },
  {
    id: "fastapi",
    name: { en: "FastAPI & AI Microservices", vi: "FastAPI & AI Microservices" },
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: {
      en: "Building high-performance asynchronous backend APIs for AI serving, streaming responses (SSE / WebSocket) and strict data validation with Pydantic.",
      vi: "Xây dựng các backend API bất đồng bộ hiệu năng cao cho AI serving, streaming response (SSE / WebSocket), validation dữ liệu chặt chẽ qua Pydantic."
    },
    tags: ["FastAPI", "Pydantic", "Streaming APIs", "Microservices", "REST"]
  },
  {
    id: "docker",
    name: { en: "Docker & Containerization", vi: "Docker & container hóa" },
    category: "Systems & Backend",
    level: "Advanced",
    summary: {
      en: "Packaging AI applications with the NVIDIA Container Toolkit (nvidia-docker), using multi-stage builds to shrink image size and ensure reproducibility.",
      vi: "Đóng gói ứng dụng AI với NVIDIA Container Toolkit (nvidia-docker), multi-stage builds tối ưu dung lượng image và đảm bảo tính tái lập (reproducibility)."
    },
    tags: ["Docker", "NVIDIA CUDA Container", "Multi-stage Build", "Deployment"]
  },
  {
    id: "linux-bash",
    name: { en: "Linux & Bash Scripting", vi: "Linux & Bash Scripting" },
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: {
      en: "In-depth work on Ubuntu/Debian, managing GPU processes (nvidia-smi) and automating research pipelines with shell scripts.",
      vi: "Làm việc chuyên sâu trên môi trường Ubuntu/Debian, quản trị tiến trình GPU (nvidia-smi), tự động hóa pipeline nghiên cứu bằng shell scripts."
    },
    tags: ["Ubuntu / Debian", "Bash Shell", "GPU Monitoring", "Cron Jobs"]
  },
  {
    id: "git-github",
    name: { en: "Git & Open Science Workflows", vi: "Git & quy trình Open Science" },
    category: "Systems & Backend",
    level: "Core Mastery",
    summary: {
      en: "Managing research code, branch workflows, release tags, open-source reproducibility artifacts and CI/CD for automated testing.",
      vi: "Quản lý mã nguồn nghiên cứu, branch workflows, release tag, open-source reproducibility artifacts và CI/CD tự động hóa kiểm thử."
    },
    tags: ["Git", "GitHub Actions", "Reproducibility", "Version Control"]
  },
  {
    id: "typescript-react",
    name: { en: "TypeScript & React", vi: "TypeScript & React" },
    category: "Systems & Backend",
    level: "Advanced",
    summary: {
      en: "Building responsive, intuitive web interfaces and interaction-focused design systems, with integrated visualizations and dashboards for monitoring AI models.",
      vi: "Xây dựng giao diện web phản hồi trực quan, hệ thống design system tối ưu tương tác, tích hợp visualizations và dashboards theo dõi mô hình AI."
    },
    tags: ["React 18", "TypeScript", "Vite", "Modern Frontend", "Interactive UI"]
  },

  // Hardware & Edge
  {
    id: "cuda-acceleration",
    name: { en: "NVIDIA CUDA & GPU Acceleration", vi: "NVIDIA CUDA & tăng tốc GPU" },
    category: "Hardware & Edge",
    level: "Advanced",
    summary: {
      en: "Deep understanding of NVIDIA GPU hardware architecture (Tensor Cores, VRAM hierarchy), memory-optimized programming and FP16/BF16 mixed precision.",
      vi: "Hiểu sâu kiến trúc phần cứng GPU NVIDIA (Tensor Cores, VRAM hierarchy), lập trình tối ưu hóa bộ nhớ, mixed-precision FP16/BF16."
    },
    tags: ["CUDA", "Tensor Cores", "Mixed Precision", "VRAM Optimization"]
  },
  {
    id: "edge-jetson",
    name: { en: "Edge AI & NVIDIA Jetson", vi: "Edge AI & NVIDIA Jetson" },
    category: "Hardware & Edge",
    level: "Advanced",
    summary: {
      en: "Deploying deep learning models on embedded devices (NVIDIA Jetson, Edge TPUs), optimizing power consumption and real-time millisecond latency.",
      vi: "Triển khai mô hình deep learning trên các thiết bị nhúng (NVIDIA Jetson, Edge TPUs), tối ưu hóa điện năng tiêu thụ và độ trễ mili-giây thời gian thực."
    },
    tags: ["NVIDIA Jetson", "Embedded AI", "Low Latency", "Edge Computing"]
  },
  {
    id: "quantization-peft",
    name: { en: "Model Quantization (AWQ / GGUF / LoRA)", vi: "Lượng tử hóa mô hình (AWQ / GGUF / LoRA)" },
    category: "Hardware & Edge",
    level: "Advanced",
    summary: {
      en: "Compressing and quantizing models to 4-bit / 8-bit (bitsandbytes, AWQ, GGUF/llama.cpp), and low-rank adaptation training with LoRA/QLoRA on personal GPUs.",
      vi: "Nén và lượng tử hóa mô hình 4-bit / 8-bit (bitsandbytes, AWQ, GGUF/llama.cpp), huấn luyện thích ứng tham số thấp LoRA/QLoRA trên GPU cá nhân."
    },
    tags: ["4-bit / 8-bit", "AWQ", "GGUF", "QLoRA", "Memory Efficiency"]
  }
];

export interface HardwareEnvironmentItem {
  label: Localized;
  value: Localized;
  detail: Localized;
}

export const HARDWARE_ENVIRONMENT: HardwareEnvironmentItem[] = [
  {
    label: { en: "GPU Workstation", vi: "Máy trạm GPU" },
    value: { en: "NVIDIA RTX Series / CUDA 12.x", vi: "NVIDIA RTX Series / CUDA 12.x" },
    detail: { en: "Primary training & inference benchmark rig", vi: "Hệ thống chính cho training & benchmark inference" }
  },
  {
    label: { en: "Edge Hardware", vi: "Phần cứng Edge" },
    value: { en: "NVIDIA Jetson Platform", vi: "Nền tảng NVIDIA Jetson" },
    detail: { en: "On-device lightweight vision & SLM deployments", vi: "Triển khai vision nhẹ & SLM trên thiết bị" }
  },
  {
    label: { en: "Operating System", vi: "Hệ điều hành" },
    value: { en: "Ubuntu Linux LTS", vi: "Ubuntu Linux LTS" },
    detail: { en: "Reproducible research pipeline & container host", vi: "Pipeline nghiên cứu có thể tái lập & host cho container" }
  },
  {
    label: { en: "Runtime & Drivers", vi: "Runtime & Driver" },
    value: { en: "CUDA + cuDNN + TensorRT", vi: "CUDA + cuDNN + TensorRT" },
    detail: { en: "Low-latency tensor execution environment", vi: "Môi trường thực thi tensor độ trễ thấp" }
  }
];
