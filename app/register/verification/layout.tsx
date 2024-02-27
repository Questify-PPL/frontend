

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center h-full min-h-fit">
      {children}
    </section>
  );
}
