"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWavFromFile = exports.FFmpegError = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var FFmpegError;
(function (FFmpegError) {
    FFmpegError[FFmpegError["NoOpusStream"] = 0] = "NoOpusStream";
})(FFmpegError = exports.FFmpegError || (exports.FFmpegError = {}));
exports.convertWavFromFile = async (filename, outputFile) => {
    return new Promise((resolve, reject) => {
        try {
            fluent_ffmpeg_1.default(filename).on('end', () => {
                resolve();
            }).addOutputOption('-c:a pcm_u8').save(outputFile);
        }
        catch (ffmpegError) {
            console.error(ffmpegError);
            reject(ffmpegError);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmZtcGVnLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRUFBbUM7QUFFbkMsSUFBWSxXQUVYO0FBRkQsV0FBWSxXQUFXO0lBQ25CLDZEQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUZXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBRXRCO0FBRVksUUFBQSxrQkFBa0IsR0FDM0IsS0FBSyxFQUFFLFFBQWdCLEVBQUUsVUFBa0IsRUFDekIsRUFBRTtJQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLElBQUk7WUFDQSx1QkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUM1QixPQUFPLEVBQUUsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEQ7UUFBQyxPQUFPLFdBQVcsRUFBRTtZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFBIn0=