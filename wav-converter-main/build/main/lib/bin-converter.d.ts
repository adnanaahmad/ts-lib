/// <reference types="node" />
export declare type ConvertedBinFile = {
    readonly wavBuffer: Buffer;
};
export declare type BinInfo = {
    readonly numChannels: number;
    readonly sampleRate: number;
};
export declare enum BinError {
    InvalidFile = 0,
    InvalidHeaderGenerated = 1,
    InvalidSampleRate = 2
}
export declare const convertWavFromBin: (filename: string, binInfo: BinInfo, outputFile?: string) => Promise<ConvertedBinFile>;
export declare const convertWavFromBinBuffer: (fileBuffer: Buffer, binInfo: BinInfo, outputFile?: string) => Promise<ConvertedBinFile>;
