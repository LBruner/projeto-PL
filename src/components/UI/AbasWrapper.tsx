'use client';

import React from "react";
import {BiX} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
import CarregarCenarioModal from "@/components/UI/CarregarCenarioModal";
import {Tooltip, useDisclosure} from "@heroui/react";
import {SimplexFormData} from "@/models/simplex-form-data";

interface AbaSimplexProps {
    abas: { id: number; nome: string }[];
    abaAtivaId: number;
    setAbaAtivaId: (id: number) => void;
    adicionarAba: () => void;
    deletarAba: (id: number) => void;
    onLoadScenario?: (scenarioName: string, data: SimplexFormData) => void;
}

const AbasWrapper: React.FC<AbaSimplexProps> = (
    {
        abas,
        adicionarAba,
        setAbaAtivaId,
        deletarAba,
        abaAtivaId,
        onLoadScenario
    }) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <div className="flex items-center gap-1 border-b dark:border-b-gray-500 p-2 mb-4">
            {abas.map((aba) => (
                <div
                    onClick={() => setAbaAtivaId(aba.id)}
                    className={'w-36 h-12 hover:cursor-pointer'}
                    key={aba.id}
                >
                    <div
                        className={`flex dark:bg-gray-700 dark:border-transparent items-center justify-between px-3 h-full py-1 border rounded-t-lg ${
                            aba.id === abaAtivaId
                                ? 'bg-gray-300 dark:bg-gray-600 dark:text-white font-semibold'
                                : 'bg-gray-100 dark:text-gray-400 dark:bg-gray-900'
                        }`}
                    >
                        <button>{aba.nome}</button>
                        {abas.length > 1 && (
                            <BiX
                                size={24}
                                className={'dark:text-gray-300 rounded hover:text-gray-50 hover:cursor-pointer hover:bg-gray-500'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletarAba(aba.id);
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}
            <Tooltip content={'Nova Aba'} size={"lg"} color={'default'}>
                <AiOutlinePlus
                    onClick={adicionarAba}
                    size={35}
                    className="ml-1 h-full p-1 dark:text-gray-300 rounded hover:text-gray-50 hover:cursor-pointer hover:bg-gray-500"
                />
            </Tooltip>
            <CarregarCenarioModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}
                                  onLoadScenario={onLoadScenario}/>
        </div>
    )
}

export default AbasWrapper;