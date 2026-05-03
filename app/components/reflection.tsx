type Props = {
  children: string
  style?: React.CSSProperties
  clipHeight?: string
}

export default function Reflection({ children, style, clipHeight = '1.25rem' }: Props) {
  return (
    <div style={{ height: clipHeight, overflow: 'hidden', marginTop: '-0.22em' }}>
      <span aria-hidden="true" className="reflect" style={style}>
        {children}
      </span>
    </div>
  )
}
