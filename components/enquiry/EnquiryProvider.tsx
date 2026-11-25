"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { paxLabel, whatsappHref } from "@/lib/format";

export type EnquiryOptions = {
  /** "booking" changes the title and button copy; both send the same enquiry */
  mode?: "enquiry" | "booking";
  tripId?: string;
  groupSize?: string;
};

type EnquiryContextValue = { open: (options?: EnquiryOptions) => void };

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

type EnquiryProviderProps = {
  children: React.ReactNode;
  trips: { id: string; name: string }[];
  /** Group-size options (tier labels from the data) */
  groupSizes: string[];
  /** company.whatsapp: where enquiries are delivered */
  whatsapp: string | null;
};

/**
 * Hosts the single enquiry/booking modal for the whole site.
 *
 * Delivery: the data has no email address or form backend, so submitting opens WhatsApp
 * (company.whatsapp) with every field pre-written; the visitor presses send there. To post
 * to a backend instead, replace `deliver()` below and keep the success state.
 */
export default function EnquiryProvider({ children, trips, groupSizes, whatsapp }: EnquiryProviderProps) {
  const [options, setOptions] = useState<EnquiryOptions | null>(null);
  const open = useCallback((opts: EnquiryOptions = {}) => setOptions(opts), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      {options && (
        <EnquiryModal
          key={JSON.stringify(options)}
          options={options}
          trips={trips}
          groupSizes={groupSizes}
          whatsapp={whatsapp}
          onClose={() => setOptions(null)}
        />
      )}
    </EnquiryContext.Provider>
  );
}

/** Any element that should open the modal. Renders a <button>; style it with className. */
export function EnquiryButton({
  children,
  className,
  ...options
}: EnquiryOptions & { children: React.ReactNode; className?: string }) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => open(options)}>
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------

type ModalProps = {
  options: EnquiryOptions;
  trips: EnquiryProviderProps["trips"];
  groupSizes: string[];
  whatsapp: string | null;
  onClose: () => void;
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/40";

function nextTwelveMonths() {
  const fmt = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(now.getFullYear(), now.getMonth() + i, 1)));
}

function EnquiryModal({ options, trips, groupSizes, whatsapp, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [sentHref, setSentHref] = useState<string | null>(null);
  const months = useMemo(nextTwelveMonths, []);
  const isBooking = options.mode === "booking";
  const trip = trips.find((t) => t.id === options.tripId);

  // No close() in cleanup: unmounting removes the dialog, and a cleanup close() would fire
  // onClose under StrictMode's double effect run and shut the modal as it opens.
  useEffect(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, []);

  function deliver(form: FormData) {
    const get = (k: string) => String(form.get(k) ?? "").trim();
    const lines = [
      `${isBooking ? "Booking request" : "Trip enquiry"} from the website`,
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") && `Phone/WhatsApp: ${get("phone")}`,
      get("country") && `Country: ${get("country")}`,
      get("trip") && `Trip: ${get("trip")}`,
      get("groupSize") && `Group size: ${paxLabel(get("groupSize"))}`,
      get("month") && `Preferred start: ${get("month")}`,
      get("message") && `\n${get("message")}`,
    ].filter(Boolean);
    const href = whatsappHref(whatsapp ?? "", lines.join("\n"));
    // Opened synchronously inside the submit handler so pop-up blockers allow it
    window.open(href, "_blank", "noopener,noreferrer");
    return href;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="w-[min(40rem,calc(100vw-2rem))] rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-navy/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-glacier hover:text-navy"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {sentHref ? (
          <div className="py-6 text-center" role="status">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
            <h2 id={titleId} className="mt-4 font-display text-4xl leading-none text-navy sm:text-5xl">
              Almost there!
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-slate">
              WhatsApp has opened with your {isBooking ? "booking request" : "enquiry"} written out. Press send there
              and our team will reply.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={sentHref} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Open WhatsApp again
              </a>
              <button type="button" onClick={onClose} className="btn-primary">
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="eyebrow text-saffron-text">{isBooking ? "Book your trek" : "Plan your journey"}</p>
            <h2 id={titleId} className="mt-2 pr-8 font-display text-4xl leading-none text-navy sm:text-5xl">
              {isBooking && trip ? `Book ${trip.name}` : "Send us an enquiry"}
            </h2>

            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSentHref(deliver(new FormData(e.currentTarget)));
              }}
            >
              <Field label="Full name" className="sm:col-span-2">
                <input name="name" required autoComplete="name" className={fieldClass} />
              </Field>
              <Field label="Email">
                <input name="email" type="email" required autoComplete="email" className={fieldClass} />
              </Field>
              <Field label="Phone / WhatsApp">
                <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
              </Field>
              <Field label="Country">
                <input name="country" autoComplete="country-name" className={fieldClass} />
              </Field>
              <Field label="Trip">
                <select name="trip" defaultValue={trip?.name ?? ""} className={fieldClass}>
                  <option value="">Not sure yet</option>
                  {trips.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Group size">
                <select name="groupSize" defaultValue={options.groupSize ?? ""} className={fieldClass}>
                  <option value="">Select</option>
                  {groupSizes.map((g) => (
                    <option key={g} value={g}>
                      {paxLabel(g)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred start month">
                <select name="month" defaultValue="" className={fieldClass}>
                  <option value="">Flexible</option>
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2">
                <textarea name="message" rows={4} className={fieldClass} />
              </Field>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">Sends via WhatsApp to our team in Kathmandu.</p>
                <button type="submit" className="btn-primary" disabled={!whatsapp}>
                  {isBooking ? "Send booking request" : "Send enquiry"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block text-sm font-medium text-navy ${className}`}>
      {label}
      {children}
    </label>
  );
}
