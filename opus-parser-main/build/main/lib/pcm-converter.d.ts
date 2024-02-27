/// <reference types="node" />
export declare type ConvertedPcmFile = {
    readonly encodedBuffer: Buffer;
};
export declare type PcmInfo = {
    readonly numChannels: number;
    readonly sampleRate: number;
};
export declare enum PcmError {
    InvalidSampleRate = 0
}
export declare const convertBinFromPcm: (filename: string, pcmInfo: PcmInfo, outputFile?: string) => Promise<ConvertedPcmFile>;
export declare const convertBinFromPcmBuffer: (fileBuffer: Buffer, pcmInfo: PcmInfo, outputFile?: string) => Promise<ConvertedPcmFile>;
