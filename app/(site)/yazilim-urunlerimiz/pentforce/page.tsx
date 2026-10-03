import type { Metadata } from "next";
import { ogMeta } from "@/lib/siteView";
import {
  Activity,
  Bomb,
  Boxes,
  Brain,
  Building2,
  Cloud,
  Cpu,
  Fingerprint,
  Globe,
  Layers,
  Lock,
  Microscope,
  Monitor,
  Network,
  Package,
  Radio,
  RefreshCw,
  ShieldAlert,
  Target,
} from "lucide-react";
import { Container } from "@/components/ensa/Container";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { MotionStagger, MotionStaggerItem } from "@/components/ensa/MotionStagger";
import { ParallaxGlobe } from "@/components/ensa/ParallaxGlobe";
import { CountUp } from "@/components/ensa/CountUp";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { FaqSection } from "@/components/ensa/FaqSection";
import { DemoRequest } from "@/components/ensa/DemoRequest";
import { ProductCard } from "@/components/ensa/ProductCard";
import { ProductJsonLd } from "@/components/ensa/ProductJsonLd";
import { getProductBySlug, products } from "@/lib/products";

const product = getProductBySlug("pentforce")!;
const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

export const metadata: Metadata = {
  title: `${product.name} — ${product.tagline}`,
  description: product.metaDescription,
  alternates: { canonical: `/yazilim-urunlerimiz/${product.slug}/` },
  ...ogMeta({ title: `${product.name} — ${product.tagline.replace(/\.$/, "")}`, description: product.metaDescription, path: `/yazilim-urunlerimiz/${product.slug}/` }),
};

const stats = [
  { value: 38, suffix: "", label: "fazlı pentest metodolojisi" },
  { value: 130, suffix: "+", label: "tümleşik güvenlik aracı" },
  { value: 8, suffix: "", label: "test kategorisi" },
];

const heroTags = [
  "Go",
  "React",
  "Özel Local AI",
  "Nmap",
  "Masscan",
  "MQTT",
  "Modbus",
  "WAF Evasion",
  "CSPM",
  "Active Directory",
  "DAST",
  "Air-Gapped",
];

const pillars = [
  {
    icon: Brain,
    title: "Keşiften rapora otonom karar",
    description:
      "Özel Local AI, 38 fazlı metodolojiyi kendi başına yürütür: doğru aracı seçer, çıktıyı analiz eder, zafiyeti doğrular ve bir sonraki adıma karar verir.",
  },
  {
    icon: Lock,
    title: "İnternete kapalı ağlarda çalışır",
    description:
      "Tüm testler yerel ağda döner; API anahtarı gerektirmez, veri dışarı çıkmaz. Askeri tesis, banka ve fabrika gibi air-gapped ortamlar için tasarlandı.",
  },
  {
    icon: Target,
    title: "Kritik altyapıyı koruyan scoping",
    description:
      "Safe / Normal / Aggressive seviyeleriyle test agresifliğini yönetin. SCADA/ICS fazlarında otomatik güvenli mod devreye girerek sistem çökertme riskini engeller.",
  },
];

