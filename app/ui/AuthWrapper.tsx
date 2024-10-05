'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null; // vagy egy loading komponens
    }

    return <>{children}</>;
};

export default AuthWrapper;
