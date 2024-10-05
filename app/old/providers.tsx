'use client';

import React, { ReactNode } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from './AuthProvider';



export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </AuthProvider>

    );
}