"use client";

import { useGlobalContext } from "@/context/global-context";
import React, { useState, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

export const dynamic = "force-dynamic";

export default function Message({ message, onDelete }) {
  const [isRead, setIsRead] = useState(message.read);
  const { setUnreadMsgCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        if (read) {
          toast.success("Marked as read.");
          setUnreadMsgCount((s) => s - 1);
        } else {
          toast.success("Marked as new.");
          setUnreadMsgCount((s) => s + 1);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success("Message Deleted.");
        setUnreadMsgCount((s) => s - 1);
        onDelete();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      {!isRead && (
        <div className="absolute right-2 top-2 rounded-md bg-yellow-500 px-2 py-1 text-white">
          New
        </div>
      )}
      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mr-3 mt-4 rounded-md ${isRead ? "bg-gray-300" : "bg-blue-500 text-white"} px-3 py-1`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white"
      >
        Delete
      </button>
    </div>
  );
}
