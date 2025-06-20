export type SimplexInput = {
    lucro: number[];
    maoDeObra: number[];
    material: number[];
    limiteMaoDeObra: number;
    limiteMaterial: number;
};

export type SimplexOutput = {
    modeloA?: number;
    modeloB?: number;
    modeloC?: number;
    result?: number;
    feasible?: boolean;
};