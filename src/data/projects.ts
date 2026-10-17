import type { Localized } from '../i18n';

export interface ProjectDetail {
  slug: string;
  name: Localized;
  year: Localized;
  type: Localized;
  description: Localized;
  colors: [string, string];
  image?: string;
  role: Localized;
  challenge: Localized;
  outcome: Localized;
  decisions: [Localized, Localized][];
  githubUrl?: string;
  demoUrl?: string;
  detail?: {
    timeline?: [Localized, Localized][];
    artifacts?: Localized[];
    reflection?: Localized;
  };
  publication?: {
    journal?: Localized;
    conference?: Localized;
    authors: Localized;
    date: Localized;
    doi?: string;
    status?: Localized;
    abstract: Localized;
    pdfUrl?: string;
  };
}

/** Same text in both languages (paper titles, conference names, product/tech names). */
const same = (text: string): Localized => ({ en: text, vi: text });

export const PROJECTS: ProjectDetail[] = [
  {
    slug: 'conflict-aware-rag-routing',
    name: same('Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction'),
    year: same('2026'),
    type: {
      en: "Scientific Publication · IEEE IS'26 (Accepted & Presented)",
      vi: "Công bố khoa học · IEEE IS'26 (Đã được chấp nhận & trình bày)"
    },
    description: {
      en: "Scientific publication at IEEE IS'26: proposes a RAG router that is aware of NLI context conflict, saving ~35% of API calls while retaining 83.2%–92.2% of the Always-LLM F1.",
      vi: "Công bố khoa học tại IEEE IS'26: Đề xuất bộ định tuyến RAG nhận thức mâu thuẫn ngữ cảnh NLI, tiết kiệm ~35% API calls trong khi giữ lại 83.2%–92.2% F1 của Always-LLM."
    },
    colors: ['#e6aa60', '#5e320f'],
    image: '/images/project-conflict-aware-rag-routing.webp',
    role: {
      en: 'First Author · AI Researcher',
      vi: 'Tác giả chính · Nhà nghiên cứu AI'
    },
    challenge: {
      en: 'Current adaptive RAG routers rely mainly on similarity or rank-confidence scores (RRF) and do not assess whether the retrieved passages factually contradict one another. When retrieved documents contain internal contradictions or distracting information, small language models (SLMs) are highly prone to degraded reasoning, while calling a large LLM API for every question wastes cost and adds latency.',
      vi: 'Các bộ định tuyến RAG thích ứng hiện nay chủ yếu dựa vào độ tương đồng hoặc điểm tin cậy xếp hạng (RRF), không đánh giá liệu các đoạn văn bản được nạp vào có mâu thuẫn dữ kiện với nhau hay không. Khi tài liệu truy xuất chứa mâu thuẫn nội tại hoặc thông tin gây nhiễu, các mô hình nhỏ gọn (SLM) rất dễ bị suy giảm suy luận, trong khi việc gọi API LLM lớn cho mọi câu hỏi gây lãng phí chi phí và độ trễ.'
    },
    outcome: {
      en: 'Proposed a 5-feature Random Forest (Context Conflict C, Query Length, Context Length, Chunk Overlap, RRF Confidence) with a nested budget-calibration procedure (leakage-resistant nested 5-fold calibration). Evaluated on 3,000 multi-hop questions (MuSiQue, HotpotQA, 2Wiki) with Qwen2.5-1.5B-Instruct and DeepSeek-V4-Flash: at a ~65% call rate, the router saves ~35% of API calls while retaining 83.2%–92.2% of the Always-LLM F1. In the high-RRF/high-conflict subgroup, the router intervenes by escalating to the LLM, achieving an F1 gain of +14.35 on HotpotQA and +6.50 on 2Wiki over RRF.',
      vi: 'Đề xuất mô hình Random Forest 5 đặc trưng (Context Conflict C, Query Length, Context Length, Chunk Overlap, RRF Confidence) với quy trình hiệu chuẩn ngân sách lồng (nested 5-fold calibration chống rò rỉ dữ liệu). Đánh giá trên 3,000 câu hỏi multi-hop (MuSiQue, HotpotQA, 2Wiki) với Qwen2.5-1.5B-Instruct và DeepSeek-V4-Flash: ở mức ~65% lượt gọi, router tiết kiệm ~35% API calls trong khi giữ lại 83.2%–92.2% F1 của Always-LLM. Trong nhóm truy vấn có RRF cao nhưng mâu thuẫn cao (high-RRF/high-conflict), router can thiệp chuyển tiếp lên LLM, đạt F1 gain +14.35 trên HotpotQA và +6.50 trên 2Wiki so với RRF.'
    },
    decisions: [
      [
        {
          en: 'Bidirectional NLI Context Conflict (C)',
          vi: 'Mâu thuẫn ngữ cảnh NLI hai chiều (C)'
        },
        {
          en: 'Uses the cross-encoder/nli-deberta-v3-small model to score symmetric contradiction between the top 3 parent chunks: q_ij = [S(pi,pj) + S(pj,pi)]/2, combined as C = 0.7 max(q) + 0.3 mean(q) to capture both deep local disagreement and overall inconsistency.',
          vi: 'Sử dụng mô hình cross-encoder/nli-deberta-v3-small chấm điểm mâu thuẫn đối xứng giữa top 3 parent chunks: q_ij = [S(pi,pj) + S(pj,pi)]/2, kết hợp C = 0.7 max(q) + 0.3 mean(q) để nắm bắt cả bất đồng cục bộ sâu sắc lẫn sự thiếu nhất quán tổng thể.'
        }
      ],
      [
        {
          en: '5-Feature Random Forest & Leakage-Resistant Calibration',
          vi: 'Random Forest 5 đặc trưng & Hiệu chuẩn chống rò rỉ dữ liệu'
        },
        {
          en: 'Trains a 500-tree Random Forest with nested 5-fold cross-validation, selecting budget thresholds (30%, 50%, 65%) entirely from inner out-of-fold scores rather than in-sample scores to eliminate data leakage.',
          vi: 'Huấn luyện Random Forest 500 cây với quy trình Nested 5-fold cross-validation, lựa chọn ngưỡng ngân sách (30%, 50%, 65%) hoàn toàn từ inner out-of-fold scores thay vì in-sample scores để triệt tiêu rò rỉ dữ liệu.'
        }
      ],
      [
        {
          en: 'Diagnostic High-RRF / High-Conflict Subgroup Recovery',
          vi: 'Phục hồi nhóm chẩn đoán High-RRF / High-Conflict'
        },
        {
          en: 'Shows that context conflict acts as a valuable exception signal: when RRF confidence is high but the context disagrees, the hybrid router escalates to the LLM, achieving an F1 gain of +14.35 on HotpotQA (p = 0.006) and +6.50 on 2Wiki (p = 0.006).',
          vi: 'Chứng minh mâu thuẫn ngữ cảnh đóng vai trò tín hiệu ngoại lệ giá trị: khi RRF tin cậy cao nhưng ngữ cảnh bất đồng, hybrid router chuyển hướng lên LLM, đạt F1 gain +14.35 trên HotpotQA (p = 0.006) và +6.50 trên 2Wiki (p = 0.006).'
        }
      ]
    ],
    githubUrl: 'https://github.com/RAG-Routing-Via-Context-Confliction/RAG_Router_Via_Context_Conflict',
    publication: {
      conference: same("The 13th IEEE International Conference on Intelligent Systems (IEEE IS'26)"),
      journal: same("IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems"),
      authors: {
        en: 'Dang Phuong Nam (First Author), Tran Huy Tuan, Doan Duy Long, Cao Van Mai (Faculty of Artificial Intelligence, FPT University)',
        vi: 'Dang Phuong Nam (Tác giả chính), Tran Huy Tuan, Doan Duy Long, Cao Van Mai (Khoa Trí tuệ Nhân tạo, Trường Đại học FPT)'
      },
      date: {
        en: 'Accepted & Presented · 2026',
        vi: 'Đã được chấp nhận & trình bày · 2026'
      },
      status: {
        en: "Accepted & Presented at IEEE IS'26 · Proceedings to appear (DOI pending)",
        vi: "Đã được chấp nhận & trình bày tại IEEE IS'26 · Kỷ yếu sắp xuất bản (DOI đang chờ cấp)"
      },
      abstract: {
        en: 'Adaptive model routing can reduce the cost of retrieval-augmented generation (RAG), but the routing signal must identify when a small language model (SLM) is likely to fail. We study context conflict, the contradiction among retrieved passages, as one such signal. A five-feature Random Forest combines conflict with query length, retrieved-context length, chunk overlap, and Reciprocal Rank Fusion (RRF) confidence. We evaluate the pipeline on 3,000 multi-hop questions from MuSiQue, HotpotQA, and 2WikiMultiHopQA using Qwen2.5-1.5B-Instruct locally and DeepSeek-V4-Flash through an API. Nested five-fold calibration selects budget cutoffs from inner out-of-fold rather than in-sample training scores. At an approximately 65% LLM-call rate, the hybrid router saves about 35% of API calls while retaining 83.2–92.2% of the Always-LLM F1. In high-RRF/high-conflict subgroups, hybrid-minus-RRF F1 improves by +14.35 on HotpotQA and +6.50 on 2Wiki.',
        vi: 'Định tuyến mô hình thích ứng có thể giảm chi phí của retrieval-augmented generation (RAG), nhưng tín hiệu định tuyến phải nhận diện được khi nào một mô hình ngôn ngữ nhỏ (SLM) có khả năng thất bại. Chúng tôi nghiên cứu mâu thuẫn ngữ cảnh — sự mâu thuẫn giữa các đoạn văn bản được truy xuất — như một tín hiệu như vậy. Một mô hình Random Forest năm đặc trưng kết hợp mức độ mâu thuẫn với độ dài truy vấn, độ dài ngữ cảnh truy xuất, độ chồng lấp giữa các chunk và độ tin cậy Reciprocal Rank Fusion (RRF). Chúng tôi đánh giá pipeline trên 3,000 câu hỏi multi-hop từ MuSiQue, HotpotQA và 2WikiMultiHopQA, sử dụng Qwen2.5-1.5B-Instruct chạy cục bộ và DeepSeek-V4-Flash qua API. Quy trình hiệu chuẩn lồng năm fold (nested five-fold calibration) chọn các ngưỡng ngân sách từ điểm inner out-of-fold thay vì điểm huấn luyện in-sample. Ở tỷ lệ gọi LLM xấp xỉ 65%, hybrid router tiết kiệm khoảng 35% lượt gọi API trong khi giữ lại 83.2–92.2% F1 của Always-LLM. Trong các nhóm high-RRF/high-conflict, F1 của hybrid trừ RRF cải thiện +14.35 trên HotpotQA và +6.50 trên 2Wiki.'
      },
      pdfUrl: '/paper_93.pdf'
    },
    detail: {
      timeline: [
        [
          { en: '01 / RESEARCH GAP & FORMULATION', vi: '01 / KHOẢNG TRỐNG NGHIÊN CỨU & ĐẶT BÀI TOÁN' },
          {
            en: 'Surveyed the limitations of RAG routers that rely only on relevance/RRF and cannot detect contradictions among the retrieved evidence.',
            vi: 'Khảo sát hạn chế của các bộ định tuyến RAG chỉ dựa vào độ liên quan/RRF, thiếu khả năng phát hiện mâu thuẫn giữa các bằng chứng được nạp vào.'
          }
        ],
        [
          { en: '02 / CONFLICT SCORE & 5-FEATURE ROUTER', vi: '02 / ĐIỂM MÂU THUẪN & ROUTER 5 ĐẶC TRƯNG' },
          {
            en: 'Defined the context conflict score C via DeBERTa-v3 NLI and built a 5-feature Random Forest with leakage-resistant nested 5-fold budget calibration.',
            vi: 'Định nghĩa điểm số mâu thuẫn ngữ cảnh C qua DeBERTa-v3 NLI và xây dựng 5-feature Random Forest với nested 5-fold budget calibration chống rò rỉ điểm số.'
          }
        ],
        [
          { en: "03 / BENCHMARK & IEEE IS'26 ACCEPTANCE", vi: "03 / BENCHMARK & ĐƯỢC CHẤP NHẬN TẠI IEEE IS'26" },
          {
            en: "Rigorous experimental evaluation on 3,000 multi-hop questions with Qwen2.5-1.5B and DeepSeek-V4-Flash; the paper was peer-reviewed, accepted and presented at IEEE IS'26.",
            vi: "Đánh giá thực nghiệm chặt chẽ trên 3,000 câu hỏi multi-hop với Qwen2.5-1.5B và DeepSeek-V4-Flash; bài báo được bình duyệt, chấp thuận và trình bày tại IEEE IS'26."
          }
        ]
      ],
      artifacts: [
        { en: 'Full Research Manuscript (paper_93.pdf)', vi: 'Bản thảo nghiên cứu đầy đủ (paper_93.pdf)' },
        {
          en: "IEEE IS'26 Presentation Slides & Technical Oral Briefing",
          vi: "Slide trình bày IEEE IS'26 & Phần thuyết trình kỹ thuật"
        },
        {
          en: 'Multi-Hop Benchmark Suite (MuSiQue, HotpotQA, 2Wiki)',
          vi: 'Bộ benchmark multi-hop (MuSiQue, HotpotQA, 2Wiki)'
        },
        {
          en: 'Nested 5-Fold Calibration & Out-of-Fold Evaluation Pipeline',
          vi: 'Pipeline hiệu chuẩn nested 5-fold & đánh giá out-of-fold'
        }
      ],
      reflection: {
        en: 'Context conflict is not a universal difficulty measure for every dataset (its practical effectiveness depends on the distribution of retrieved data). The core practical value of this research lies in identifying exception regions (high-RRF / high-conflict) — where rank-confidence scores misjudge the complexity of conflicting passages — so that timely escalation can be applied.',
        vi: 'Context conflict không phải là thước đo độ khó phổ quát cho mọi tập dữ liệu (hiệu quả thực tế phụ thuộc vào phân phối dữ liệu truy xuất). Giá trị thực tiễn cốt lõi của nghiên cứu nằm ở việc nhận diện các vùng lỗi ngoại lệ (high-RRF / high-conflict) — khi điểm tin cậy xếp hạng đánh giá sai độ phức tạp của các đoạn văn bản xung đột — để hỗ trợ can thiệp chuyển tiếp kịp thời.'
      }
    }
  },
  {
    slug: 'probabilistic-stock-breakout-vietnam',
    name: same('Probabilistic Modeling of Stock Breakout Success in the Vietnamese Equity Market'),
    year: same('2026'),
    type: {
      en: 'Scientific Publication · ICITDA 2026 (Accepted · Archive Manuscript)',
      vi: 'Công bố khoa học · ICITDA 2026 (Đã được chấp nhận · Bản thảo lưu trữ)'
    },
    description: {
      en: 'Research paper accepted at ICITDA 2026: models the probability of successful breakouts from consolidation bases in the Vietnamese stock market using LightGBM with a Minervini SEPA / VCP feature set, reaching Precision@10 = 90.0% and a 72.5% Win Rate at the P > 0.8 threshold.',
      vi: 'Nghiên cứu khoa học được chấp thuận tại ICITDA 2026: Mô hình hóa xác suất breakout thành công từ nền tích lũy trên TTCK Việt Nam bằng LightGBM kết hợp bộ đặc trưng Minervini SEPA / VCP, đạt Precision@10 = 90.0% và Win Rate 72.5% tại ngưỡng P > 0.8.'
    },
    colors: ['#4ade80', '#14532d'],
    image: '/images/project-probabilistic-stock-breakout-vietnam.webp',
    role: {
      en: 'Co-Author · Quantitative ML Researcher',
      vi: 'Đồng tác giả · Nhà nghiên cứu Quantitative ML'
    },
    challenge: {
      en: 'Breakout trading from consolidation bases is very popular in technical analysis but frequently runs into false breakouts / bull traps in frontier/emerging markets such as Vietnam (VNINDEX). Traditional systems (Donchian, fixed price channels) are qualitative, lack quantitative probabilities and have no mechanism to filter out market-structure noise.',
      vi: 'Chiến lược giao dịch breakout từ nền tích lũy (consolidation base) rất phổ biến trong phân tích kỹ thuật nhưng thường xuyên gặp phải hiện tượng bẫy tăng giá (false breakouts / bull traps) tại các thị trường cận biên/mới nổi như Việt Nam (VNINDEX). Các hệ thống truyền thống (Donchian, kênh giá cố định) hoạt động mang tính định tính, thiếu xác suất định lượng và không có cơ chế lọc bỏ nhiễu cấu trúc thị trường.'
    },
    outcome: {
      en: 'Built an event-driven probabilistic modeling framework over a universe of 255 highly liquid HOSE/HNX stocks (market cap > 2,500 billion VND) from 2010–2026, with a strict causal structure X_t ← X_{t-1} that eliminates lookahead bias. The LightGBM model is optimized with a SEPA / VCP feature set capturing volatility compression and volume momentum. Strict out-of-sample evaluation (2024–2026, 216 real breakout events): the Top-10 predictions reach a 90.00% Win Rate (Precision@10 = 0.9000); at the P > 0.8 probability threshold the strategy reaches a 72.5% Win Rate with a Profit Factor of 4.89 and an average return of +13.94% per trade, staying notably stable in both Neutral (Win Rate 75.86%) and Uptrend (Win Rate 72.73%) markets.',
      vi: 'Xây dựng khung mô hình hóa xác suất theo sự kiện (event-driven) trên vũ trụ 255 cổ phiếu thanh khoản cao sàn HOSE/HNX (vốn hóa > 2,500 tỷ VND) giai đoạn 2010–2026 với cấu trúc nhân quả nghiêm ngặt X_t ← X_{t-1} triệt tiêu lookahead bias. Mô hình LightGBM được tối ưu hóa cùng bộ đặc trưng SEPA / VCP nén biến động và động lượng khối lượng. Đánh giá out-of-sample nghiêm ngặt (2024–2026, 216 sự kiện breakout thực tế): Top-10 dự báo đạt Win Rate 90.00% (Precision@10 = 0.9000); tại ngưỡng xác suất P > 0.8 đạt Win Rate 72.5% với Profit Factor 4.89 và lợi nhuận bình quân +13.94%/giao dịch, duy trì độ ổn định vượt trội trong cả thị trường Neutral (Win Rate 75.86%) lẫn Uptrend (Win Rate 72.73%).'
    },
    decisions: [
      [
        {
          en: 'Causal Feature Engineering & Zero-Lookahead Pipeline',
          vi: 'Feature engineering nhân quả & Pipeline không lookahead'
        },
        {
          en: 'Completely eliminates future data leakage through the strict causal principle X_t ← X_{t-1}, aligning adjusted OHLCV data for 255 large-cap stocks with the VNINDEX from 2010 to 2026.',
          vi: 'Triệt tiêu hoàn toàn rò rỉ dữ liệu tương lai bằng nguyên tắc nhân quả nghiêm ngặt X_t ← X_{t-1}, đồng bộ dữ liệu OHLCV điều chỉnh của 255 cổ phiếu lớn với chỉ số VNINDEX từ 2010 đến 2026.'
        }
      ],
      [
        {
          en: 'Quantifying Minervini SEPA & the Volatility Contraction Pattern (VCP)',
          vi: 'Định lượng hóa chiến lược Minervini SEPA & Mô hình nén biến động (VCP)'
        },
        {
          en: 'Turns the SEPA momentum-trading philosophy into verifiable mathematical features: the ATR(14)/ATR(60) compression ratio, 60-day base depth, 20-day variance contraction, relative price strength (RS Line vs. VNINDEX) and breakout volume surge relative to MA20.',
          vi: 'Chuyển hóa triết lý giao dịch đà tăng trưởng SEPA thành các đặc trưng toán học kiểm chứng được: tỷ số nén ATR(14)/ATR(60), độ sâu nền tích lũy 60 ngày, độ co hẹp phương sai 20 ngày, sức mạnh giá tương quan (RS Line so với VNINDEX) và tỷ lệ nổ vol breakout so với MA20.'
        }
      ],
      [
        {
          en: 'LightGBM Probability Calibration & Asymmetric Signal Filtering (Precision@10 = 90%)',
          vi: 'Hiệu chuẩn xác suất LightGBM & Lọc tín hiệu bất đối xứng (Precision@10 = 90%)'
        },
        {
          en: 'Trains LightGBM with dynamic class reweighting (scale_pos_weight) and TimeSeriesSplit validation. Rather than plain binary classification, the model acts as an opportunity ranking filter, concentrating the big winners in the highest-probability group (Top 5% reaches a 90% Win Rate; P > 0.8 reaches a Profit Factor of 4.89).',
          vi: 'Huấn luyện LightGBM với dynamic class reweighting (scale_pos_weight) và TimeSeriesSplit validation. Thay vì chỉ phân loại nhị phân thông thường, mô hình đóng vai trò bộ xếp hạng cơ hội (opportunity ranking filter), cô đọng các lệnh thắng lớn ở nhóm xác suất cao nhất (Top 5% đạt 90% Win Rate, P > 0.8 đạt Profit Factor 4.89).'
        }
      ]
    ],
    publication: {
      conference: same('2026 11th International Conference on Information Technology and Digital Applications (ICITDA)'),
      journal: same('The 11th International Conference on Information Technology and Digital Applications (ICITDA 2026)'),
      authors: {
        en: 'Doan Duy Long, Tran Huy Tuan, Dang Phuong Nam (Co-Author), Cao Van Mai (Faculty of Artificial Intelligence, FPT University)',
        vi: 'Doan Duy Long, Tran Huy Tuan, Dang Phuong Nam (Đồng tác giả), Cao Van Mai (Khoa Trí tuệ Nhân tạo, Trường Đại học FPT)'
      },
      date: {
        en: 'Accepted · 2026',
        vi: 'Đã được chấp nhận · 2026'
      },
      status: {
        en: 'Accepted at ICITDA 2026 · Archive Manuscript (Non-presented)',
        vi: 'Đã được chấp nhận tại ICITDA 2026 · Bản thảo lưu trữ (Không trình bày)'
      },
      abstract: {
        en: "This paper proposes a probabilistic modeling framework to estimate the likelihood of successful stock breakouts during price consolidation phases in the Vietnamese equity market. Formulating breakout prediction as a supervised machine learning task, we construct a causal feature set capturing price compression, volatility contraction (VCP), volume dynamics, and multi-horizon trend alignment inspired by Minervini's SEPA methodology. Evaluated on a strictly causal panel of 255 liquid Vietnamese equities (>2,500 billion VND market cap) from 2010 to 2026, the trained LightGBM model achieves strong ranking concentration on an out-of-sample test set (2024–2026, 216 breakout events). While the baseline market win rate is 49.07%, the model's Top-10 predictions achieve a 90.00% win rate (Precision@10 = 0.9000, Top-5% = 90.0%). Under a calibrated probability threshold P > 0.8, the strategy realizes a 72.5% win rate, a profit factor of 4.89, and an average trade return of +13.94%, demonstrating high regime robustness across both neutral and bullish market environments.",
        vi: 'Bài báo này đề xuất một khung mô hình hóa xác suất nhằm ước lượng khả năng breakout thành công của cổ phiếu trong các giai đoạn tích lũy giá trên thị trường chứng khoán Việt Nam. Đặt bài toán dự báo breakout dưới dạng một tác vụ học máy có giám sát, chúng tôi xây dựng một bộ đặc trưng nhân quả nắm bắt sự nén giá, sự co hẹp biến động (VCP), động lực khối lượng và sự đồng thuận xu hướng đa khung thời gian, lấy cảm hứng từ phương pháp SEPA của Minervini. Được đánh giá trên một panel nhân quả nghiêm ngặt gồm 255 cổ phiếu Việt Nam có thanh khoản cao (vốn hóa >2,500 tỷ VND) từ 2010 đến 2026, mô hình LightGBM sau huấn luyện đạt mức tập trung xếp hạng cao trên tập kiểm tra out-of-sample (2024–2026, 216 sự kiện breakout). Trong khi win rate cơ sở của thị trường là 49.07%, Top-10 dự báo của mô hình đạt win rate 90.00% (Precision@10 = 0.9000, Top-5% = 90.0%). Với ngưỡng xác suất đã hiệu chuẩn P > 0.8, chiến lược đạt win rate 72.5%, profit factor 4.89 và lợi nhuận trung bình mỗi giao dịch +13.94%, cho thấy độ bền vững cao qua các chế độ thị trường, cả trung tính lẫn tăng giá.'
      },
      pdfUrl: '/icitda_2026_stock_breakout.pdf'
    },
    detail: {
      timeline: [
        [
          {
            en: '01 / MARKET PHENOMENON & CAUSAL FORMULATION',
            vi: '01 / HIỆN TƯỢNG THỊ TRƯỜNG & ĐẶT BÀI TOÁN NHÂN QUẢ'
          },
          {
            en: 'Surveyed false breakouts in the Vietnamese stock market (VNINDEX); built a data-collection pipeline for a panel of 255 stocks with market cap > 2,500 billion VND (2010–2026) under the causal principle X_t ← X_{t-1}.',
            vi: 'Khảo sát thực trạng false breakouts trên thị trường chứng khoán Việt Nam (VNINDEX); xây dựng pipeline thu thập dữ liệu panel 255 cổ phiếu vốn hóa > 2,500 tỷ VND (2010–2026) với nguyên tắc nhân quả X_t ← X_{t-1}.'
          }
        ],
        [
          {
            en: '02 / SEPA & VCP QUANTITATIVE FEATURE EXTRACTION',
            vi: '02 / TRÍCH XUẤT ĐẶC TRƯNG ĐỊNH LƯỢNG SEPA & VCP'
          },
          {
            en: 'Modeled ATR(14)/ATR(60) volatility-compression indicators, RS Line relative strength, liquidity spikes and 30-day resistance pressure; hard-filtered out stocks that do not meet the momentum criteria.',
            vi: 'Mô hình hóa các chỉ báo nén biến động ATR(14)/ATR(60), sức mạnh tương đối RS Line, đột biến thanh khoản và áp lực kháng cự 30 ngày; lọc cứng các cổ phiếu không đạt chuẩn đà tăng trưởng.'
          }
        ],
        [
          {
            en: '03 / LIGHTGBM MODELING & OUT-OF-SAMPLE BENCHMARK',
            vi: '03 / MÔ HÌNH LIGHTGBM & BENCHMARK OUT-OF-SAMPLE'
          },
          {
            en: 'TimeSeriesSplit time-series validation; out-of-sample evaluation on 216 breakout events from 2024 onward. The paper was peer-reviewed and accepted at the ICITDA 2026 international conference.',
            vi: 'Kiểm định chuỗi thời gian TimeSeriesSplit; đánh giá out-of-sample trên 216 sự kiện breakout từ năm 2024 trở đi. Bài báo được bình duyệt và chấp thuận tại hội nghị quốc tế ICITDA 2026.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'Full Research Manuscript (icitda_2026_stock_breakout.pdf)',
          vi: 'Bản thảo nghiên cứu đầy đủ (icitda_2026_stock_breakout.pdf)'
        },
        {
          en: 'Strict Causal Data Ingestion & Panel Construction Pipeline',
          vi: 'Pipeline nạp dữ liệu nhân quả nghiêm ngặt & xây dựng panel'
        },
        {
          en: 'SEPA / VCP Quantitative Feature Engineering Module',
          vi: 'Module feature engineering định lượng SEPA / VCP'
        },
        {
          en: 'LightGBM Probability Calibration & Regime Backtest Suite',
          vi: 'Bộ hiệu chuẩn xác suất LightGBM & backtest theo chế độ thị trường'
        }
      ],
      reflection: {
        en: 'The core of quantitative finance research is not trying to precisely predict every random price jump, but acting as a quality filter (signal filter): patiently rejecting false bull traps and committing capital only to the breakout opportunities with the highest asymmetric probability.',
        vi: 'Điểm cốt lõi của nghiên cứu định lượng tài chính không phải là cố gắng dự báo chính xác từng bước nhảy giá ngẫu nhiên, mà là đóng vai trò như một bộ lọc chất lượng (signal filter): kiên nhẫn loại bỏ các bẫy tăng giá giả và chỉ giải ngân vào những cơ hội breakout có xác suất bất đối xứng cao nhất.'
      }
    }
  },
  {
    slug: 'stock-multitask-transformer',
    name: {
      en: 'Multi-Task Transformer for Stock Trend Prediction & Self-Rationalization',
      vi: 'Multi-Task Transformer dự báo xu hướng cổ phiếu & tự giải trình'
    },
    year: {
      en: '2026 (In Development)',
      vi: '2026 (Đang phát triển)'
    },
    type: {
      en: 'Capstone Project · FPT University (In Research & Development)',
      vi: 'Đồ án tốt nghiệp · ĐH FPT (Đang nghiên cứu & phát triển)'
    },
    description: {
      en: 'Capstone project at FPT University (in development): designing a multi-task Decoder-Only SLM architecture that processes hybrid data (price time series, financial text, ESG) to forecast trends and automatically generate rationales.',
      vi: 'Đồ án tốt nghiệp tại ĐH FPT (Đang phát triển): Thiết kế kiến trúc Decoder-Only SLM đa nhiệm xử lý dữ liệu lai (chuỗi thời gian giá, văn bản tài chính, ESG) nhằm dự báo xu hướng và tự động sinh giải trình.'
    },
    colors: ['#77b6ff', '#252ed9'],
    image: '/images/project-stock-multitask-transformer.webp',
    role: {
      en: 'Vice Team Leader · AI System Architect (In Research & Development)',
      vi: 'Phó trưởng nhóm · AI System Architect (Đang nghiên cứu & phát triển)'
    },
    challenge: {
      en: 'Stock market forecasting usually requires combining many heterogeneous data sources: price time series (OHLCV), financial text (MD&A, earnings calls) and sustainability scores (ESG). Traditional methods often process each source separately, missing cross-correlations and lacking a transparent self-rationalization mechanism linking the classification decision to the financial reasoning.',
      vi: 'Dự báo thị trường chứng khoán thường đòi hỏi tổng hòa từ nhiều nguồn dữ liệu không đồng nhất: chuỗi thời gian giá (OHLCV), văn bản tài chính (MD&A, Earnings Calls) và chỉ số bền vững (ESG). Các phương pháp truyền thống thường xử lý rời rạc từng nguồn dữ liệu, dẫn đến việc bỏ lỡ tương quan chéo và thiếu cơ chế tự giải trình minh bạch giữa quyết định phân loại và lý lẽ tài chính.'
    },
    outcome: {
      en: 'Proposed and currently implementing a Shared Decoder-Only SLM architecture (based on Qwen2.5-0.5B) that processes a hybrid representation sequence from PatchTST (time series), Segment Embedding (text) and Continuous Embedding (ESG). Proposed an NLI-based Consistency Loss objective to limit contradictions between the trend classification label and the rationale text, aiming for on-premise deployment with optimized hardware cost.',
      vi: 'Đề xuất và đang hiện thực kiến trúc Shared Decoder-Only SLM (dựa trên Qwen2.5-0.5B) xử lý chuỗi biểu diễn lai từ PatchTST (chuỗi thời gian), Segment Embedding (văn bản) và Continuous Embedding (ESG). Đề xuất hàm mục tiêu Consistency Loss qua NLI để hạn chế mâu thuẫn giữa nhãn phân loại xu hướng và văn bản giải trình, hướng tới mục tiêu triển khai on-premise với chi phí phần cứng tối ưu.'
    },
    decisions: [
      [
        {
          en: 'Shared Decoder-Only SLM Backbone (Qwen2.5-0.5B)',
          vi: 'Backbone SLM Decoder-Only dùng chung (Qwen2.5-0.5B)'
        },
        {
          en: 'Chose a compact language model as the shared backbone: the hidden state at the special [DECISION] token is extracted for classification, while its autoregressive ability is used to generate the rationale text.',
          vi: 'Lựa chọn mô hình ngôn ngữ nhỏ gọn làm backbone chung: trích xuất hidden state tại token đặc biệt [DECISION] cho tác vụ phân loại, đồng thời tận dụng khả năng autoregressive để sinh văn bản giải trình.'
        }
      ],
      [
        {
          en: 'Hybrid Input Layer',
          vi: 'Tầng mã hóa dữ liệu lai (Hybrid Input Layer)'
        },
        {
          en: 'Experimenting with combining W=30-day time-series patches with Temporal Positional Embedding, financial text with Segment Embedding, and continuous ESG scores to avoid discretization that would lose ordinal information.',
          vi: 'Thử nghiệm kết hợp patch chuỗi thời gian W=30 ngày với Temporal Positional Embedding, văn bản tài chính với Segment Embedding, và điểm ESG dạng liên tục tránh việc rời rạc hóa làm mất thứ bậc.'
        }
      ],
      [
        {
          en: 'Consistency Constraint via Consistency Loss',
          vi: 'Ràng buộc nhất quán qua Consistency Loss'
        },
        {
          en: 'Integrates a compact NLI model to apply a gradient penalty when the generated rationale logically contradicts the predicted trend label.',
          vi: 'Tích hợp mô hình NLI nhỏ gọn để phạt gradient khi văn bản giải trình sinh ra mâu thuẫn về mặt logic với nhãn dự đoán xu hướng.'
        }
      ],
      [
        {
          en: 'On-Premise Optimization Focus',
          vi: 'Định hướng tối ưu hóa On-Premise'
        },
        {
          en: 'Designing the system for local inference on consumer hardware (RTX 4060, VRAM <8GB) to keep internal trading data private and control latency.',
          vi: 'Thiết kế hệ thống hướng tới khả năng suy luận cục bộ trên phần cứng thương mại (RTX 4060, VRAM <8GB) nhằm bảo mật dữ liệu giao dịch nội bộ và kiểm soát độ trễ.'
        }
      ]
    ],
    detail: {
      timeline: [
        [
          { en: '01 / PROBLEM & HYPOTHESIS FORMULATION', vi: '01 / ĐẶT BÀI TOÁN & GIẢ THUYẾT' },
          {
            en: 'Surveyed the problem of combining financial modalities and formulated a hypothesis about consistency between forecasts and rationale text.',
            vi: 'Khảo sát bài toán kết hợp đa phương thức tài chính và xây dựng giả thuyết về tính nhất quán giữa dự báo và văn bản giải trình.'
          }
        ],
        [
          { en: '02 / PIPELINE & ARCHITECTURE DESIGN', vi: '02 / THIẾT KẾ PIPELINE & KIẾN TRÚC' },
          {
            en: 'Collected a sample dataset (OHLCV, SEC 10-K/10-Q, ESG), built a preprocessing module that prevents look-ahead bias, and set up the Qwen2.5-0.5B backbone structure.',
            vi: 'Thu thập tập dữ liệu mẫu (OHLCV, SEC 10-K/10-Q, ESG), xây dựng module tiền xử lý chống look-ahead bias và cấu trúc backbone Qwen2.5-0.5B.'
          }
        ],
        [
          {
            en: '03 / EXPERIMENTAL TRAINING & REFINEMENT (IN PROGRESS)',
            vi: '03 / HUẤN LUYỆN THỬ NGHIỆM & TINH CHỈNH (ĐANG THỰC HIỆN)'
          },
          {
            en: 'Currently running experimental QLoRA training, tuning the joint loss and measuring inference latency in a local environment.',
            vi: 'Đang huấn luyện thử nghiệm QLoRA, tinh chỉnh hàm mất mát liên kết và đo lường độ trễ suy luận trên môi trường cục bộ.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'Capstone Research Proposal & Technical Specification',
          vi: 'Đề cương nghiên cứu đồ án & Đặc tả kỹ thuật'
        },
        {
          en: 'Hybrid Multimodal Ingestion & Preprocessing Pipeline',
          vi: 'Pipeline nạp & tiền xử lý dữ liệu đa phương thức lai'
        },
        {
          en: 'Shared Decoder-Only Architecture Implementation (PyTorch)',
          vi: 'Hiện thực kiến trúc Shared Decoder-Only (PyTorch)'
        },
        {
          en: 'Local Evaluation & Consistency Benchmark Suite',
          vi: 'Bộ đánh giá cục bộ & benchmark tính nhất quán'
        }
      ],
      reflection: {
        en: 'A financial model cannot be a mysterious black box. The core goal of this research is to build a compact deep-learning architecture that can produce rationales consistent with its quantitative decisions, without depending on expensive cloud APIs.',
        vi: 'Mô hình tài chính không thể là một chiếc hộp đen bí ẩn. Mục tiêu cốt lõi của nghiên cứu là xây dựng một cấu trúc học sâu nhỏ gọn, có khả năng tự giải trình nhất quán với quyết định định lượng mà không phụ thuộc vào các API đám mây đắt đỏ.'
      }
    }
  },
  {
    slug: 'emotional-ai',
    name: {
      en: 'Emotional AI: Cognitive Architecture & Dynamic Character Simulation',
      vi: 'Emotional AI: Kiến trúc nhận thức & Mô phỏng nhân vật động'
    },
    year: {
      en: '2026 (In Development)',
      vi: '2026 (Đang phát triển)'
    },
    type: {
      en: 'Applied AI · Cognitive Architecture (In Development)',
      vi: 'AI ứng dụng · Kiến trúc nhận thức (Đang phát triển)'
    },
    description: {
      en: 'Research project on a stateful, emotion-aware AI companion agent (in development): combines the Scherer CPM psychological model with the ACT-R memory decay function, and uses auxiliary peripheral devices to offload computation from the host GPU.',
      vi: 'Dự án nghiên cứu tác tử AI đồng hành có trạng thái cảm xúc (Đang phát triển): Kết hợp mô hình tâm lý Scherer CPM và hàm suy giảm trí nhớ ACT-R, tận dụng các thiết bị ngoại vi phụ trợ để giảm tải chi phí tính toán ngoài GPU máy chủ.'
    },
    colors: ['#f2baea', '#602b7a'],
    image: '/images/project-emotional-ai.webp',
    role: {
      en: 'Lead AI Systems Engineer (In Development)',
      vi: 'Lead AI Systems Engineer (Đang phát triển)'
    },
    challenge: {
      en: 'Most conversational chatbots today are stateless systems that depend entirely on static prompts or cloud APIs. As a result, characters easily lose long-term personality consistency, their emotions shift without clear causes, and continuous inference is costly.',
      vi: 'Phần lớn các chatbot đàm thoại hiện nay là hệ thống không trạng thái (stateless), phụ thuộc hoàn toàn vào prompt tĩnh hoặc API đám mây. Điều này khiến nhân vật dễ rơi vào tình trạng mất tính nhất quán tính cách dài hạn, cảm xúc biến đổi không có nguyên nhân rõ ràng và tốn kém chi phí suy luận liên tục.'
    },
    outcome: {
      en: 'Researching and prototyping an AI agent architecture that can maintain a psychological state: integrating the Scherer Component Process Model (CPM) for quantifying emotion and the ACT-R forgetting curve. A network of auxiliary mobile devices (auxiliary edge devices) runs a compact language model (SLM Qwen2.5-1.5B INT4) to share the compute load off the main host GPU.',
      vi: 'Đang nghiên cứu và thử nghiệm kiến trúc tác tử AI có khả năng duy trì trạng thái tâm lý: Tích hợp mô hình lượng hóa cảm xúc Scherer Component Process Model (CPM) và đường cong lãng quên ACT-R. Tận dụng mạng lưới các thiết bị di động phụ trợ (auxiliary edge devices) để chạy mô hình ngôn ngữ nhỏ gọn (SLM Qwen2.5-1.5B INT4) nhằm san sẻ tải tính toán ngoài GPU máy chủ chính.'
    },
    githubUrl: 'https://github.com/zafkielzz/Emotional_AI',
    decisions: [
      [
        {
          en: 'Scherer CPM Emotion Modeling',
          vi: 'Mô hình hóa cảm xúc Scherer CPM'
        },
        {
          en: "Quantifies the character's emotional responses along 4 cognitive axes (Valence, Arousal, Control, Novelty) based on event context instead of static labels.",
          vi: 'Định lượng phản ứng cảm xúc của nhân vật theo 4 trục nhận thức (Valence, Arousal, Control, Novelty) dựa trên ngữ cảnh sự kiện thay vì gán nhãn tĩnh.'
        }
      ],
      [
        {
          en: 'ACT-R Memory & Decay Mechanism',
          vi: 'Cơ chế ghi nhớ & suy giảm trí nhớ ACT-R'
        },
        {
          en: 'Applies the ACT-R power-law decay equation m_i(t) = ln(sum t_k^-d) to realistically simulate how information is remembered and forgotten over time.',
          vi: 'Áp dụng phương trình suy giảm luỹ thừa ACT-R: m_i(t) = ln(sum t_k^-d) để mô phỏng chân thực quy luật ghi nhớ và lãng quên thông tin theo thời gian.'
        }
      ],
      [
        {
          en: 'Compute Distribution with Auxiliary Devices',
          vi: 'Phân phối tính toán với thiết bị phụ trợ'
        },
        {
          en: "Uses edge mobile devices running Qwen2.5-1.5B INT4 via llama.cpp to help share the inference load with the computer's GPU, reducing operating cost.",
          vi: 'Sử dụng các thiết bị di động biên chạy Qwen2.5-1.5B INT4 qua llama.cpp để hỗ trợ san sẻ tải suy luận cho GPU máy tính, tiết kiệm chi phí vận hành.'
        }
      ]
    ],
    detail: {
      timeline: [
        [
          { en: '01 / COGNITIVE FRAMEWORK DESIGN', vi: '01 / THIẾT KẾ KHUNG NHẬN THỨC' },
          {
            en: 'Built the mathematical framework for the 4 Scherer CPM emotion axes and a layered memory model.',
            vi: 'Xây dựng khung toán học cho 4 trục cảm xúc Scherer CPM và mô hình trí nhớ phân tầng.'
          }
        ],
        [
          {
            en: '02 / ASYNC COMMUNICATION & EDGE PROTOTYPING',
            vi: '02 / GIAO TIẾP BẤT ĐỒNG BỘ & PROTOTYPE TRÊN THIẾT BỊ BIÊN'
          },
          {
            en: 'Set up a WebSocket connection protocol between the orchestration server and the client app on the auxiliary devices.',
            vi: 'Thiết lập giao thức kết nối WebSocket giữa máy chủ điều phối và ứng dụng client trên thiết bị phụ trợ.'
          }
        ],
        [
          {
            en: '03 / SYSTEM INTEGRATION & PROFILING (IN PROGRESS)',
            vi: '03 / TÍCH HỢP HỆ THỐNG & PROFILING (ĐANG THỰC HIỆN)'
          },
          {
            en: "Currently tuning the long-run inference stability of the INT4 SLM and tracking the character's personality drift.",
            vi: 'Đang tinh chỉnh độ ổn định khi suy luận dài hạn của SLM INT4 và theo dõi mức độ trôi dạt tính cách của nhân vật.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'Cognitive Appraisal & Memory Decay Module',
          vi: 'Module đánh giá nhận thức & suy giảm trí nhớ'
        },
        {
          en: 'Host Orchestration Service (FastAPI)',
          vi: 'Dịch vụ điều phối trên máy chủ (FastAPI)'
        },
        {
          en: 'Auxiliary Edge Worker Client (Flutter / llama.cpp)',
          vi: 'Client worker trên thiết bị biên phụ trợ (Flutter / llama.cpp)'
        },
        {
          en: 'Character State & Emotion Inspector UI',
          vi: 'Giao diện theo dõi trạng thái & cảm xúc nhân vật'
        }
      ],
      reflection: {
        en: 'Convincing AI character simulation does not come from random lines of dialogue, but from building a psychological system with real causes: one where emotions and memories change according to clear, verifiable mathematical rules.',
        vi: 'Mô phỏng nhân vật AI thuyết phục không nằm ở những câu thoại ngẫu nhiên, mà ở việc xây dựng một hệ thống tâm lý có căn nguyên: nơi cảm xúc và ký ức biến đổi theo những quy luật toán học rõ ràng và có thể kiểm chứng.'
      }
    }
  },
  {
    slug: 'vietsign-edge-ai',
    name: {
      en: 'VietSign Edge AI: On-Device Traffic Sign Detection & Classification',
      vi: 'VietSign Edge AI: Phát hiện & phân loại biển báo giao thông trên thiết bị'
    },
    year: same('2026'),
    type: same('Computer Vision · Edge AI · Android TFLite'),
    description: {
      en: 'Detects and classifies 48 classes of Vietnamese traffic signs entirely on an Android device using a 2-stage YOLOv8n + MobileNetV3-Small pipeline; the classifier is compressed with knowledge distillation, pruning and INT8 QAT. The detector reaches 82.27% mAP@0.5 and the classifier 91.92% Top-1, with both models totaling just 5.07 MB.',
      vi: 'Nhận diện và phân loại 48 lớp biển báo giao thông Việt Nam hoàn toàn trên thiết bị Android bằng pipeline 2 giai đoạn YOLOv8n + MobileNetV3-Small; classifier được nén bằng knowledge distillation, pruning và INT8 QAT. Detector đạt 82,27% mAP@0.5, classifier đạt 91,92% Top-1, tổng hai model chỉ 5,07 MB.'
    },
    colors: ['#ffaa40', '#9b3010'],
    image: '/images/project-vietsign.webp',
    role: {
      en: 'Team Leader · Computer Vision & Edge AI Engineer',
      vi: 'Trưởng nhóm · Kỹ sư Computer Vision & Edge AI'
    },
    challenge: {
      en: 'Accurately detect and classify Vietnamese traffic signs directly on a phone, without Internet, under complex field conditions (camera shake, backlighting, small or occluded signs). Targets: detector mAP@0.5 ≥ 80%, classifier Top-1 ≥ 90%, total model size ≤ 5 MB and at least 15 FPS on device.',
      vi: 'Nhận diện và phân loại chính xác biển báo giao thông Việt Nam trực tiếp trên điện thoại, không cần Internet, trong điều kiện thực địa phức tạp (camera rung, ngược sáng, biển nhỏ hoặc bị che khuất). Mục tiêu đặt ra: detector mAP@0.5 ≥ 80%, classifier Top-1 ≥ 90%, tổng dung lượng model ≤ 5 MB và tối thiểu 15 FPS trên thiết bị.'
    },
    outcome: {
      en: 'Delivered a prototype running on a real Android device: YOLOv8n (TFLite INT8, 3.19 MB) localizes signs, MobileNetV3-Small (TFLite INT8, 1.88 MB) classifies 48 classes per QCVN 41:2019/BGTVT, and a ByteTrack-style tracker with a Kalman filter stabilizes boxes and labels. On the test set: the detector reaches 82.27% mAP@0.5 (92.61% recall), the FP32 classifier reaches 91.92% Top-1 / 99.80% Top-5, and the deployed INT8 version about 89.6%. Both models total 5.07 MB. Real-world speed on the test device is about 5–6 FPS, short of the 15 FPS target — clearly documented in the report as the next optimization direction.',
      vi: 'Hoàn thiện prototype chạy trên thiết bị Android thật: YOLOv8n (TFLite INT8, 3,19 MB) định vị biển báo, MobileNetV3-Small (TFLite INT8, 1,88 MB) phân loại 48 lớp theo QCVN 41:2019/BGTVT, tracker kiểu ByteTrack kết hợp Kalman filter ổn định box và nhãn. Trên tập test: detector đạt mAP@0.5 82,27% (recall 92,61%), classifier FP32 đạt Top-1 91,92% / Top-5 99,80%, bản INT8 deploy khoảng 89,6%. Tổng hai model 5,07 MB. Tốc độ thực tế trên thiết bị thử nghiệm khoảng 5–6 FPS, chưa đạt mục tiêu 15 FPS — được ghi nhận rõ trong báo cáo như hướng tối ưu tiếp theo.'
    },
    githubUrl: 'https://github.com/VietSign-Edge-AI/VietSign-Edge-AI',
    decisions: [
      [
        {
          en: 'Two-Stage Cascaded Detection',
          vi: 'Phát hiện phân tầng hai giai đoạn'
        },
        {
          en: 'Stage 1 uses an ultra-light YOLOv8n to detect traffic-sign ROIs; stage 2 crops each ROI (10% padding) and uses a 96×96 MobileNetV3-Small to classify it into 48 fine-grained sign classes.',
          vi: 'Giai đoạn 1 dùng YOLOv8n siêu nhẹ để phát hiện ROI biển báo; giai đoạn 2 crop ROI (padding 10%) và dùng MobileNetV3-Small 96×96 phân loại chi tiết 48 lớp biển báo.'
        }
      ],
      [
        same('Knowledge Distillation, Pruning & QAT'),
        {
          en: 'Distilled knowledge from a ResNet-50 teacher into a MobileNetV3-Small student, applied 3 rounds of L1 pruning (~50% sparsity), and switched from PTQ to Quantization-Aware Training when PTQ sharply reduced accuracy; exported PyTorch → ONNX → TFLite down to 1.88 MB.',
          vi: 'Chưng cất tri thức từ teacher ResNet-50 sang student MobileNetV3-Small, L1 pruning 3 vòng (~50% sparsity) và chuyển từ PTQ sang Quantization-Aware Training khi PTQ làm giảm mạnh accuracy; export PyTorch → ONNX → TFLite còn 1,88 MB.'
        }
      ],
      [
        {
          en: 'ByteTrack-style Tracking & Kalman Filter',
          vi: 'Tracking kiểu ByteTrack & Kalman filter'
        },
        {
          en: 'Keeps traffic-sign IDs across frames with a constant-velocity Kalman filter, reducing bounding-box jitter and label flicker between frames.',
          vi: 'Lưu vết ID biển báo qua chuỗi khung hình với Kalman filter vận tốc không đổi, giảm rung bounding box và hiện tượng nhảy nhãn giữa các frame.'
        }
      ],
      [
        {
          en: 'Honest Test/Deploy Metrics',
          vi: 'Báo cáo trung thực metric test/deploy'
        },
        {
          en: 'Validation reached ~98% mAP and >99% accuracy, but the team deliberately reported results on the test set and the deployed TFLite build (82.27% mAP@0.5; 91.92% Top-1) because they are closer to real-world conditions.',
          vi: 'Validation đạt ~98% mAP và >99% accuracy, nhưng nhóm chủ động báo cáo kết quả trên tập test và bản deploy TFLite (82,27% mAP@0.5; 91,92% Top-1) vì gần điều kiện thực tế hơn.'
        }
      ]
    ],
    detail: {
      timeline: [
        [
          { en: '01 / DATA & 48-CLASS MAPPING', vi: '01 / DỮ LIỆU & MAPPING 48 LỚP' },
          {
            en: 'Standardized 10,031 sign crops across 48 classes (70/15/15 split) and built a unified class-mapping file shared by the data, the models and the Android app.',
            vi: 'Chuẩn hóa 10.031 crop biển báo thuộc 48 lớp (chia 70/15/15), xây dựng file mapping lớp thống nhất giữa dữ liệu, model và ứng dụng Android.'
          }
        ],
        [
          { en: '02 / TRAINING & COMPRESSION', vi: '02 / HUẤN LUYỆN & NÉN MÔ HÌNH' },
          {
            en: 'Trained YOLOv8n and MobileNetV3-Small; distillation from ResNet-50, pruning to ~50% sparsity, INT8 QAT and TFLite export.',
            vi: 'Huấn luyện YOLOv8n và MobileNetV3-Small; distillation từ ResNet-50, pruning ~50% sparsity, QAT INT8 và export TFLite.'
          }
        ],
        [
          { en: '03 / ANDROID INTEGRATION & DEVICE TEST', vi: '03 / TÍCH HỢP ANDROID & KIỂM THỬ TRÊN THIẾT BỊ' },
          {
            en: 'Integrated both TFLite models into a Kotlin + CameraX app, handled preview coordinate mapping and the tracker, and tested on a real device.',
            vi: 'Tích hợp hai model TFLite vào ứng dụng Kotlin + CameraX, xử lý mapping tọa độ preview, tracker và kiểm thử trên thiết bị thật.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'TFLite INT8 Detector (3.19 MB) & Classifier (1.88 MB)',
          vi: 'Detector (3,19 MB) & Classifier (1,88 MB) TFLite INT8'
        },
        {
          en: 'Android Kotlin + CameraX Application Source Code',
          vi: 'Mã nguồn ứng dụng Android Kotlin + CameraX'
        },
        {
          en: 'Distillation, Pruning & QAT Training Pipeline',
          vi: 'Pipeline huấn luyện Distillation, Pruning & QAT'
        },
        {
          en: 'Project Report with Test/Deploy Benchmark',
          vi: 'Báo cáo dự án kèm benchmark test/deploy'
        }
      ],
      reflection: {
        en: 'The gap between validation (~98% mAP) and test/deploy (82.27%) was the biggest lesson: high internal metrics do not reflect the real experience once there is domain shift and class imbalance. Reporting honestly on test/deploy results makes the next improvements clear — more diverse Vietnamese data and on-device speed optimization.',
        vi: 'Khoảng cách giữa validation (~98% mAP) và test/deploy (82,27%) là bài học lớn nhất: metric nội bộ cao chưa phản ánh trải nghiệm thật khi có domain shift và mất cân bằng lớp. Báo cáo trung thực theo kết quả test/deploy giúp nhìn rõ hướng cải thiện tiếp theo — dữ liệu Việt Nam đa dạng hơn và tối ưu tốc độ trên thiết bị.'
      }
    }
  },
  {
    slug: 'luc-bat-poem-generator',
    name: {
      en: 'Lục Bát Poem Generator: Neural-Symbolic Constrained Generation for Vietnamese Poetry',
      vi: 'Lục Bát Poem Generator: Sinh thơ tiếng Việt có ràng buộc theo hướng Neural-Symbolic'
    },
    year: same('2026'),
    type: {
      en: 'Natural Language Processing · LLM · Constrained Decoding',
      vi: 'Xử lý ngôn ngữ tự nhiên · LLM · Constrained Decoding'
    },
    description: {
      en: 'Solo project generating Lục Bát Tết-greeting poems with a neural-symbolic approach: Qwen3-8B proposes content, a hand-written Logits Processor enforces the 6/8-syllable meter, tones and rhyme during generation, and a verifier + N-best reranker post-checks the output. The strictly valid poem rate rose from 0/12 (free-form Qwen3-8B) to 12/12 on a held-out prompt set.',
      vi: 'Dự án cá nhân sinh thơ Lục Bát chúc Tết theo hướng neural-symbolic: Qwen3-8B đề xuất nội dung, Logits Processor tự viết giữ luật 6/8 tiếng, thanh điệu và vần ngay lúc sinh, verifier + N-best reranker hậu kiểm. Tỷ lệ bài hợp lệ nghiêm ngặt tăng từ 0/12 (Qwen3-8B sinh tự do) lên 12/12 trên tập prompt held-out.'
    },
    colors: ['#cce67f', '#3c6b43'],
    image: '/images/project-luc-bat-poem-generator.webp',
    role: {
      en: 'Solo Project · NLP & LLM Engineer',
      vi: 'Dự án cá nhân · Kỹ sư NLP & LLM'
    },
    challenge: {
      en: 'Lục Bát poetry has very strict rules: alternating 6- and 8-syllable lines, Bằng/Trắc (level/oblique) tones at positions 2-4-6-8, and internal and end rhymes. LLMs are good at semantics but cannot count syllables: free-form Qwen3-8B produces 0/12 strictly valid poems, with a rhyme match score (RMA) of only 2.8%.',
      vi: 'Thơ Lục Bát có luật rất chặt: câu 6 – câu 8 tiếng luân phiên, Bằng/Trắc tại các vị trí 2-4-6-8, gieo vần lưng và vần chân. LLM giỏi ngữ nghĩa nhưng không đếm được âm tiết: Qwen3-8B sinh tự do chỉ đạt 0/12 bài hợp lệ nghiêm ngặt, điểm khớp vần (RMA) chỉ 2,8%.'
    },
    outcome: {
      en: 'Built a neural-symbolic pipeline: creative brief → 4-line plan → Qwen3-8B generates N candidates → LucBatLogitsProcessor (hard constraints: syllable count, line boundaries, valid syllables; soft constraints: tone, rhyme) → verifier + lexical guard + N-best reranker. On 12 held-out prompts, the pipeline produces 12/12 valid poems with SCR/TCR/RMA = 100/100/100, at an intervention cost of about 0.84 ms per generation step; 195 regression tests. A QLoRA pilot on 117 poems is kept as a fully documented negative result.',
      vi: 'Xây dựng pipeline neural-symbolic: creative brief → plan 4 dòng → Qwen3-8B sinh N ứng viên → LucBatLogitsProcessor (ràng buộc cứng: số tiếng, biên xuống dòng, âm tiết hợp lệ; ràng buộc mềm: thanh điệu, vần) → verifier + lexical guard + N-best reranker. Trên 12 prompt held-out, pipeline đạt 12/12 bài hợp lệ với SCR/TCR/RMA = 100/100/100, chi phí can thiệp khoảng 0,84 ms/bước sinh; 195 regression test. Pilot QLoRA trên 117 bài được giữ lại như một negative result có tài liệu đầy đủ.'
    },
    githubUrl: 'https://github.com/zafkielzz/Luc_Bat_Poem_Generator',
    decisions: [
      [
        {
          en: 'Deterministic → Code, Probabilistic → LLM',
          vi: 'Tất định → Code, Xác suất → LLM'
        },
        {
          en: 'Syllable counting, line breaking and blocking meaningless tokens (via a syllable trie) are left to code; the LLM only handles emotion, imagery and flow of ideas.',
          vi: 'Giao phần đếm âm tiết, ngắt dòng và chặn token vô nghĩa (trie âm tiết) cho code; LLM chỉ đảm nhiệm cảm xúc, hình ảnh và mạch ý.'
        }
      ],
      [
        {
          en: 'Hard vs Soft Constraints',
          vi: 'Ràng buộc cứng & ràng buộc mềm'
        },
        {
          en: 'Only syllable count, line boundaries and valid syllables are hard-enforced (−∞); tone and rhyme get soft penalties only (tone 1.5, rhyme 3.0) and slant rhymes are allowed, so the model is not forced into awkward word choices.',
          vi: 'Chỉ ép cứng (−∞) số tiếng, biên dòng và âm tiết hợp lệ; thanh điệu và vần chỉ bị phạt mềm (tone 1.5, rhyme 3.0) và cho phép vần thông, tránh ép mô hình chọn từ gượng gạo.'
        }
      ],
      [
        same('Verifier, Lexical Guard & N-best Reranker'),
        {
          en: 'Generates best-of-8, re-checks the rules after generation, blocks compound words used out of context and ranks the candidates; poems that fail are REJECTED instead of returning rule-breaking verse.',
          vi: 'Sinh best-of-8, kiểm luật lại sau khi sinh, chặn từ ghép sai ngữ cảnh và xếp hạng ứng viên; bài không đạt sẽ bị REJECT thay vì trả ra thơ sai luật.'
        }
      ],
      [
        {
          en: 'Baseline-First & Honest Evaluation',
          vi: 'Đo baseline trước & Đánh giá trung thực'
        },
        {
          en: 'Measured the un-fine-tuned Qwen3-8B baseline before investing in SFT; kept rule metrics (SCR/TCR/RMA) separate from poetic quality and designed a blind 5-criterion human evaluation rubric.',
          vi: 'Đo baseline Qwen3-8B chưa fine-tune trước khi đầu tư SFT; tách bạch metric luật (SCR/TCR/RMA) với chất lượng thơ và thiết kế rubric human evaluation blind 5 tiêu chí.'
        }
      ]
    ],
    detail: {
      timeline: [
        [
          { en: '01 / PHONETIC RULES & SYLLABLE ASSETS', vi: '01 / LUẬT NGỮ ÂM & TÀI NGUYÊN ÂM TIẾT' },
          {
            en: 'Built modules for Vietnamese tones, rhymes, slant rhymes and a syllable trie; plus the SCR/TCR/RMA evaluator.',
            vi: 'Xây dựng module thanh điệu, vần, vần thông và trie âm tiết tiếng Việt; bộ evaluator SCR/TCR/RMA.'
          }
        ],
        [
          { en: '02 / LOGITS ENGINE & RERANKER', vi: '02 / LOGITS ENGINE & RERANKER' },
          {
            en: 'Implemented LucBatLogitsProcessor with hard/soft constraints, the verifier, lexical guard and N-best reranker; ablated each component.',
            vi: 'Cài đặt LucBatLogitsProcessor với ràng buộc cứng/mềm, verifier, lexical guard và N-best reranker; ablation từng thành phần.'
          }
        ],
        [
          { en: '03 / QLORA PILOT & EVALUATION', vi: '03 / PILOT QLORA & ĐÁNH GIÁ' },
          {
            en: 'QLoRA pilot for 2 epochs on 117 poems (96 train / 21 dev); held-out evaluation on 12 prompts, documenting the limits on naturalness.',
            vi: 'Pilot QLoRA 2 epoch trên 117 bài (96 train / 21 dev); đánh giá held-out 12 prompt và ghi nhận giới hạn về độ tự nhiên.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'LucBatLogitsProcessor (Hard/Soft Constraint Engine)',
          vi: 'LucBatLogitsProcessor (Engine ràng buộc cứng/mềm)'
        },
        {
          en: 'Phonetics Library: Tone, Rhyme & Slant-Rhyme Checker',
          vi: 'Thư viện ngữ âm: Kiểm tra thanh điệu, vần & vần thông'
        },
        same('Verifier, Lexical Guard & N-best Reranker'),
        {
          en: '195 Regression Tests & Human Evaluation Rubric',
          vi: '195 regression test & Rubric human evaluation'
        }
      ],
      reflection: {
        en: 'Following the rules is not the same as being good. The pipeline controls form at 100%, but when forced to fit tone and rhyme, the model still sometimes picks awkward words. Clearly separating "follows the rules" from "good poetry" — and reporting the negative result too — is the most important lesson of this project.',
        vi: 'Đúng luật chưa phải là hay. Pipeline kiểm soát hình thức đạt 100%, nhưng khi bị ép theo thanh và vần, mô hình vẫn có lúc chọn từ gượng gạo. Phân biệt rõ ràng giữa "đúng luật" và "thơ hay" — và báo cáo cả negative result — là bài học quan trọng nhất của dự án.'
      }
    }
  },
  {
    slug: 'verba-ai-meeting',
    name: {
      en: 'Verba: AI-Powered Meeting Minutes & Speech-to-Text Platform',
      vi: 'Verba: Nền tảng biên bản họp & chuyển giọng nói thành văn bản bằng AI'
    },
    year: same('2026'),
    type: {
      en: 'Speech AI · Full-Stack Platform · LLM Summarization',
      vi: 'Speech AI · Nền tảng Full-Stack · Tóm tắt bằng LLM'
    },
    description: {
      en: 'A meeting transcription and summarization platform: users upload recordings (.mp3, .wav), the system converts speech to text with PhoWhisper/faster-whisper and summarizes it with the Gemini API into key points, decisions, tasks and deadlines.',
      vi: 'Nền tảng gỡ băng và tóm tắt cuộc họp: người dùng tải lên file ghi âm (.mp3, .wav), hệ thống chuyển giọng nói thành văn bản bằng PhoWhisper/faster-whisper và tóm tắt bằng Gemini API thành nội dung chính, quyết định, công việc và deadline.'
    },
    colors: ['#77b6ff', '#0f325e'],
    image: '/images/project-verba-ai-meeting.webp',
    role: {
      en: 'Full-Stack Engineer',
      vi: 'Kỹ sư Full-Stack'
    },
    challenge: {
      en: 'Taking meeting minutes by hand is time-consuming and easily misses important decisions, action items and deadlines — especially in long Vietnamese meetings with many speakers.',
      vi: 'Ghi chép biên bản họp thủ công tốn thời gian và dễ bỏ sót các quyết định, đầu việc và deadline quan trọng — đặc biệt với các cuộc họp tiếng Việt dài, nhiều người nói.'
    },
    outcome: {
      en: 'Delivered a web platform where users can register, upload meeting recordings (.mp3, .wav), track processing progress and view the transcript. Speech is converted to text with PhoWhisper/faster-whisper and stored in PostgreSQL; the Gemini API summarizes it into key points, decisions, tasks and deadlines. An audio player synchronized with the text allows editing and exporting the result to a .docx file, reducing manual note-taking and highlighting important content and deadlines.',
      vi: 'Hoàn thiện nền tảng web cho phép người dùng đăng ký tài khoản, tải lên file ghi âm cuộc họp (.mp3, .wav), theo dõi tiến trình xử lý và xem bản gỡ băng. Giọng nói được chuyển thành văn bản bằng PhoWhisper/faster-whisper và lưu trữ trong PostgreSQL; Gemini API tóm tắt thành nội dung chính, quyết định, công việc và deadline. Trình phát âm thanh đồng bộ với văn bản cho phép chỉnh sửa và xuất kết quả ra file .docx, giúp giảm việc ghi chép thủ công và làm nổi bật các nội dung, deadline quan trọng.'
    },
    githubUrl: 'https://github.com/Biggbros/Verba-AI-Meeting-Recognition',
    decisions: [
      [
        {
          en: 'PhoWhisper / faster-whisper Speech-to-Text',
          vi: 'Speech-to-Text với PhoWhisper / faster-whisper'
        },
        {
          en: 'Integrated PhoWhisper (optimized for Vietnamese) together with faster-whisper to transcribe meeting recordings, storing transcripts in PostgreSQL.',
          vi: 'Tích hợp PhoWhisper (tối ưu cho tiếng Việt) cùng faster-whisper để gỡ băng file ghi âm cuộc họp, lưu bản gỡ băng vào PostgreSQL.'
        }
      ],
      [
        {
          en: 'Structured Summarization with Gemini API',
          vi: 'Tóm tắt có cấu trúc với Gemini API'
        },
        {
          en: 'Summarizes the transcript with the Gemini API into structured sections: content summary, decisions, tasks and deadlines.',
          vi: 'Tóm tắt bản gỡ băng bằng Gemini API thành các phần có cấu trúc: tóm tắt nội dung, quyết định, công việc và deadline.'
        }
      ],
      [
        {
          en: 'Synchronized Audio Player, Editing & .docx Export',
          vi: 'Trình phát âm thanh đồng bộ, chỉnh sửa & xuất .docx'
        },
        {
          en: 'An audio player synchronized with the text lets users cross-check and edit the transcript and export the result to a .docx file.',
          vi: 'Trình phát âm thanh đồng bộ với văn bản giúp người dùng đối chiếu, chỉnh sửa bản gỡ băng và xuất kết quả ra file .docx.'
        }
      ]
    ],
    detail: {
      timeline: [
        [
          { en: '01 / UPLOAD & PROCESSING FLOW', vi: '01 / LUỒNG TẢI LÊN & XỬ LÝ' },
          {
            en: 'Built the account registration, recording upload (.mp3, .wav) and processing-progress flow with FastAPI.',
            vi: 'Xây dựng luồng đăng ký tài khoản, tải lên file ghi âm (.mp3, .wav) và theo dõi tiến trình xử lý với FastAPI.'
          }
        ],
        [
          { en: '02 / SPEECH-TO-TEXT & SUMMARIZATION', vi: '02 / SPEECH-TO-TEXT & TÓM TẮT' },
          {
            en: 'Integrated PhoWhisper/faster-whisper transcription, PostgreSQL storage and structured summarization with the Gemini API.',
            vi: 'Tích hợp PhoWhisper/faster-whisper gỡ băng, lưu trữ PostgreSQL và tóm tắt có cấu trúc bằng Gemini API.'
          }
        ],
        [
          { en: '03 / PLAYER, EDITING & EXPORT', vi: '03 / TRÌNH PHÁT, CHỈNH SỬA & XUẤT FILE' },
          {
            en: 'Finished the text-synchronized audio player, editing features and exporting minutes to .docx.',
            vi: 'Hoàn thiện trình phát âm thanh đồng bộ văn bản, chức năng chỉnh sửa và xuất biên bản ra .docx.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'FastAPI Backend & Audio Upload Pipeline',
          vi: 'Backend FastAPI & Pipeline tải lên âm thanh'
        },
        {
          en: 'PhoWhisper / faster-whisper Transcription Module',
          vi: 'Module gỡ băng PhoWhisper / faster-whisper'
        },
        {
          en: 'Gemini API Meeting Summarization Module',
          vi: 'Module tóm tắt cuộc họp bằng Gemini API'
        },
        {
          en: 'Synchronized Audio Player & .docx Export',
          vi: 'Trình phát âm thanh đồng bộ & Xuất .docx'
        }
      ],
      reflection: {
        en: 'The value of a meeting-minutes tool lies not only in transcription accuracy, but in turning the raw transcript into decisions, action items and deadlines that users can review, edit and share right away.',
        vi: 'Giá trị của một công cụ biên bản họp không chỉ nằm ở độ chính xác gỡ băng, mà ở việc biến bản gỡ băng thô thành các quyết định, đầu việc và deadline mà người dùng có thể kiểm tra, chỉnh sửa và chia sẻ ngay.'
      }
    }
  },
  {
    slug: 'jobmatching-scc',
    name: {
      en: 'Smart Job Matching Platform — SCC',
      vi: 'Nền tảng khớp nối việc làm thông minh — SCC'
    },
    year: same('2025'),
    type: {
      en: 'Applied AI · Semantic Search · Vector Database',
      vi: 'AI ứng dụng · Tìm kiếm ngữ nghĩa · Vector Database'
    },
    description: {
      en: 'A platform that matches candidates with job postings in 2 stages: semantic search with pgvector on PostgreSQL, then skill-gap analysis with an LLM.',
      vi: 'Dự án nền tảng khớp nối ứng viên và tin tuyển dụng qua 2 giai đoạn: Tìm kiếm ngữ nghĩa bằng pgvector trên PostgreSQL và phân tích khoảng cách kỹ năng bằng LLM.'
    },
    colors: ['#9ee6b8', '#1c4a2a'],
    image: '/images/project-jobmatching-scc.webp',
    role: {
      en: 'AI & Backend Engineer',
      vi: 'Kỹ sư AI & Backend'
    },
    challenge: {
      en: 'Matching candidate resumes (CVs) with job descriptions (JDs) usually relies on plain keywords, missing equivalent experience or indirectly related skills; meanwhile, candidates struggle to know exactly which skills they still lack for the position they want.',
      vi: 'Khớp nối hồ sơ ứng viên (CV) và bản mô tả công việc (JD) thường dựa trên từ khóa đơn thuần, bỏ lỡ ngữ cảnh kinh nghiệm tương đương hoặc kỹ năng liên quan gián tiếp; đồng thời ứng viên gặp khó khăn trong việc biết rõ mình còn thiếu kỹ năng gì để đáp ứng vị trí mong muốn.'
    },
    outcome: {
      en: 'Built a 2-stage matching system: Stage 1 performs semantic search with pgvector (HNSW indexing) on PostgreSQL using Gemini Embeddings; Stage 2 analyzes the skill gap and gives tailored suggestions with the DeepSeek LLM.',
      vi: 'Xây dựng hệ thống khớp nối 2 giai đoạn: Giai đoạn 1 tìm kiếm ngữ nghĩa với pgvector (HNSW Indexing) trên PostgreSQL sử dụng Gemini Embeddings; Giai đoạn 2 phân tích khoảng cách kỹ năng (skill-gap) và đưa ra gợi ý phù hợp bằng DeepSeek LLM.'
    },
    githubUrl: 'https://github.com/nghiadt13/EXE101-JobMatching-SCC',
    decisions: [
      [
        {
          en: 'Two-Stage Hybrid Search',
          vi: 'Tìm kiếm lai hai giai đoạn'
        },
        {
          en: "Quickly filters the top candidates with pgvector cosine similarity, then uses an LLM to assess real competence and project experience.",
          vi: 'Lọc nhanh top ứng viên bằng pgvector cosine similarity, sau đó dùng LLM để đánh giá năng lực thực chất và kinh nghiệm dự án.'
        }
      ],
      [
        {
          en: 'Automated Resume Parsing',
          vi: 'Bóc tách CV tự động'
        },
        {
          en: 'Automatically parses CV formats (PDF, DOCX) into structured JSON covering education, skills, experience and certifications.',
          vi: 'Bóc tách tự động các định dạng CV (PDF, DOCX) thành cấu trúc dữ liệu JSON bao gồm học vấn, kỹ năng, kinh nghiệm và chứng chỉ.'
        }
      ],
      [
        {
          en: 'Skill-Gap Advisory',
          vi: 'Tư vấn khoảng cách kỹ năng'
        },
        {
          en: 'Automatically analyzes and recommends a skill-building roadmap for candidates based on the requirements they are missing relative to the job description.',
          vi: 'Tự động phân tích và đưa ra đề xuất lộ trình bổ sung kỹ năng cho ứng viên dựa trên các yêu cầu còn thiếu so với mô tả công việc.'
        }
      ],
      [
        {
          en: 'Robust Enterprise Architecture',
          vi: 'Kiến trúc doanh nghiệp vững chắc'
        },
        {
          en: 'NestJS backend following Clean Architecture principles, a PostgreSQL database extended with pgvector, with integrated security and role-based access control.',
          vi: 'Backend NestJS theo nguyên lý Clean Architecture, cơ sở dữ liệu PostgreSQL mở rộng với pgvector, tích hợp bảo mật và phân quyền vai trò.'
        }
      ]
    ],
    detail: {
      timeline: [
        [
          { en: '01 / DATA SCHEMA & CV PARSING', vi: '01 / DATA SCHEMA & BÓC TÁCH CV' },
          {
            en: 'Defined an industry skill taxonomy and built a pipeline that automatically parses CVs into a JSON Schema.',
            vi: 'Định nghĩa taxonomy kỹ năng ngành nghề và xây dựng pipeline bóc tách CV tự động về JSON Schema.'
          }
        ],
        [
          { en: '02 / VECTOR SEARCH & HYBRID ROUTING', vi: '02 / VECTOR SEARCH & ĐỊNH TUYẾN LAI' },
          {
            en: 'Integrated pgvector into PostgreSQL, configured the HNSW index and connected the Gemini Embedding API.',
            vi: 'Tích hợp pgvector vào PostgreSQL, cấu hình chỉ mục HNSW và kết nối Gemini Embedding API.'
          }
        ],
        [
          { en: '03 / DEEPSEEK RE-RANKING & PRODUCTION', vi: '03 / RE-RANKING VỚI DEEPSEEK & TRIỂN KHAI' },
          {
            en: 'Deployed the DeepSeek skill-gap analysis module and completed the NestJS API system.',
            vi: 'Triển khai module phân tích khoảng cách kỹ năng bằng DeepSeek và hoàn thiện hệ thống NestJS API.'
          }
        ]
      ],
      artifacts: [
        {
          en: 'NestJS Enterprise Backend API',
          vi: 'Backend API NestJS cho doanh nghiệp'
        },
        {
          en: 'pgvector Semantic Search Schema & Migration Scripts',
          vi: 'Schema tìm kiếm ngữ nghĩa pgvector & Migration scripts'
        },
        {
          en: 'Automated CV Parsing & Skill Extraction Module',
          vi: 'Module bóc tách CV & trích xuất kỹ năng tự động'
        },
        {
          en: 'DeepSeek Skill-Gap Analysis Engine',
          vi: 'Engine phân tích khoảng cách kỹ năng DeepSeek'
        }
      ],
      reflection: {
        en: 'Combining vector search for fast, broad screening with a language model for detailed analysis lets the system respond quickly while also giving candidates concrete suggestions for improving their skills.',
        vi: 'Sự kết hợp giữa tìm kiếm vector để sàng lọc nhanh diện rộng và mô hình ngôn ngữ để phân tích chi tiết giúp hệ thống vừa phản hồi nhanh chóng, vừa đưa ra những gợi ý cải thiện kỹ năng cụ thể cho ứng viên.'
      }
    }
  }
];
