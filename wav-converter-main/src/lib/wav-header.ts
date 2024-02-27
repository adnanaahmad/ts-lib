import { SmartBuffer } from 'smart-buffer';
export const WAV_CHUNK_ID = 'RIFF';
export const WAV_FORMAT = 'WAVE';
export const WAV_FMT_SUBCHUNK_ID = 'fmt ';
export const WAV_DATA_SUBCHUNK_ID = 'data';

export const WAV_AUDIO_FORMAT_PCM = 1;

// The Wav Header.
export type WavHeader = {
    // 16 bits
    audioFormat: number;
    // 16 bits
    numChannels: number;
    // 32 bits
    sampleRate: number;
    // 32 bits
    byteRate: number;
    // 16 bits
    blockAlign: number;
    // 16 bits
    bitsPerSample: number;
    extraData: Buffer;
    headerLength: number;
};

export const getDefaultWavHeader = (): WavHeader => {
    return {
        audioFormat: 0,
        numChannels: 0,
        sampleRate: 0,
        byteRate: 0,
        blockAlign: 0,
        bitsPerSample: 0,
        extraData: Buffer.from(''),
        headerLength: 44,
    };
}

export const getWavHeader = (
    audioFormat: number,
    numChannels: number,
    sampleRate: number,
    bitsPerSample: number,
    extraData?: Buffer): WavHeader => {
    return {
        audioFormat: audioFormat,
        numChannels: numChannels,
        sampleRate: sampleRate,
        byteRate: sampleRate * numChannels * bitsPerSample / 8,
        blockAlign: numChannels * bitsPerSample / 8,
        bitsPerSample: bitsPerSample,
        extraData: (extraData ? extraData : Buffer.from('')),
        headerLength: 44 +
            (extraData && extraData.length != 0 ? extraData.length + 2 : 0),
    }
}

export const convertWavHeaderToBuffer =
    (wavHeader: WavHeader, fileLength: number): Buffer | Error => {
        if (wavHeader.audioFormat == 1 && wavHeader.extraData.length != 0) {
            return Error('Invalid header. PCM does not support extra data');
        }
        const buffer = new SmartBuffer();

        buffer.writeString(WAV_CHUNK_ID);
        buffer.writeUInt32LE(fileLength + wavHeader.headerLength - 8);
        buffer.writeString(WAV_FORMAT);
        buffer.writeString(WAV_FMT_SUBCHUNK_ID);
        let subChunk1Size = 16;
        if (wavHeader.extraData.length != 0) {
            subChunk1Size += 2;
            subChunk1Size += wavHeader.extraData.length;
        }
        buffer.writeUInt32LE(subChunk1Size);
        buffer.writeUInt16LE(wavHeader.audioFormat);
        buffer.writeUInt16LE(wavHeader.numChannels)
        buffer.writeUInt32LE(wavHeader.sampleRate);
        buffer.writeUInt32LE(wavHeader.byteRate);
        buffer.writeUInt16LE(wavHeader.blockAlign);
        buffer.writeUInt16LE(wavHeader.bitsPerSample);
        if (wavHeader.extraData.length != 0) {
            buffer.writeUInt16LE(wavHeader.extraData.length, 0);
            buffer.writeBuffer(wavHeader.extraData);
        }
        buffer.writeString(WAV_DATA_SUBCHUNK_ID);
        buffer.writeUInt32LE(fileLength);
        return buffer.toBuffer();
    }