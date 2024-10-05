import React from 'react';
import { fetchEvents } from '@/app/lib/data'
import Card from "@/app/ui/Card";
import { useSession, signIn, signOut } from 'next-auth/react';
import AuthForm from '@/app/ui/login-form';

const Page = async () => {


    return (
        <AuthForm />
    );
}

export default Page