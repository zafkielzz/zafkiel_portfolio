Emotional AI (đang trong quá trình phát triển). : https://github.com/zafkielzz/Emotional_AI	
Luc Bat Poem Generator : https://github.com/zafkielzz/Luc_Bat_Poem_Generator
VietSign-Edge-AI : https://github.com/VietSign-Edge-AI/VietSign-Edge-AI	
Verba-AI-Meeting-Recognition: https://github.com/Biggbros/Verba-AI-Meeting-Recognition	
JobMatching-SCC : https://github.com/nghiadt13/EXE101-JobMatching-SCC	
Công bố khoa học : Conflict-Aware RAG Routing: Balancing Cost and Accuracy via Context Contradiction : https://github.com/RAG-Routing-Via-Context-Confliction/RAG_Router_Via_Context_Conflict . (đã được accept tại hội nghị IEEE IS’26 : The 13th IEEE International Conference on Intelligent Systems và đã trình bày. Đang trong quá trình xuất bản, sẽ bổ sung mã DOI hoặc link sau. Hiện tại thì thêm nút bấm Download Paper để xem báo, tôi sẽ bổ sung file pdf sau)
Đồ án : A Multi-Task Transformer for Stock Trend Prediction from Multi-Source Financial Data with Automatic Rationalization
Mô hình học sâu đa nhiệm dự báo xu hướng cổ phiếu từ dữ liệu tài chính đa nguồn và tự động sinh giải trình . 
Chi tiết đồ án : 
Dưới đây là bản tóm tắt đề tài cô đọng (chuẩn dung lượng ~2 trang văn bản), tập trung làm nổi bật bối cảnh - khoảng trống, giải pháp & kiến trúc kỹ thuật đề xuất, cùng phương pháp luận thực nghiệm:
TÓM TẮT ĐỀ TÀI NGHIÊN CỨU
Tên đề tài: Nghiên cứu và hiện thực kiến trúc Decoder-Only Transformer đa nhiệm xử lý dữ liệu lai (Chuỗi thời gian giá – Báo cáo tài chính – ESG) cho dự đoán xu hướng cổ phiếu và tự động sinh giải trình.
(A Multi-Task Decoder-Only Transformer for Hybrid Time-Series, Financial-Text, and ESG Data in Stock Trend Prediction and Self-Rationalization)
1. ĐẶT VẤN ĐỀ & ĐỊNH VỊ ĐỀ TÀI
Bối cảnh: Dự báo thị trường chứng khoán đòi hỏi tổng hòa đồng thời từ 3 nguồn dữ liệu đa phương thức không đồng nhất: chuỗi thời gian giá (OHLCV), văn bản tài chính (MD&A, Earnings Calls) và chỉ số bền vững (ESG). Hiện tại, các hệ thống thường xử lý tách rời (ARIMA/LSTM cho giá, NLP cho text, ESG rời rạc), dẫn đến việc bỏ lỡ tương quan chéo (cross-modal interactions) và thiếu cơ chế tự giải trình minh bạch.
Khoảng trống nghiên cứu (Research Gaps):
G1: Thiếu kiến trúc hợp nhất đồng thời cả 3 modality (Time-series, Text, ESG) trong một mạng Transformer duy nhất.
G2: Thiếu cơ chế toán học kiểm soát tính nhất quán (consistency) giữa nhãn xu hướng (Up/Down) và nội dung văn bản giải trình lý do đầu tư.
G3: Các giải pháp dùng Cloud LLM API (như GPT-4) không khả thi cho triển khai thực tế on-premise tại các quỹ tài chính do chi phí quá lớn, độ trễ cao (2–15s) và rủi ro rò rỉ dữ liệu nội bộ.
Định vị cốt lõi: Không hướng tới đánh bại thị trường bằng việc tối ưu hóa lợi nhuận tuyệt đối. Đề tài tập trung giải quyết bài toán kỹ thuật: Hợp nhất đa phương thức (Multimodal Fusion) + Tự sinh giải trình (Self-Rationalization) + Triển khai On-premise chi phí/độ trễ thấp trên dòng SLM (Small Language Model).
2. GIẢI PHÁP & KIẾN TRÚC ĐỀ XUẤT
Kiến trúc được xây dựng theo mô hình Shared Decoder-Only SLM (sử dụng Qwen2.5-0.5B làm mô hình trọng tâm, Llama-3.2-1B làm đối chứng) xử lý luồng tuần tự từ biểu diễn dữ liệu lai đến hai nhánh tác vụ đầu ra chuyên biệt.
[Time Series Patches] ──> Linear + Temporal Pos. Emb ──┐
[Financial Text]       ──> Tokenizer + Segment Emb     ──┼──> [Unified Sequence H_0] ──> [Shared Decoder-Only SLM] ──> h_[DECISION]
[ESG Tabular + Text]   ──> Cont. Emb + Column Emb      ──┤                                                                  │
[Special Token]        ──> [DECISION]                 ──┘                                                                  ├──> Prediction Head (MLP) ──> Trend (Up/Down)
                                                                                                                           │
                                                                                                                           └──> Explanation Head (LM) ──> Text Rationalization
                                                                                                                                           ▲
                                                                  └──────────────── Ràng buộc qua Consistency Loss (NLI) ──────────┘

