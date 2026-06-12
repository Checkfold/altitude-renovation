export type StrapiTextNode = {
  type: string;
  text?: string;
  children?: StrapiTextNode[];
};

export type MenuItem = {
  id?: number;
  label?: string;
  href?: string;
};

export type GuaranteeItem = {
  id?: number;
  title?: string;
  subtitle?: string;
};

export type ProductItem = {
  id?: number;
  title?: string;
  subtitle?: string;
  price?: string;
  imageUrl?: string;
  link?: string;
};

export type HeaderBlock = {
  __component: "blocks.header";
  phone?: string;
  phoneNumberFirst?: string;
  phoneNumberSecond?: string;
  email?: string;
  workingHours?: string;
  vkLink?: string;
  telegramLink?: string;
  phone_icon?: StrapiMediaField;
  email_icon?: StrapiMediaField;
  emal_icon?: StrapiMediaField;
  workingHours_icon?: StrapiMediaField;
  max_icon?: StrapiMediaField;
  tg_icon?: StrapiMediaField;
};

export type StrapiMediaItem = {
  url?: string;
};

export type StrapiMediaField =
  | StrapiMediaItem
  | StrapiMediaItem[]
  | {
      data?:
        | { url?: string; attributes?: { url?: string } }
        | Array<{ url?: string; attributes?: { url?: string } }>;
    };

export type HeaderMenuBlock = {
  __component: "blocks.header-menu";
  main_logo?: StrapiMediaField;
  commercial_baner?: StrapiMediaField;
  sharedMenuItem?: MenuItem[];
  cta_text?: string;
  cta_href?: string;
  btnText?: string;
  btnHref?: string;
};

export type HeroBlock = {
  __component: "blocks.hero";
  background?: StrapiMediaField;
  title?: string;
  description?: string;
  subtitle?: StrapiTextNode[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  btnText?: string;
  btnHref?: string;
  backgroundImageUrl?: string;
};

export type GuaranteesBlock = {
  __component: "blocks.guarantees";
  title?: string;
  items?: GuaranteeItem[];
};

export type ProductsBlock = {
  __component: "blocks.products";
  title?: string;
  subtitle?: string;
  items?: ProductItem[];
};

export type LandingBlock =
  | HeaderBlock
  | HeaderMenuBlock
  | HeroBlock
  | GuaranteesBlock
  | ProductsBlock;

export type LandingResponse = {
  data?: {
    blocks?: LandingBlock[];
  };
};
