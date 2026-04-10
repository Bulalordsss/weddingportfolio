'use client';

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import MailSection from "./(sections)/mail-section";
import InfoSection from "./(sections)/info-section";
import FaqSection from "./(sections)/faq-section";
import RsvpSection from "./(sections)/rsvp-section";
import TestimonialsSection from "./(sections)/testimonials-section";

export default function Home() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(true);
  const [isPolaroidViewerOpen, setIsPolaroidViewerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isInvitationOpened ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isInvitationOpened]);

  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide navbar while hero is visible (any part).
        setHideNavbar(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onViewerToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ open?: boolean }>;
      setIsPolaroidViewerOpen(Boolean(customEvent.detail?.open));
    };

    window.addEventListener("polaroid-viewer-toggle", onViewerToggle as EventListener);
    return () =>
      window.removeEventListener(
        "polaroid-viewer-toggle",
        onViewerToggle as EventListener,
      );
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);

    window.setTimeout(() => {
      const heroSection = document.getElementById("hero");
      heroSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-white">
      <MailSection isOpen={isInvitationOpened} onOpen={handleOpenInvitation} />

      <Navbar hidden={!isInvitationOpened || hideNavbar || isPolaroidViewerOpen} />

      <Hero />
      <TestimonialsSection />

      <InfoSection />
      <FaqSection />
      <RsvpSection />
    </div>
  );
}
