import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

type Track = {
  _id: string;
  title: string;
  subtitle?: string;
  audio?: { asset: { url: string } };
  coverImage?: { asset: object; alt?: string };
};

const AUDIO_QUERY = `*[_type == "audio"] | order(_createdAt desc){
  _id,
  title,
  subtitle,
  audio { asset->{ url } },
  coverImage
}`;

export default async function AudioPage() {
  const { data: tracks } = await sanityFetch({ query: AUDIO_QUERY });

  return (
    <div className="pt-16 md:pt-24">
      <h1>Audio</h1>

      {tracks && tracks.length > 0 ? (
        <div className="mt-12 flex flex-col gap-10">
          {tracks.map((track: Track) => (
            <div key={track._id} className="flex flex-col gap-4 border-t border-white/10 pt-8">
              <div className="flex gap-5 items-start">
                {track.coverImage ? (
                  <div className="relative shrink-0 w-20 h-20 md:w-28 md:h-28">
                    <Image
                      src={urlFor(track.coverImage).width(200).url()}
                      alt={track.coverImage.alt ?? track.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="shrink-0 w-20 h-20 md:w-28 md:h-28 bg-white/5" />
                )}
                <div className="flex flex-col gap-1 pt-1">
                  <p className="font-medium">{track.title}</p>
                  {track.subtitle && (
                    <p className="text-white/50 text-sm">{track.subtitle}</p>
                  )}
                </div>
              </div>

              {track.audio?.asset?.url ? (
                <audio
                  controls
                  src={track.audio.asset.url}
                  className="w-full h-10 opacity-80"
                />
              ) : (
                <p className="text-white/30 text-sm">No audio file uploaded.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/30 text-sm mt-12 border-t border-white/10 pt-5">
          No tracks yet.
        </p>
      )}
    </div>
  );
}
