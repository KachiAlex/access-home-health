import { supportForms, marketingHighlights } from "@/lib/mock-data";

export default function FormsPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Secure forms</p>
          <h1 className="text-3xl font-semibold text-slate-900">Transmit documentation directly to our intake team.</h1>
          <p className="text-sm text-slate-600">
            Every submission is encrypted, logged, and linked to order workflows so physicians, case managers, and caregivers stay aligned.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {supportForms.map((form) => (
          <article key={form.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{form.id.replace(/_/g, " ")}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{form.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{form.description}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              {form.fields.map((field) => (
                <p key={field} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> {field}
                </p>
              ))}
            </div>
            <button className="mt-6 w-full rounded-full bg-slate-900 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
              Launch form
            </button>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-500">Why it matters</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {marketingHighlights.map((highlight) => (
            <div key={highlight.title} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{highlight.eyebrow}</p>
              <h3 className="text-lg font-semibold text-slate-900">{highlight.title}</h3>
              <p className="text-sm text-slate-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
