"use client";

import { useGlobalContext } from "@/context/global-context";
import React, { useEffect } from "react";

export default function UnreadMessageCount({ session }) {
  const { unreadMsgCount, setUnreadMsgCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");

        if (res.status === 200) {
          const data = await res.json();
          setUnreadMsgCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadMessages();
  }, [session, setUnreadMsgCount]);

  return (
    <>
      {unreadMsgCount > 0 && (
        <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
          {unreadMsgCount}
        </span>
      )}
    </>
  );
}
