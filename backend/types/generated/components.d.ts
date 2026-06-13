import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_forms';
  info: {
    displayName: 'form';
  };
  attributes: {
    cityLabel: Schema.Attribute.Text & Schema.Attribute.Required;
    emailLabel: Schema.Attribute.Text & Schema.Attribute.Required;
    phoneLabel: Schema.Attribute.Text & Schema.Attribute.Required;
    submitText: Schema.Attribute.Text & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    successMessage: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksForma extends Struct.ComponentSchema {
  collectionName: 'components_blocks_forma';
  info: {
    displayName: '\u0444\u043E\u0440\u043C\u0430';
  };
  attributes: {};
}

export interface BlocksGuarantees extends Struct.ComponentSchema {
  collectionName: 'components_blocks_guarantees';
  info: {
    displayName: 'guarantees';
  };
  attributes: {};
}

export interface BlocksHeader extends Struct.ComponentSchema {
  collectionName: 'components_blocks_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    email_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    max_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    phone_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    phoneNumberFirst: Schema.Attribute.String & Schema.Attribute.Required;
    phoneNumberSecond: Schema.Attribute.String & Schema.Attribute.Required;
    tg_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
    workingHours: Schema.Attribute.String & Schema.Attribute.Required;
    workingHours_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface BlocksHeaderMenu extends Struct.ComponentSchema {
  collectionName: 'components_blocks_header_menus';
  info: {
    displayName: 'header-menu';
  };
  attributes: {
    btnHref: Schema.Attribute.String & Schema.Attribute.Required;
    btnText: Schema.Attribute.String & Schema.Attribute.Required;
    commercial_baner: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    main_logo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    sharedMenuItem: Schema.Attribute.Component<
      'blocks.shared-menu-item',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    btnHref: Schema.Attribute.String & Schema.Attribute.Required;
    btnText: Schema.Attribute.String & Schema.Attribute.Required;
    exp: Schema.Attribute.Text & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksRequestForm extends Struct.ComponentSchema {
  collectionName: 'components_blocks_request_forms';
  info: {
    displayName: 'request-form';
  };
  attributes: {
    cityLabel: Schema.Attribute.String & Schema.Attribute.Required;
    emailLabel: Schema.Attribute.Text & Schema.Attribute.Required;
    phoneLabel: Schema.Attribute.String & Schema.Attribute.Required;
    submitText: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    successMessage: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksSharedMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_shared_menu_items';
  info: {
    displayName: 'sharedMenu-item';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.form': BlocksForm;
      'blocks.forma': BlocksForma;
      'blocks.guarantees': BlocksGuarantees;
      'blocks.header': BlocksHeader;
      'blocks.header-menu': BlocksHeaderMenu;
      'blocks.hero': BlocksHero;
      'blocks.request-form': BlocksRequestForm;
      'blocks.shared-menu-item': BlocksSharedMenuItem;
    }
  }
}
