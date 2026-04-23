import Link from 'next/link'

export default function CTA({
  link,
  text,
  external,
}: {
  link: string
  text: string
  external?: boolean
}) {
  return (
    <>
      <Link
        href={link}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 rounded-full border-[.4px] border-white/40 bg-black p-1.5 pr-3.5 text-sm text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]"
      >
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white pl-[1px]">
          <svg
            width="8"
            height="9"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M8 4.5L0 9L0 -3.49691e-07L8 4.5Z" fill="#161616" />
          </svg>
        </span>
        <span>{text}</span>
      </Link>
    </>
  )
}
