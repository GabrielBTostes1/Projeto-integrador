 const slides = document.getElementById("slides");
        const totalSlides = slides.children.length;
        let currentIndex = 0;
        let autoSlideInterval = null;

        function updateSlide() {
          slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
          currentIndex = (currentIndex + 1) % totalSlides;
          updateSlide();
          resetAutoSlide();
        }


        function startAutoSlide() {
          autoSlideInterval = setInterval(() => {
            nextSlide();
          }, 5000);
        }

        function resetAutoSlide() {
          clearInterval(autoSlideInterval);
          startAutoSlide();
        }

        startAutoSlide();