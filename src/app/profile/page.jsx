'use client';

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 py-14 px-4'>
      <div className='max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8'>
        <div className='flex flex-col items-center text-center'>
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={120}
              height={120}
              className='rounded-full border-4 border-cyan-400 object-cover'
            />
          ) : (
            <div className='w-28 h-28 rounded-full bg-cyan-500 flex items-center justify-center text-white text-4xl font-bold'>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <h1 className='mt-5 text-3xl font-black text-slate-800'>
            {user?.name}
          </h1>

          <p className='text-gray-500'>{user?.email}</p>
        </div>

        <div className='mt-8 grid gap-4'>
          <div className='rounded-2xl bg-slate-50 p-4'>
            <p className='text-sm text-gray-500'>Full Name</p>
            <h3 className='font-semibold text-slate-800'>{user?.name}</h3>
          </div>

          <div className='rounded-2xl bg-slate-50 p-4'>
            <p className='text-sm text-gray-500'>Email Address</p>
            <h3 className='font-semibold text-slate-800'>{user?.email}</h3>
          </div>

          <div className='rounded-2xl bg-slate-50 p-4'>
            <p className='text-sm text-gray-500'>Account Status</p>
            <h3 className='font-semibold text-green-600'>Active</h3>
          </div>
        </div>
      </div>
    </div>
  );
}