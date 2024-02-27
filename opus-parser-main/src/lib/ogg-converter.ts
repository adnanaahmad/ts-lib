import * as fs from 'fs';
import { Readable } from 'stream';

import { Decoder as OggDecoder } from '@suldashi/ogg';
import { SmartBuffer } from 'smart-buffer';

import {
    OggOpusHeader,
    parseHeader,
    parseHeaderFromBuffer
} from './ogg-opus-header-parser';

export type ConvertedOpusFile = {
    header: OggOpusHeader,
    encodedBuffer: Buffer,
};

export enum OpusError {
    InvalidHeader,
}

export const convertBinFromOpus =
    async (filename: string, outputFile?: string, headerFile?: string):
        Promise<ConvertedOpusFile> => {
        const fileStream = fs.createReadStream(filename);
        return convertBinFromOpusFileStream(fileStream, outputFile, headerFile);
    };

export const convertBinFromOpusBuffer =
    async (fileBuffer: Buffer, outputFile?: string, headerFile?: string):
        Promise<ConvertedOpusFile> => {
        const fileStream = Readable.from(fileBuffer);
        return convertBinFromOpusFileStream(fileStream, outputFile, headerFile);
    };

const convertBinFromOpusFileStream =
    async (fileStream: Readable, outputFile?: string, headerFile?: string):
        Promise<ConvertedOpusFile> => {
        const oggDecoder = new OggDecoder();

        const headerBuffer = new SmartBuffer();
        const buffer = new SmartBuffer();
        return new Promise((resolve, reject) => {
            // pipe the ogg file to the Decoder
            oggDecoder.on('stream', function (stream) {
                // emitted for each `ogg_packet` instance in the stream.
                stream.on('data', function (packet) {
                    // The first two packets are header packets after which each packet is an
                    // OPUS frame
                    if (packet.packetno <= 1) {
                        headerBuffer.writeUInt32LE(packet._packet.length);
                        headerBuffer.writeBuffer(packet._packet);
                    } else {
                        buffer.writeUInt32LE(packet._packet.length);
                        buffer.writeBuffer(packet._packet);
                    }
                });
            });
            oggDecoder.on('finish', function () {
                const headerFileBuffer = headerBuffer.toBuffer();
                if (headerFile) {
                    fs.writeFileSync(headerFile, headerFileBuffer);
                }
                const fileBuffer = buffer.toBuffer();
                if (outputFile) {
                    fs.writeFileSync(outputFile, fileBuffer);
                }

                let opusHeaderResult: OggOpusHeader | Error;
                if (headerFile) {
                    opusHeaderResult = parseHeader(headerFile, true);
                } else {
                    opusHeaderResult =
                        parseHeaderFromBuffer(headerFileBuffer, true);
                }
                if (opusHeaderResult instanceof Error) {
                    reject(OpusError.InvalidHeader);
                    return;
                }
                const opusFile: ConvertedOpusFile = {
                    header: <OggOpusHeader>opusHeaderResult,
                    encodedBuffer: fileBuffer
                };
                resolve(opusFile);
                return;
            })
            fileStream.pipe(oggDecoder);
        });
    };