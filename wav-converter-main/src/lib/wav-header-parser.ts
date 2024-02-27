import * as fs from 'fs';

import {
    WAV_CHUNK_ID,
    WAV_DATA_SUBCHUNK_ID,
    WAV_FMT_SUBCHUNK_ID,
    WAV_FORMAT,
    WavHeader
} from './wav-header';


export const parseHeader = (fileName: string): WavHeader | Error => {
    const fileBuffer = fs.readFileSync(fileName);
    return parseHeaderFromBuffer(fileBuffer);
};

export const parseHeaderFromBuffer =
    (fileBuffer: Buffer): WavHeader | Error => {
        let offset = 0;

        const chunkId = fileBuffer.subarray(offset, offset + 4).toString();
        offset += 4;
        if (chunkId != WAV_CHUNK_ID) {
            return new Error(
                'Invalid WAV file does not start with correct chunk ID');
        }
        const chunkSize = fileBuffer.readUInt32LE(offset);
        offset += 4;
        if (fileBuffer.length != chunkSize + 8) {
            return new Error('Invalid WAV file has incorrect length');
        }
        const format = fileBuffer.subarray(offset, offset + 4).toString();
        offset += 4;
        if (format != WAV_FORMAT) {
            return new Error('Invalid WAV file has incorrect format');
        }
        const subchunk1Id = fileBuffer.subarray(offset, offset + 4).toString();
        offset += 4;
        if (subchunk1Id != WAV_FMT_SUBCHUNK_ID) {
            return new Error(
                'Invalid WAV file has incorrect subchunk 1 ID');
        }
        const subChunk1Size = fileBuffer.readUInt32LE(offset);
        offset += 4;
        const audioFormat = fileBuffer.readUInt16LE(offset);
        offset += 2;
        const numChannels = fileBuffer.readUInt16LE(offset);
        offset += 2;
        const sampleRate = fileBuffer.readUInt32LE(offset);
        offset += 4;
        const byteRate = fileBuffer.readUInt32LE(offset);
        offset += 4;
        const blockAlign = fileBuffer.readUInt16LE(offset);
        offset += 2;
        const bitsPerSample = fileBuffer.readUInt16LE(offset);
        offset += 2;
        let extraData = Buffer.from('');
        if (subChunk1Size != 16) {
            if (audioFormat == 1) {
                return new Error(
                    'Invalid WAV file has incorrect size for subchunk 1');
            }
            const extraDataSize = fileBuffer.readUInt16LE(offset);
            offset += 2;
            if (subChunk1Size != 16 + 2 + extraDataSize) {
                return new Error(
                    'Invalid WAV file has incorrect size for extra data');
            }
            extraData = fileBuffer.subarray(offset, offset + extraDataSize);
            offset += extraDataSize;
        }
        let dataChunkReached = false;
        while (!dataChunkReached && offset < fileBuffer.length) {
            const subchunkId =
                fileBuffer.subarray(offset, offset + 4).toString();
            offset += 4;
            if (subchunkId == WAV_DATA_SUBCHUNK_ID) {
                dataChunkReached = true;
                break;
            }
            const subchunkLength = fileBuffer.readUInt32LE(offset);
            offset += 4;
            offset += subchunkLength;
        }

        if (!dataChunkReached) {
            return new Error('Invalid WAV file does not have data subchunk ID');
        }
        // The header completes 4 bytes after the data subchunk's ID
        const headerLength = offset + 4;

        const wavHeader: WavHeader = {
            audioFormat: audioFormat,
            numChannels: numChannels,
            sampleRate: sampleRate,
            byteRate: byteRate,
            blockAlign: blockAlign,
            bitsPerSample: bitsPerSample,
            extraData: extraData,
            headerLength: headerLength
        };
        return wavHeader;
    };