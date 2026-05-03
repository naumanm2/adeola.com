import Link from 'next/link'

const pillClass =
  'inline-flex items-center gap-2 rounded-full border-[0.4px] border-[rgba(246,246,246,0.4)] bg-[#161616] p-2 pr-4 text-sm text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e2795]'

function IconCircle() {
  return (
    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white">
      <svg
        width="8"
        height="9"
        viewBox="0 0 8 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="ml-[1px]"
      >
        <path d="M8 4.5L0 9L0 0L8 4.5Z" fill="#161616" />
      </svg>
    </span>
  )
}

export default function CTA({
  link,
  text,
  external,
  ariaLabel,
  onClick,
  type = 'button',
}: {
  link?: string
  text: string
  external?: boolean
  ariaLabel?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  if (link) {
    return (
      <Link
        href={link}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-label={text ? undefined : ariaLabel}
        className={pillClass}
      >
        <IconCircle />
        {text && <span>{text}</span>}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={text ? undefined : ariaLabel}
      className={pillClass}
    >
      <IconCircle />
      {text && <span>{text}</span>}
    </button>
  )
}
