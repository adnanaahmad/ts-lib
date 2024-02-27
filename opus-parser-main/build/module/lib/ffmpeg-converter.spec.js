import * as fs from 'fs';
import test from 'ava';
import { convertBinFromFile } from './ffmpeg-converter';
test('convertBinFromFile', async (t) => {
    const expectedHeader = {
        version: 1,
        outputChannels: 1,
        preskip: 312,
        sampleRate: 48000,
        outputGain: 0,
        channelMapping: {
            family: 0,
            streamCount: 1,
            coupledCount: 0,
            mapping: []
        },
        comments: {
            vendor: 'Lavf59.27.100',
            comments: ['language=eng',
                'handler_name=SoundHandler',
                'vendor_id=[0][0][0][0]',
                'encoder=Lavc59.37.100 libopus',
                'major_brand=isom',
                'minor_version=512',
                'compatible_brands=isomiso2mp41']
        },
        headerLength: 235,
    };
    const inputFileName = __dirname + '/testfiles/testfile3.mp4';
    const outputFileName = __dirname + '/testfiles/testfile3_output.bin';
    const outputOpusFileName = __dirname + '/testfiles/testfile3_output.opus';
    const expectedFileName = __dirname + '/testfiles/testfile3.bin';
    const result = await convertBinFromFile(inputFileName, outputFileName, outputOpusFileName);
    t.deepEqual(result.header, expectedHeader);
    const outputFileBuffer = fs.readFileSync(outputFileName);
    const expectedFileBuffer = fs.readFileSync(expectedFileName);
    t.true(outputFileBuffer.equals(expectedFileBuffer));
    fs.unlinkSync(outputFileName);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmZtcGVnLWNvbnZlcnRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mZm1wZWctY29udmVydGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR3hELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDbkMsTUFBTSxjQUFjLEdBQWtCO1FBQ2xDLE9BQU8sRUFBRSxDQUFDO1FBQ1YsY0FBYyxFQUFFLENBQUM7UUFDakIsT0FBTyxFQUFFLEdBQUc7UUFDWixVQUFVLEVBQUUsS0FBSztRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLGNBQWMsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxRQUFRLEVBQUU7WUFDTixNQUFNLEVBQUUsZUFBZTtZQUN2QixRQUFRLEVBQUUsQ0FBQyxjQUFjO2dCQUNyQiwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsK0JBQStCO2dCQUMvQixrQkFBa0I7Z0JBQ2xCLG1CQUFtQjtnQkFDbkIsZ0NBQWdDLENBQUM7U0FDeEM7UUFDRCxZQUFZLEVBQUUsR0FBRztLQUNwQixDQUFDO0lBQ0YsTUFBTSxhQUFhLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO0lBQzdELE1BQU0sY0FBYyxHQUFHLFNBQVMsR0FBRyxpQ0FBaUMsQ0FBQztJQUNyRSxNQUFNLGtCQUFrQixHQUFHLFNBQVMsR0FBRyxrQ0FBa0MsQ0FBQztJQUMxRSxNQUFNLGdCQUFnQixHQUFHLFNBQVMsR0FBRywwQkFBMEIsQ0FBQztJQUNoRSxNQUFNLE1BQU0sR0FBRyxNQUFNLGtCQUFrQixDQUNuQyxhQUFhLEVBQ2IsY0FBYyxFQUNkLGtCQUFrQixDQUFDLENBQUE7SUFFdkIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6RCxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDcEQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQyJ9