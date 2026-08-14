"use client";

import Script from "next/script";
import { useState } from "react";

import { EVENT } from "@/constants/event";
import { initKakao, shareInvite } from "@/lib/kakao";

export default function QuickActions() {
  const [message, setMessage] = useState("");
  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";
  const primaryContact = EVENT.contacts[0];

  const handleShare = async () => {
    setMessage("");

    try {
      const result = await shareInvite();
      if (result === "copied") {
        setMessage("초대장 주소를 복사했습니다.");
      }
    } catch {
      setMessage("공유하지 못했습니다. 잠시 후 다시 눌러 주세요.");
    }
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => {
          if (appKey) initKakao(appKey);
        }}
      />

      <nav className="quick-actions" aria-label="빠른 실행 메뉴">
        <a href={`sms:${primaryContact.phone}`}>
          <span className="quick-actions__icon" aria-hidden="true">
            ✉
          </span>
          <strong>문자 문의</strong>
        </a>
        <a href="#directions">
          <span className="quick-actions__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.75" />
            </svg>
          </span>
          <strong>길찾기</strong>
        </a>
        <button type="button" onClick={handleShare}>
          <span className="quick-actions__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
            </svg>
          </span>
          <strong>공유하기</strong>
        </button>
      </nav>
      <p className="share-status sr-only" aria-live="polite">
        {message}
      </p>
    </>
  );
}
