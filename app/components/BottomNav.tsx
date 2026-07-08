import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <Link href="/#home" title="Home">
        Home
      </Link>
      <Link href="/#projects" title="Projects">
        Projects
      </Link>
      <Link href="/blogs" title="Blogs">
        Blogs
      </Link>
    </nav>
  );
}
