// app/page.tsx
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-6 text-center">Website Audit Tool</h1>
        <p className="text-xl mb-10 text-center max-w-2xl">
          Automatically analyze and audit your websites for performance, SEO, security, and more.
        </p>
        
        <Link 
          href="/audit" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-xl"
        >
          Start Building
        </Link>
      </main>
      
      <Footer />
    </div>
  );
}