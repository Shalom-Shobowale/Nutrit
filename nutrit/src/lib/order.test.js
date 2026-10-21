import { describe, it, expect } from "vitest";
import {
  validateOrder,
  calcSubtotal,
  buildOrderMessage,
  whatsappLink,
} from "./order";
import { getProductById } from "@/data/products";

const today = new Date(2026, 9, 19);

const base = {
  name: "Ada Obi",
  phone: "08012345678",
  orderType: "Small Order",
  productId: "meat-pie",
  quantity: "6",
  date: "2026-10-21",
  fulfilment: "Pickup",
  address: "",
  notes: "",
};

describe("order rules", () => {
  it("rejects quantity below minimum (meat pie min 6)", () => {
    const e = validateOrder(
      { ...base, quantity: "5" },
      getProductById("meat-pie"),
      today
    );

    expect(e.quantity).toMatch(/Minimum/);
  });

  it("rejects non-whole quantity", () => {
    expect(
      validateOrder(
        { ...base, quantity: "6.5" },
        getProductById("meat-pie"),
        today
      ).quantity
    ).toBeDefined();
  });

  it("accepts valid order", () => {
    expect(
      validateOrder(base, getProductById("meat-pie"), today)
    ).toEqual({});
  });

  it("rejects dates within advance booking window", () => {
    const e = validateOrder(
      {
        ...base,
        productId: "custom-pastry-packs",
        quantity: "30",
        date: "2026-10-21",
      },
      getProductById("custom-pastry-packs"),
      today
    );

    expect(e.date).toBeDefined();
  });

  it("requires address for delivery", () => {
    expect(
      validateOrder(
        { ...base, fulfilment: "Delivery" },
        getProductById("meat-pie"),
        today
      ).address
    ).toBeDefined();
  });

  it("subtotal = qty × price; null when no price", () => {
    expect(
      calcSubtotal(getProductById("sausage-roll"), "10")
    ).toBe(7000);

    expect(
      calcSubtotal(getProductById("custom-pastry-packs"), "30")
    ).toBeNull();
  });

  it("whatsapp link uses business number and includes details", () => {
    const url = whatsappLink(
      buildOrderMessage(base, getProductById("meat-pie"))
    );

    expect(
      url.startsWith("https://wa.me/2348129234130?text=")
    ).toBe(true);

    const msg = decodeURIComponent(url.split("text=")[1]);

    expect(msg).toContain("Product: Meat Pie");
    expect(msg).toContain("Estimated subtotal: ₦6,000");
  });
});
