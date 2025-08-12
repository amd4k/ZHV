export default function Collections() {
  const collections = [
    {
      title: "Bridal Collection",
      description: "Exquisite pieces crafted for your most precious moments. Traditional designs with contemporary elegance.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      alt: "Bridal collection featuring elaborate necklaces and jewelry sets"
    },
    {
      title: "Contemporary Collection",
      description: "Modern designs for the contemporary woman. Minimalist aesthetics with maximum impact.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      alt: "Contemporary collection with minimalist earrings and modern designs"
    },
    {
      title: "Heritage Collection",
      description: "Timeless traditional designs passed down through generations. Rich cultural heritage in every piece.",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300",
      alt: "Heritage collection showcasing traditional Indian jewelry with intricate craftsmanship"
    }
  ];

  return (
    <div id="collections">
      <h2 className="text-3xl font-light mb-8">Our Collections</h2>
      <div className="space-y-6">
        {collections.map((collection, index) => (
          <div key={index} className="group">
            <img
              src={collection.image}
              alt={collection.alt}
              className="w-full h-48 object-cover rounded-lg mb-4 group-hover:shadow-lg smooth-transition"
            />
            <h3 className="text-xl font-medium mb-2">{collection.title}</h3>
            <p className="text-zah-charcoal mb-4">{collection.description}</p>
            <a href="#" className="text-zah-gold hover:text-yellow-600 font-medium">
              Explore Collection →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
