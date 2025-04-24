// components/Navbar.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Audit Tool
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          <Link href="/audit" className="hover:text-green-400 transition-colors">
            Audit
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;