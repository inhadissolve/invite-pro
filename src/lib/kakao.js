import { EVENT, KAKAO_SHARE_INFO } from "@/constants/event";

export function initKakao(key) {
  if (
    key &&
    typeof window !== "undefined" &&
    window.Kakao &&
    !window.Kakao.isInitialized()
  ) {
    window.Kakao.init(key);
    return true;
  }

  return false;
}

async function fallbackShare(shareUrl) {
  if (navigator.share) {
    await navigator.share({
      title: KAKAO_SHARE_INFO.title,
      text: KAKAO_SHARE_INFO.description,
      url: shareUrl,
    });
    return "native";
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(shareUrl);
    return "copied";
  }

  throw new Error("Sharing is not supported in this browser.");
}

export async function shareInvite() {
  if (typeof window === "undefined") return "unavailable";

  const configuredSite = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const shareUrl = configuredSite || window.location.href;
  const imageOrigin = configuredSite || window.location.origin;
  const imageUrl = new URL(KAKAO_SHARE_INFO.image, imageOrigin).toString();

  if (window.Kakao?.isInitialized() && window.Kakao?.Share?.sendDefault) {
    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: KAKAO_SHARE_INFO.title,
          description: KAKAO_SHARE_INFO.description,
          imageUrl: `${imageUrl}?v=${EVENT.year}-09`,
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
        buttons: [
          {
            title: "초대장 보기",
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
          },
        ],
      });
      return "kakao";
    } catch {
      return fallbackShare(shareUrl);
    }
  }

  return fallbackShare(shareUrl);
}
