import { useState, useEffect, useRef } from 'react';

export default function useCounter(target, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isCounting, setIsCounting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isCounting) {
            setIsCounting(true);
            startCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isCounting]);

  const startCounter = () => {
    let startTime = null;
    const increment = target / (duration / 16);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(Math.floor((progress / duration) * target), target);
      
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  };

  return [count, elementRef];
}