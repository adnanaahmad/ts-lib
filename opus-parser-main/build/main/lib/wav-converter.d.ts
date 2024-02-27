/// <reference types="node" />
export declare type ConvertedWavFile = {
    readonly numChannels: number;
    readonly sampleRate: number;
    readonly encodedBuffer: Buffer;
};
export declare enum WavError {
    InvalidHeader = 0,
    InvalidSampleRate = 1,
    InvalidSampleSize = 2
}
export declare const convertBinFromWav: (filename: string, outputFile?: string) => Promise<ConvertedWavFile>;
export declare const convertBinFromWavBuffer: (fileBuffer: Buffer, outputFile?: string) => Promise<ConvertedWavFile>;
