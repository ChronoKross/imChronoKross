function Hero({ title, description }) {
  return (
    <div className=" mt-8 ml-5 mr-5 bg-black">
      <header className=" z-10 flex justify-center pb-8">
        <div className="relative w-full h-full">
          <img
            src="https://d3h0048cs86i3g.cloudfront.net/95ff5b81-20b8-4cf2-ba4e-35a13eff2dd4.webp"
            alt="CloudFront Image"
            className="w-full h-full object-contain rounded-xl"
          />
          <div className="absolute inset-0 bg-black opacity-15 rounded-xl"></div>
        </div>
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
