'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email) {
      setError('Name and email are required');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      
      if (!response.ok) throw new Error('Failed to add user');
      
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}