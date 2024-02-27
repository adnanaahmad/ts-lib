/// <reference types="node" />
import { WavHeader } from './wav-header';
export declare const parseHeader: (fileName: string) => WavHeader | Error;
export declare const parseHeaderFromBuffer: (fileBuffer: Buffer) => WavHeader | Error;
