'use client';
import { useEffect, useRef } from 'react';

export function AdsterraNativeBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.loaded) return;
    ref.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true; s.setAttribute('data-cfasync', 'false');
    s.src = 'https://pl29147404.profitablecpmratenetwork.com/02b53504adddb100292d84913e06c5cf/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} id="container-02b53504adddb100292d84913e06c5cf" style={{ margin: '1.5rem 0', minHeight: '90px' }} />;
}