const capabilities = [
  {
    icon: Globe,
    title: "Web Uygulama Testi",
    description:
      "22 fazlı web pentest metodolojisi: SQLi, XSS, SSRF, IDOR, API, GraphQL, RCE, auth bypass ve daha fazlası.",
  },
  {
    icon: Network,
    title: "Network Altyapı Testi",
    description:
      "Switch/VLAN güvenliği, SNMP enumerasyonu, DHCP saldırıları, firewall ACL bypass ve 802.1X testleri.",
  },
  {
    icon: Radio,
    title: "IoT & OT Güvenlik Testi",
    description:
      "MQTT broker taraması, Modbus/SCADA protokol testi, CoAP/BACnet keşfi ve default credential analizi.",
  },
  {
    icon: Brain,
    title: "AI Tabanlı Otonom",
    description:
      "Özel Local AI ile akıllı karar verme; keşiften exploitasyona ve raporlamaya kadar tüm süreç otonom.",
  },
  {
    icon: Monitor,
    title: "Web UI Dashboard",
    description:
      "Canlı WebSocket telemetri, tarama yönetimi, bulgu takibi, PDF rapor oluşturma ve logo yükleme.",
  },
  {
    icon: Lock,
    title: "Tam Lokal Çalışma",
    description:
      "Özel Local AI ile internet gerektirmez. Tüm taramalar yerel ağda; API anahtarı gerekmez, kendi modelinizi kullanın.",
  },
  {
    icon: Bomb,
    title: "Otomatik Exploit Motoru",
    description:
      "Metasploit entegrasyonuyla bulunan zafiyetleri otomatik sömürür: EternalBlue, Log4Shell, SSH brute, Tomcat deploy, SNMP crack.",
  },
  {
    icon: Microscope,
    title: "Kaynak Kod Analizi (SAST)",
    description:
      "Semgrep, Gitleaks ve TruffleHog ile statik kod taraması. Python, Java, Go, JS/TS, C#, Ruby ve PHP desteği; hardcoded secret tespiti.",
  },
  {
    icon: Package,
    title: "Air-Gapped Desteği",
    description:
      "İnternete kapalı ortamlar için offline bundle sistemi. Nuclei template, Semgrep rule ve Exploit-DB önbelleğe alınır, USB ile taşınır.",
  },
  {
    icon: ShieldAlert,
    title: "WAF/IPS/IDS Evasion",
    description:
      "Cloudflare, Imperva ve F5 ASM gibi WAF'ları aşmak için proxy/Tor rotasyonu, User-Agent spoofing, akıllı gecikme ve stealth proxy zinciri.",
  },
  {
    icon: Cloud,
    title: "Bulut Güvenliği (CSPM)",
    description:
      "AWS/Azure/GCP güvenlik denetimi. ScoutSuite, Prowler ve CloudSplaining ile IAM, S3, K8s posture analizi ve RBAC audit.",
  },
  {
    icon: Fingerprint,
    title: "Payload Evasion (FUD)",
    description:
      "EDR/AV atlatma için fileless/in-memory payload, çok katmanlı şifreleme, AMSI/ETW bypass ve custom loader (Go/C/C#/Nim/Rust).",
  },
  {
    icon: Activity,
    title: "DAST & IAST Dinamik Test",
    description:
      "OWASP ZAP entegrasyonu, HTTP fuzzing (SQLi/XSS/Path Traversal/Command Injection/SSRF), API güvenlik testi ve form fuzzing.",
  },
  {
    icon: Building2,
    title: "Active Directory & Post-Exploit",
    description:
      "AD enumerasyon, BloodHound attack path, Kerberos testi, LDAP dump ve post-exploit: hashdump, lateral movement, persistence.",
  },
  {
    icon: Target,
    title: "Akıllı Scoping",
    description:
      "Safe/Normal/Aggressive seviye yönetimi. SCADA/ICS fazlarında otomatik safe mode ile kritik altyapı koruması.",
  },
];

const playbooks = [
  {
    name: "EternalBlue",
    description:
      "MS17-010 exploit ile Windows SMB üzerinden SYSTEM seviyesinde erişim; paylaşımlı klasörler ve admin yetkisi.",
  },
  {
    name: "Log4Shell",
    description:
      "CVE-2021-44228 RCE. HTTP header'ları üzerinden Log4j kullanan Java uygulamalarına sızma.",
  },
  {
    name: "Tomcat Deploy",
    description:
      "Tomcat Manager authenticated WAR deployment. JSP shell yükleme ve komut çalıştırma.",
  },
  {
    name: "SSH Brute Force",
    description:
      "SSH brute force ile zayıf kullanıcı/şifre tespiti; ortak kullanıcı adı ve parola listeleri.",
  },
  {
    name: "SNMP Crack",
    description:
      "SNMP community string brute force. Ağ cihazlarında default SNMP credential tespiti.",
  },
  {
    name: "Özel Exploit Desteği",
    description:
      "msf_exploit ile herhangi bir Metasploit modülünü çağırın, msf_payload ile özel reverse shell üretin.",
  },
];

const airGappedSteps = [
  {
    step: "01",
    title: "İnternetteyken önbelleğe al",
    description:
      "cache_templates ile Nuclei, Semgrep ve Exploit-DB'yi indirin; offline_bundle ile USB paketi oluşturun.",
  },
  {
    step: "02",
    title: "Air-gapped ortama taşı",
    description:
      "USB/DVD ile kapalı ağa aktarın; update_templates source=bundle.tar.gz ile geri yükleyin.",
  },
  {
    step: "03",
    title: "Tamamen lokal çalış",
    description:
      "Özel Local AI ve önbelleklenmiş template'lerle internet gerekmez; API anahtarı olmadan sınırsız tarama.",
  },
];

