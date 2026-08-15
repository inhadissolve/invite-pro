import Image from "next/image";

import AccessibleCarousel from "@/components/AccessibleCarousel";
import QuickActions from "@/components/QuickActions";
import { EVENT, MAP_LINKS } from "@/constants/event";

function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <div>{description}</div> : null}
    </div>
  );
}

function SlotIcon({ type }) {
  if (type === "video") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect x="9" y="13" width="46" height="38" rx="8" />
        <path d="m28 24 14 8-14 8Z" />
      </svg>
    );
  }

  if (type === "person") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="23" r="10" />
        <path d="M14 53c2-11 8-17 18-17s16 6 18 17" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="9" y="12" width="46" height="40" rx="7" />
      <circle cx="23" cy="25" r="5" />
      <path d="m14 46 12-12 8 8 6-6 10 10" />
    </svg>
  );
}

export default function InvitePage() {
  return (
    <div className="invite-page" id="top">
      <section className="hero" aria-labelledby="invite-title">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow">{EVENT.organization}</p>
            <h1 id="invite-title">
              <span>{EVENT.title}</span>
              <strong>{EVENT.invitation}</strong>
            </h1>
            <p className="hero__message">{EVENT.message}</p>

            <dl className="hero-facts" aria-label="집회 핵심 정보">
              <div>
                <dt>강사</dt>
                <dd>
                  {EVENT.speaker.name} {EVENT.speaker.role}
                </dd>
              </div>
              <div>
                <dt>일시</dt>
                <dd>{EVENT.dateRangeShort}</dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>{EVENT.venue.name}</dd>
              </div>
            </dl>

            <div className="hero__links" aria-label="빠른 이동">
              <a className="button button--gold" href="#schedule">
                집회 일정 보기
              </a>
              <a className="button button--outline" href="#directions">
                오시는 길 보기
              </a>
            </div>
            <a
              className="hero__poster-link"
              href={EVENT.assets.posterFront}
              target="_blank"
              rel="noreferrer"
            >
              원본 초대 엽서 크게 보기
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <figure className="poster-card">
            <Image
              src={EVENT.assets.posterFront}
              alt={`${EVENT.organization} 전도집회 초대 엽서. 강사 조민수 목사, 9월 3일부터 6일까지, 인천교회 교육원 농선부실`}
              width={1054}
              height={1492}
              sizes="(max-width: 759px) 1px, 430px"
            />
            <figcaption>전도집회 초대 엽서</figcaption>
          </figure>
        </div>
      </section>

      <section className="summary-band" aria-label="행사 요약">
        <div>
          <span aria-hidden="true">4</span>
          <p>
            <strong>나흘간 진행</strong>
            <small>목요일부터 일요일까지</small>
          </p>
        </div>
        <div>
          <span aria-hidden="true">518</span>
          <p>
            <strong>버스로 오기</strong>
            <small>주안역·인하대역에서 탑승</small>
          </p>
        </div>
        <div>
          <span aria-hidden="true">문자</span>
          <p>
            <strong>간편하게 문의</strong>
            <small>전화번호를 누르면 바로 연결</small>
          </p>
        </div>
      </section>

      <section className="content-section" id="schedule" aria-labelledby="schedule-title">
        <SectionHeading
          id="schedule-title"
          eyebrow="집회 일정"
          title="날짜와 시간을 크게 확인하세요"
          description="참석하실 날짜와 시간을 확인해 주세요."
        />

        <div className="schedule-list">
          {EVENT.sessions.map((session, index) => (
            <article className="schedule-card" key={session.id}>
              <span className="schedule-card__number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <p>
                  {session.date} <strong>{session.weekday}</strong>
                </p>
                <time dateTime={session.iso}>{session.time}</time>
              </div>
            </article>
          ))}
        </div>

        <div className="venue-callout">
          <span className="venue-callout__icon" aria-hidden="true">
            ●
          </span>
          <div>
            <small>모이는 곳</small>
            <strong>{EVENT.venue.name}</strong>
            <p>{EVENT.venue.address}</p>
          </div>
        </div>
      </section>

      <section className="content-section" id="directions" aria-labelledby="directions-title">
        <SectionHeading
          id="directions-title"
          eyebrow="찾아오시는 길"
          title="오시는 길을 확인하세요"
          description="주안역과 인하대역에서 오는 버스 경로를 단계별로 안내합니다."
        />

        <div className="directions-layout">
          <figure className="directions-map">
            <Image
              src={EVENT.assets.directions}
              alt="인천교회 교육원 약도. 주안역과 인하대역 7번 출구에서 518번 버스로 오는 길"
              width={1491}
              height={1055}
              sizes="(max-width: 900px) calc(100vw - 40px), 700px"
            />
            <figcaption>
              <span>인천교회 교육원 전체 약도</span>
              <a
                href={EVENT.assets.directions}
                target="_blank"
                rel="noreferrer"
              >
                약도 크게 보기
              </a>
            </figcaption>
          </figure>

          <div className="route-list">
            {EVENT.routes.map((route) => (
              <article className={`route-card route-card--${route.tone}`} key={route.id}>
                <h3>{route.title}</h3>
                <ol>
                  {route.steps.map((step) => (
                    <li key={step}>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>

        <div className="map-actions" aria-label="지도 앱으로 길찾기">
          <a className="button button--kakao" href={MAP_LINKS.kakao} target="_blank" rel="noreferrer">
            카카오맵에서 보기
          </a>
          <a className="button button--naver" href={MAP_LINKS.naver} target="_blank" rel="noreferrer">
            네이버지도에서 보기
          </a>
        </div>
      </section>

      <section className="content-section content-section--contact" id="contact" aria-labelledby="contact-title">
        <SectionHeading
          id="contact-title"
          eyebrow="문의하기"
          title="번호를 누르면 바로 연락할 수 있어요"
          description="공명옥·곽보경 담당자에게 문자 또는 전화로 바로 문의할 수 있습니다."
        />

        <div className="contact-grid">
          {EVENT.contacts.map((contact) => (
            <article className="contact-card" key={contact.id}>
              <div className="contact-card__heading">
                <span>{contact.label}</span>
                <small>{contact.name}</small>
              </div>
              <a className="contact-card__number" href={`tel:${contact.phone}`}>
                {contact.display}
              </a>
              <div className="contact-card__actions">
                <a className="button button--message" href={`sms:${contact.phone}`}>
                  문자 보내기
                </a>
                <a className="button button--phone" href={`tel:${contact.phone}`}>
                  전화하기
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section content-section--gallery"
        id="invitation-story"
        aria-labelledby="invitation-story-title"
      >
        <SectionHeading
          id="invitation-story-title"
          eyebrow="전도 카드"
          title="당신을 초대합니다"
          description="한 장씩 천천히 넘겨 보세요. 글씨가 작으면 이미지를 눌러 크게 볼 수 있습니다."
        />
        <AccessibleCarousel
          items={EVENT.invitationSlides}
          label="전도 카드"
          variant="story"
        />
      </section>

      <section className="content-section content-section--soft" aria-labelledby="media-title">
        <SectionHeading
          id="media-title"
          eyebrow="강사 소개"
          title="말씀을 전하는 강사를 소개합니다"
          description="조민수 목사님이 이번 전도집회에서 말씀을 전합니다."
        />

        <div className="slot-grid slot-grid--speaker">
          {EVENT.optionalSlots.filter((slot) => slot.isPublished).map((slot) => (
            <article
              className={slot.image ? "media-slot media-slot--filled" : "media-slot"}
              key={slot.id}
            >
              <div
                className={
                  slot.image
                    ? "media-slot__visual media-slot__visual--image"
                    : "media-slot__visual"
                }
              >
                {slot.image ? (
                  <Image
                    src={slot.image}
                    alt={slot.imageAlt}
                    fill
                    sizes="(max-width: 559px) calc(100vw - 52px), (max-width: 759px) calc(50vw - 36px), 430px"
                  />
                ) : (
                  <>
                    <SlotIcon type={slot.icon} />
                    <span>수어 안내 영상</span>
                  </>
                )}
              </div>
              <p>{slot.eyebrow}</p>
              <h3>{slot.title}</h3>
              <div>{slot.description}</div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="content-section content-section--gallery"
        aria-labelledby="past-event-title"
      >
        <SectionHeading
          id="past-event-title"
          eyebrow="지난 집회 모습"
          title="2024년 집회 모습"
          description="단체 사진과 말씀·수어통역, 수어찬양 모습을 볼 수 있습니다. 사진을 누르면 크게 볼 수 있습니다."
        />
        <AccessibleCarousel
          items={EVENT.pastEventPhotos}
          label="2024년 농인선교부 전도집회 사진"
          variant="event"
        />
      </section>

      <section className="closing-card" aria-label="초대 인사">
        <p>{EVENT.invitation}</p>
        <h2>{EVENT.message}</h2>
        <span>{EVENT.organization}</span>
      </section>

      <QuickActions />
    </div>
  );
}
