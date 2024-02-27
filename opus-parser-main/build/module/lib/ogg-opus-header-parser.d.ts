/// <reference types="node" />
export declare type OggOpusHeader = {
    readonly version: number;
    readonly outputChannels: number;
    readonly preskip: number;
    readonly sampleRate: number;
    readonly outputGain: number;
    readonly channelMapping: ChannelMapping;
    readonly comments: Comments;
    readonly headerLength: number;
};
export declare type ChannelMapping = {
    readonly family: number;
    readonly streamCount: number;
    readonly coupledCount: number;
    readonly mapping: readonly number[];
};
export declare type Comments = {
    readonly vendor: string;
    readonly comments: readonly string[];
};
export declare const parseHeader: (fileName: string, custom: boolean) => OggOpusHeader | Error;
export declare const parseHeaderFromBuffer: (fileBuffer: Buffer, custom: boolean) => OggOpusHeader | Error;