const phaseGroups = [
  {
    label: "Web Uygulama Fazları (1–22)",
    icon: Globe,
    phases: [
      "Deep Reconnaissance",
      "Manual Vulnerability Discovery",
      "Directory & File Discovery",
      "CORS & Cookie Analysis",
      "Authentication & Session Testing",
      "Injection Testing",
      "SSRF Testing",
      "IDOR & Broken Access Control",
      "API & GraphQL Testing",
      "File Upload Testing",
      "Deserialization & RCE",
      "Race Conditions & Business Logic",
      "Subdomain Takeover",
      "Open Redirect Testing",
      "Email Security Testing",
      "Cloud & Infrastructure",
      "WebSocket Testing",
      "CMS-Specific Testing",
      "Broken Link Hijacking",
      "Exploit Verification",
      "Novel Vulnerability Discovery",
      "Final Report",
    ],
  },
  {
    label: "Network Altyapı Fazları (23–28)",
    icon: Network,
    phases: [
      "Network Discovery & Host Enumeration",
      "Switch & VLAN Security Testing",
      "SNMP Enumeration & Security Testing",
      "Firewall & Router Configuration Review",
      "DHCP & DNS Security Testing",
      "Wireless & 802.1X Security Testing",
    ],
  },
  {
    label: "IoT & OT Güvenlik Fazları (29–33)",
    icon: Radio,
    phases: [
      "IoT Device Discovery & Fingerprinting",
      "MQTT & Message Queue Testing",
      "Modbus & SCADA Protocol Testing",
      "CoAP, BACnet & OT Protocol Testing",
      "IoT Firmware & Default Credential Analysis",
    ],
  },
  {
    label: "İleri Seviye & Ön Hazırlık Fazları (0, 34–37)",
    icon: ShieldAlert,
    phases: [
      "Evasion & Stealth Configuration (Faz 0)",
      "Source Code Analysis / SAST (Faz 34)",
      "Advanced Exploitation & Lateral Movement (Faz 35)",
      "Cloud Security Posture / CSPM (Faz 36)",
      "Smart Scoping & Danger Level (Faz 37)",
    ],
  },
];

const toolCategories = [
  {
    icon: Globe,
    title: "Web",
    tools: ["nuclei", "sqlmap", "ffuf", "gobuster", "katana", "subfinder", "httpx", "wpscan"],
  },
  {
    icon: Network,
    title: "Network",
    tools: [
      "nmap_scan",
      "masscan_scan",
      "naabu_scan",
      "arp_scan",
      "snmp_walk",
      "vlan_scan",
      "dhcp_starvation",
    ],
  },
  {
    icon: Radio,
    title: "IoT & OT",
    tools: ["mqtt_scan", "modbus_scan", "iot_fingerprint", "check_default_creds", "rtsp_scan"],
  },
  {
    icon: Microscope,
    title: "SAST",
    tools: ["sast_semgrep", "sast_gitleaks", "sast_trufflehog", "sast_scan_dir"],
  },
  {
    icon: Bomb,
    title: "Exploit Motoru",
    tools: ["msf_exploit", "msf_payload", "exploit_suggest", "exploit_playbook"],
  },
  {
    icon: Package,
    title: "Air-Gapped",
    tools: ["offline_status", "cache_templates", "offline_bundle", "update_templates"],
  },
  {
    icon: ShieldAlert,
    title: "WAF/IPS/IDS Evasion",
    tools: ["evasion_profile", "proxy_rotate", "ua_spoof", "request_delay", "block_detect", "stealth_proxy"],
  },
  {
    icon: Cloud,
    title: "Cloud (CSPM)",
    tools: ["scoutsuite_scan", "prowler_scan", "cloudsplaining_audit", "k8s_audit", "s3_scanner", "cloud_enum"],
  },
  {
    icon: Fingerprint,
    title: "FUD Payload & Loader",
    tools: ["payload_fud", "payload_fileless", "payload_loader", "payload_obfuscate"],
  },
  {
    icon: Target,
    title: "Akıllı Scoping",
    tools: ["danger_level", "safe_enum", "critical_protect", "scope_validate"],
  },
  {
    icon: Activity,
    title: "DAST & Dinamik Test",
    tools: ["dast_zap_scan", "dast_http_test", "dast_form_fuzz", "dast_api_fuzz", "dast_auth_test"],
  },
  {
    icon: Building2,
    title: "Active Directory & Post-Exploit",
    tools: ["ad_enum", "ad_bloodhound", "ad_kerberos", "ad_ldap_dump", "post_hashdump", "post_lateral"],
  },
];

