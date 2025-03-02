import React, { useState, useEffect } from 'react';
import './Animation.css';

const ScalingAnimation = () => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const onAnimationEnd = () => {
      setAnimate(false);
    };

    return () => {
      window.removeEventListener('animationend', onAnimationEnd);
    };
  }, []);

  return (
    <div className={`scaling-animation ${animate ? 'animate' : ''}`}>
      <div className='img'>
        <img src="Kol-Play.png" alt="Jumping Image" className="jumping-image" />
        { /*שהתמונה תישאר במקום שלה כל הזמן וכאשר גוללים למטה את הדפדפן היא לא תיגלל למטה*/}
        {/* window.addEventListener('scroll', function() {
    var img = document.getElementById('image');
    img.style.top = window.scrollY + 'px';
}); */}
        <div className='text'>
          <h1 className='h1ani'>ברוכים הבאים לאתר Kol-Play!</h1>
          <h3>האתר שלכם לרכישת פלייבקים באיכות מעולה ומובילה</h3></div>
      </div>
    </div>

  );
};

export default ScalingAnimation;