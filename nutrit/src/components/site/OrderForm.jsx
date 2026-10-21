import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Info } from "lucide-react";
import { products, getProductById } from "../../data/product";
import { validateOrder, buildOrderMessage, whatsappLink, calcSubtotal, earliestDate, formatNaira, formatPrice, unitLabel, PRICE_TBC } from "../../lib/order-utils";
import { SectionHeading } from "./Uii";

const empty = { name: "", phone: "", orderType: "Small Order", productId: "", quantity: "", date: "", fulfilment: "Pickup", address: "", notes: "" };

function Field({ id, label, required, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-primary">
        {label} {required && <span className="text-accent" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

function Toggle({ name, options, value, onChange }) {
  return (
    <div role="radiogroup" aria-label={name} className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
      {options.map((o) => (
        <button type="button" key={o} role="radio" aria-checked={value === o} onClick={() => onChange(o)}
          className={`min-h-11 rounded-lg text-sm font-medium transition-all ${value === o ? "bg-card text-primary shadow-soft" : "text-muted-foreground hover:text-primary"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export default function OrderForm({ preset }) {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!preset) return;
    setV((s) => ({ ...s, ...(preset.productId ? { productId: preset.productId } : {}), ...(preset.orderType ? { orderType: preset.orderType } : {}) }));
  }, [preset]);

  const product = getProductById(v.productId);
  const subtotal = calcSubtotal(product, v.quantity);
  const minDate = useMemo(() => earliestDate(product ? product.advanceBookingDays : 0), [product]);

  const set = (k) => (e) => {
    const next = { ...v, [k]: e && e.target ? e.target.value : e };
    setV(next);
    if (submitted) setErrors(validateOrder(next, getProductById(next.productId)));
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateOrder(v, product);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    const win = window.open(whatsappLink(buildOrderMessage(v, product)), "_blank", "noopener,noreferrer");
    if (!win) window.location.href = whatsappLink(buildOrderMessage(v, product));
    setSent(true);
  };

  const aria = (k) => ({ "aria-invalid": errors[k] ? "true" : undefined, "aria-describedby": errors[k] ? `${k}-error` : `${k}-hint` });

  return (
    <section id="order" className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
      <SectionHeading eyebrow="Order" title="Place Your Order with Nutrit" text="Choose your favourite treats, tell us what you need, and send your order directly to us on WhatsApp." />
      <form noValidate onSubmit={submit} className="mt-12 grid gap-6 rounded-[2rem] bg-card p-6 shadow-lift sm:grid-cols-2 sm:p-10">
        <Field id="name" label="Full name" required error={errors.name}>
          <input id="name" className="field" autoComplete="name" value={v.name} onChange={set("name")} {...aria("name")} />
        </Field>
        <Field id="phone" label="Phone number" required error={errors.phone}>
          <input id="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="0812 345 6789" value={v.phone} onChange={set("phone")} {...aria("phone")} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="orderType" label="Order type" required error={errors.orderType}>
            <Toggle name="Order type" options={["Small Order", "Bulk Order"]} value={v.orderType} onChange={set("orderType")} />
          </Field>
        </div>
        <Field id="productId" label="Product" required error={errors.productId}>
          <select id="productId" className="field" value={v.productId} onChange={set("productId")} {...aria("productId")}>
            <option value="">Select a pastry…</option>
            {products.map((p) => <option key={p.id} value={p.id} disabled={!p.available}>{p.name} — {formatPrice(p)}{!p.available ? " (unavailable)" : ""}</option>)}
          </select>
        </Field>
        <Field id="quantity" label="Quantity" required error={errors.quantity}
          hint={product ? `Minimum order: ${product.minimumQuantity} ${unitLabel(product, product.minimumQuantity)}` : "Select a product to see its minimum"}>
          <input id="quantity" type="number" inputMode="numeric" min={product?.minimumQuantity ?? 1} step="1" className="field" value={v.quantity} onChange={set("quantity")} {...aria("quantity")} />
        </Field>
        <Field id="date" label="Preferred date" required error={errors.date}
          hint={product && product.advanceBookingDays > 0 ? `Needs ${product.advanceBookingDays} day(s) notice` : undefined}>
          <input id="date" type="date" min={minDate} className="field" value={v.date} onChange={set("date")} {...aria("date")} />
        </Field>
        <Field id="fulfilment" label="Fulfilment" required error={errors.fulfilment}>
          <Toggle name="Fulfilment" options={["Pickup", "Delivery"]} value={v.fulfilment} onChange={set("fulfilment")} />
        </Field>
        {v.fulfilment === "Delivery" && (
          <div className="sm:col-span-2">
            <Field id="address" label="Delivery address" required error={errors.address} hint="Delivery fee, if any, will be confirmed on WhatsApp.">
              <textarea id="address" rows={2} className="field" autoComplete="street-address" value={v.address} onChange={set("address")} {...aria("address")} />
            </Field>
          </div>
        )}
        <div className="sm:col-span-2">
          <Field id="notes" label="Additional notes or event details">
            <textarea id="notes" rows={3} className="field" placeholder={v.orderType === "Bulk Order" ? "Event type, number of guests, mix of pastries…" : "Anything we should know?"} value={v.notes} onChange={set("notes")} />
          </Field>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-secondary/70 p-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Estimated subtotal</p>
            <p className="mt-1 font-display text-2xl font-semibold text-primary" aria-live="polite">
              {!product ? "—" : product.price == null ? PRICE_TBC : subtotal != null ? formatNaira(subtotal) : "—"}
            </p>
          </div>
          <p className="flex max-w-xs items-start gap-2 text-xs text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0" />Final price and availability are confirmed by Nutrit on WhatsApp.</p>
        </div>

        <div className="sm:col-span-2">
          <button type="submit" className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary/90">
            <MessageCircle className="h-5 w-5" />Send Order to WhatsApp
          </button>
          {sent && <p className="mt-4 text-center text-sm text-muted-foreground" role="status">WhatsApp should now be open with your order — remember to tap <strong>Send</strong> there to deliver it to Nutrit.</p>}
        </div>
      </form>
    </section>
  );
}
