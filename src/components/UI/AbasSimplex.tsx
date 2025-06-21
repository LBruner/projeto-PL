'use client';

import React, {ChangeEvent, useState, useEffect} from "react";
import {Resultado, SimplexFormData} from "@/models/simplex-form-data";
import CalculadoraForm from "@/components/calculadora/CalculadoraForm";
import CalculadoraResultados from "@/components/calculadora/CalculadoraResultados";
import AbaSimplex from "@/components/UI/AbaSimplex";
import {formDefaultData} from "@/helpers/calculadoraForm";

type AbasSimplex = {
    id: number;
    nome: string;
    form: SimplexFormData;
    resultado?: Resultado;
};

const AbasSimplex: React.FC = () => {
    const [abas, setAbas] = useState<AbasSimplex[]>([{
        id: 1,
        nome: 'Cenário: 1',
        form: formDefaultData,
    }]);

    const [abaAtivaId, setAbaAtivaId] = useState(1);
    const abaAtiva = abas.find((a) => a.id === abaAtivaId)!;
    const [isLoading, setIsLoading] = useState(false);
    const [isCalculatorVisible, setIsCalculatorVisible] = useState(true);

    useEffect(() => {
        const abaAtual = abas.find((a) => a.id === abaAtivaId);
        if (abaAtual) {
            setIsCalculatorVisible(!abaAtual.resultado);
        }
    }, [abaAtivaId]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>,
        categoria: keyof SimplexFormData,
        index?: number
    ) => {
        const value = parseFloat(e.target.value);

        setAbas((prev) =>
            prev.map((aba) => {
                if (aba.id !== abaAtivaId) return aba;

                const novoForm = {...aba.form};

                if (index !== undefined && Array.isArray(novoForm[categoria])) {
                    const arr = [...(novoForm[categoria] as number[])];
                    arr[index] = value;
                    novoForm[categoria] = arr as any;
                } else {
                    novoForm[categoria] = value as any;
                }

                return { ...aba, form: novoForm, resultado: undefined };
            })
        );
        setIsCalculatorVisible(true);
    };

    const calcularResultados = async () => {
        setIsLoading(true);
        const res = await fetch('/api/calcular-lpi', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(abaAtiva.form),
        });

        const data: Resultado = await res.json();

        setAbas((prev) =>
            prev.map((aba) =>
                aba.id === abaAtivaId ? {...aba, resultado: data} : aba
            )
        );

        console.log(abas);
        setIsCalculatorVisible(false);

        setTimeout(() => setIsLoading(false), 500);
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

    return (
        <div
            className={'bg-gradient-to-br dark:border-none dark:from-gray-600 dark:via-gray-900 dark:to-slate-900 from-slate-50 via-blue-50 to-indigo-100 border rounded-lg shadow pb-12 mb-2'}>
            <AbaSimplex
                abas={abas}
                abaAtivaId={abaAtiva.id}
                setAbaAtivaId={handleTabChange}
                adicionarAba={adicionarAba}
                deletarAba={deletarAba}
            />
            <div className="h-full w-full">
                {isLoading && (
                    <div
                        className="absolute h-full inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-50 z-50">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                            <div className="flex items-center justify-center gap-4">
                                <div
                                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                <span className="text-gray-800 dark:text-gray-100">Calculando...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex h-full w-full items-center justify-center gap-8">
                    {isCalculatorVisible && <CalculadoraForm
                        formData={abaAtiva.form}
                        handleChange={handleChange}
                        calcularResultados={calcularResultados}
                    />}
                    {!isCalculatorVisible && abaAtiva.resultado && (
                        <CalculadoraResultados
                            resultado={abaAtiva.resultado}
                            setIsCalculatorVisible={setIsCalculatorVisible}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AbasSimplex;