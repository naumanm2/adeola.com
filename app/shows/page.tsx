import { sanityFetch } from "@/sanity/lib/live";
import CTA from "../components/cta";

type Ticket = { venue: string; url: string };

type Show = {
  _id: string;
  title: string;
  subtitle?: string[];
  date?: string;
  live: boolean;
  tickets?: Ticket[];
};

const SHOWS_QUERY = `*[_type == "show"] | order(date asc){
  _id,
  title,
  subtitle,
  date,
  live,
  tickets
}`;

function ShowRow({ show }: { show: Show }) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 py-5">
      <div className="flex flex-col gap-1">
        <p className="font-medium">{show.title}</p>
        {show.subtitle && show.subtitle.length > 0 && (
          <p className="text-white/50 text-sm">{show.subtitle.join(" · ")}</p>
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
      <div className="flex items-center gap-3">
        {!show.live && (
          <span className="text-xs text-white/30 uppercase tracking-widest">
            Past
          </span>
        )}
        {show.live && show.tickets && show.tickets[0] && (
          <CTA link={show.tickets[0].url} text="Tickets" external />
        )}
      </div>
    </div>
  );
}

export default async function ShowsPage() {
  const { data: shows } = await sanityFetch({ query: SHOWS_QUERY });

  const upcoming = shows?.filter((s: Show) => s.live) ?? [];
  const past = shows?.filter((s: Show) => !s.live) ?? [];

  return (
    <div className="pt-16 md:pt-24">
      <h1>Shows</h1>

      {/* Upcoming */}
      <div className="mt-12">
        <p className="text-xs tracking-widest uppercase text-white/40 mb-2">
          Upcoming
        </p>
        {upcoming.length > 0 ? (
          <div className="flex flex-col">
            {upcoming.map((show: Show) => (
              <ShowRow key={show._id} show={show} />
            ))}
          </div>
        ) : (
          <p className="text-white/30 text-sm border-t border-white/10 py-5">
            No upcoming shows at the moment.
          </p>
        )}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div className="mt-16">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-2">
            Past
          </p>
          <div className="flex flex-col">
            {past.map((show: Show) => (
              <ShowRow key={show._id} show={show} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
