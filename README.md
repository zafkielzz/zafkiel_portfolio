# Midnight Barista — AI Portfolio Archive

Một giao diện Portfolio phong cách **Editorial Minimalist & Atmospheric Studio**, được dựng lại nguyên vẹn từ thiết kế gốc [Midnight Barista](https://midnightbarista-work.vercel.app/) và tối ưu riêng cho sinh viên ngành **Trí tuệ Nhân tạo (AI)** chuẩn bị ra trường.

---

## ✦ Các tính năng đặc sắc đã hoàn thiện 100%

1. **Boot Sequence Cinematic Loader**:
   - Màn hình khởi động chuẩn điện ảnh với thanh tiến trình tải archive (`PREPARING THE ARCHIVE · 000%`) và tên tác giả.
   - Tự động ghi nhớ phiên duyệt web qua `sessionStorage` để không lặp lại gây phiền cho người xem.

2. **Atmosphere Switcher (DAWN / DAY / NIGHT)**:
   - Chuyển đổi trạng thái ánh sáng không gian phòng làm việc (Sáng sớm - Ban ngày - Đêm muộn).
   - Tự động thay đổi quầng sáng theo tọa độ chuột (`--light-x`, `--light-y`).

3. **Floating Dock Navigation**:
   - Thanh điều hướng nổi bo góc trong suốt (glassmorphism) ở đáy màn hình.
   - Các nút truy cập: Home `〽`, `INDEX`, `BLOG`, `PROJECTS`, `PHOTOS`, `PARTNERS`, `CONTACT ↗`.

4. **Lofi Ambience Player (Web Audio API)**:
   - Nút nhạc nốt `♫` trên Dock.
   - Tổng hợp âm thanh Lofi arpeggio ấm áp trực tiếp bằng Web Audio API với bộ lọc Lowpass ấm cúng (không phụ thuộc file mp3 ngoài, không lo chết link).

5. **Command Palette (`CMD` / `Ctrl+K` / `Cmd+K`)**:
   - Hộp lệnh tìm kiếm nhanh toàn bộ bài viết, dự án, trang và hashtag.
   - Hỗ trợ đầy đủ phím điều hướng: `↑` / `↓` để chọn, `Enter` để mở, `Esc` để đóng.

6. **Ambient Cursor & Scroll Progress**:
   - Quầng hào quang phát sáng nhẹ bám theo con trỏ chuột.
   - Thanh tiến trình đọc / cuộn trang mượt mà trên đỉnh màn hình.

7. **AI Writing & Research Pulse**:
   - Bảng thống kê số lượng bài viết, chủ đề nghiên cứu, thời gian đọc.
   - Biểu đồ ô vuông hoạt động (Contribution Heatmap phong cách GitHub) với các mức độ level-1 đến level-4.

8. **Shelf / Filterable Notes Index**:
   - Ô tìm kiếm ghi chép trực tiếp.
   - Bộ lọc theo tags (`#ai`, `#art`, `#creative coding`, `#deep learning`, `#agent`, `#motion`,...).
   - Hiệu ứng giải mã chữ ký tự ngẫu nhiên (Scramble Matrix text effect) khi tiêu đề xuất hiện.

9. **Case Studies & Projects Showcase (`/work` & `/work/:slug`)**:
   - Trang chi tiết từng đồ án với Monogram ấn tượng, bối cảnh bài toán, giải pháp, các quyết định kiến trúc (`Core Decisions`), lộ trình phát triển và bài học đúc kết.
   - Có sẵn các dự án mẫu về AI: Multi-Agent Swarm, Predictive Financial AI, Generative System,...

10. **Visual Journal & Lightbox (`/photos`)**:
    - Thư viện hình ảnh không gian làm việc và giao diện HUD game studies.
    - Click vào ảnh để mở popup phóng to (Lightbox modal) mượt mà.

11. **Personal Library (`/library`)**:
    - Không gian lưu trữ bài viết yêu thích cá nhân với tính năng Export/Import JSON trực tiếp trên trình duyệt.

12. **Technical Status Footer**:
    - Đồng hồ thời gian thực (Local Time GMT+7).
    - Đo đạc tự động kích thước Viewport màn hình (`Width × Height`).
    - Trình duyệt đang truy cập, trạng thái kết nối Online, và bộ đếm lượt truy cập (`Page Visits`).

---

## ✦ Cấu trúc thư mục

```
Portfolio/
├── public/
│   ├── favicon.svg
│   ├── style.css
│   └── images/                # Toàn bộ hình ảnh gốc chất lượng cao
├── src/
│   ├── components/
│   │   ├── AmbientEffects.tsx # Con trỏ phát sáng, thanh tiến trình cuộn, nút Top
│   │   ├── BootSequence.tsx   # Loader mở màn
│   │   ├── CommandPalette.tsx # Hộp lệnh tìm kiếm Cmd+K
│   │   ├── Dock.tsx           # Thanh dock nổi
│   │   ├── FooterPanel.tsx    # Bảng thông số kỹ thuật chân trang
│   │   ├── LofiPlayer.tsx     # Bộ phát âm thanh Lofi Web Audio
│   │   ├── PhotoLightbox.tsx  # Trình xem ảnh phóng to
│   │   └── ScrambleText.tsx   # Hiệu ứng chữ giải mã ma trận
│   ├── data/
│   │   └── siteData.ts        # NƠI BẠN CHỈNH SỬA THÔNG TIN CÁ NHÂN & DỰ ÁN
│   ├── pages/
│   │   ├── HomePage.tsx       # Trang chủ với Hero, Pulse, Shelf, Collections
│   │   ├── ProjectsPage.tsx   # Danh sách dự án (/work)
│   │   ├── ProjectDetailPage.tsx # Chi tiết Case Study (/work/:slug)
│   │   ├── PhotosPage.tsx     # Thư viện ảnh (/photos)
│   │   ├── PartnersPage.tsx   # Hợp tác & nguyên tắc làm việc (/partners)
│   │   ├── LibraryPage.tsx    # Kệ sách bài viết cá nhân (/library)
│   │   ├── ContactPage.tsx    # Thông tin liên hệ & form gửi tin nhắn (/contact)
│   │   └── PostDetailPage.tsx # Đọc bài viết chuyên sâu có Zen/Focus mode (/posts/:slug)
│   ├── styles/
│   │   └── midnight.css       # Toàn bộ CSS gốc của Midnight Barista
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## ✦ Hướng dẫn sử dụng

### 1. Chạy ở môi trường phát triển (Dev)
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:5173](http://localhost:5173)

### 2. Tùy chỉnh thông tin của bạn
Mở file [src/data/siteData.ts](file:///home/zafkiel/Workspace/Portfolio/src/data/siteData.ts):
* **`SITE_METADATA`**: Thay đổi tên bạn, giới thiệu bản thân (tiếng Anh & tiếng Việt), trạng thái tuyển dụng.
* **`PROJECTS`**: Thêm/sửa các đồ án tốt nghiệp, đề tài AI của bạn.
* **`POSTS`**: Viết thêm các bài ghi chép, paper review hoặc chia sẻ kỹ thuật.
* **`CONTACTS`**: Cập nhật email cá nhân, link GitHub, LinkedIn, Kaggle, Hugging Face.

### 3. Đóng gói triển khai (Build & Deploy)
```bash
npm run build
```
Thư mục `dist/` tạo ra là trang web tĩnh hoàn chỉnh. Bạn có thể deploy miễn phí lên **Vercel**, **Cloudflare Pages**, **Netlify** hoặc **GitHub Pages** chỉ trong vài phút.
