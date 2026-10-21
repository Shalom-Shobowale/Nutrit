import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/site/HomePage.jsx";

// Thin route wrapper (required by the framework); all site code lives in .jsx/.js files.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nutrit — Fresh Pastries, Small Chops & Bulk Orders" },
      {
        name: "description",
        content:
          "Freshly baked meat pies, sausage rolls, puff puff and small chops. Order small or bulk on WhatsApp with Nutrit.",
      },
      {
        property: "og:title",
        content: "Nutrit — A Little Taste of Happiness, Baked Fresh",
      },
      {
        property: "og:description",
        content:
          "Delicious pastries for everyday treats and celebrations. Order on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
