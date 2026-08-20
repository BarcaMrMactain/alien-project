"use client";

import ContactModal from "@/components/ContactModal";
import { useState } from "react";
import IntroModal from "@/components/IntroModal";
import ContentModal from "@/components/ContentModal";
import type { Content } from "@/types/content";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  const [hasOpenedContentModal, setHasOpenedContentModal] = useState(false);

  const [showContact, setShowContact] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showClosedText, setShowClosedText] = useState(false);

  function closeIntro() {
    setShowIntro(false);

    setTimeout(() => {
      setShowClosedText(true);
    }, 50);
  }

  async function openContent(id: number) {
    try {
      setShowContact(false);
      setShowClosedText(false);

      const response = await fetch(`/api/content/${id}`);

      if (!response.ok) {
        throw new Error("Kunne ikke hente content");
      }

      const data: Content = await response.json();

      setSelectedContent(data);

      if (!hasOpenedContentModal) {
        setHasOpenedContentModal(true);
      }
    } catch (error) {
      console.error("Fejl ved hentning af content:", error);
    }
  }

  function closeContent() {
    setSelectedContent(null);

    setTimeout(() => {
      setShowClosedText(true);
    }, 50);
  }

  function closeContact() {
    setShowContact(false);

    setTimeout(() => {
      setShowClosedText(true);
    }, 50);
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: "url('/images/alien_bg_red.jpg')",
      }}
    >
      {showIntro && <IntroModal onClose={closeIntro} />}

      {selectedContent && (
        <ContentModal
          data={selectedContent}
          onClose={closeContent}
          isFirstOpen={!hasOpenedContentModal}
        />
      )}

      {showContact && <ContactModal onClose={closeContact} />}

      <div className="min-h-screen bg-black/30">
        <header className="relative z-50 flex items-center gap-8 px-6 py-6 md:px-8">
          <h1 className="text-2xl font-bold tracking-[0.3em]">ALIEN</h1>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl md:hidden"
            aria-label="Open navigation"
          >
            ☰
          </button>

          <nav
            className={`
      absolute left-0 top-full z-30 w-full bg-black/95
      px-6 py-6
      md:static md:w-auto md:bg-transparent md:p-0
      ${menuOpen ? "block" : "hidden md:block"}
    `}
          >
            <ul className="flex flex-col gap-3 text-[16px] uppercase md:flex-row md:gap-2 md:text-[25px]">
              <li>
                <button
                  onClick={() => {
                    openContent(1);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 transition ${
                    selectedContent?.id === 1
                      ? "bg-[#BF532C] text-black"
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Beyond
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    openContent(2);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 transition ${
                    selectedContent?.id === 2
                      ? "bg-[#BF532C] text-black"
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Story
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    openContent(3);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 transition ${
                    selectedContent?.id === 3
                      ? "bg-[#BF532C] text-black"
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Alien
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    openContent(4);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-2 transition ${
                    selectedContent?.id === 4
                      ? "bg-[#BF532C] text-black"
                      : "bg-black text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Universe
                </button>
              </li>

              <button
                onClick={() => {
                  setSelectedContent(null);
                  setShowClosedText(false);
                  setShowContact(true);
                  setMenuOpen(false);
                }}
                className={`fixed bottom-0 right-0 z-50 px-6 py-3 text-lg uppercase transition md:text-xl ${
                  showContact
                    ? "bg-[#BF532C] text-black"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                Contact
              </button>
            </ul>
          </nav>
        </header>

        <section className="flex min-h-[80vh] items-center justify-center px-6">
          {!showIntro && (
            <div
              className={`transition-opacity duration-2000 ${
                showClosedText ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/70 md:text-sm md:tracking-[0.5em]">
                Modal closed.
              </p>

              <h2 className="mt-4 text-4xl font-bold uppercase sm:text-5xl md:text-7xl">
                The Alien Stays...
              </h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
