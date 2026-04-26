export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1040px] px-5 md:px-10">{children}</div>
  )
}
