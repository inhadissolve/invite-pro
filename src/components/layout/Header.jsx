import Image from "next/image";

import { EVENT } from "@/constants/event";
import TextSizeToggle from "./TextSizeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-brand" href="#top" aria-label="초대장 맨 위로 이동">
          <Image
            src={EVENT.assets.logo}
            alt=""
            width={44}
            height={44}
            priority
          />
          <span>
            <strong>{EVENT.organization}</strong>
            <small>{EVENT.title} 초대장</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="초대장 주요 메뉴">
          <a href="#schedule">일정</a>
          <a href="#directions">오시는 길</a>
          <a href="#contact">문의</a>
        </nav>

        <TextSizeToggle />
      </div>
    </header>
  );
}
