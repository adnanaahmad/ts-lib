import * as fs from 'fs';

import { SmartBuffer } from 'smart-buffer';

import {
    convertWavHeaderToBuffer,
    getWavHeader,
    WAV_AUDIO_FORMAT_PCM
} from './wav-header';

export type ConvertedPcmFile = {
    readonly wavBuffer: Buffer
};

export type PcmInfo = {
    readonly numChannels: number
    readonly sampleRate: number,
    readonly bitsPerSample: number
}

export enum PcmError {
    InvalidHeaderGenerated,
}

export const convertWavFromPcm =
    async (filename: string, pcmInfo: PcmInfo, outputFile?: string):
        Promise<ConvertedPcmFile> => {
        const fileBuffer = fs.readFileSync(filename);
        return convertWavFromPcmBuffer(fileBuffer, pcmInfo, outputFile);
    };

export const convertWavFromPcmBuffer =
    async (fileBuffer: Buffer, pcmInfo: PcmInfo, outputFile?: string):
        Promise<ConvertedPcmFile> => {
        return new Promise((resolve, reject) => {
            const header = convertWavHeaderToBuffer(
                getWavHeader(
                    WAV_AUDIO_FORMAT_PCM,
                    pcmInfo.numChannels,
                    pcmInfo.sampleRate,
                    pcmInfo.bitsPerSample),
                fileBuffer.length);

            if (header instanceof Error) {
                reject(PcmError.InvalidHeaderGenerated);
                return;
            }
            const buffer = new SmartBuffer();
            buffer.writeBuffer(header);
            buffer.writeBuffer(fileBuffer);

            const file = buffer.toBuffer();
            if (outputFile) {
                fs.writeFileSync(outputFile, file);
            }
            resolve({
                wavBuffer: file
            });
            return;
        });
    };
