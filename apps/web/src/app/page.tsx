import CampusMap from './components/CampusMap';
import MapSession from './components/MapSession';
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
      <MapSession />
      <CampusMap />
    </main>
  );
}
