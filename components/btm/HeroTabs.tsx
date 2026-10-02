"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, Check, Cloud, Network, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

// Homepage hero side card: a small topic switcher (idea from lidernetwork.com.tr,
// reworked for BTM). Rotates every few seconds until the visitor picks a tab;
// no rotation for prefers-reduced-motion. Content is plain service facts.

type Topic = { id: string; tab: string; icon: LucideIcon; title: string; text: string; points: string[]; href: string; cta: string };

const TOPICS: Topic[] = [
  {
    id: "neden",
    tab: "Neden BTM",
    icon: Sparkles,
    title: "Neden BTM Bilişim?",
    text: "Bilişim altyapınızı tek ekiple planlıyor, kuruyor ve ayakta tutuyoruz.",
    points: [
      "Sızma testi deneyimiyle güvenlik odaklı kurulum",
      "Ağ, sunucu, bulut ve yedekleme tek ekipte",
      "Gebze merkezli, Kocaeli ve İstanbul'da yerinde servis",
      "Kurulum sonrası bakım, izleme ve hızlı müdahale",
    ],
    href: "/hakkimizda/",
    cta: "Bizi tanıyın",
  },
  {
    id: "guvenlik",
    tab: "Siber Güvenlik",
    icon: ShieldCheck,
    title: "Siber güvenlik ve sızma testi",
    text: "Açıkları saldırganlardan önce bulup kapatıyor, sistemlerinizi sürekli izliyoruz.",
    points: ["Dış ağ, iç ağ ve web uygulama sızma testleri", "Firewall, EDR ve DLP kurulumu", "SIEM ve log yönetimi"],
    href: "/siber-guvenlik/",
    cta: "Siber güvenlik çözümleri",
  },
  {
    id: "altyapi",
    tab: "Altyapı",
    icon: Network,
    title: "Sistem ve network altyapısı",
    text: "Ağınızı ve sunucularınızı büyümeye uygun, güvenli ve kesintisiz kuruyoruz.",
    points: ["Kablolama, switch ve kurumsal Wi-Fi", "Sunucu, sanallaştırma ve veri merkezi", "IT bakım ve destek anlaşmaları"],
    href: "/sistem-network/",
    cta: "Altyapı çözümleri",
  },
  {
    id: "bulut",
    tab: "Bulut & Yedek",
    icon: Cloud,
    title: "Bulut, yedekleme ve iş sürekliliği",
    text: "Verinizi test edilmiş yedeklerle koruyor, kesinti anında hızla geri dönmenizi sağlıyoruz.",
    points: ["Microsoft 365, Azure ve AWS", "3-2-1 yedekleme ve felaket kurtarma", "Veri kurtarma hizmetleri"],
    href: "/bulut-yedekleme/",
    cta: "Bulut ve yedekleme",
  },
  {
    id: "urunler",
    tab: "Yazılımlar",
    icon: Boxes,
    title: "Kurumsal yazılım ürünlerimiz",
    text: "Bütçeden IT envanterine, otonom pentestten Wi-Fi yönetimine kendi geliştirdiğimiz ürünler.",
    points: ["Atlas · bütçe ve raporlama", "PentForce · otonom AI pentest", "Orbit · IT operasyon ve envanter"],
    href: "/yazilim-urunlerimiz/",
    cta: "Tüm ürünler",
  },
];

const ROTATE_MS = 6500;

export function HeroTabs() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (pinned || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % TOPICS.length), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [pinned]);

  const t = TOPICS[active];

  return (
    <div
      className="rounded-2xl bg-white p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] md:p-7"
      onMouseEnter={() => setPinned(true)}
      onFocusCapture={() => setPinned(true)}
    >
      <div role="tablist" aria-label="Hizmet alanları" className="flex flex-wrap gap-1.5">
        {TOPICS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            id={`hero-tab-${x.id}`}
            aria-selected={i === active}
            aria-controls="hero-tab-panel"
            onClick={() => {
              setActive(i);
              setPinned(true);
            }}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              i === active ? "bg-navy-800 text-white" : "bg-paper-100 text-slate-600 hover:text-navy-800"
            }`}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div id="hero-tab-panel" role="tabpanel" aria-labelledby={`hero-tab-${t.id}`} className="mt-5 min-h-[17rem]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600">
            <t.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="font-display text-xl font-bold text-navy-800">{t.title}</h2>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{t.text}</p>
        <ul className="mt-4 space-y-2.5">
          {t.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[15px] text-ink-900">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 flex gap-1.5" aria-hidden="true">
        {TOPICS.map((x, i) => (
          <span key={x.id} className={`h-1 flex-1 rounded-full transition-colors ${i === active ? "bg-gold-500" : "bg-paper-100"}`} />
        ))}
      </div>

      <Link
        href={t.href}
        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
      >
        {t.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
