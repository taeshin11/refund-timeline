'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147403.profitablecpmratenetwork.com/00/10/4f/00104f227d37ce688bcf790219f0af65.js", "https://pl29147406.profitablecpmratenetwork.com/c2/f0/98/c2f0987dc7aa09d4d23f722167a02c44.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
