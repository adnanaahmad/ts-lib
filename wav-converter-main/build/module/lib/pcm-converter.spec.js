import * as fs from 'fs';
import test from 'ava';
import { convertWavFromPcm, convertWavFromPcmBuffer } from './pcm-converter';
test('convertWavFromPcm', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile.pcm';
    const outputFileName = __dirname + '/testfiles/testfile_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile.wav';
    const result = await convertWavFromPcm(inputFileName, {
        numChannels: 1, sampleRate: 44100, bitsPerSample: 16
    }, outputFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
test('convertWavFromPcmBuffer', async (t) => {
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.pcm');
    const expectedFileName = __dirname + '/testfiles/testfile.wav';
    const result = await convertWavFromPcmBuffer(inputFileBuffer, {
        numChannels: 1, sampleRate: 44100, bitsPerSample: 16
    });
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wY20tY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxHQUFHLHlCQUF5QixDQUFDO0lBQzVELE1BQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxnQ0FBZ0MsQ0FBQztJQUNwRSxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQztJQUUvRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGlCQUFpQixDQUNsQyxhQUFhLEVBQ2I7UUFDSSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUU7S0FDdkQsRUFDRCxjQUFjLENBQUMsQ0FBQztJQUVwQixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDekQsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQ3JELENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUNwRCxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN4QyxNQUFNLGVBQWUsR0FDakIsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcseUJBQXlCLENBQUMsQ0FBQztJQUMzRCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQztJQUUvRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHVCQUF1QixDQUN4QyxlQUFlLEVBQ2Y7UUFDSSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUU7S0FDdkQsQ0FBQyxDQUFDO0lBRVAsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDO0FBQ3pELENBQUMsQ0FBQyxDQUFDIn0=