2.1. Tầng mã hóa dữ liệu lai (Hybrid Input Layer)
Biểu diễn đầu vào hợp nhất thành chuỗi token liên tục:
$$\mathcal{H}_0 = [T_{ts} \;;\; E_{text} \;;\; E_{esg} \;;\; \text{[DECISION]}]$$
Time-Series Encoding (Bảo toàn tính liên tục đa biến): Chuỗi OHLCV được phân đoạn theo các patch độ dài cố định ($W = 30$ ngày). Mỗi patch đa biến $X_{patch} \in \mathbb{R}^{W \times 5}$ được trải phẳng và chiếu tuyến tính thành embedding $T_{ts} \in \mathbb{R}^{N \times d}$, sau đó cộng Temporal Positional Embedding (kế thừa từ PatchTST) để giữ nguyên cấu trúc nhịp điệu và trật tự thời gian.
Financial Text Encoding: Báo cáo MD&A và Earnings Calls được tokenize và cộng thêm Segment Embedding đặc trưng cho phân đoạn văn bản, giúp mô hình phân định rõ không gian ngôn ngữ với chuỗi thời gian, tạo điều kiện cho các Attention Head học tương quan chéo giữa biến động giá và thông điệp của lãnh đạo.
ESG Encoding (Continuous Feature Embedding): Tránh rời rạc hóa (binning) gây mất tính thứ bậc của điểm số. Điểm $E, S, G$ được chiếu qua hàm tuyến tính từ giá trị liên tục và cộng gộp với vector embedding của tên cột: $E_{esg}^{(i)} = E_{column}^{(i)} + f_{linear}(value_{esg}^{(i)})$. Văn bản thuyết minh ESG được tokenizer mã hóa nối tiếp ngay sau.
Token đặc biệt [DECISION]: Nằm ở cuối chuỗi, đóng vai trò tổng hợp ngữ cảnh đa phương thức; trạng thái ẩn $h_{\text{[DECISION]}}$ được chia sẻ trực tiếp cho cả 2 nhánh tác vụ ở đầu ra.
2.2. Nhánh đầu ra đa tác vụ (Multi-Task Output Heads)
Đề tài phân định rạch ròi: Multi-Head Attention là cơ chế nội tại chuẩn mực của từng layer Transformer, còn Multi-Task Output Heads là đóng góp kiến trúc ở tầng cuối cùng:
Prediction Head: Mạng MLP 2 lớp nhận $h_{\text{[DECISION]}}$ để phân loại xu hướng giá sau 5 ngày (Up/Down) kèm độ tin cậy; tối ưu bằng hàm mất mát Binary Cross-Entropy ($\mathcal{L}_{task}$).
Explanation Head: Tận dụng năng lực autoregressive của backbone để sinh văn bản giải trình lý do tài chính dựa trên $h_{\text{[DECISION]}}$ và prompt prefix; tối ưu bằng Causal LM Loss ($\mathcal{L}_{LM}$).
2.3. Cơ chế ràng buộc nhất quán (Consistency Loss)
Đóng góp phương pháp luận quan trọng nhằm giải quyết mâu thuẫn giữa định lượng và định tính:
$$\mathcal{L}_{total} = \alpha \mathcal{L}_{LM} + \beta \mathcal{L}_{task} + \gamma \mathcal{L}_{consistency}$$
Sử dụng một mô hình NLI nhỏ gọn (DeBERTa-MNLI) để đánh giá mức độ tương thích giữa nhãn dự đoán và văn bản sinh ra (ví dụ: dự đoán "Up" nhưng lý giải thể hiện "suy thoái doanh thu" sẽ bị phạt nặng gradient).
2.4. Tại sao chọn kiến trúc Decoder-Only?
Thống nhất 1 Backbone cho cả 2 nhiệm vụ: Vừa lấy hidden state tại [DECISION] cho tác vụ phân loại, vừa sinh giải trình autoregressive mượt mà mà không cần ghép nối thêm bộ giải mã cồng kềnh như họ Encoder-only.
Kế thừa Foundation Model mạnh: Tận dụng được các trọng số tiền huấn luyện tối ưu nhất hiện nay (Qwen2.5, Llama-3.2) với chi phí huấn luyện lại thấp (áp dụng QLoRA 4-bit).
Triển khai gọn nhẹ: Cấu trúc đơn giản, giảm thiểu độ trễ, phù hợp tài nguyên tính toán giới hạn.
3. THIẾT KẾ THỰC NGHIỆM & ĐÁNH GIÁ
Tập dữ liệu & Kỹ thuật tiền xử lý:
Dữ liệu từ 20–30 doanh nghiệp vốn hóa lớn trong 5–10 năm: Giá OHLCV (Yahoo Finance/Alpha Vantage), văn bản MD&A/Earnings Calls (SEC EDGAR) và chỉ số ESG (Sustainalytics/MSCI).
Trích xuất feature qua 3 giai đoạn (từ 20 feature cốt lõi đến 40 feature đầy đủ); lọc đa cộng tuyến bằng ma trận tương quan ($\vert{}r\vert{} > 0.9$) và VIF ($> 10$).
Kiểm soát bẫy dữ liệu tài chính: Chia tập train/test theo trục thời gian (Time-series split) để chống Overfitting; chỉ dùng thông tin đã công bố tại thời điểm $t$ để loại bỏ hoàn toàn Look-ahead bias; bổ sung công ty hủy niêm yết để hạn chế Survivorship bias.
Hệ thống Baseline: So sánh toàn diện với mô hình chuỗi thời gian cổ điển (ARIMA/GARCH), học sâu chuỗi thời gian (LSTM/TCN, PatchTST), Machine Learning bảng số (XGBoost), Pipeline ghép nối rời (FinBERT + XGBoost) và LLM thương mại (GPT-4 Few-shot API).
Tiêu chí đánh giá đa chiều:
Dự đoán xu hướng: AUC-ROC, PR-AUC, MCC; kiểm thử Backtesting phân tách theo 3 chế độ thị trường (Uptrend, Downtrend, Sideways) nhằm chứng minh tính ổn định (robustness).
Chất lượng giải trình: ROUGE-1/L, BLEU-4, Faithfulness (điểm NLI entailment), Agreement (% logic thống nhất giữa nhãn và lý giải).
Hiệu năng vận hành on-premise: Độ trễ suy luận mục tiêu $< 200\text{ ms}$, bộ nhớ $< 8\text{GB VRAM}$ (chạy tốt trên 1 GPU thương mại như RTX 4060), chi phí vận hành $\approx \$0$ và đảm bảo an toàn dữ liệu 100% nội bộ.
Ablation Study: Đánh giá định lượng mức độ đóng góp khi lần lượt loại bỏ: Time-series, Financial Text, ESG, Consistency Loss, và khi chuyển mô hình về cấu hình đơn nhiệm (Single-Task).
4. ĐÓNG GÓP & TÍNH KHẢ THI ỨNG DỤNG
Khoa học: Tiên phong đề xuất kiến trúc Decoder-Only đa nhiệm xử lý đồng thời 3 modality không đồng nhất và đưa ra hàm mất mát Consistency Loss đảm bảo tính tin cậy của mô hình.
Ứng dụng thực tiễn: Bàn giao bộ sản phẩm khép kín gồm: Model SLM 0.5B tối ưu (ONNX/Safetensors), Backend dịch vụ FastAPI on-premise, và Web Dashboard tương tác (Streamlit) hỗ trợ chuyên viên phân tích tài chính ra quyết định nhanh chóng, bảo mật và minh bạch.


