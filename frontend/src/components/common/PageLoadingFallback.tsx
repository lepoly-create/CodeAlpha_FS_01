export default function PageLoadingFallback() {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center">
        {/* Glow ambré circulaire */}
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#e59b22]/20 border-t-[#e59b22]" />
      </div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#524535]/80">
        Chargement...
      </span>
    </div>
  );
}
