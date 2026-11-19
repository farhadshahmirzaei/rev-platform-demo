import React, { useState } from 'react';
import { CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { getLocalizedPlans } from '../data/mockData';
import { Language } from '../types';

interface BillingDashboardProps {
  language: Language;
  onBackToMarketing: () => void;
}

const BILLING_COPY = {
  en: {
    backToHome: 'Back to Rev Platform',
    vaultBadge: '256-Bit Encrypted Payment Vault',
    heading: 'Secure Billing & Subscriptions',
    subheading: 'Manage your organization subscription, payment methods, and billing history.',
    activeLabel: 'Active Subscription',
    defaultPlan: 'Rev Pro Workspace ($399/mo)',
    nextBilling: 'Next billing date: December 18, 2026 · Unlimited AI Agents & Team Members',
    statusActive: 'Active',
    availablePlans: 'Available Plans',
    selectPlanBtn: 'Upgrade / Select Plan',
    checkoutTitle: 'Secure Checkout',
    cardholderLabel: 'Cardholder Name',
    cardNumberLabel: 'Card Number',
    expiryLabel: 'Expiry (MM/YY)',
    cvcLabel: 'CVC / CVV',
    cancelBtn: 'Cancel',
    payBtn: 'Pay & Confirm',
    defaultCardName: 'Farhad Shah',
    paymentSuccessToast: (plan: string) =>
      `Secure payment processed successfully! Plan upgraded to ${plan}.`,
  },
  fa: {
    backToHome: 'بازگشت به صفحه اصلی',
    vaultBadge: 'خزانه پرداخت رمزنگاری‌شده ۲۵۶ بیتی',
    heading: 'صورتحساب امن و اشتراک‌ها',
    subheading: 'مدیریت اشتراک سازمان، روش‌های پرداخت و سوابق صورتحساب شما.',
    activeLabel: 'اشتراک فعال',
    defaultPlan: 'فضای کاری حرفه‌ای رِو (۳۹۹ دلار/ماه)',
    nextBilling: 'تاریخ تمدید بعدی: ۲۷ آذر ۱۴۰۵ · کارمندان هوش مصنوعی و اعضای تیم نامحدود',
    statusActive: 'فعال',
    availablePlans: 'طرح‌های موجود',
    selectPlanBtn: 'ارتقا / انتخاب طرح',
    checkoutTitle: 'پرداخت امن',
    cardholderLabel: 'نام دارنده کارت',
    cardNumberLabel: 'شماره کارت',
    expiryLabel: 'تاریخ انقضا (ماه/سال)',
    cvcLabel: 'کد امنیتی کارت',
    cancelBtn: 'انصراف',
    payBtn: 'پرداخت و تایید',
    defaultCardName: 'فرهاد شاه',
    paymentSuccessToast: (plan: string) =>
      `پرداخت امن با موفقیت انجام شد! اشتراک شما به «${plan}» ارتقا یافت.`,
  },
  id: {
    backToHome: 'Kembali ke Rev Platform',
    vaultBadge: 'Brankas Pembayaran Terenkripsi 256-Bit',
    heading: 'Tagihan Aman & Langganan',
    subheading: 'Kelola langganan organisasi, metode pembayaran, dan riwayat tagihan Anda.',
    activeLabel: 'Langganan Aktif',
    defaultPlan: 'Rev Pro Workspace ($399/bln)',
    nextBilling: 'Tanggal tagihan berikutnya: 18 Desember 2026 · Agen AI & Tim Tak Terbatas',
    statusActive: 'Aktif',
    availablePlans: 'Paket Tersedia',
    selectPlanBtn: 'Tingkatkan / Pilih Paket',
    checkoutTitle: 'Pembayaran Aman',
    cardholderLabel: 'Nama Pemegang Kartu',
    cardNumberLabel: 'Nomor Kartu',
    expiryLabel: 'Kedaluwarsa (BB/TT)',
    cvcLabel: 'CVC / CVV',
    cancelBtn: 'Batal',
    payBtn: 'Bayar & Konfirmasi',
    defaultCardName: 'Farhad Shah',
    paymentSuccessToast: (plan: string) =>
      `Pembayaran aman berhasil diproses! Paket ditingkatkan ke ${plan}.`,
  },
};

export const BillingDashboard: React.FC<BillingDashboardProps> = ({
  language,
  onBackToMarketing,
}) => {
  const copy = BILLING_COPY[language];
  const plans = getLocalizedPlans(language);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('platform');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [pendingPlanId, setPendingPlanId] = useState<string>('platform');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardName, setCardName] = useState(copy.defaultCardName);
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const activePlanObj = plans.find((p) => p.id === selectedPlanId) ?? plans[1];
  const pendingPlanObj = plans.find((p) => p.id === pendingPlanId) ?? plans[1];
  const currentPlanLabel = `${activePlanObj.name} (${activePlanObj.price}${activePlanObj.period})`;
  const pendingPlanLabel = `${pendingPlanObj.name} (${pendingPlanObj.price}${pendingPlanObj.period})`;
  const backIconClass = language === 'fa' ? 'w-4 h-4 rotate-180' : 'w-4 h-4';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedPlanId(pendingPlanId);
    setIsCheckoutOpen(false);
    showToast(copy.paymentSuccessToast(pendingPlanLabel));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 py-12 px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 end-6 z-50 bg-[#3ab0a2] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#3ab0a2]/50">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBackToMarketing}
            className="flex items-center gap-2 text-xs text-[#3ab0a2] hover:text-[#329c90] font-bold"
          >
            <ArrowLeft className={backIconClass} /> {copy.backToHome}
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-700 bg-[#f4e3b5] px-3 py-1 rounded-full font-bold">
            <ShieldCheck className="w-4 h-4 text-[#3ab0a2]" /> {copy.vaultBadge}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">{copy.heading}</h1>
          <p className="text-xs sm:text-sm text-slate-600">{copy.subheading}</p>
        </div>

        {/* Current Subscription Card */}
        <div className="bg-white border border-slate-200 shadow-xs rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase text-[#3ab0a2] font-bold">{copy.activeLabel}</span>
            <h3 className="text-xl font-bold text-slate-900">{currentPlanLabel}</h3>
            <p className="text-xs text-slate-500">{copy.nextBilling}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {copy.statusActive}
            </span>
          </div>
        </div>

        {/* Plans Selection */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">{copy.availablePlans}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border border-slate-200 shadow-xs rounded-2xl p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900">{plan.name}</h4>
                  <div className="text-2xl font-bold text-[#3ab0a2]">
                    {plan.price}{' '}
                    <span className="text-xs text-slate-500 font-normal">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{plan.description}</p>
                </div>
                <button
                  onClick={() => {
                    setPendingPlanId(plan.id);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-2.5 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  {copy.selectPlanBtn}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Secure Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#3ab0a2]" /> {copy.checkoutTitle}
                </h3>
                <span className="text-xs text-slate-900 font-bold bg-[#f4e3b5] px-2.5 py-1 rounded">
                  {pendingPlanLabel}
                </span>
              </div>

              <form onSubmit={handleSimulatedPayment} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 font-semibold">
                    {copy.cardholderLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#3ab0a2]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 font-semibold">
                    {copy.cardNumberLabel}
                  </label>
                  <input
                    type="text"
                    required
                    dir="ltr"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 outline-none focus:border-[#3ab0a2]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-700 font-semibold">
                      {copy.expiryLabel}
                    </label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 outline-none focus:border-[#3ab0a2]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-700 font-semibold">{copy.cvcLabel}</label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 outline-none focus:border-[#3ab0a2]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    {copy.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#3ab0a2] hover:bg-[#329c90] text-white rounded-xl text-xs font-bold shadow-lg shadow-[#3ab0a2]/25 flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" /> {copy.payBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
