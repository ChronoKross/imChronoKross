function Hero({ title, description }) {
  return (
    <div>
      <header className="pt-20">
        <img
          src="https://d3h0048cs86i3g.cloudfront.net/95ff5b81-20b8-4cf2-ba4e-35a13eff2dd4.webp"
          alt="CloudFront Image"
          className="w-full h-64 object-contain rounded-xl"
        />
      </header>
      <main>
        <div className="hero-content text-center max-w-md mx-auto">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
        </div>
      </main>
    </div>
  );
}

export default Hero;
