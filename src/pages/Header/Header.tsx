import "./header.css";
import Image from 'next/image';

export default function Header() {
    return (
      <main className="all">
        <Image src="/Logo.svg" alt="Lapadarie" width={100} height={100} />
      </main>
    );
  }