import * as fs from 'fs';

import { OpusEncoder } from '@discordjs/opus';
import { SmartBuffer } from 'smart-buffer';
import { parseHeaderFromBuffer, WavHeader } from 'wav-converter';

const OPUS_SUPPORTED_SAMPLE_RATES = [8000, 12000, 16000, 24000, 48000];

export type ConvertedWavFile = {
    readonly numChannels: number,
    readonly sampleRate: number,
    readonly encodedBuffer: Buffer
};

export enum WavError {
    InvalidHeader,
    InvalidSampleRate,
    InvalidSampleSize,
}

export const convertBinFromWav =
    async (filename: string, outputFile?: string):
        Promise<ConvertedWavFile> => {
        const fileBuffer = fs.readFileSync(filename);
        return convertBinFromWavBuffer(fileBuffer, outputFile);
    };

export const convertBinFromWavBuffer =
    async (fileBuffer: Buffer, outputFile?: string):
        Promise<ConvertedWavFile> => {
        return new Promise((resolve, reject) => {
            const headerOrError = parseHeaderFromBuffer(fileBuffer);
            if (headerOrError instanceof Error) {
                console.error('Unable to parse WAV file ' + headerOrError);
                reject(WavError.InvalidHeader);
                return;
            }
            const header: WavHeader = headerOrError;
            if (!isSupportedSampleRate(header.sampleRate)) {
                console.error('Opus encoder only supports sample rates of' +
                    ' 8000, 12000, 16000, 24000, 48000.' +
                    ' Actual sample rate is ' + header.sampleRate);
                reject(WavError.InvalidSampleRate);
                return;
            }

            const encoderEncoder = new OpusEncoder(
                header.sampleRate, header.numChannels);
            const buffer = new SmartBuffer();

            const totalLen = fileBuffer.length;
            let pos = header.headerLength;
            // The OPUS encoder only supports 16-bit integers
            // We encode in frames of 10ms
            if (header.bitsPerSample != 16) {
                console.error('Opus encoder only supports 16 bit integers');
                reject(WavError.InvalidSampleSize);
                return;
            }
            const sampleSizeBytes =
                (header.sampleRate / 100) * (header.bitsPerSample / 8);
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
                numChannels: header.numChannels,
                sampleRate: header.sampleRate,
                encodedBuffer: encodedfileBuffer
            };
            resolve(response);
        });
    };

const isSupportedSampleRate = (sampleRate: number): boolean => {
    return OPUS_SUPPORTED_SAMPLE_RATES.includes(sampleRate);
};