"use client";

import { FormEvent, useState } from "react";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSending(true);
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kunne ikke sende beskeden");
      }

      setMessage("Message sent successfully.");

      setName("");
      setEmail("");
      setComment("");
    } catch (error) {
      console.error(error);

      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-black/60 px-4 pb-6 pt-24 md:pt-28">
      <div className="relative mx-auto w-full max-w-xl border border-[#BF532C] bg-black/70 p-5 text-white shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-3xl text-white transition hover:text-[#BF532C]"
          aria-label="Close contact modal"
        >
          ✕
        </button>

        <p className="mb-2 pr-10 text-xs uppercase tracking-[0.4em] text-[#BF532C] sm:text-sm">
          Contact
        </p>

        <h2 className="mb-8 pr-10 text-3xl font-bold uppercase">
          Send a message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm uppercase tracking-widest"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full border border-white/30 bg-black/60 px-4 py-3 outline-none transition focus:border-[#BF532C]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm uppercase tracking-widest"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full border border-white/30 bg-black/60 px-4 py-3 outline-none transition focus:border-[#BF532C]"
            />
          </div>

          <div>
            <label
              htmlFor="comment"
              className="mb-2 block text-sm uppercase tracking-widest"
            >
              Comment
            </label>

            <textarea
              id="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
              rows={5}
              className="w-full resize-none border border-white/30 bg-black/60 px-4 py-3 outline-none transition focus:border-[#BF532C]"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-[#BF532C] px-6 py-3 font-bold uppercase tracking-widest text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send"}
          </button>

          {message && (
            <p className="text-center text-sm text-white/70">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
