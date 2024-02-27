import * as fs from 'fs';
import test from 'ava';
import { convertWavFromFile } from './ffmpeg-converter';
test('convertBinFromFile', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile4.mp4';
    const outputFileName = __dirname + '/testfiles/testfile4_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile4.wav';
    await convertWavFromFile(inputFileName, outputFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mZm1wZWctY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3hELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbkMsTUFBTSxhQUFhLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQzdELE1BQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQztJQUNyRSxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztJQUNoRSxNQUFNLGtCQUFrQixDQUNwQixhQUFhLEVBQ2IsY0FBYyxDQUFDLENBQUM7SUFFcEIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDIn0=