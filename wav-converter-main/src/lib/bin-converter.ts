import * as fs from 'fs';

import { OpusEncoder } from '@discordjs/opus';
import { SmartBuffer } from 'smart-buffer';

import {
    convertWavHeaderToBuffer,
    getWavHeader,
    WAV_AUDIO_FORMAT_PCM
} from './wav-header';

const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];

export type ConvertedBinFile = {
    readonly wavBuffer: Buffer
};

export type BinInfo = {
    readonly numChannels: number
    readonly sampleRate: number,
}

export enum BinError {
    InvalidFile,
    InvalidHeaderGenerated,
    InvalidSampleRate,
}

export const convertWavFromBin =
    async (filename: string, binInfo: BinInfo, outputFile?: string):
        Promise<ConvertedBinFile> => {
        const fileBuffer = fs.readFileSync(filename);
        return convertWavFromBinBuffer(fileBuffer, binInfo, outputFile);
    };

export const convertWavFromBinBuffer =
    async (fileBuffer: Buffer, binInfo: BinInfo, outputFile?: string):
        Promise<ConvertedBinFile> => {
        return new Promise((resolve, reject) => {
            if (!isSupportedSampleRate(binInfo.sampleRate)) {
                console.error('Opus encoder only supports sample rates of' +
                    ' 8000, 12000, 16000, 24000, 48000.' +
                    ' Actual sample rate is ' + binInfo.sampleRate);
                reject(BinError.InvalidSampleRate);
                return;
            }
            const encoderEncoder = new OpusEncoder(
                binInfo.sampleRate, binInfo.numChannels);
            const buffer = new SmartBuffer();

            const totalLen = fileBuffer.length;
            let pos = 0;
            while (pos < totalLen) {
                const sampleSizeBytes = fileBuffer.readUInt8(pos);
                pos += 1;
                if (sampleSizeBytes + pos > totalLen) {
                    reject(BinError.InvalidFile);
                    return;
                }
                const bytes = fileBuffer.subarray(pos, pos + sampleSizeBytes);
                pos += sampleSizeBytes;
                const encoded = encoderEncoder.decode(bytes);
                buffer.writeBuffer(encoded);
            }

            // The Opus library always decode to 16 bits per sample
            const header = convertWavHeaderToBuffer(
                getWavHeader(
                    WAV_AUDIO_FORMAT_PCM,
                    binInfo.numChannels,
                    binInfo.sampleRate,
                    /* bitsPerSample= */ 16),
                buffer.length);

            if (header instanceof Error) {
                reject(BinError.InvalidHeaderGenerated);
                return;
            }

            buffer.insertBuffer(header, 0);
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

const isSupportedSampleRate = (sampleRate: number): boolean => {
    return OPUS_SUPPORTED_SAMPLE_RATES.includes(sampleRate);
};