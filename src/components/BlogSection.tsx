import React, { useState } from 'react';
import { Plus, Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { getLocalizedBlogPosts } from '../data/mockData';
import { BlogPost, Language } from '../types';

interface BlogSectionProps {
  language: Language;
  onBackToMarketing: () => void;
}

const BLOG_COPY = {
  en: {
    backToBlog: 'Back to Stories & Blog',
    backToHome: 'Back to Rev Platform',
    heading: 'Customer Stories & SEO Blog',
    subheading: 'How consultants, agencies, and founders put Rev to work.',
    publishNew: 'Publish New Article',
    modalTitle: 'Publish New SEO Article',
    titleLabel: 'Article Title',
    titlePlaceholder: 'e.g. How We Automated Lead Qualification...',
    categoryLabel: 'Category',
    categories: ['Customer Story', 'RevOps', 'Agency Growth', 'AI Engineering'],
    excerptLabel: 'Excerpt / Summary',
    excerptPlaceholder: 'Short summary for SEO cards...',
    contentLabel: 'Full Content',
    contentPlaceholder: 'Write article content here...',
    cancelBtn: 'Cancel',
    publishBtn: 'Publish Article',
    byPrefix: 'By',
    defaultAuthor: 'Rev Admin',
    defaultDate: 'Today',
    defaultReadTime: '5 min read',
    defaultKeywords: ['Rev AI', 'Automation'],
    extraParagraph:
      'In modern competitive markets, manual response lag kills deal momentum. By deploying autonomous Rev AI employees that work directly inside shared customer records, organizations achieve sub-minute response times without adding headcount.',
  },
  fa: {
    backToBlog: 'بازگشت به داستان‌ها و وبلاگ',
    backToHome: 'بازگشت به صفحه اصلی',
    heading: 'داستان مشتریان و وبلاگ تخصصی',
    subheading: 'چگونه مشاوران، آژانس‌ها و بنیان‌گذاران از رِو برای رشد کسب‌وکار خود استفاده می‌کنند.',
    publishNew: 'انتشار مقاله جدید',
    modalTitle: 'انتشار مقاله جدید',
    titleLabel: 'عنوان مقاله',
    titlePlaceholder: 'مثلاً: چگونه ارزیابی سرنخ‌ها را خودکار کردیم...',
    categoryLabel: 'دسته‌بندی',
    categories: ['داستان مشتری', 'عملیات درآمد', 'رشد آژانس', 'مهندسی هوش مصنوعی'],
    excerptLabel: 'خلاصه مقاله',
    excerptPlaceholder: 'خلاصه کوتاه برای نمایش در کارت مقاله...',
    contentLabel: 'متن کامل مقاله',
    contentPlaceholder: 'متن مقاله را اینجا بنویسید...',
    cancelBtn: 'انصراف',
    publishBtn: 'انتشار مقاله',
    byPrefix: 'نویسنده:',
    defaultAuthor: 'تحریریه رِو',
    defaultDate: 'امروز',
    defaultReadTime: '۵ دقیقه مطالعه',
    defaultKeywords: ['هوش مصنوعی رِو', 'اتوماسیون'],
    extraParagraph:
      'در بازارهای رقابتی امروز، تاخیر در پاسخ‌گویی دستی شتاب معاملات را از بین می‌برد. با استقرار کارمندان هوش مصنوعی خودکار رِو که مستقیماً روی سوابق مشترک مشتریان کار می‌کنند، سازمان‌ها بدون افزایش نیروی انسانی به زمان پاسخ زیر یک دقیقه دست می‌یابند.',
  },
  id: {
    backToBlog: 'Kembali ke Cerita & Blog',
    backToHome: 'Kembali ke Rev Platform',
    heading: 'Cerita Pelanggan & Blog SEO',
    subheading: 'Bagaimana konsultan, agensi, dan pendiri menggunakan Rev.',
    publishNew: 'Terbitkan Artikel Baru',
    modalTitle: 'Terbitkan Artikel SEO Baru',
    titleLabel: 'Judul Artikel',
    titlePlaceholder: 'mis. Cara Kami Mengotomatiskan Kualifikasi Prospek...',
    categoryLabel: 'Kategori',
    categories: ['Cerita Pelanggan', 'RevOps', 'Pertumbuhan Agensi', 'Rekayasa AI'],
    excerptLabel: 'Ringkasan',
    excerptPlaceholder: 'Ringkasan singkat untuk kartu artikel...',
    contentLabel: 'Konten Lengkap',
    contentPlaceholder: 'Tulis konten artikel di sini...',
    cancelBtn: 'Batal',
    publishBtn: 'Terbitkan Artikel',
    byPrefix: 'Oleh',
    defaultAuthor: 'Admin Rev',
    defaultDate: 'Hari ini',
    defaultReadTime: '5 mnt baca',
    defaultKeywords: ['Rev AI', 'Otomatisasi'],
    extraParagraph:
      'Di pasar modern yang kompetitif, keterlambatan respons manual menghambat momentum kesepakatan. Dengan karyawan AI otonom Rev, organisasi mencapai waktu respons di bawah satu menit tanpa menambah staf.',
  },
};

export const BlogSection: React.FC<BlogSectionProps> = ({ language, onBackToMarketing }) => {
  const copy = BLOG_COPY[language];
  const [customPosts, setCustomPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');

  const posts = [...customPosts, ...getLocalizedBlogPosts(language)];
  const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null;
  const backIconClass = language === 'fa' ? 'w-4 h-4 rotate-180' : 'w-4 h-4';

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const chosenCategory = newCategory || copy.categories[0];
    const post: BlogPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      category: chosenCategory,
      excerpt: newExcerpt || newContent.slice(0, 120) + '...',
      author: copy.defaultAuthor,
      date: copy.defaultDate,
      readTime: copy.defaultReadTime,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      seoKeywords: [chosenCategory, ...copy.defaultKeywords],
      content: newContent,
    };

    setCustomPosts((prev) => [post, ...prev]);
    setIsCreating(false);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white text-slate-900 py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <button
            onClick={() => setSelectedPostId(null)}
            className="flex items-center gap-2 text-xs text-[#3ab0a2] hover:text-[#329c90] font-bold"
          >
            <ArrowLeft className={backIconClass} /> {copy.backToBlog}
          </button>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="px-2.5 py-1 rounded-md bg-[#f4e3b5] text-slate-900 font-bold">
                {selectedPost.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {selectedPost.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <span>
                {copy.byPrefix} {selectedPost.author}
              </span>
            </div>
          </div>

          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-80 object-cover rounded-2xl border border-slate-200 shadow-sm"
          />

          <div className="prose max-w-none text-slate-700 text-base leading-relaxed space-y-6">
            <p>{selectedPost.content}</p>
            <p>{copy.extraParagraph}</p>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-2">
            {selectedPost.seoKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full flex items-center gap-1 font-semibold"
              >
                <Tag className="w-3 h-3 text-[#3ab0a2]" /> {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <button
              onClick={onBackToMarketing}
              className="flex items-center gap-2 text-xs text-[#3ab0a2] hover:text-[#329c90] font-bold mb-2"
            >
              <ArrowLeft className={backIconClass} /> {copy.backToHome}
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900">{copy.heading}</h1>
            <p className="text-xs sm:text-sm text-slate-600">{copy.subheading}</p>
          </div>

          <button
            onClick={() => {
              setNewCategory(copy.categories[0]);
              setIsCreating(true);
            }}
            className="px-4 py-2.5 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#3ab0a2]/25"
          >
            <Plus className="w-4 h-4" /> {copy.publishNew}
          </button>
        </div>

        {/* Create Post Modal */}
        {isCreating && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900">{copy.modalTitle}</h3>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 font-semibold">{copy.titleLabel}</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={copy.titlePlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 font-semibold">{copy.categoryLabel}</label>
                  <select
                    value={newCategory || copy.categories[0]}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none cursor-pointer"
                  >
                    {copy.categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 font-semibold">{copy.excerptLabel}</label>
                  <textarea
                    rows={2}
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    placeholder={copy.excerptPlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 font-semibold">{copy.contentLabel}</label>
                  <textarea
                    rows={5}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={copy.contentPlaceholder}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    {copy.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    {copy.publishBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden cursor-pointer hover:border-[#3ab0a2] transition-all flex flex-col justify-between group"
            >
              <div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6 space-y-3">
                  <span className="text-[10px] text-slate-900 font-bold bg-[#f4e3b5] px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3ab0a2] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 mt-4">
                <span>
                  {copy.byPrefix} {post.author}
                </span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
