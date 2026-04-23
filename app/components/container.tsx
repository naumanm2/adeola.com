export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">{children}</div>
  )
}
