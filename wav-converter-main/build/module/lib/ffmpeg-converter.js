import ffmpeg from 'fluent-ffmpeg';
export var FFmpegError;
(function (FFmpegError) {
    FFmpegError[FFmpegError["NoOpusStream"] = 0] = "NoOpusStream";
})(FFmpegError || (FFmpegError = {}));
export const convertWavFromFile = async (filename, outputFile) => {
    return new Promise((resolve, reject) => {
        try {
            ffmpeg(filename).on('end', () => {
                resolve();
            }).addOutputOption('-c:a pcm_u8').save(outputFile);
        }
        catch (ffmpegError) {
            console.error(ffmpegError);
            reject(ffmpegError);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmZtcGVnLWNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxlQUFlLENBQUM7QUFFbkMsTUFBTSxDQUFOLElBQVksV0FFWDtBQUZELFdBQVksV0FBVztJQUNuQiw2REFBWSxDQUFBO0FBQ2hCLENBQUMsRUFGVyxXQUFXLEtBQVgsV0FBVyxRQUV0QjtBQUVELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUMzQixLQUFLLEVBQUUsUUFBZ0IsRUFBRSxVQUFrQixFQUN6QixFQUFFO0lBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsSUFBSTtZQUNBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDNUIsT0FBTyxFQUFFLENBQUE7WUFDYixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3REO1FBQUMsT0FBTyxXQUFXLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSJ9