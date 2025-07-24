"use client";

import React, { useRef, useEffect } from "react";
import { navLinks } from "../../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const containerRef = useRef(null); // Reference for the scrollable content

  useGSAP(() => {
    const animation = gsap.fromTo(
      navRef.current,
      {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current || document.body, // Use body or content as trigger
          start: "top 10%", // Trigger when 10% of the page is scrolled
          end: "top -10%", // End when near the top again
          toggleActions: "play none reverse none", // Play on scroll down, reverse on scroll up
          invalidateOnRefresh: true, // Recalculate trigger points on scroll refresh
          // markers: true, // Uncomment for debug markers
        },
      }
    );

    // Optional: Refresh ScrollTrigger on scroll to ensure dynamic recalculation
    ScrollTrigger.addEventListener("scroll", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      // Cleanup: Kill the animation and ScrollTrigger on unmount
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Ensure the page is scrollable
  return (
    <div ref={containerRef} >
      <nav
        ref={navRef}
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
      >
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="logo" />
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