const architecture = [
  {
    icon: Brain,
    title: "AI Agent",
    description:
      "Local AI destekli karar motoru. 38 fazlı metodolojiyi takip eder; araç çağırma, sonuç analizi, exploit doğrulama, WAF evasion ve payload obfuscation.",
  },
  {
    icon: Layers,
    title: "Tool Registry",
    description:
      "130+ aracın kayıtlı olduğu merkezi sistem. Circuit breaker, timeout, auto-install ve rate limit yönetimi.",
  },
  {
    icon: RefreshCw,
    title: "WebSocket Telemetry",
    description:
      "Canlı ajan takibi: düşünce zinciri, araç çağrıları, bulgular, HTTP trafiği ve Local AI aktivitesi.",
  },
  {
    icon: Monitor,
    title: "Web UI",
    description:
      "React dashboard. Tarama yönetimi, canlı izleme, CVSS puanlama, PDF rapor ve logo yükleme.",
  },
  {
    icon: Boxes,
    title: "Scan Context",
    description:
      "Her tarama için izole durum yönetimi: vuln store, note store, terminal state ve browser state.",
  },
  {
    icon: Cpu,
    title: "Özel Local AI",
    description:
      "Tam lokal model desteği. Kendi modelinizi kullanın; internet gerekmez.",
  },
];

