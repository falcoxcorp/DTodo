import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FoodSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: 'https://photos.pinksale.finance/file/pinksale-logo-upload/1759876443566-f890cf77cc84a90370fb10209d3febd1.png',
      title: 'Combos de Comida',
      description: 'Deliciosos combos para toda la familia'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  };

  if (slides.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-br from-orange-50 to-red-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div className="relative aspect-[16/6] sm:aspect-[21/9]">
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                  {slides[currentIndex].title}
                </h2>
                <p className="text-sm sm:text-lg lg:text-xl drop-shadow-md max-w-2xl">
                  {slides[currentIndex].description}
                </p>
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-8 h-2 bg-white'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ir a diapositiva ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodSlider;
