export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-4 md:p-8">{children}</div>;
}
