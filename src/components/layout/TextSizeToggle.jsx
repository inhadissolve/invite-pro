"use client";

import { useState } from "react";

export default function TextSizeToggle() {
  const [large, setLarge] = useState(false);

  const toggleTextSize = () => {
    const next = !large;
    setLarge(next);
    document.documentElement.classList.toggle("large-text", next);
  };

  return (
    <button
      className="text-size-toggle"
      type="button"
      onClick={toggleTextSize}
      aria-pressed={large}
      aria-label={large ? "기본 글씨 크기로 보기" : "큰 글씨로 보기"}
    >
      <span aria-hidden="true">가</span>
      <strong>{large ? "기본 글씨" : "글씨 크게"}</strong>
    </button>
  );
}
