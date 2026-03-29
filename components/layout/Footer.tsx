import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        © {year} {profile.name} · Built with Next.js
      </p>
    </footer>
  );
}
