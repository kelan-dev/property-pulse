"use client";

import { useState, useEffect } from "react";
import Spinner from "./spinner";
import Message from "./message";

export const dynamic = "force-dynamic";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    try {
      const res = await fetch("/api/messages");

      if (res.status === 200) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.log("Error fetching messages: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Spinner loading={isLoading} />;

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-6xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((msg) => (
                <Message key={msg._id} message={msg} onDelete={getMessages} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
