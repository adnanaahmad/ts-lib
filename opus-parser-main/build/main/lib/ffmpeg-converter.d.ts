import { ConvertedOpusFile } from './ogg-converter';
export declare type FFmpegStream = {
    readonly streamInfo: Map<string, unknown>;
};
export declare type ConvertedFFmpegFile = {
    readonly streams: FFmpegStream[];
};
export declare enum FFmpegError {
    NoOpusStream = 0
}
export declare const convertBinFromFile: (filename: string, outputFile: string, opusFile: string) => Promise<ConvertedOpusFile>;
