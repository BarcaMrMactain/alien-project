"use client";

import { FormEvent, useState } from "react";
import type { Content } from "@/types/content";

interface EditContentFormProps {
  item: Content;
  onUpdated: (updatedContent: Content) => void;
}

export default function EditContentForm({
  item,
  onUpdated,
}: EditContentFormProps) {
  const [name, setName] = useState(item.name);
  const [paragraph, setParagraph] = useState(item.paragraph);
  const [img, setImg] = useState(item.img);

  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/content/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            paragraph,
            img,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not update content");
      }

      onUpdated(data);
      setMessage("Content updated.");
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Could not update content.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <h3 className="mb-5 text-xl font-bold uppercase">
        {item.name}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm uppercase tracking-widest">
            Name
          </label>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm uppercase tracking-widest">
            Paragraph
          </label>

          <input
            value={paragraph}
            onChange={(event) => setParagraph(event.target.value)}
            className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm uppercase tracking-widest">
            Image
          </label>

          <input
            value={img}
            onChange={(event) => setImg(event.target.value)}
            className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="border border-red-800 px-5 py-2 text-sm uppercase tracking-widest text-red-400 transition hover:bg-red-900/30 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>

        {message && (
          <p className="text-sm text-white/60">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}