"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "@/types/menu";

type SortFilterProps = {
  sortFilter: Menu[] | null;
};

export default function SortFilter({ sortFilter }:SortFilterProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="flex gap-2">
      <button
        className={`whitespace-nowrap px-6 py-2 rounded-full font-bold text-sm transition
          ${isHovering 
            ? "bg-white text-slate-600 border border-slate-200" 
            : "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
          }`}
      >
        Tất cả đề thi
      </button>
      {sortFilter?.map((link, index) => (
        <Link key={index} href={link.slug || "#"}>
          <button
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="whitespace-nowrap bg-white text-slate-600 hover:bg-indigo-600 hover:text-white px-6 py-2 rounded-full font-bold border border-slate-200 text-sm"
          >
            {link.name}
          </button>
        </Link>
      ))}
    </div>
  );
}