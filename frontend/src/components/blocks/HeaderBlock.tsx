import type {
  HeaderBlock as HeaderBlockType,
  StrapiMediaField,
} from "@/types/strapi";

type HeaderBlockProps = {
  block: HeaderBlockType;
};

type IconProps = {
  src: string | null;
  size?: number;
  withRightGap?: boolean;
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


function HeaderIcon({ src, size = 16, withRightGap = true }: IconProps) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{
        marginRight: withRightGap ? "6px" : "0",
        verticalAlign: "middle",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

export default function HeaderBlock({ block }: HeaderBlockProps) {
  const phonePrimary =
    block.phoneNumberFirst ?? block.phone ?? "+7 (900) 000-00-00";
  const phoneSecondary = block.phoneNumberSecond ?? "";
  const email = block.email ?? "";
  const workingHours = block.workingHours ?? "";
  const vkLink = block.vkLink ?? "#";
  const telegramLink = block.telegramLink ?? "#";

  const strapiUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

  const phoneIconPath = resolveMediaUrl(block.phone_icon);
  const phoneIconUrl = phoneIconPath ? `${strapiUrl}${phoneIconPath}` : null;

  const emailIconPath =
    resolveMediaUrl(block.email_icon) ?? resolveMediaUrl(block.emal_icon);
  const emailIconUrl = emailIconPath ? `${strapiUrl}${emailIconPath}` : null;
  const workingHoursIconPath = resolveMediaUrl(block.workingHours_icon);
  const workingHoursIconUrl = workingHoursIconPath
    ? `${strapiUrl}${workingHoursIconPath}`
    : null;
  const vkIconPath = resolveMediaUrl(block.max_icon);
  const vkIconUrl = vkIconPath ? `${strapiUrl}${vkIconPath}` : null;
  const telegramIconPath = resolveMediaUrl(block.tg_icon);
  const telegramIconUrl = telegramIconPath
    ? `${strapiUrl}${telegramIconPath}`
    : null;

  return (
    <header className="topLine">
      <div className="container topLineInner">
        <a href={`tel:${phonePrimary.replace(/\s+/g, "")}`} className="topLineItem">
          <HeaderIcon src={phoneIconUrl} />
          {phonePrimary}
        </a>

        {phoneSecondary && (
          <a
            href={`tel:${phoneSecondary.replace(/\s+/g, "")}`}
            className="topLineItem"
          >
            <HeaderIcon src={phoneIconUrl} />
            {phoneSecondary}
          </a>
        )}

        {email && (
          <a href={`mailto:${email}`} className="topLineItem">
            <HeaderIcon src={emailIconUrl} />
            {email}
          </a>
        )}

        {workingHours && (
          <p className="topLineItem">
            <HeaderIcon src={workingHoursIconUrl} />
            {workingHours}
          </p>
        )}

        <div className="socialLinks">
          <a
            href={vkLink}
            className="socialLink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VK"
          >
            <HeaderIcon src={vkIconUrl} size={30} withRightGap={false} />
          </a>
          <a
            href={telegramLink}
            className="socialLink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <HeaderIcon src={telegramIconUrl} size={30} withRightGap={false} />
          </a>
        </div>
      </div>
    </header>
  );
}
