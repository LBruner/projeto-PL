import solver from 'javascript-lp-solver';
import {SimplexInput, SimplexOutput} from "@/models/simplex-model";

export async function POST(req: Request
) {
    const data = await req.json();
    const {
        lucro,
        maoDeObra,
        material,
        limiteMaoDeObra,
        limiteMaterial,
    }: SimplexInput = data;

    const model = {
        optimize: 'lucro',
        opType: 'max',
        constraints: {
            maoDeObra: {max: limiteMaoDeObra},
            material: {max: limiteMaterial},
        },
        variables: {
            modeloA: {
                lucro: lucro[0],
                maoDeObra: maoDeObra[0],
                material: material[0],
            },
            modeloB: {
                lucro: lucro[1],
                maoDeObra: maoDeObra[1],
                material: material[1],
            },
            modeloC: {
                lucro: lucro[2],
                maoDeObra: maoDeObra[2],
                material: material[2],
            },
        },
    };

    try {
        const result = solver.Solve(model) as SimplexOutput;
        const maoDeObraUsada =
            (result.modeloA ?? 0) * maoDeObra[0] +
            (result.modeloB ?? 0) * maoDeObra[1] +
            (result.modeloC ?? 0) * maoDeObra[2];

        const materialUsado =
            (result.modeloA ?? 0) * material[0] +
            (result.modeloB ?? 0) * material[1] +
            (result.modeloC ?? 0) * material[2];

        let folgaMaoDeObra = limiteMaoDeObra - maoDeObraUsada;
        let folgaMaterial = limiteMaterial - materialUsado;

        if (folgaMaoDeObra < 0) {
            folgaMaoDeObra = 0;
        }
        if (folgaMaterial < 0) {
            folgaMaterial = 0;
        }

        result.modeloA = (typeof result.modeloA === 'number') ? Math.floor(result.modeloA) : 0;
        result.modeloB = (typeof result.modeloB === 'number') ? Math.floor(result.modeloB) : 0;
        result.modeloC = (typeof result.modeloC === 'number') ? Math.floor(result.modeloC) : 0;

        const resultados = {
            resultado: result.result,
            modeloA: result.modeloA,
            modeloB: result.modeloB,
            modeloC: result.modeloC,
            maoDeObra,
            folgaMaterial,
            folgaMaoDeObra
        }
        console.log(resultados);

        return new Response(JSON.stringify(resultados), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({error: 'Erro ao calcular'}), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500,
        });
    }
}

