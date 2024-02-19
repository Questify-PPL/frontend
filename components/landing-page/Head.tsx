export function Head({ content }: { content: string }) {
  return (
    <h1 className="text-2xl max-w-xs sm:text-4xl sm:max-w-lg md:text-5xl md:max-w-2xl lg:text-6xl lg:max-w-4xl font-bold text-primary text-center">
      {content}
    </h1>
  );
}
