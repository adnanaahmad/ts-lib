/// <reference types="node" />
export declare const WAV_CHUNK_ID = "RIFF";
export declare const WAV_FORMAT = "WAVE";
export declare const WAV_FMT_SUBCHUNK_ID = "fmt ";
export declare const WAV_DATA_SUBCHUNK_ID = "data";
export declare const WAV_AUDIO_FORMAT_PCM = 1;
export declare type WavHeader = {
    audioFormat: number;
    numChannels: number;
    sampleRate: number;
    byteRate: number;
    blockAlign: number;
    bitsPerSample: number;
    extraData: Buffer;
    headerLength: number;
};
export declare const getDefaultWavHeader: () => WavHeader;
export declare const getWavHeader: (audioFormat: number, numChannels: number, sampleRate: number, bitsPerSample: number, extraData?: Buffer) => WavHeader;
export declare const convertWavHeaderToBuffer: (wavHeader: WavHeader, fileLength: number) => Buffer | Error;
