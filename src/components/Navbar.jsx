"use client";

import React, { useRef } from "react";
import { navLinks } from "../../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { background: "transparent", backdropFilter: "blur(0px)" },
      {
        background: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top 10%",
          end: "top top",
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef}>
      <nav
        ref={navRef}
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000, overflow: "hidden" }}
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" style={{ maxWidth: "100%", height: "auto" }} />
            <p>Velvet Pour</p>
          </a>
          <ul className="flex space-x-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-white hover:text-gray-300">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;