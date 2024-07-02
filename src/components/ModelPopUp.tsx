"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/SearchPopUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ModalPopUp() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      setModalOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="flex flex-row space-x-20">
        <div className="flex flex-row space-x-2 ">
          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-none text-color8"
              aria-hidden="true"
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
          </div>

          <Input
            autoFocus
            style={{ minWidth: "500px" }}
            className="border-none h-8 bg-color1 focus-visible:ring-offset-0 focus-visible:ring-color4"
            placeholder="Search"
          />
        </div>

        <div className="flex items-center">
          <Button className="h-6 w-3" onClick={closeModal}>
            <span className="text-xs">Esc</span>
          </Button>
        </div>
      </div>
      <hr className="border-t border-color4 my-2" />

      <div className="flex justify-center">
        <p className="text-center">No recent searches</p>
      </div>
    </Modal>
  );
}
