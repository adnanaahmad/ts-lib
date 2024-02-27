import getInfo from 'ffprobe';
import { path as ffprobeStaticPath } from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';

import { convertBinFromOpus, ConvertedOpusFile } from './ogg-converter';

export type FFmpegStream = {
    readonly streamInfo: Map<string, unknown>
};

export type ConvertedFFmpegFile = {
    readonly streams: FFmpegStream[]
};

export enum FFmpegError {
    NoOpusStream
}

export const convertBinFromFile =
    async (filename: string, outputFile: string, opusFile: string):
        Promise<ConvertedOpusFile> => {
        try {
            await extractOpusFromFile(filename, opusFile);
        } catch (ffmpegError) {
            if (ffmpegError == FFmpegError.NoOpusStream) {
                await encodeOpusFromFile(filename, opusFile);
            } else {
                throw (ffmpegError);
            }
        }
        return await convertBinFromOpus(opusFile, outputFile);
    }

/**
 * Given an FFmpeg supported input file, outputs the first opus stream within that file to the provided
 * file and does nothing if no opus stream exists.
 * @param filename The input filename
 * @param outputFile The file to which the opus stream should be output
 * @returns Details on all streams present in the file
 */
const extractOpusFromFile =
    async (filename: string, outputFile: string):
        Promise<ConvertedFFmpegFile> => {
        return new Promise((resolve, reject) => {
            getInfo(
                filename,
                { path: ffprobeStaticPath },
                function (error, info) {
                    if (error) {
                        console.error(error)
                        reject(error);
                        return;
                    }
                    const streams: FFmpegStream[] = [];
                    for (let i = 0; i < info.streams.length; i++) {
                        const sourceStream = info.streams[i];
                        const streamInfo = new Map<string, unknown>();
                        Object.keys(sourceStream).forEach((key) => {
                            streamInfo.set(key, sourceStream[key]);
                        });
                        streams.push({
                            streamInfo: streamInfo
                        });
                    }
                    const opusIndex =
                        streams.findIndex(inputStream =>
                            inputStream.streamInfo.get('codec_name') == 'opus');
                    if (opusIndex == -1) {
                        reject(FFmpegError.NoOpusStream);
                        return;
                    }
                    try {
                        ffmpeg(filename).on(
                            'end',
                            () => {
                                resolve({
                                    streams: streams
                                });
                                return;
                            })
                            .addOutputOption(
                                ['-map ' + opusIndex.toString() + ':' +
                                    streams[opusIndex].streamInfo.get('index'),
                                    '-c:a copy'])
                            .save(outputFile);
                    } catch (ffmpegError) {
                        console.error(ffmpegError);
                        reject(ffmpegError);
                        return;
                    }
                });
        });
    };

const encodeOpusFromFile =
    async (filename: string, outputFile: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                ffmpeg(filename).on('end', () => {
                    resolve()
                }).addOutputOption('-c:a libopus').save(outputFile);
            } catch (ffmpegError) {
                console.error(ffmpegError);
                reject(ffmpegError);
            }
        });
    };