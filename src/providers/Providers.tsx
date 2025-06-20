'use client';
import React from "react";
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import CustomThemeProvider from "@/providers/ThemeProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <HeroUIProvider>
            <CustomThemeProvider>
                {children}
            </CustomThemeProvider>
        </HeroUIProvider>
    )
}

export default Providers;