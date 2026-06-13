import type { HeaderMenuBlock as HeaderMenuBlockType, StrapiMediaField } from "@/types/strapi";
import Link from "next/link";

type HeaderMenuBlockProps = {
  block: HeaderMenuBlockType;
};

function normalizeMenuHref(rawHref?: string): string {
  const href = rawHref?.trim();
  if (!href) return "/";

  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  return `/${href}`;
}

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

/* eslint-disable @next/next/no-img-element */
export default function HeaderMenuBlock({ block }: HeaderMenuBlockProps) {
  const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const mainLogoPath = resolveMediaUrl(block.main_logo);
  const commercialBannerPath = resolveMediaUrl(block.commercial_baner);
  const mainLogoUrl = mainLogoPath ? `${strapiUrl}${mainLogoPath}` : null;
  const commercialBannerUrl = commercialBannerPath
    ? `${strapiUrl}${commercialBannerPath}`
    : null;
  const menuItems = block.sharedMenuItem ?? [];
  const ctaText = block.btnText?.trim() || block.cta_text?.trim() || "Оставить заявку";
  const ctaHref = block.btnHref?.trim() || block.cta_href?.trim() || "/request";

  return (
    <nav className="headerMenu">
      <div className="container headerMenuInner">
        <div className="headerMenuBrand">
          {mainLogoUrl && (
            <img
              src={mainLogoUrl}
              alt="Логотип компании"
              className="headerMainLogo"
            />
          )}
          {commercialBannerUrl && (
            <img
              src={commercialBannerUrl}
              alt="Рекламный логотип"
              className="headerCommercialBanner"
            />
          )}
        </div>

        <ul className="headerMenuList">
          {menuItems.map((item, index) => {
            const rawLabel = item.label || "Пункт меню";
            const normalizedLabel = rawLabel.trim().toLowerCase();
            const isServices = normalizedLabel === "услуги";

            if (isServices) {
              return (
                <li key={item.id ?? `${item.label}-${index}`} className="headerMenuItem">
                  <details className="servicesDropdown">
                    <summary className="headerMenuLink headerMenuLinkButton">
                      Услуги
                      <span className="headerMenuArrow">▾</span>
                    </summary>
                    <div className="servicesDropdownMenu">
                      <Link href="/" className="servicesDropdownLink">
                        Услуга 1
                      </Link>
                      <Link href="/" className="servicesDropdownLink">
                        Услуга 2
                      </Link>
                      <Link href="/" className="servicesDropdownLink">
                        Услуга 3
                      </Link>
                    </div>
                  </details>
                </li>
              );
            }

            return (
              <li key={item.id ?? `${item.label}-${index}`} className="headerMenuItem">
                <Link href={normalizeMenuHref(item.href)} className="headerMenuLink">
                  {rawLabel}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href={ctaHref} className="headerMenuCta">
          {ctaText}
        </Link>
      </div>
    </nav>
  );
}
/* eslint-enable @next/next/no-img-element */
