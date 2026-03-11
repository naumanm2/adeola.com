import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

const GENERAL_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  introLong
}`;

const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: object; alt?: string } }) => (
      <div className="relative w-full aspect-[4/3] my-8">
        <Image
          src={urlFor(value).width(900).url()}
          alt={value.alt ?? ""}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-white/70 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-medium mt-10 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-medium mt-8 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-white/20 pl-4 text-white/50 italic my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-white font-medium">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 text-white hover:text-white/60 transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export default async function AboutPage() {
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY });

  return (
    <div className="pt-16 md:pt-24">
      <h1>About</h1>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        {general?.mainImage && (
          <div className="relative w-full aspect-[3/4]">
            <Image
              src={urlFor(general.mainImage).width(700).url()}
              alt={general.mainImage.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Text */}
        <div>
          {general?.title && (
            <p className="text-xs tracking-widest uppercase text-white/40 mb-6">
              {general.title}
            </p>
          )}
          {general?.introLong ? (
            <PortableText
              value={general.introLong}
              components={portableTextComponents}
            />
          ) : (
            <p className="text-white/30 text-sm">No bio yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
