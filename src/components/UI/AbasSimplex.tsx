'use client';

import React, {ChangeEvent, useState} from "react";
import {Resultado, SimplexFormData} from "@/models/simplex-form-data";
import CalculadoraForm from "@/components/calculadora/calculadora-form";
import CalculadoraResultados from "@/components/calculadora/calculadora-resultados";
import AbaSimplex from "@/components/UI/AbaSimplex";

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
        form: {
            lucro: [4, 2, 3],
            maoDeObra: [7, 3, 6],
            material: [4, 4, 5],
            limiteMaoDeObra: 150,
            limiteMaterial: 200,
        },
    }]);

    const [abaAtivaId, setAbaAtivaId] = useState(1);
    const abaAtiva = abas.find((a) => a.id === abaAtivaId)!;
    const [isLoading, setIsLoading] = useState(false);

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

                return {...aba, form: novoForm};
            })
        );
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

        setTimeout(() => setIsLoading(false), 500);
    };

    const adicionarAba = () => {
        const novaId = abas[abas.length - 1].id + 1;
        setAbas([
            ...abas,
            {
                id: novaId,
                nome: `Cenário: ${novaId}`,
                form: {
                    lucro: [0, 0, 0],
                    maoDeObra: [0, 0, 0],
                    material: [0, 0, 0],
                    limiteMaoDeObra: 0,
                    limiteMaterial: 0,
                },
            },
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

    return (
        <div
            className={'bg-gradient-to-br dark:border-none dark:from-gray-600 dark:via-gray-900 dark:to-slate-900 from-slate-50 via-blue-50 to-indigo-100 border rounded-lg shadow pb-12 mb-2'}>
            <AbaSimplex abas={abas} abaAtivaId={abaAtiva.id} setAbaAtivaId={setAbaAtivaId} adicionarAba={adicionarAba}
                        deletarAba={deletarAba}/>
                <div className="h-full w-full">
                    <div className="flex w-full items-center justify-center gap-8">
                        <CalculadoraForm
                            formData={abaAtiva.form}
                            handleChange={handleChange}
                            calcularResultados={calcularResultados}
                        />
                        {abaAtiva.resultado && (
                            <CalculadoraResultados resultado={abaAtiva.resultado}/>
                        )}
                    </div>
                </div>
        </div>
    );
};

export default AbasSimplex;
