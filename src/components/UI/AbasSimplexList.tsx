'use client';

import React, {ChangeEvent, useEffect, useState} from "react";
import {Resultado, SimplexFormData} from "@/models/simplex-form-data";
import CalculadoraForm from "@/components/calculadora/CalculadoraForm";
import CalculadoraResultados from "@/components/calculadora/CalculadoraResultados";
import AbasWrapper from "@/components/UI/AbasWrapper";
import {formDefaultData} from "@/helpers/formDefaults";
import {addToast} from "@heroui/react";

export type AbasSimplex = {
    id: number;
    nome: string;
    form: SimplexFormData;
    resultado?: Resultado;
};

const AbasSimplexList: React.FC = () => {
    const [abas, setAbas] = useState<AbasSimplex[]>([{
        id: 1,
        nome: 'Cenário: 1',
        form: formDefaultData,
    }]);

    const [abaAtivaId, setAbaAtivaId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isCalculatorVisible, setIsCalculatorVisible] = useState(true);

    const abaAtiva = abas.find((a) => a.id === abaAtivaId)!;

    useEffect(() => {
        const abaAtual = abas.find((a) => a.id === abaAtivaId);
        if (abaAtual) {
            setIsCalculatorVisible(!abaAtual.resultado);
        }
    }, [abaAtivaId]);

    const calcularResultadosParaAba = async (abaId: number, formData: SimplexFormData) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/calcular-lpi', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data: Resultado = await res.json();

            setAbas((prev) =>
                prev.map((aba) =>
                    aba.id === abaId ? {...aba, resultado: data} : aba
                )
            );

            setIsCalculatorVisible(false);
            return data;
        } catch (error) {
            console.error('Error calculating results:', error);
            throw error;
        } finally {
            setTimeout(() => setIsLoading(false), 500);
        }
    };

    const calcularResultados = async () => {
        calcularResultadosParaAba(abaAtivaId, abaAtiva.form);
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        categoria: keyof SimplexFormData,
        index?: number
    ) => {
        const inputValue = e.target.value;

        const value = inputValue === '' || inputValue === null || inputValue === undefined
            ? 0
            : parseFloat(inputValue);

        const finalValue = isNaN(value) ? 0 : value;

        setAbas((prev) =>
            prev.map((aba) => {
                if (aba.id !== abaAtivaId) return aba;

                const novoForm = {...aba.form};

                if (index !== undefined && Array.isArray(novoForm[categoria])) {
                    const arr = [...(novoForm[categoria] as number[])];
                    arr[index] = finalValue;
                    novoForm[categoria] = arr as any;
                } else {
                    novoForm[categoria] = finalValue as any;
                }

                return {...aba, form: novoForm, resultado: undefined};
            })
        );
        setIsCalculatorVisible(true);
    };


    const adicionarAba = () => {
        const novaId = abas[abas.length - 1].id + 1;
        setAbas([
            ...abas,
            {
                id: novaId,
                nome: `Cenário: ${novaId}`,
                form: formDefaultData
            }
        ]);
        setAbaAtivaId(novaId);
    };

    const deletarAba = (id: number) => {
        if (abas.length === 1) return;

        const novasAbas = abas.filter((aba) => aba.id !== id);
        setAbas(novasAbas);

        if (id === abaAtivaId) {
            setAbaAtivaId(novasAbas[0].id);
        }
    };

    const handleTabChange = (novaAbaId: number) => {
        setAbaAtivaId(novaAbaId);
    };

    const salvarFormulario = (nome: string) => {
        const dadosSalvos = JSON.parse(localStorage.getItem('formulariosSimplex') || '{}');
        dadosSalvos[nome] = {...abaAtiva.form, date: new Date()};
        localStorage.setItem('formulariosSimplex', JSON.stringify(dadosSalvos,));

        setAbas((prev) =>
            prev.map((aba) =>
                aba.id === abaAtivaId ? {...aba, nome} : aba
            )
        );

        addToast({
            title: `Sucesso`,
            description: `Cenário salvo com sucesso!`,
            color: 'success',
            classNames: {
                base: 'z-[9999]'
            }
        })
    };

    const carregarFormulariosSalvos = (): Record<string, SimplexFormData> => {
        if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('formulariosSimplex') || '{}');
        }
        return {};
    };

    const carregarFormularioComoNovaAba = async (nome: string) => {
        const formularios = carregarFormulariosSalvos();
        const form = formularios[nome];

        if (!form) return alert("Formulário não encontrado.");

        const novaId = abas[abas.length - 1].id + 1;

        const novaAba = {
            id: novaId,
            nome: `${nome}`,
            form
        };

        setAbas(prev => [...prev, novaAba]);
        setAbaAtivaId(novaId);

        await calcularResultadosParaAba(novaId, form);
    };


    return (
        <div
            className={'w-full bg-gradient-to-br dark:border-none dark:from-gray-600 dark:via-gray-900 dark:to-slate-900 from-slate-50 via-blue-50 to-indigo-100 border rounded-lg shadow pb-12 mb-2'}>
            <AbasWrapper
                abas={abas}
                abaAtivaId={abaAtiva.id}
                setAbaAtivaId={handleTabChange}
                adicionarAba={adicionarAba}
                deletarAba={deletarAba}
                onLoadScenario={carregarFormularioComoNovaAba}
            />
            <div className="h-full w-full">
                {isLoading && loadingDiv}
                <div className="flex h-full w-full items-center justify-center gap-8">
                    {isCalculatorVisible && <CalculadoraForm
                        formData={abaAtiva.form}
                        handleChange={handleChange}
                        calcularResultados={calcularResultados}
                    />}
                    {!isCalculatorVisible && abaAtiva.resultado && (
                        <div className={'flex flex-col w-full items-center'}>
                            <CalculadoraResultados
                                resultado={abaAtiva.resultado}
                                setIsCalculatorVisible={setIsCalculatorVisible}
                                salvarFormulario={salvarFormulario}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const loadingDiv = <div
    className="absolute h-[108vh] inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center gap-4">
            <div
                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-gray-800 dark:text-gray-100">Calculando...</span>
        </div>
    </div>
</div>

export default AbasSimplexList;