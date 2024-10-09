import React, { useState, useEffect } from 'react';
const images = [
    'https://i.etsystatic.com/36512667/r/il/4ee179/4304450910/il_1588xN.4304450910_pkdt.jpg',
  'https://as2.ftcdn.net/v2/jpg/01/79/81/77/1000_F_179817756_QzTocli57q9G6a1Oe7kJtoMS5dNMU8cl.jpg',
   'https://img.freepik.com/free-photo/front-view-smiley-women-with-healthy-food_23-2149894923.jpg?w=1480&t=st=1726766785~exp=1726767385~hmac=cfe99e4ac162684745a4d287a9ba4f0495847971e7003c9d0054124b4e4fc2b3',
   'https://img.freepik.com/premium-photo/healthy-lifestyle-concept-eating-clean-food-good-health-dietary-heart-dish-with-sporty-aerobic_660230-203096.jpg?w=1380',
  'https://img.freepik.com/premium-photo/healthy-lifestyle-fitness-inspiration_332713-23343.jpg?w=1480',
  'https://img.freepik.com/premium-photo/fitness-food_1106939-89060.jpg?w=1480',
   'https://img.freepik.com/free-photo/fit-individual-doing-sport_23-2151764345.jpg?t=st=1726767467~exp=1726771067~hmac=ff6a82cc0cc80e378cb7c794772619c61fa4571a90bb0ef8d3c8879b9052642e&w=1480',
    'https://img.freepik.com/free-photo/data-stats-around-person-doing-physical-activity_23-2150165182.jpg?t=st=1726767251~exp=1726770851~hmac=3d8a1c5641ac0856f2122084d040e1512f39f8d948aa7200d731a4315e8e4fe2&w=1480',
  'https://img.freepik.com/premium-photo/healthy-lifestyle-food-heart-shape-dumbbells-abstract-fitness-wellness-concept-white-boards_937679-30444.jpg?w=1480'
];

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);  

    return () => clearInterval(interval);  
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center', height: '400px' }}>
      <img 
        src={images[currentImageIndex]} 
        alt="Carousel" 
        style={{
          width: '100%',  
          maxWidth: '500px',  
          height: '100%',  
          maxHeight: '300px', 
          objectFit: 'cover',  
        }}
      />
    </div>
  );
};

export default ImageCarousel;
