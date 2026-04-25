'use client';

import React from "react"
import { BookOpen, ChevronDown } from "lucide-react"

export const FancyAccordionButton = () => {
  return (
    <div
      className="group relative p-4 rounded-xl backdrop-blur-xl border-2 border-primary/30 bg-gradient-to-br from-primary/20 via-background/60 to-background/80 shadow-lg hover:shadow-primary/20 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-out cursor-pointer hover:border-primary/60 overflow-hidden w-full"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
      ></div>

      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>

      <div className="relative z-10 flex items-center gap-4">
        <div
          className="p-3 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300"
        >
          <BookOpen className="w-6 h-6 text-primary group-hover:text-primary/90 transition-all duration-300 group-hover:scale-110 drop-shadow-lg" />
        </div>
        <div className="flex-1 text-left">
          <p
            className="text-primary font-bold text-base group-hover:text-primary/90 transition-colors duration-300 drop-shadow-sm"
          >
            Read The Guide
          </p>
          <p
            className="text-primary/60 text-sm group-hover:text-primary/80 transition-colors duration-300"
          >
            Step-by-step instructions
          </p>
        </div>
        <div
          className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
        >
          <ChevronDown className="w-5 h-5 text-primary transition-transform duration-500 group-data-[state=open]:-rotate-180" />
        </div>
      </div>
    </div>
  )
}
