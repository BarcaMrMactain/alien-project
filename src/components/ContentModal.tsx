"use client";

import { useEffect, useState } from "react";
import type { Content } from "@/types/content";

interface ContentModalProps {
  data: Content;
  onClose: () => void;
  isFirstOpen: boolean;
}

export default function ContentModal({
  data,
  onClose,
  isFirstOpen,
}: ContentModalProps) {
  const [visible, setVisible] = useState(!isFirstOpen);

  useEffect(() => {
    if (!isFirstOpen) {
      setVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [isFirstOpen]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 px-4 pb-6 pt-24 md:pt-28"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`relative max-h-[calc(100vh-8rem)] w-full max-w-4xl overflow-y-auto
        border border-[#BF532C] bg-black/70 px-5 pb-5 pt-8 text-white shadow-2xl
        transition-opacity sm:px-6 sm:pb-6 md:px-8 md:pb-8
        ${isFirstOpen ? "duration-[3000ms]" : "duration-0"}
        ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 cursor-pointer text-3xl text-white transition hover:text-[#BF532C]"
          aria-label="Close modal"
        >
          ✕
        </button>

        <p className="mb-2 pr-10 text-xs uppercase tracking-[0.35em] text-[#BF532C] sm:text-sm">
          {data.paragraph}
        </p>

        <h2 className="mb-6 pr-10 text-3xl font-bold uppercase md:text-4xl">
          {data.name}
        </h2>

        <img
          src={`/images/${data.img}`}
          alt={data.name}
          className="mb-8 max-h-72 w-full object-cover"
        />

        <div className="space-y-7">
          {data.content.map((item, index) => (
            <article key={index}>
              {item.headline && (
                <h3 className="mb-2 text-lg font-bold uppercase text-[#BF532C] md:text-xl">
                  {item.headline}
                </h3>
              )}

              <div
                className="leading-7 text-white/80"
                dangerouslySetInnerHTML={{
                  __html: item.text,
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}