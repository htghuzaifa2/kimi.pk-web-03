
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useIsMobile } from "@/hooks/use-mobile";
import { gsap } from "gsap";

const images = PlaceHolderImages.slice(0, 20); // Use first 20 images

type ImageState = {
  id: string;
  src: string;
  alt: string;
  left: number;
  top: number;
  zIndex: number;
  status: "inactive" | "active";
  ref: React.RefObject<HTMLImageElement | null>;
};

export default function NotFound() {
  const [imageStates, setImageStates] = useState<ImageState[]>([]);
  const globalIndex = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setImageStates(
      images.map((img) => ({
        id: img.id,
        src: img.imageUrl,
        alt: img.description,
        left: 0,
        top: 0,
        zIndex: 0,
        status: "inactive",
        ref: React.createRef<HTMLImageElement>(),
      }))
    );
  }, [isClient]);

  const clearAllImages = useCallback(() => {
    setImageStates(prevStates =>
      prevStates.map(img => ({ ...img, status: 'inactive' }))
    );
  }, []);

  const activateImage = useCallback((x: number, y: number) => {
    const index = globalIndex.current % images.length;

    setImageStates((prevStates) => {
      const newStates = [...prevStates];
      const imageState = newStates[index];
      if (imageState) {
        newStates[index] = {
          ...imageState,
          left: x,
          top: y,
          zIndex: globalIndex.current,
          status: "active",
        };

        if (imageState.ref.current) {
          gsap.fromTo(imageState.ref.current,
            { x: 0, y: 0, opacity: 1 },
            {
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
              onComplete: () => {
                setImageStates(prev => {
                  const states = [...prev];
                  const currentImage = states[index];
                  if (currentImage) {
                    states[index] = { ...currentImage, status: 'inactive' };
                  }
                  return states;
                });
              }
            }
          );
        }
      }
      return newStates;
    });

    lastPosition.current = { x, y };
    globalIndex.current += 1;

  }, []);

  const handleInteraction = useCallback((e: MouseEvent | TouchEvent) => {
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const distanceFromLast = Math.hypot(
      clientX - lastPosition.current.x,
      clientY - lastPosition.current.y
    );

    const isClick = e.type === 'click' || e.type === 'touchstart';

    if (isClick || distanceFromLast > window.innerWidth / 120) {
      activateImage(clientX, clientY);
    }

    idleTimeout.current = setTimeout(clearAllImages, 500);

  },
    [activateImage, clearAllImages]
  );

  useEffect(() => {
    if (!isClient || !mainRef.current) return;

    const mainEl = mainRef.current;

    mainEl.addEventListener("mousemove", handleInteraction);
    mainEl.addEventListener("touchmove", handleInteraction, { passive: true });

    return () => {
      mainEl.removeEventListener("mousemove", handleInteraction);
      mainEl.removeEventListener("touchmove", handleInteraction);
      if (idleTimeout.current) {
        clearTimeout(idleTimeout.current);
      }
    };
  }, [handleInteraction, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <main ref={mainRef} className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white-500/10 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black -z-10" />

      {imageStates.map((img) => (
        <Image
          key={img.id}
          ref={img.ref}
          src={img.src}
          alt={img.alt}
          width={150}
          height={225}
          className={`
            absolute rounded-lg object-cover pointer-events-none -z-10
            ${img.status === "active" ? "opacity-100" : "opacity-0"
            }
          `}
          style={{
            left: `${img.left}px`,
            top: `${img.top}px`,
            zIndex: img.zIndex,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold font-headline text-white leading-tight">
          Empty canvas humm.
        </h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-md">
          That's how we like to start.
        </p>
      </div>
      <div className="relative z-10 mt-8">
        <Button asChild variant="outline" className="bg-white text-black hover:bg-neutral-200 hover:text-black">
          <Link href="/">Lost? Lets Return to Home</Link>
        </Button>
      </div>
    </main>
  );
}
