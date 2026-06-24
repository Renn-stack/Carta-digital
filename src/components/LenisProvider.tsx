import { createContext, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = createContext<Lenis | null>(null);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    function onScroll(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(onScroll);
    gsap.ticker.lagSmoothing(0);

    // Link Lenis scroll to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, 0) : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    return () => {
      gsap.ticker.remove(onScroll);
      ScrollTrigger.removeEventListener('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
