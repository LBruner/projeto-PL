import type {NextApiRequest, NextApiResponse} from 'next';
import solver from 'javascript-lp-solver';

type SimplexInput = {
    lucro: number[];
    maoDeObra: number[];
    material: number[];
    limiteMaoDeObra: number;
    limiteMaterial: number;
};

type SimplexOutput = {
    modeloA?: number;
    modeloB?: number;
    modeloC?: number;
    result?: number;
    feasible?: boolean;
};

export async function POST(req: Request,
                          res: NextApiResponse<SimplexOutput | { error: string }>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Método não permitido'});
    }

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

        return new Response(JSON.stringify({result}), {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        res.status(500).json({error: 'Erro ao resolver o problema.'});
    }
}

