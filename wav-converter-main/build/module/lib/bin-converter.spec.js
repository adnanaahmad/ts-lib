import * as fs from 'fs';
import test from 'ava';
import { convertWavFromBin, convertWavFromBinBuffer } from './bin-converter';
test('convertWavFromBin', async (t) => {
    const inputFileName = __dirname + '/testfiles/testfile3.bin';
    const outputFileName = __dirname + '/testfiles/testfile3_output.wav';
    const expectedFileName = __dirname + '/testfiles/testfile3.wav';
    const result = await convertWavFromBin(inputFileName, {
        numChannels: 2, sampleRate: 48000
    }, outputFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
test('convertWavFromBinBuffer', async (t) => {
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile3.bin');
    const expectedFileName = __dirname + '/testfiles/testfile3.wav';
    const result = await convertWavFromBinBuffer(inputFileBuffer, {
        numChannels: 2, sampleRate: 48000
    });
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(result.wavBuffer.equals(expectedFileBuffer));
    ;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9iaW4tY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQzdELE1BQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQztJQUNyRSxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztJQUVoRSxNQUFNLE1BQU0sR0FBRyxNQUFNLGlCQUFpQixDQUNsQyxhQUFhLEVBQ2I7UUFDSSxXQUFXLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLO0tBQ3BDLEVBQ0QsY0FBYyxDQUFDLENBQUM7SUFFcEIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQztJQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDcEQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDeEMsTUFBTSxlQUFlLEdBQ2pCLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDLENBQUM7SUFDNUQsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7SUFFaEUsTUFBTSxNQUFNLEdBQUcsTUFBTSx1QkFBdUIsQ0FDeEMsZUFBZSxFQUNmO1FBQ0ksV0FBVyxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSztLQUNwQyxDQUFDLENBQUM7SUFFUCxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUMifQ==