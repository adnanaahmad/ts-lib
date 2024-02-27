import * as fs from 'fs';
import test from 'ava';
import { convertBinFromOpus, convertBinFromOpusBuffer } from './ogg-converter';
test('parseBinFromOpus', async (t) => {
    const expectedHeader = {
        version: 1,
        outputChannels: 2,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 1,
            mapping: []
        },
        comments: {
            vendor: 'Lavf57.83.100',
            comments: ['encoder=Lavc57.107.100 libopus',
                'title=Symphony No.6 (1st movement)',
                'artist=Ludwig van Beethoven',
                'album=www.mfiles.co.uk',
                'DESCRIPTION=� Music Files Ltd',
                'genre=Classical']
        },
        headerLength: 237,
    };
    const inputFileName = __dirname + '/testfiles/testfile.opus';
    const outputFileName = __dirname + '/testfiles/testfile_output.bin';
    const outputHeaderFileName = __dirname + '/testfiles/testfile_output.opusheader';
    const expectedFileName = __dirname + '/testfiles/testfile.bin';
    const expectedHeaderFileName = __dirname + '/testfiles/testfile.opusheader';
    const result = await convertBinFromOpus(inputFileName, outputFileName, outputHeaderFileName);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const outputHeaderFileBuffer = fs.readFileSync(outputHeaderFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    const expectedHeaderFileBuffer = fs.readFileSync(expectedHeaderFileName);
    t.deepEqual(result.header, expectedHeader);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    t.true(outputHeaderFileBuffer.equals(expectedHeaderFileBuffer));
    fs.unlinkSync(outputFileName);
    fs.unlinkSync(outputHeaderFileName);
});
test('parseBinFromOpusBuffer', async (t) => {
    const expectedHeader = {
        version: 1,
        outputChannels: 2,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 1,
            mapping: []
        },
        comments: {
            vendor: 'Lavf57.83.100',
            comments: ['encoder=Lavc57.107.100 libopus',
                'title=Symphony No.6 (1st movement)',
                'artist=Ludwig van Beethoven',
                'album=www.mfiles.co.uk',
                'DESCRIPTION=� Music Files Ltd',
                'genre=Classical']
        },
        headerLength: 237,
    };
    const inputFileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.opus');
    const expectedFileName = __dirname + '/testfiles/testfile.bin';
    const result = await convertBinFromOpusBuffer(inputFileBuffer);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.deepEqual(result.header, expectedHeader);
    t.true(result.encodedBuffer.equals(expectedFileBuffer));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vZ2ctY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRy9FLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDakMsTUFBTSxjQUFjLEdBQWtCO1FBQ2xDLE9BQU8sRUFBRSxDQUFDO1FBQ1YsY0FBYyxFQUFFLENBQUM7UUFDakIsT0FBTyxFQUFFLEdBQUc7UUFDWixVQUFVLEVBQUUsS0FBSztRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLGNBQWMsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxRQUFRLEVBQUU7WUFDTixNQUFNLEVBQUUsZUFBZTtZQUN2QixRQUFRLEVBQUUsQ0FBQyxnQ0FBZ0M7Z0JBQ3ZDLG9DQUFvQztnQkFDcEMsNkJBQTZCO2dCQUM3Qix3QkFBd0I7Z0JBQ3hCLCtCQUErQjtnQkFDL0IsaUJBQWlCLENBQUM7U0FDekI7UUFDRCxZQUFZLEVBQUUsR0FBRztLQUNwQixDQUFDO0lBQ0YsTUFBTSxhQUFhLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQzdELE1BQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxnQ0FBZ0MsQ0FBQztJQUNwRSxNQUFNLG9CQUFvQixHQUN0QixTQUFTLEdBQUcsdUNBQXVDLENBQUM7SUFDeEQsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLEdBQUcseUJBQXlCLENBQUM7SUFDL0QsTUFBTSxz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