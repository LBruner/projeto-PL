'use client';
import React from "react";
import {HeroUIProvider} from "@heroui/react";
import CustomThemeProvider from "@/providers/ThemeProvider";
import {ToastProvider} from "@heroui/toast";

const Providers: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <HeroUIProvider>
            <CustomThemeProvider>
                <ToastProvider maxVisibleToasts={1} placement={'top-right'} toastOffset={75}/>
                {children}
            </CustomThemeProvider>
        </HeroUIProvider>
    )
}

export default Providers;