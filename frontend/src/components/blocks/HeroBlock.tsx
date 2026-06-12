import type {
  HeroBlock as HeroBlockType,
  StrapiMediaField,
} from "@/types/strapi";
import Link from "next/link";

type HeroBlockProps = {
  block: HeroBlockType;
};

function resolveMediaUrl(media: StrapiMediaField | undefined): string | null {
  if (!media) return null;

  if (Array.isArray(media)) {
    return media[0]?.url ?? null;
  }

  if ("data" in media) {
    const data = media.data;
    if (Array.isArray(data)) {
      return data[0]?.url ?? data[0]?.attributes?.url ?? null;
    }
    return data?.url ?? data?.attributes?.url ?? null;
  }

  if ("url" in media) {
    return media.url ?? null;
  }

  return null;
}

export default function HeroBlock({ block }: HeroBlockProps) {
  const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const backgroundPath = resolveMediaUrl(block.background);
  const backgroundUrl = backgroundPath ? `${strapiUrl}${backgroundPath}` : null;
  const fallbackBackground =
    typeof block.backgroundImageUrl === "string" ? block.backgroundImageUrl : null;
  const heroBackground = backgroundUrl || fallbackBackground;
  const exp = block.exp?.trim() || "";
  const title = block.title?.trim() || "";
  const subtitle =
    typeof block.subtitle === "string"
      ? block.subtitle.trim()
      : "";
  const buttonText = block.btnText?.trim() || "";
  const buttonHref = block.btnHref?.trim() || "/";

  const sectionStyle = heroBackground
    ? {
        backgroundImage: `linear-gradient(123.29deg, rgba(20, 32, 48, 0.3575) 38.25%, rgba(20, 32, 48, 0.2475) 51.83%, rgba(20, 32, 48, 0.11) 63.15%, rgba(20, 32, 48, 0) 83.53%), linear-gradient(331.59deg, rgba(20, 32, 48, 0.21) -69.59%, rgba(20, 32, 48, 0.135) -34.26%, rgba(20, 32, 48, 0) 31.35%), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: "#e5e7eb",
      };

  return (
    <section className="heroSection" style={sectionStyle} aria-label="Hero background">
      <div className="container heroContent">
        {exp && <p className="heroExp">{exp}</p>}
        {title && <h1 className="heroTitle">{title}</h1>}
        {subtitle && <p className="heroSubtitle">{subtitle}</p>}
        {buttonText && (
          <Link href={buttonHref} className="heroCtaButton">
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
