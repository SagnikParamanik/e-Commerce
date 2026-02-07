export function HeroSection() {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-card">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-sides py-12 md:py-20 max-w-5xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Welcome to ACME
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-tight text-foreground mb-6 text-balance">
          Curated Excellence
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover a carefully selected collection of premium products designed for those who value quality and sophistication.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/shop"
            className="px-8 py-3 bg-foreground text-background font-semibold rounded hover:bg-foreground/90 transition-colors"
          >
            Shop Collection
          </a>
          <a
            href="#featured"
            className="px-8 py-3 border-2 border-foreground text-foreground font-semibold rounded hover:bg-foreground hover:text-background transition-colors"
          >
            Explore Featured
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-16 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">10K+</p>
            <p className="text-sm text-foreground/60">Happy Customers</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">500+</p>
            <p className="text-sm text-foreground/60">Premium Products</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">4.8★</p>
            <p className="text-sm text-foreground/60">Average Rating</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">24/7</p>
            <p className="text-sm text-foreground/60">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
