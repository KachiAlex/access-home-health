import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Mail, Presentation } from "lucide-react";
import {
  marketingHighlights,
  marketingStats,
  marketingAssets,
  testimonials,
} from "@/lib/mock-data";

const iconMap = {
  presentation: Presentation,
  "file-text": FileText,
  mail: Mail,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export default function MarketingPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Marketing hub</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Position your discharge program with modern collateral.</h1>
        <p className="mt-2 text-sm text-slate-600">
          Shareable decks, partner testimonials, and stats you can hand to executives when advocating for new DME workflows.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {marketingStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {marketingHighlights.map((highlight) => (
          <article key={highlight.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">{highlight.eyebrow}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{highlight.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Assets</p>
            <h2 className="text-2xl font-semibold text-slate-900">Plug-and-play collateral</h2>
            <p className="text-sm text-slate-600">Download customizable files or request co-branded versions.</p>
          </div>
          <Link href="mailto:marketing@accessmedhomehealth.com" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
            Talk to marketing <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {marketingAssets.map((asset) => (
            <article key={asset.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {(() => {
                const Icon = iconMap[asset.icon as keyof typeof iconMap] ?? Presentation;
                return <Icon className="text-sky-500" />;
              })()}
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{asset.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{asset.description}</p>
              <Link href={asset.action.href} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                {asset.action.label} <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Proof</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Testimonials worth forwarding</h2>
          </div>
          <Link href="/catalog" className="hidden text-sm font-medium text-slate-900 lg:inline-flex lg:items-center lg:gap-2">
            Show catalog <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 text-slate-700">
              <p className="text-lg italic">“{testimonial.quote}”</p>
              <footer className="mt-4 text-sm text-slate-500">
                {testimonial.author} · {testimonial.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
