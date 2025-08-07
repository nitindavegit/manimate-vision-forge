import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const useGSAPFadeIn = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [delay]);

  return ref;
};

export const useGSAPStagger = (staggerDelay = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const children = ref.current.children;
      
      gsap.fromTo(children,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: staggerDelay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [staggerDelay]);

  return ref;
};

export const useGSAPHero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(ref.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: 15
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "power4.out"
        }
      );

      // Add floating animation
      gsap.to(ref.current, {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: 1.5
      });
    }
  }, []);

  return ref;
};

export const useGSAPButton = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) {
      const button = ref.current;

      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return ref;
};

export const useGSAPTextReveal = () => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      const text = ref.current;
      const words = text.textContent?.split(' ') || [];
      
      text.innerHTML = words.map(word => 
        `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
      ).join(' ');

      const wordElements = text.querySelectorAll('span span');

      gsap.fromTo(wordElements,
        {
          y: '100%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return ref;
};