import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import CTA from "./components/cta";

const GENERAL_QUERY = `*[_type == "general"][0]{
  title,
  subtitle,
  mainImage,
  introShort
}`;

const UPCOMING_SHOWS_QUERY = `*[_type == "show" && live == true] | order(date asc) [0...3]{
  _id,
  title,
  subtitle,
  date,
  tickets
}`;

export default async function Home() {
  const { data: general } = await sanityFetch({ query: GENERAL_QUERY });
  const { data: shows } = await sanityFetch({ query: UPCOMING_SHOWS_QUERY });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="flex flex-col items-center pt-24 md:pt-40">
        {general?.mainImage && (
          <div className="relative w-full max-w-sm aspect-[3/4] mb-10">
            <Image
              src={urlFor(general.mainImage).width(600).url()}
              alt={general.mainImage.alt ?? ""}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1>{general?.title ?? "ADEOLA"}</h1>
        {general?.subtitle && (
          <p className="text-white/60 mt-3 text-lg">{general.subtitle}</p>
        )}
        {general?.introShort && (
          <p className="mt-6 max-w-sm text-center text-white/70 leading-relaxed">
            {general.introShort}
          </p>
        )}
      </div>

      {/* Upcoming Shows */}
      {shows && shows.length > 0 && (
        <div className="mt-24 w-full">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-6">
            Upcoming Shows
          </p>
          <div className="flex flex-col">
            {shows.map((show: {
              _id: string;
              title: string;
              subtitle?: string[];
              date?: string;
              tickets?: { venue: string; url: string }[];
            }) => (
              <div
                key={show._id}
                className="flex items-center justify-between border-t border-white/10 py-5"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{show.title}</p>
                  {show.subtitle && show.subtitle.length > 0 && (
                    <p className="text-white/50 text-sm">
                      {show.subtitle.join(" · ")}
                    </p>
                  )}
                  {show.date && (
                    <p className="text-white/40 text-sm">
                      {new Date(show.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
                {show.tickets && show.tickets[0] && (
                  <CTA link={show.tickets[0].url} text="Tickets" external />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
