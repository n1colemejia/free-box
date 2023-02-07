import Link from 'next/link';
import { UserContext } from '@/lib/context';
import { useContext } from 'react';

export default function AuthCheck({ children }) {
  const { username } = useContext(UserContext);
  return username ? children : fallback || <Link href={'/login'}>Hey, log in.</Link>;
}