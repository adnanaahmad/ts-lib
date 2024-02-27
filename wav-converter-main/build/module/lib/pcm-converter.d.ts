/// <reference types="node" />
export declare type ConvertedPcmFile = {
    readonly wavBuffer: Buffer;
};
export declare type PcmInfo = {
    readonly numChannels: number;
    readonly sampleRate: number;
    readonly bitsPerSample: number;
};
export declare enum PcmError {
    InvalidHeaderGenerated = 0
}
export declare const convertWavFromPcm: (filename: string, pcmInfo: PcmInfo, outputFile?: string) => Promise<ConvertedPcmFile>;
export declare const convertWavFromPcmBuffer: (fileBuffer: Buffer, pcmInfo: PcmInfo, outputFile?: string) => Promise<ConvertedPcmFile>;