export default function Page() {
  return (
    <>
      <ProductJsonLd product={product} />
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="hero-aurora" aria-hidden="true" />
        <ParallaxGlobe className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] text-gold-500/15" />
        <Container className="relative">
          <div className="max-w-3xl">
          <MotionReveal blur>
            <span className="inline-flex items-center gap-2 rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300">
              <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-gold-300" />
              {product.code}
            </span>
          </MotionReveal>
          <MotionReveal delay={0.05} blur>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper-50 md:text-5xl">
              {product.name}{" "}
              <span className="mt-2 block text-2xl font-medium text-gold-300 md:text-3xl">
                Otonom AI pentest platformu
              </span>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.12}>
            <p className="mt-6 text-balance text-lg leading-relaxed text-slate-300">
              Web uygulamalarından network altyapısına, IoT cihazlardan SCADA sistemlerine, kaynak
              kod analizinden otomatik exploitasyona kadar tam kapsamlı güvenlik testi. Özel Local
              AI ile air-gapped ortamlarda, internet olmadan çalışır.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.16} className="mt-6 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-sm bg-paper-50/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gold-300"
              >
                {tag}
              </span>
            ))}
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <div className="mt-8">
              <DemoRequest product="PentForce" tone="dark" align="center" />
            </div>
          </MotionReveal>

          <MotionStagger className="mt-14 grid gap-6 border-t border-paper-50/10 pt-8 sm:grid-cols-3">
            {stats.map((s) => (
              <MotionStaggerItem key={s.label}>
                <div className="font-display text-4xl font-bold text-gold-300">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-slate-300">{s.label}</div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Neden PentForce"
            title="Bir uzman ekibin metodolojisini otonom bir ajana devredin."
            description="Keşif, zafiyet doğrulama, exploit ve raporlama tek bir yapay zekâ ajanı tarafından, tanımladığınız sınırlar içinde ve internete kapalı ağlarda yürütülür."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionStaggerItem key={pillar.title}>
                <div className="group/f flex h-full flex-col gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <pillar.icon
                    className="h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Yetenekler"
            title="Web güvenliğinden SCADA sistemlerine geniş yelpaze."
            description="On beş ana test alanı; her biri kendi araç setiyle ve AI ajanının otonom kararlarıyla çalışır."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <MotionStaggerItem key={cap.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <cap.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
        <div
          className="animate-glow-pulse pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Exploit Motoru"
            title="Zafiyet bulunduğunda sömürü otomatik tetiklenir."
            description="AI ajan, tespit ettiği zafiyete uygun exploit playbook'unu seçer ve sömürüyü tanımladığınız güvenlik seviyesinde gerçekleştirir."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {playbooks.map((pb) => (
              <MotionStaggerItem key={pb.name}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-paper-50/10 bg-paper-50/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40">
                  <Bomb
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-300 transition-colors duration-300 group-hover/f:text-paper-50"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-paper-50">
                      {pb.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {pb.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Offline Operasyon"
            title="Air-gapped ortamlar için tasarlandı."
            description="Askeri tesis, banka ve fabrika gibi internete kapalı ağlarda çalışmak için üç adımlık offline altyapı."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-3">
            {airGappedSteps.map((s) => (
              <MotionStaggerItem key={s.step}>
                <div className="flex h-full flex-col gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <span className="font-display text-3xl font-bold text-gold-700">{s.step}</span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {s.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
          <MotionReveal delay={0.1}>
            <div className="mt-6 flex items-start gap-3 rounded-card border border-gold-500/30 bg-gold-500/5 p-4">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold-800" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-slate-600">
                <strong className="text-gold-800">Not:</strong> Air-gapped ortamda güncel kalmak
                için periyodik olarak (3 ayda bir) cache_templates + offline_bundle ile yeni USB
                paketi oluşturup kapalı ağa aktarmanız gerekir.
              </p>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-paper-100 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Metodoloji"
            title="38 fazlı, sekiz kategoriye ayrılmış test süreci."
            description="Evasion (0), web uygulama (1–22), network altyapı (23–28), IoT/OT (29–33), SAST (34), exploit/payload (35), CSPM (36) ve scoping (37) fazları sırayla yürütülür."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {phaseGroups.map((group) => (
              <MotionReveal key={group.label}>
                <div className="flex h-full flex-col rounded-card border border-navy-950/10 bg-white p-6">
                  <div className="flex items-center gap-3 border-b border-navy-950/10 pb-4">
                    <group.icon className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {group.label}
                    </h3>
                  </div>
                  <ul className="mt-4 grid gap-2">
                    {group.phases.map((phase) => (
                      <li
                        key={phase}
                        className="flex items-start gap-2 text-sm leading-relaxed text-slate-500"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                        {phase}
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-950 py-20 md:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Araç Seti"
            title="130'dan fazla güvenlik aracı, tek çatı altında."
            description="Go wrapper'larla tümleşik, auto-install destekli araçlar; her biri AI ajan tarafından otomatik çağrılır."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {toolCategories.map((cat) => (
              <MotionStaggerItem key={cat.title}>
                <div className="flex h-full flex-col rounded-card border border-paper-50/10 bg-paper-50/5 p-6 transition-colors duration-300 hover:border-gold-500/40">
                  <div className="flex items-center gap-3">
                    <cat.icon className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                    <h3 className="font-display text-base font-semibold text-paper-50">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.tools.map((tool) => (
                      <code
                        key={tool}
                        className="rounded-sm bg-navy-950/60 px-2 py-1 font-mono text-[11px] text-gold-300"
                      >
                        {tool}
                      </code>
                    ))}
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Mimari"
            title="Go backend, React arayüz ve local AI ajan."
            description="AI ajan, 130+ aracı otonom yönetirken tüm süreç WebSocket telemetriyle canlı izlenir; her tarama kendi izole bağlamında çalışır."
          />
          <MotionStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {architecture.map((item) => (
              <MotionStaggerItem key={item.title}>
                <div className="group/f flex h-full items-start gap-4 rounded-card border border-navy-950/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-[0_16px_40px_-24px_rgba(10,18,32,0.35)]">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-500 transition-colors duration-300 group-hover/f:text-gold-300"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <FaqSection items={product.faq} />

      <section className="bg-navy-950 py-16">
        <Container>
          <SectionHeading
            tone="dark"
            align="center"
            title="PentForce'u kendi ortamınızda deneyin."
            description="Air-gapped kurulumdan raporlamaya kadar tüm adımlarda yanınızdayız."
          />
          <div className="mt-8 flex justify-center">
            <DemoRequest product="PentForce" tone="dark" align="center" />
          </div>
        </Container>
      </section>

      <section className="bg-paper-50 py-20 md:py-24">
        <Container>
          <SectionHeading eyebrow="Diğer Ürünlerimiz" title="Ürün ailemizin geri kalanı" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={i * 0.08} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
