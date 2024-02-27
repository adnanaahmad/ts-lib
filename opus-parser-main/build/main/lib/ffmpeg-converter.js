"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBinFromFile = exports.FFmpegError = void 0;
const ffprobe_1 = __importDefault(require("ffprobe"));
const ffprobe_static_1 = require("ffprobe-static");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ogg_converter_1 = require("./ogg-converter");
var FFmpegError;
(function (FFmpegError) {
    FFmpegError[FFmpegError["NoOpusStream"] = 0] = "NoOpusStream";
})(FFmpegError = exports.FFmpegError || (exports.FFmpegError = {}));
exports.convertBinFromFile = async (filename, outputFile, opusFile) => {
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
    return await ogg_converter_1.convertBinFromOpus(opusFile, outputFile);
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
        ffprobe_1.default(filename, { path: ffprobe_static_1.path }, function (error, info) {
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
                fluent_ffmpeg_1.default(filename).on('end', () => {
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
            fluent_ffmpeg_1.default(filename).on('end', () => {
                resolve();
            }).addOutputOption('-c:a libopus').save(outputFile);
        }
        catch (ffmpegError) {
            console.error(ffmpegError);
            reject(ffmpegError);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmZtcGVnLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsbURBQTJEO0FBQzNELGtFQUFtQztBQUVuQyxtREFBd0U7QUFVeEUsSUFBWSxXQUVYO0FBRkQsV0FBWSxXQUFXO0lBQ25CLDZEQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUZXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBRXRCO0FBRVksUUFBQSxrQkFBa0IsR0FDM0IsS0FBSyxFQUFFLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxRQUFnQixFQUM5QixFQUFFO0lBQzdCLElBQUk7UUFDQSxNQUFNLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNqRDtJQUFDLE9BQU8sV0FBVyxFQUFFO1FBQ2xCLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDekMsTUFBTSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QjtLQUNKO0lBQ0QsT0FBTyxNQUFNLGtDQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUE7QUFFTDs7Ozs7O0dBTUc7QUFDSCxNQUFNLG1CQUFtQixHQUNyQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUNWLEVBQUU7SUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxpQkFBTyxDQUNILFFBQVEsRUFDUixFQUFFLElBQUksRUFBRSxxQkFBaUIsRUFBRSxFQUMzQixVQUFVLEtBQUssRUFBRSxJQUFJO1lBQ2pCLElBQUksS0FBSyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1Y7WUFDRCxNQUFNLE9BQU8sR0FBbUIsRUFBRSxDQUFDO1lBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7Z0JBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNULFVBQVUsRUFBRSxVQUFVO2lCQUN6QixDQUFDLENBQUM7YUFDTjtZQUNELE1BQU0sU0FBUyxHQUNYLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FDNUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUM7WUFDNUQsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE9BQU87YUFDVjtZQUNELElBQUk7Z0JBQ0EsdUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQ2YsS0FBSyxFQUNMLEdBQUcsRUFBRTtvQkFDRCxPQUFPLENBQUM7d0JBQ0osT0FBTyxFQUFFLE9BQU87cUJBQ25CLENBQUMsQ0FBQztvQkFDSCxPQUFPO2dCQUNYLENBQUMsQ0FBQztxQkFDRCxlQUFlLENBQ1osQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUc7d0JBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztvQkFDMUMsV0FBVyxDQUFDLENBQUM7cUJBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6QjtZQUFDLE9BQU8sV0FBVyxFQUFFO2dCQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU87YUFDVjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFTixNQUFNLGtCQUFrQixHQUNwQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUFpQixFQUFFO0lBQzFELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSTtZQUNBLHVCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQzVCLE9BQU8sRUFBRSxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2RDtRQUFDLE9BQU8sV0FBVyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMifQ==