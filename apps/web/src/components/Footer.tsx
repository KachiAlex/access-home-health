export function Footer() {
  return (
    <footer className="border-t border-border bg-white/90 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">Access Home Health Medical Supplies</p>
          <p className="mt-1 max-w-md">
            Modernizing durable medical equipment fulfillment for providers, caregivers, and patients.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Support</p>
            <ul className="mt-2 space-y-1">
              <li>Call 1-800-555-2040</li>
              <li>Fax 904-555-1029</li>
              <li>support@accessmedhomehealth.com</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Locations</p>
            <ul className="mt-2 space-y-1">
              <li>Jacksonville, FL (HQ)</li>
              <li>Atlanta, GA</li>
              <li>Dallas, TX</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
