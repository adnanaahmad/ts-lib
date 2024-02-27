import * as fs from 'fs';

import { OpusEncoder } from '@discordjs/opus';
import { SmartBuffer } from 'smart-buffer';

const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];

export type ConvertedPcmFile = {
    readonly encodedBuffer: Buffer
};

export type PcmInfo = {
    readonly numChannels: number
    readonly sampleRate: number,
}

export enum PcmError {
    InvalidSampleRate,
}

export const convertBinFromPcm =
    async (filename: string, pcmInfo: PcmInfo, outputFile?: string):
        Promise<ConvertedPcmFile> => {
        const fileBuffer = fs.readFileSync(filename);
        return convertBinFromPcmBuffer(fileBuffer, pcmInfo, outputFile);
    };

export const convertBinFromPcmBuffer =
    async (fileBuffer: Buffer, pcmInfo: PcmInfo, outputFile?: string):
        Promise<ConvertedPcmFile> => {
        return new Promise((resolve, reject) => {
            if (!isSupportedSampleRate(pcmInfo.sampleRate)) {
                console.error('Opus encoder only supports sample rates of ' +
                    '8000, 12000, 16000, 24000, 48000.' +
                    ' Actual sample rate is ' + pcmInfo.sampleRate);
                reject(PcmError.InvalidSampleRate);
                return;
            }

            const encoderEncoder = new OpusEncoder(
                pcmInfo.sampleRate, pcmInfo.numChannels);
            const buffer = new SmartBuffer();

            const totalLen = fileBuffer.length;
            let pos = 0;
            // The OPUS encoder only supports 16-bit integers
            // We encode in frames of 10ms
            const sampleSizeBytes = (pcmInfo.sampleRate / 100) * 2;
            while (pos < totalLen) {
                const readTo = Math.min(
                    pos + sampleSizeBytes, totalLen);
                const bytes = fileBuffer.subarray(pos, readTo);
                if (bytes.length < sampleSizeBytes) {
                    break;
                }
                const encoded = encoderEncoder.encode(bytes);
                // Write the sample length and the sample
                buffer.writeUInt8(encoded.length);
                buffer.writeBuffer(encoded);
                pos += sampleSizeBytes;
            }
            const encodedfileBuffer = buffer.toBuffer();
            if (outputFile) {
                fs.writeFileSync(outputFile, encodedfileBuffer);
            }
            const response = {
                encodedBuffer: encodedfileBuffer
            };
            resolve(response);
        });
    };

const isSupportedSampleRate = (sampleRate: number): boolean => {
    return OPUS_SUPPORTED_SAMPLE_RATES.includes(sampleRate);
};