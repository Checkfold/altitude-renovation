import type { LandingBlock } from "@/types/strapi";
import GuaranteesBlock from "@/components/blocks/GuaranteesBlock";
import HeaderBlock from "@/components/blocks/HeaderBlock";
import HeaderMenuBlock from "@/components/blocks/HeaderMenuBlock";
import HeroBlock from "@/components/blocks/HeroBlock";

type BlockRendererProps = {
  blocks: LandingBlock[];
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  const sortedBlocks = [...blocks].sort((a, b) => {
    const priority: Record<LandingBlock["__component"], number> = {
      "blocks.header": 0,
      "blocks.header-menu": 1,
      "blocks.hero": 2,
      "blocks.guarantees": 3,
      "blocks.products": 4,
    };

    return (priority[a.__component] ?? 99) - (priority[b.__component] ?? 99);
  });

  return (
    <>
      {sortedBlocks.map((block, index) => {
        const key = `${block.__component}-${index}`;

        switch (block.__component) {
          case "blocks.hero":
            return <HeroBlock key={key} block={block} />;
          case "blocks.header":
            return <HeaderBlock key={key} block={block} />;
          case "blocks.header-menu":
            return <HeaderMenuBlock key={key} block={block} />;
          case "blocks.guarantees":
            return <GuaranteesBlock key={key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
