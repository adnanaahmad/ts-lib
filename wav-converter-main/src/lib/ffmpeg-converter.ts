import ffmpeg from 'fluent-ffmpeg';

export enum FFmpegError {
    NoOpusStream
}

export const convertWavFromFile =
    async (filename: string, outputFile: string):
        Promise<void> => {
        return new Promise((resolve, reject) => {
            try {
                ffmpeg(filename).on('end', () => {
                    resolve()
                }).addOutputOption('-c:a pcm_u8').save(outputFile);
            } catch (ffmpegError) {
                console.error(ffmpegError);
                reject(ffmpegError);
            }
        });
    }