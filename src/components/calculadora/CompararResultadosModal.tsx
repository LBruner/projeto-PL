'use client';
import React, {useEffect} from "react";
import {ChartNoAxesCombined, X} from "lucide-react";
import {AbasSimplex} from "@/components/UI/AbasSimplexList";
import GraficosComparaResultados from "@/components/GraficosComparaResultados";
import {Tooltip} from "@heroui/react";

interface CarregarCenarioModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    abas: AbasSimplex[]
}

const CompararResultadosModal: React.FC<CarregarCenarioModalProps> = (
    {
        onOpen,
        isOpen,
        onClose,
        abas
    }) => {

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={'flex items-center'}>
            <div
                className="group relative"
            >
                <Tooltip  size={"lg"} color={'default'} content={'Comparar Resultados'} >
                    <ChartNoAxesCombined
                        size={35}
                        className="ml-1 h-full p-1 dark:text-gray-300 rounded hover:text-gray-50 hover:cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                        onClick={onOpen}
                    />
                </Tooltip>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                        onClick={handleBackdropClick}
                    />

                    <div
                        className="relative w-full max-w-[88vw] max-h-[88vh] m-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
                        <div
                            className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div
                                    className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                                    <ChartNoAxesCombined className="w-5 h-5"/>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                        Comparação de Resultados
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Análise comparativa dos cenários simulados
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                                aria-label="Fechar modal"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"/>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden p-0">
                            <div className="min-h-0 w-full">
                                <GraficosComparaResultados abas={abas}/>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                            <button
                                onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompararResultadosModal;