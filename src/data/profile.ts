import type { Localized } from '../i18n';

export interface ContactItem {
  slug: string;
  title: Localized;
  detail: Localized;
  href: string;
  /** Grouping key is `group.en`. */
  group: Localized;
  order: number;
}

const DIRECT_CONTACT: Localized = { en: 'DIRECT CONTACT', vi: 'LIÊN HỆ TRỰC TIẾP' };
const WORK_AND_CODE: Localized = { en: 'WORK & CODE', vi: 'CÔNG VIỆC & MÃ NGUỒN' };
const SOCIAL_CHANNELS: Localized = { en: 'SOCIAL CHANNELS', vi: 'MẠNG XÃ HỘI' };

export const CONTACTS: ContactItem[] = [
  {
    slug: "email",
    title: { en: "PRIMARY EMAIL", vi: "EMAIL CHÍNH" },
    detail: { en: "dphuongthuy7@gmail.com", vi: "dphuongthuy7@gmail.com" },
    href: "mailto:dphuongthuy7@gmail.com",
    group: DIRECT_CONTACT,
    order: 1
  },
  {
    slug: "fpt-mail",
    title: { en: "SECONDARY EMAIL", vi: "EMAIL PHỤ" },
    detail: { en: "dphuongnam2k5@gmail.com", vi: "dphuongnam2k5@gmail.com" },
    href: "mailto:dphuongnam2k5@gmail.com",
    group: DIRECT_CONTACT,
    order: 2
  },
  {
    slug: "resume-cv",
    title: { en: "CURRICULUM VITAE (CV)", vi: "SƠ YẾU LÝ LỊCH (CV)" },
    detail: { en: "Download PDF Resume (2026)", vi: "Tải CV bản PDF (2026)" },
    href: "/cv.pdf",
    group: DIRECT_CONTACT,
    order: 3
  },
  {
    slug: "github",
    title: { en: "GITHUB PROFILE", vi: "HỒ SƠ GITHUB" },
    detail: { en: "github.com/zafkielzz", vi: "github.com/zafkielzz" },
    href: "https://github.com/zafkielzz",
    group: WORK_AND_CODE,
    order: 4
  },
  {
    slug: "linkedin",
    title: { en: "LINKEDIN", vi: "LINKEDIN" },
    detail: { en: "Phương Nam Đặng on LinkedIn", vi: "Phương Nam Đặng trên LinkedIn" },
    href: "https://www.linkedin.com/in/phuongnam-dang/",
    group: SOCIAL_CHANNELS,
    order: 5
  },
  {
    slug: "scholar",
    title: { en: "RESEARCH & PUBLICATION", vi: "NGHIÊN CỨU & CÔNG BỐ" },
    detail: { en: "IEEE IS'26 Conference Paper", vi: "Bài báo hội nghị IEEE IS'26" },
    href: "/work/conflict-aware-rag-routing",
    group: WORK_AND_CODE,
    order: 6
  },
  {
    slug: "facebook",
    title: { en: "FACEBOOK", vi: "FACEBOOK" },
    detail: { en: "Đặng Phương Nam", vi: "Đặng Phương Nam" },
    href: "https://www.facebook.com/koutarou.araki.942",
    group: SOCIAL_CHANNELS,
    order: 7
  }
];

export const SITE_METADATA = {
  name: "ĐẶNG PHƯƠNG NAM",
  title: "Đặng Phương Nam — AI Engineer & Researcher | FPT University",
  eyebrow: "ĐẶNG PHƯƠNG NAM · FPT UNIVERSITY ",
  description: {
    en: "Portfolio & Research Archive of Đặng Phương Nam — final-year Artificial Intelligence (AI) student at FPT University. First Author of a scientific publication at IEEE IS'26.",
    vi: "Portfolio & Research Archive của Đặng Phương Nam — Sinh viên năm cuối ngành Trí tuệ Nhân tạo (AI) tại Đại học FPT. Tác giả chính (First Author) công bố khoa học tại IEEE IS'26."
  } as Localized,
  tagline: {
    en: "Deep Learning, Intelligent Systems & Scientific Publication.",
    vi: "Deep Learning, Hệ thống thông minh & Công bố khoa học."
  } as Localized,
  bio: {
    en: "Hello, I’m Đặng Phương Nam — a final-year Artificial Intelligence student at FPT University. My research focuses on multimodal deep learning, adaptive RAG routing, and on-device Edge AI. First Author of accepted & presented paper at IEEE IS'26: The 13th IEEE International Conference on Intelligent Systems.",
    vi: "Xin chào, tôi là Đặng Phương Nam — sinh viên năm cuối chuyên ngành Trí tuệ Nhân tạo tại Đại học FPT. Nghiên cứu của tôi tập trung vào Deep Learning đa phương thức, định tuyến RAG thích ứng và Edge AI tối ưu phần cứng. Tác giả chính của công trình nghiên cứu khoa học được chấp thuận và trình bày tại hội nghị quốc tế IEEE IS'26."
  } as Localized,
  status: {
    en: "OPEN FOR AI ENGINEER & RESEARCH ROLES",
    vi: "SẴN SÀNG CHO VỊ TRÍ AI ENGINEER & NGHIÊN CỨU"
  } as Localized,
  timezone: {
    en: "BANGKOK / HANOI / GMT+7",
    vi: "BANGKOK / HÀ NỘI / GMT+7"
  } as Localized,
  location: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam" } as Localized,
  university: { en: "FPT University", vi: "Đại học FPT" } as Localized,
  degree: {
    en: "Bachelor of Science in Artificial Intelligence (Expected Dec 2026)",
    vi: "Cử nhân Trí tuệ Nhân tạo (dự kiến tốt nghiệp 12/2026)"
  } as Localized,
  cvUrl: "/cv.pdf"
};
