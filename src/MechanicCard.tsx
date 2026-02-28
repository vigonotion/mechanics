import { useRef } from "react";
import gsap from "gsap";
import { Mechanic, CATEGORY_ICONS } from "./mechanics-data";

interface MechanicCardProps {
  mechanic: Mechanic;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

export default function MechanicCard({ mechanic, index, cardRef }: MechanicCardProps) {
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRef = (el: HTMLDivElement | null) => {
    localRef.current = el;
    cardRef(el);
  };

  const handleMouseEnter = () => {
    if (!localRef.current) return;
    gsap.to(localRef.current, {
      y: -6,
      boxShadow: [
        "0 16px 48px rgba(0,0,0,0.7)",
        "0 4px 10px rgba(0,0,0,0.5)",
        "inset 0 0 60px rgba(200,168,75,0.1)",
        "0 0 30px rgba(200,168,75,0.2)",
      ].join(", "),
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!localRef.current) return;
    gsap.to(localRef.current, {
      y: 0,
      boxShadow: [
        "0 8px 32px rgba(0,0,0,0.5)",
        "0 2px 6px rgba(0,0,0,0.4)",
        "inset 0 0 60px rgba(200,168,75,0.05)",
        "inset 0 0 2px rgba(92,51,23,0.3)",
      ].join(", "),
      duration: 0.35,
      ease: "power2.inOut",
    });
  };

  const iconUrl =
    CATEGORY_ICONS[mechanic.category] ?? CATEGORY_ICONS["abstract"];

  return (
    <div
      className="mechanic-card"
      ref={setRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Corner ornaments */}
      <div className="card-border-inner" />
      <div className="card-corner-bl" />
      <div className="card-corner-br" />

      {/* Icon */}
      <div className="card-icon-wrapper">
        <img
          src={iconUrl}
          alt={mechanic.category}
          className="card-icon"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Category badge */}
      <span className="card-category card-text">{mechanic.category}</span>

      {/* Name */}
      <h2 className="card-name card-text">{mechanic.name}</h2>

      {/* Description */}
      <p className="card-description card-text">{mechanic.description}</p>

      {/* BGG link */}
      <a
        className="card-link card-text"
        href={`https://boardgamegeek.com/boardgamemechanic/${mechanic.id}/${mechanic.slug}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Auf BoardGameGeek ansehen →
      </a>
    </div>
  );
}
