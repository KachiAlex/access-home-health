import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import {
  featuredProducts,
  marketingHighlights,
  marketingStats,
  testimonials,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/formatters";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Medical supply partner</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">
            Concierge durable medical equipment ordering for providers, caregivers, and patients.
          </h1>
          <p className="text-lg text-slate-600">
            Replace the brittle WordPress storefront with a modern workflow: curated catalog, compliant forms, and shipping visibility your team trusts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white shadow-sm transition hover:bg-slate-800"
            >
              Browse catalog
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/forms"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-slate-900 transition hover:border-slate-300"
            >
              Submit RX
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-sky-500" /> HIPAA secure workflows
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-sky-500" /> 21-state service footprint
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-8 text-slate-100">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Featured equipment</p>
          <div className="mt-6 space-y-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="rounded-xl bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-slate-300">{product.slug.replace(/-/g, " ")}</p>
                    <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                  </div>
                  <p className="text-lg font-medium text-slate-100">{formatCurrency(product.priceCents)}</p>
                </div>
                <p className="mt-2 text-sm text-slate-300">{product.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm lg:grid-cols-3">
        {marketingStats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-4xl font-semibold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {marketingHighlights.map((highlight) => (
          <div key={highlight.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">{highlight.eyebrow}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{highlight.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Testimonials</p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">What clinical partners share</h3>
            <p className="text-sm text-slate-600">Built with referral teams, patient advocates, and logistics leads.</p>
          </div>
          <Link href="/marketing" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
            View marketing kit <ArrowRight size={16} />
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
