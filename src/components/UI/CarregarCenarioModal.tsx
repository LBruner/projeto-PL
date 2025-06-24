'use client';
import React, {useEffect, useState} from "react";
import {addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip,} from "@heroui/react";
import {RiDeleteBin6Line, RiLoader4Line, RiSave3Line} from "react-icons/ri";
import {SimplexFormData} from "@/models/simplex-form-data";
import {FolderOpen} from "lucide-react";

interface CarregarCenarioModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onLoadScenario?: (scenarioName: string, data: SimplexFormData) => void;
}

const CarregarCenarioModal: React.FC<CarregarCenarioModalProps> = (
    {
        onOpen,
        isOpen,
        onClose,
        onLoadScenario,
    }) => {

    const [cenarios, setCenarios] = useState<[string, SimplexFormData][]>([]);
    const [loadingScenario, setLoadingScenario] = useState<string | null>(null);

    useEffect(() => {
        const carregarFormulariosSalvos = (): Record<string, SimplexFormData> => {
            if (typeof window !== 'undefined') {
                return JSON.parse(localStorage.getItem('formulariosSimplex') || '{}');
            }
            return {};
        };

        const formulariosSalvos = carregarFormulariosSalvos();
        setCenarios(Object.entries(formulariosSalvos));
    }, [isOpen]);

    const handleLoadScenario = async (scenarioName: string, data: SimplexFormData) => {
        setLoadingScenario(scenarioName);

        await new Promise(resolve => setTimeout(resolve, 800));

        if (onLoadScenario) {
            onLoadScenario(scenarioName, data);
        }

        setLoadingScenario(null);

        addToast({
            title: `Sucesso`,
            description: `Cenário: ${scenarioName} carregado com sucesso!`,
            color: 'success',

        })

        onClose();
    };

    const handleDeleteScenario = (scenarioName: string) => {
        const updatedCenarios = cenarios.filter(([name]) => name !== scenarioName);
        setCenarios(updatedCenarios);

        if (typeof window !== 'undefined') {
            const formulariosSalvos = JSON.parse(localStorage.getItem('formulariosSimplex') || '{}');
            delete formulariosSalvos[scenarioName];
            localStorage.setItem('formulariosSimplex', JSON.stringify(formulariosSalvos));
        }

        addToast({
            title: `Sucesso`,
            description: `Cenário: ${scenarioName} excluído com sucesso!`,
            color: 'success',
            classNames: {
                base: 'z-[9999]'
            }
        })
    };


    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Data não disponível';

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Data inválida';
        }
    };

    return (
        <div className={'flex items-center'}>
            <Tooltip color={'primary'} content={'Carregar Cenário'} size={"lg"}>
                <FolderOpen
                    size={35}
                    className="ml-1 h-full p-1 dark:text-gray-300 rounded hover:text-gray-50 hover:cursor-pointer hover:bg-gray-500 transition-colors duration-200"
                    onClick={onOpen}
                />
            </Tooltip>
            <Modal classNames={{backdrop: 'z-10'}} backdrop={'blur'} isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold">Carregar Cenário</h2>
                                <p className="text-sm text-gray-500 font-normal">
                                    Selecione um cenário salvo para carregar, editar ou excluir
                                </p>
                            </ModalHeader>
                            <ModalBody className="py-4">
                                {cenarios.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <RiSave3Line size={48} className="text-gray-300 mb-4"/>
                                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                                            Nenhum cenário salvo
                                        </h3>
                                        <p className="text-gray-500">
                                            Salve um cenário primeiro para vê-lo aqui
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {cenarios.map(([scenarioName, scenarioData]) => (
                                            <div
                                                key={scenarioName}
                                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                                                            {scenarioName}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {/*// @ts-ignore*/}
                                                            Salvo em: {formatDate(scenarioData.date)}
                                                        </p>
                                                        <div
                                                            className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                                                            <span>Produtos: {scenarioData.lucro?.length || 0}</span>
                                                            <span>Limite M.O.: {scenarioData.limiteMaoDeObra}</span>
                                                            <span>Limite Mat.: {scenarioData.limiteMaterial}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 ml-4">
                                                        <button
                                                            onClick={() => handleLoadScenario(scenarioName, scenarioData)}
                                                            disabled={loadingScenario === scenarioName}
                                                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200 disabled:opacity-50"
                                                            title="Carregar cenário"
                                                        >
                                                            {loadingScenario === scenarioName ? (
                                                                <RiLoader4Line size={16} className="animate-spin"/>
                                                            ) : (
                                                                <RiSave3Line size={16}/>
                                                            )}
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                if (confirm(`Tem certeza que deseja excluir o cenário "${scenarioName}"?`)) {
                                                                    handleDeleteScenario(scenarioName);
                                                                }
                                                            }}
                                                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
                                                            title="Excluir cenário"
                                                        >
                                                            <RiDeleteBin6Line size={16}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default CarregarCenarioModal;