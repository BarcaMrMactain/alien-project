"use client";

interface IntroModalProps {
  onClose: () => void;
}

export default function IntroModal({ onClose }: IntroModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-10">
      <div className="relative w-full max-w-5xl overflow-hidden border border-[#BF532C] bg-black shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[110] text-3xl text-white transition hover:text-[#BF532C]"
          aria-label="Close intro"
        >
          ✕
        </button>

        <video
          autoPlay
          muted
          playsInline
          onEnded={onClose}
          className="max-h-[75vh] w-full object-contain"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
