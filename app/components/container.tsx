export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="p-4 md:p-8 w-full">{children}</div>;
}
