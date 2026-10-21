import { useState } from "react";
import Header from "./Header";
import OrderForm from "./OrderForm";
import { Hero, Gallery, HowToOrder, BulkOrders, Contact, Footer } from "./Sections";
import { scrollToId } from "./ui";

export default function HomePage() {
  const [preset, setPreset] = useState(null);
  const go = (p) => { setPreset({ ...p, t: Date.now() }); scrollToId("order"); };
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery onOrder={(productId) => go({ productId })} />
        <HowToOrder />
        <BulkOrders onBulk={() => go({ orderType: "Bulk Order" })} />
        <OrderForm preset={preset} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
