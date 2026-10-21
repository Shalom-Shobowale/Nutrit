import { siteConfig } from "../data/siteConfig";

export const PRICE_TBC = "Price to be confirmed";

export function formatNaira(amount) {
  return `${siteConfig.currency}${Number(amount).toLocaleString("en-NG")}`;
}

export function formatPrice(product) {
  return product.price == null
    ? "Price on request"
    : formatNaira(product.price);
}

export function unitLabel(product, qty) {
  return Number(qty) === 1 ? product.priceUnit : product.unitPlural;
}

export function calcSubtotal(product, quantity) {
  const q = Number(quantity);

  if (
    !product ||
    product.price == null ||
    !Number.isInteger(q) ||
    q <= 0
  ) {
    return null;
  }

  return product.price * q;
}

/** Earliest allowed date (YYYY-MM-DD, local time) given advance-booking days. */
export function earliestDate(advanceDays = 0, today = new Date()) {
  const d = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + advanceDays
  );

  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function validateOrder(values, product, today = new Date()) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  const digits = (values.phone || "").replace(/[\s\-()+]/g, "");

  if (!/^\d{10,14}$/.test(digits)) {
    errors.phone =
      "Please enter a valid phone number (e.g. 0812 345 6789).";
  }

  if (!values.orderType) {
    errors.orderType = "Please choose an order type.";
  }

  if (!product) {
    errors.productId = "Please choose a product.";
  } else if (!product.available) {
    errors.productId = `${product.name} is currently unavailable.`;
  }

  const qtyStr = String(values.quantity ?? "").trim();
  const q = Number(qtyStr);

  if (!qtyStr || !/^\d+$/.test(qtyStr) || q <= 0) {
    errors.quantity = "Enter a valid whole number.";
  } else if (product && q < product.minimumQuantity) {
    errors.quantity = `Minimum order for ${product.name} is ${product.minimumQuantity} ${unitLabel(product, product.minimumQuantity)}.`;
  }

  if (!values.date) {
    errors.date = "Please choose your preferred date.";
  } else {
    const min = earliestDate(
      product ? product.advanceBookingDays : 0,
      today
    );

    if (values.date < min) {
      errors.date =
        product && product.advanceBookingDays > 0
          ? `${product.name} needs at least ${product.advanceBookingDays} day(s) notice. Earliest date: ${min}.`
          : "Date cannot be in the past.";
    }
  }

  if (!values.fulfilment) {
    errors.fulfilment = "Choose pickup or delivery.";
  }

  if (
    values.fulfilment === "Delivery" &&
    (!values.address || values.address.trim().length < 5)
  ) {
    errors.address = "Please enter your delivery address.";
  }

  return errors;
}

export function buildOrderMessage(values, product) {
  const subtotal = calcSubtotal(product, values.quantity);

  const lines = [
    `Hello ${siteConfig.businessName}! I would like to place an order.`,
    "",
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Order type: ${values.orderType}`,
    `Product: ${product.name}`,
    `Quantity: ${values.quantity} ${unitLabel(product, values.quantity)}`,
    `Unit price: ${
      product.price == null
        ? PRICE_TBC
        : `${formatNaira(product.price)} per ${product.priceUnit}`
    }`,
    `Estimated subtotal: ${
      subtotal == null ? PRICE_TBC : formatNaira(subtotal)
    }`,
    `Preferred date: ${values.date}`,
    `Fulfilment: ${values.fulfilment}`,
  ];

  if (values.fulfilment === "Delivery") {
    lines.push(`Delivery address: ${values.address.trim()}`);
  }

  if (values.notes && values.notes.trim()) {
    lines.push(`Additional notes: ${values.notes.trim()}`);
  }

  lines.push(
    "",
    "Please confirm availability and the final price. Thank you!"
  );

  return lines.join("\n");
}

export function whatsappLink(message) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;

  return message
    ? `${base}?text=${encodeURIComponent(message)}`
    : base;
}

export const introMessage = `Hello ${siteConfig.businessName}! I'd love to know more about your pastries and place an order.`;
