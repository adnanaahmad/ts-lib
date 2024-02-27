import * as fs from 'fs';
import test from 'ava';
import { convertBinFromPcm, convertBinFromPcmBuffer } from './pcm-converter';
test('parseBinFromPcm', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile5.pcm';
    const outputFileName = __dirname + '/testfiles/testfile5_output.bin';
    const expectedFileName = __dirname + '/testfiles/testfile5.bin';
    const result = await convertBinFromPcm(inputFileName, { numChannels: 1, sampleRate: 48000 }, outputFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
    ;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
test('parseBinFromWavBuffer', async (t) => {
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile5.pcm');
    const expectedFileName = __dirname + '/testfiles/testfile5.bin';
    const result = await convertBinFromPcmBuffer(inputFileBuffer, { numChannels: 1, sampleRate: 48000 });
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGNtLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wY20tY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDaEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQzdELE1BQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQztJQUNyRSxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztJQUNoRSxNQUFNLE1BQU0sR0FDUixNQUFNLGlCQUFpQixDQUNuQixhQUFhLEVBQ2IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFDckMsY0FBYyxDQUFDLENBQUM7SUFFeEIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDcEQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDdEMsTUFBTSxlQUFlLEdBQ2pCLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDLENBQUE7SUFDM0QsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFDaEUsTUFBTSxNQUFNLEdBQ1IsTUFBTSx1QkFBdUIsQ0FDekIsZUFBZSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVoRSxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUM1RCxDQUFDLENBQUMsQ0FBQyJ9