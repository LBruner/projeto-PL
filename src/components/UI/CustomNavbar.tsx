'use client';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import React from "react";
import ThemeButton from "@/components/UI/ThemeButton";
import {CgCalculator} from "react-icons/cg";

const CustomNavbar: React.FC = () => {
    return (
        <Navbar maxWidth={'full'}
                className={'h-auto shadow-sm dark:bg-customDarkNav dark:bg-opacity-40 bg-gray-100  bg-opacity-70 flex top-0 left-0 items-start py-1'}>
            <NavbarBrand>
                <div className={'flex gap-2 items-center'}>
                    <p><CgCalculator className={'text-blue-500'} size={35}/></p>
                    <p className="font-bold text-inherit dark:text-white">Calculadora Simplex</p>
                </div>
            </NavbarBrand>
            <NavbarItem>
                <NavbarContent className={'flex justify-end w-full'}>
                    <div className={' justify-center flex items-center gap-5'}>
                        <ThemeButton/>
                    </div>
                </NavbarContent>
            </NavbarItem>
        </Navbar>
    );
}

export default CustomNavbar;
