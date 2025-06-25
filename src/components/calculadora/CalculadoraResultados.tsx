import React, {useState} from "react";
import {Activity, ArrowLeft, Clock, DollarSign, Package, Save} from "lucide-react";
import {Resultado} from "@/models/simplex-form-data";
import {Modelo} from "@/helpers/formDefaults";
import ModeloResultado from "@/components/UI/ModeloResultado";
import ResultadosResumoItem from "@/components/UI/ResultadosResumo";
import {formatCurrency, formatNumber} from "@/helpers/numberFormat";
import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";

interface CalculadoraResultadosProps {
    resultado: Resultado;
    setIsCalculatorVisible: React.Dispatch<React.SetStateAction<boolean>>
    salvarFormulario: (nome: string) => void
}

const CalculadoraResultados: React.FC<CalculadoraResultadosProps> = (
    {
        resultado,
        setIsCalculatorVisible,
        salvarFormulario
    }) => {
    const models: Modelo[] = [
        {
            name: 'Modelo A',
            key: 'modeloA',
            value: resultado.modeloA ?? 0,
            color: 'from-red-500 to-pink-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            textColor: 'text-red-700 dark:text-red-300'
        },
        {
            name: 'Modelo B',
            key: 'modeloB',
            value: resultado.modeloB ?? 0,
            color: 'from-orange-500 to-yellow-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20',
            textColor: 'text-orange-700 dark:text-orange-300'
        },
        {
            name: 'Modelo C',
            key: 'modeloC',
            value: resultado.modeloC ?? 0,
            color: 'from-teal-500 to-cyan-600',
            bgColor: 'bg-teal-50 dark:bg-teal-900/20',
            textColor: 'text-teal-700 dark:text-teal-300'
        }
    ];

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [scenarioName, setScenarioName] = useState("");
    const [error, setError] = useState("");

    const validateScenarioName = (name: string): string => {
        if (!name.trim()) {
            return "Nome do cenário é obrigatório";
        }

        if (name.trim().length < 2) {
            return "Nome deve ter pelo menos 2 caracteres";
        }

        if (name.trim().length > 50) {
            return "Nome deve ter no máximo 50 caracteres";
        }

        return "";
    };

    const handleSave = async () => {
        const trimmedName = scenarioName.trim();
        const validationError = validateScenarioName(trimmedName);

        console.log(validationError)
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            salvarFormulario(trimmedName);
            setError('');
            onClose();
        } catch (error) {
            setError("Erro ao salvar o cenário");
        }
    };

    return (
        <div className="w-11/12 p-6">
            <Modal classNames={{backdrop: 'z-10'}} backdrop={'blur'} isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold">Salvar Cenário</h2>
                                <p className="text-sm text-gray-500 font-normal">
                                    Escolha um nome para o cenário e clique em salvar.
                                </p>
                                <Input isRequired={true} onValueChange={(e) => setScenarioName(e)} errorMessage={error}
                                       isInvalid={error.length != 0} label={'Cenário'}/>
                            </ModalHeader>
                            <ModalBody className="py-4">

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" variant="shadow" onPress={handleSave}>
                                    Salvar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className={'absolute z-[4]'}>
                <button
                    onClick={() => setIsCalculatorVisible(true)}
                    className="absolute -top-4 -left-4 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800"
                    aria-label="Voltar para calculadora"
                ><ArrowLeft className="text-gray-700 dark:text-gray-300"/>
                </button>
            </div>
            <div className=" mx-auto space-y-2">
                <>
                    <div
                        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center gap-3">
                                <div className={'flex gap-4'}>
                                    <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Produção por
                                        Modelo</h3>
                                </div>
                                <div className={'flex gap-2'}>
                                    <div className={'flex gap-4 py-2'}>
                                        <Button className={'py-4'} onPress={onOpen} color={'primary'} variant={'ghost'}>
                                            <Save className={''}/>
                                            <p className={'font-semibold '}>Salvar Cenário</p>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-2">
                            <div className="grid grid-cols-1 gap-4 my-4">
                                {models.map((model) => <ModeloResultado key={model.key} modelo={model}/>)}
                            </div>
                        </div>
                        <div
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <Package className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Resumo Geral</h3>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ResultadosResumoItem
                                        title="Mão-de-obra"
                                        subtitle="Recurso disponível"
                                        value={typeof resultado.folgaMaoDeObra === 'number' ? formatNumber(resultado.folgaMaoDeObra) : resultado.folgaMaoDeObra || '-'}
                                        unit="horas de folga"
                                        icon={Clock}
                                        colorScheme="blue"
                                    />
                                    <ResultadosResumoItem
                                        title="Material"
                                        subtitle="Recurso disponível"
                                        value={typeof resultado.folgaMaterial === 'number' ? formatNumber(resultado.folgaMaterial) : resultado.folgaMaterial || '-'}
                                        unit="kg de material"
                                        icon={Package}
                                        colorScheme="purple"
                                    />
                                    <ResultadosResumoItem
                                        title="Lucros"
                                        subtitle="Valor final"
                                        value={`${typeof resultado.resultado === 'number' ? formatCurrency(resultado.resultado) : resultado.folgaMaterial || '-'}`}
                                        unit="lucros"
                                        icon={DollarSign}
                                        colorScheme="yellow"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export default CalculadoraResultados;