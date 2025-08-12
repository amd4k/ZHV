export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&h=1000"
          alt="Luxury jewelry collection display"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-widest">ZAH</h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Exquisite jewelry crafted for the discerning soul. Each piece tells a story of elegance and timeless beauty.
        </p>
        <button className="bg-white/20 hover:bg-white/30 frosted-glass text-white px-8 py-4 rounded-full font-medium smooth-transition border border-white/20">
          Explore Collection
        </button>
      </div>
    </section>
  );
}
