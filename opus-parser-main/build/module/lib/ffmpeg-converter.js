import getInfo from 'ffprobe';
import { path as ffprobeStaticPath } from 'ffprobe-static';
import ffmpeg from 'fluent-ffmpeg';
import { convertBinFromOpus } from './ogg-converter';
export var FFmpegError;
(function (FFmpegError) {
    FFmpegError[FFmpegError["NoOpusStream"] = 0] = "NoOpusStream";
})(FFmpegError || (FFmpegError = {}));
export const convertBinFromFile = async (filename, outputFile, opusFile) => {
    try {
        await extractOpusFromFile(filename, opusFile);
    }
    catch (ffmpegError) {
        if (ffmpegError == FFmpegError.NoOpusStream) {
            await encodeOpusFromFile(filename, opusFile);
        }
        else {
            throw (ffmpegError);
        }
    }
    return await convertBinFromOpus(opusFile, outputFile);
};
/**
 * Given an FFmpeg supported input file, outputs the first opus stream within that file to the provided
 * file and does nothing if no opus stream exists.
 * @param filename The input filename
 * @param outputFile The file to which the opus stream should be output
 * @returns Details on all streams present in the file
 */
const extractOpusFromFile = async (filename, outputFile) => {
    return new Promise((resolve, reject) => {
        getInfo(filename, { path: ffprobeStaticPath }, function (error, info) {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }
            const streams = [];
            for (let i = 0; i < info.streams.length; i++) {
                const sourceStream = info.streams[i];
                const streamInfo = new Map();
                Object.keys(sourceStream).forEach((key) => {
                    streamInfo.set(key, sourceStream[key]);
                });
                streams.push({
                    streamInfo: streamInfo
                });
            }
            const opusIndex = streams.findIndex(inputStream => inputStream.streamInfo.get('codec_name') == 'opus');
            if (opusIndex == -1) {
                reject(FFmpegError.NoOpusStream);
                return;
            }
            try {
                ffmpeg(filename).on('end', () => {
                    resolve({
                        streams: streams
                    });
                    return;
                })
                    .addOutputOption(['-map ' + opusIndex.toString() + ':' +
                        streams[opusIndex].streamInfo.get('index'),
                    '-c:a copy'])
                    .save(outputFile);
            }
            catch (ffmpegError) {
                console.error(ffmpegError);
                reject(ffmpegError);
                return;
            }
        });
    });
};
const encodeOpusFromFile = async (filename, outputFile) => {
    return new Promise((resolve, reject) => {
        try {
            ffmpeg(filename).on('end', () => {
                resolve();
            }).addOutputOption('-c:a libopus').save(outputFile);
        }
        catch (ffmpegError) {
            console.error(ffmpegError);
            reject(ffmpegError);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmZtcGVnLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxFQUFFLElBQUksSUFBSSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sTUFBTSxNQUFNLGVBQWUsQ0FBQztBQUVuQyxPQUFPLEVBQUUsa0JBQWtCLEVBQXFCLE1BQU0saUJBQWlCLENBQUM7QUFVeEUsTUFBTSxDQUFOLElBQVksV0FFWDtBQUZELFdBQVksV0FBVztJQUNuQiw2REFBWSxDQUFBO0FBQ2hCLENBQUMsRUFGVyxXQUFXLEtBQVgsV0FBVyxRQUV0QjtBQUVELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUMzQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLFFBQWdCLEVBQzlCLEVBQUU7SUFDN0IsSUFBSTtRQUNBLE1BQU0sbUJBQW1CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2pEO0lBQUMsT0FBTyxXQUFXLEVBQUU7UUFDbEIsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtZQUN6QyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3ZCO0tBQ0o7SUFDRCxPQUFPLE1BQU0sa0JBQWtCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQTtBQUVMOzs7Ozs7R0FNRztBQUNILE1BQU0sbUJBQW1CLEdBQ3JCLEtBQUssRUFBRSxRQUFnQixFQUFFLFVBQWtCLEVBQ1YsRUFBRTtJQUMvQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FDSCxRQUFRLEVBQ1IsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsRUFDM0IsVUFBVSxLQUFLLEVBQUUsSUFBSTtZQUNqQixJQUFJLEtBQUssRUFBRTtnQkFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTzthQUNWO1lBQ0QsTUFBTSxPQUFPLEdBQW1CLEVBQUUsQ0FBQztZQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUN0QyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDVCxVQUFVLEVBQUUsVUFBVTtpQkFDekIsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNLFNBQVMsR0FDWCxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQzVCLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDO1lBQzVELElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUNqQixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxPQUFPO2FBQ1Y7WUFDRCxJQUFJO2dCQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQ2YsS0FBSyxFQUNMLEdBQUcsRUFBRTtvQkFDRCxPQUFPLENBQUM7d0JBQ0osT0FBTyxFQUFFLE9BQU87cUJBQ25CLENBQUMsQ0FBQztvQkFDSCxPQUFPO2dCQUNYLENBQUMsQ0FBQztxQkFDRCxlQUFlLENBQ1osQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUc7d0JBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztvQkFDMUMsV0FBVyxDQUFDLENBQUM7cUJBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6QjtZQUFDLE9BQU8sV0FBVyxFQUFFO2dCQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU87YUFDVjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFTixNQUFNLGtCQUFrQixHQUNwQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUFpQixFQUFFO0lBQzFELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSTtZQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZEO1FBQUMsT0FBTyxXQUFXLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9