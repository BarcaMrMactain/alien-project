"use client";

import { useEffect, useState } from "react";
import type { Contact } from "@/types/contact";
import { useRouter } from "next/navigation";
import type { Content } from "@/types/content";
import EditContentForm from "@/components/EditContentForm";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState<Content[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function loadContacts() {
      try {
        const response = await fetch("/api/admin/contacts");

        if (!response.ok) {
          throw new Error("Could not load contacts");
        }

        const data: Contact[] = await response.json();

        setContacts(data);
      } catch (error) {
        console.error("Error loading contacts:", error);
        setMessage("Could not load contact messages.");
      } finally {
        setIsLoading(false);
      }
    }

    async function loadContent() {
      try {
        const response = await fetch("/api/content");

        if (!response.ok) {
          throw new Error("Could not load content");
        }

        const data: Content[] = await response.json();

        setContent(data);
      } catch (error) {
        console.error("Error loading content:", error);
      }
    }

    loadContacts();
    loadContent();
  }, []);

  function handleContentUpdated(updatedContent: Content) {
    setContent((currentContent) =>
      currentContent.map((item) =>
        item.id === updatedContent.id ? updatedContent : item,
      ),
    );
  }

  async function logout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Could not log out");
      }

      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setMessage("Could not log out.");
    }
  }

  async function deleteContact(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not delete message");
      }

      setContacts((currentContacts) =>
        currentContacts.filter((contact) => contact.id !== id),
      );
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Could not delete the message.");
    }
  }

  if (isLoading) {
    return <p className="mt-8 text-white/60">Loading messages...</p>;
  }

  return (
    <>
      <section className="mt-16">
        <p className="text-sm uppercase tracking-[0.3em] text-red-500">
          Content management
        </p>

        <h2 className="mt-2 text-2xl font-bold uppercase">Edit Content</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {content.map((item) => (
            <EditContentForm
              key={item.id}
              item={item}
              onUpdated={handleContentUpdated}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">
              Incoming transmissions
            </p>

            <h2 className="mt-2 text-2xl font-bold uppercase">
              Contact Messages
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-white/50">{contacts.length} messages</p>

            <button
              onClick={logout}
              className="border border-white/20 px-4 py-2 text-sm uppercase tracking-widest transition hover:border-red-500 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>

        {message && <p className="mb-6 text-red-400">{message}</p>}

        {contacts.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-8 text-center text-white/60">
            No messages found.
          </div>
        ) : (
          <div className="grid gap-5">
            {contacts.map((contact) => (
              <article
                key={contact.id}
                className="rounded-xl border border-red-900/60 bg-white/5 p-6"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <h3 className="text-xl font-semibold">{contact.name}</h3>

                    <p className="mt-1 text-sm text-red-400">{contact.email}</p>
                  </div>

                  <p className="text-sm text-white/40">
                    {new Date(contact.created_at).toLocaleString()}
                  </p>
                </div>

                <p className="mt-5 leading-7 text-white/70">
                  {contact.comment}
                </p>

                <button
                  onClick={() => deleteContact(contact.id)}
                  className="mt-5 border border-red-800 px-4 py-2 text-sm uppercase tracking-widest text-red-400 transition hover:bg-red-900/30"
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
