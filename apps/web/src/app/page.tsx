import CampusMap from './components/CampusMap';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Campus Map UFAM</h1>
      <nav>
        <Link href="/features">Editar features</Link>
        {' · '}
        <Link href="/admin">Curadoria administrativa</Link>
      </nav>
      <CampusMap />
    </main>
  );
}
