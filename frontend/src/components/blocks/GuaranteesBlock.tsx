import type { GuaranteesBlock as GuaranteesBlockType } from "@/types/strapi";

type GuaranteesBlockProps = {
  block: GuaranteesBlockType;
};

export default function GuaranteesBlock({ block }: GuaranteesBlockProps) {
  const sectionTitle = block.title?.trim() || "Наши гарантии";
  const items = block.items ?? [];

  if (!items.length) return null;

  return (
    <section style={{ padding: "3rem 0" }}>
      <div className="container">
        <h2 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>{sectionTitle}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item) => (
            <article
              key={item.id ?? `${item.title}-${item.subtitle}`}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "1rem",
                background: "#fff",
              }}
            >
              {item.title && <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>}
              {item.subtitle && (
                <p style={{ color: "#4b5563", lineHeight: 1.45 }}>{item.subtitle}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
