import { EVENT } from "@/constants/event";

export default function Footer() {
  return (
    <footer className="site-footer">
      <strong>{EVENT.organization}</strong>
      <span>{EVENT.church}</span>
      <small>© {EVENT.year} 초대장</small>
    </footer>
  );
}
