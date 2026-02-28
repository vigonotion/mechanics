import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { getRandomMechanics, Mechanic } from "./mechanics-data";
import MechanicCard from "./MechanicCard";

export default function App() {
  const [selected, setSelected] = useState<Mechanic[]>(() =>
    getRandomMechanics(3)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Initial load animation
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 60 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      delay: 0.3,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  const handleRoll = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Button bounce
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.15,
            ease: "back.out(3)",
          });
        },
      });
    }

    // Cards flip out
    gsap.to(cards, {
      rotateY: 90,
      scale: 0.8,
      stagger: 0.08,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Swap data while cards are hidden
        setSelected(getRandomMechanics(3));

        // Wait for React re-render then flip cards in
        requestAnimationFrame(() => {
          const freshCards = cardsRef.current.filter(
            Boolean
          ) as HTMLDivElement[];

          // Hide text before flip so it's not visible during rotation
          const texts = freshCards.flatMap((c) =>
            Array.from(c.querySelectorAll(".card-text"))
          );
          gsap.set(texts, { opacity: 0, y: 12 });

          gsap.fromTo(
            freshCards,
            { rotateY: -90, scale: 0.8 },
            {
              rotateY: 0,
              scale: 1,
              stagger: 0.12,
              duration: 0.4,
              ease: "back.out(1.4)",
              onComplete: () => {
                // Fade in card text after flip
                gsap.to(texts, {
                  opacity: 1,
                  y: 0,
                  stagger: 0.04,
                  duration: 0.3,
                  ease: "power2.out",
                  onComplete: () => setIsAnimating(false),
                });
              },
            }
          );
        });
      },
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Spielmechanik-Generator</h1>
        <p className="app-subtitle">
          Entdecke zufällige Spielmechaniken für dein nächstes Brettspiel
        </p>
      </header>

      <div className="cards-container">
        {selected.map((mechanic, index) => (
          <MechanicCard
            key={index}
            mechanic={mechanic}
            index={index}
            cardRef={(el) => {
              cardsRef.current[index] = el;
            }}
          />
        ))}
      </div>

      <div className="button-container">
        <button
          ref={buttonRef}
          className="roll-button"
          onClick={handleRoll}
          disabled={isAnimating}
        >
          🎲 Würfeln!
        </button>
        <span className="roll-hint">
          3 zufällige Mechaniken aus 192 BGG-Einträgen
        </span>
      </div>
    </div>
  );
}
