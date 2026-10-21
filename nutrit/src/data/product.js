/*
 * ⚠️ SAMPLE VALUES — prices, minimum quantities and advance-booking days below
 * are TEMPORARY EXAMPLES for demonstration. The business owner must confirm
 * every value before launch.
 *
 * price: number in Naira, or null for "Price on request"
 * advanceBookingDays: minimum days' notice required (0 = same day allowed)
 * available: set false to stop new orders for a product
 */
export const products = [
  {
    id: "meat-pie",
    name: "Meat Pie",
    description: "A golden, flaky pastry filled with a savoury filling.",
    price: 1000, // SAMPLE
    priceUnit: "piece",
    unitPlural: "pieces",
    minimumQuantity: 6, // SAMPLE
    advanceBookingDays: 1, // SAMPLE
    available: true,
    category: "savoury",
    image: "/meat-pie.jpg",
  },
  {
    id: "sausage-roll",
    name: "Sausage Roll",
    description: "A delicious savoury pastry, perfect for a quick snack or sharing.",
    price: 700, // SAMPLE
    priceUnit: "piece",
    unitPlural: "pieces",
    minimumQuantity: 6, // SAMPLE
    advanceBookingDays: 1, // SAMPLE
    available: true,
    category: "savoury",
    image: "/sausage-roll.jpg",
  },
  {
    id: "chicken-pie",
    name: "Chicken Pie",
    description: "A tasty pastry with a savoury chicken filling.",
    price: 1200, // SAMPLE
    priceUnit: "piece",
    unitPlural: "pieces",
    minimumQuantity: 6, // SAMPLE
    advanceBookingDays: 1, // SAMPLE
    available: true,
    category: "savoury",
    image: "/chicken-pie.jpg",
  },
  {
    id: "puff-puff",
    name: "Puff Puff",
    description: "Soft, golden bites perfect for sharing.",
    price: 200, // SAMPLE
    priceUnit: "piece",
    unitPlural: "pieces",
    minimumQuantity: 10, // SAMPLE
    advanceBookingDays: 1, // SAMPLE
    available: true,
    category: "sweet",
    image: "/puff-puff.jpg",
  },
  {
    id: "small-chops-platter",
    name: "Small Chops Platter",
    description: "An assortment of tasty treats for parties, celebrations and gatherings.",
    price: 15000, // SAMPLE
    priceUnit: "platter",
    unitPlural: "platters",
    minimumQuantity: 1, // SAMPLE
    advanceBookingDays: 2, // SAMPLE
    available: true,
    category: "platters",
    image: "/small-chops.jpg",
  },
  {
    id: "custom-pastry-packs",
    name: "Custom Pastry Packs",
    description: "Pastry packs prepared for events, meetings and special occasions.",
    price: null, // Price on request
    priceUnit: "pack",
    unitPlural: "packs",
    minimumQuantity: 30, // SAMPLE
    advanceBookingDays: 3, // SAMPLE
    available: true,
    category: "events",
    image: "/pastry-packs.jpg",
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);
