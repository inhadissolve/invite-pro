"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

function ArrowIcon({ direction }) {
  const path = direction === "previous" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function AccessibleCarousel({ items, label, variant = "story" }) {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const moveTo = useCallback(
    (nextIndex, behavior = "smooth") => {
      const safeIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
      const track = trackRef.current;
      const slide = track?.children[safeIndex];

      if (!track || !slide) return;

      track.scrollTo({ left: slide.offsetLeft, behavior });
      setCurrent(safeIndex);
    },
    [items.length],
  );

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const slides = [...track.children];
    const closestIndex = slides.reduce((closest, slide, index) => {
      const currentDistance = Math.abs(slide.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(slides[closest].offsetLeft - track.scrollLeft);
      return currentDistance < closestDistance ? index : closest;
    }, 0);

    setCurrent(closestIndex);
  };

  useEffect(() => {
    const handleResize = () => moveTo(current, "auto");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [current, moveTo]);

  return (
    <div className={`image-carousel image-carousel--${variant}`}>
      <div className="image-carousel__guide">
        <strong aria-live="polite">
          {current + 1} / {items.length}
        </strong>
        <span>옆으로 넘기거나 아래 버튼을 눌러 주세요</span>
      </div>

      <div
        className="image-carousel__track"
        ref={trackRef}
        onScroll={handleScroll}
        aria-label={label}
        tabIndex={0}
      >
        {items.map((item, index) => (
          <figure className="image-carousel__slide" key={item.id}>
            <a
              className="image-carousel__media"
              href={item.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`${item.caption} 원본 이미지 크게 보기`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 759px) calc(100vw - 36px), 920px"
              />
              <span>크게 보기</span>
            </a>
            <figcaption>
              <span aria-hidden="true">{index + 1}</span>
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="image-carousel__controls" aria-label={`${label} 이동 버튼`}>
        <button type="button" onClick={() => moveTo(current - 1)} disabled={current === 0}>
          <ArrowIcon direction="previous" />
          이전
        </button>
        <span aria-hidden="true">
          {items.map((item, index) => (
            <i className={index === current ? "is-current" : ""} key={item.id} />
          ))}
        </span>
        <button
          type="button"
          onClick={() => moveTo(current + 1)}
          disabled={current === items.length - 1}
        >
          다음
          <ArrowIcon direction="next" />
        </button>
      </div>
    </div>
  );
}
