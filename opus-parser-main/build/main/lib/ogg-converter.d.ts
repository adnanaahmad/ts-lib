/// <reference types="node" />
import { OggOpusHeader } from './ogg-opus-header-parser';
export declare type ConvertedOpusFile = {
    header: OggOpusHeader;
    encodedBuffer: Buffer;
};
export declare enum OpusError {
    InvalidHeader = 0
}
export declare const convertBinFromOpus: (filename: string, outputFile?: string, headerFile?: string) => Promise<ConvertedOpusFile>;
export declare const convertBinFromOpusBuffer: (fileBuffer: Buffer, outputFile?: string, headerFile?: string) => Promise<ConvertedOpusFile>;
