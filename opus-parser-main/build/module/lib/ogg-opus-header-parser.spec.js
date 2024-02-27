import * as fs from 'fs';
import test from 'ava';
import { parseHeader, parseHeaderFromBuffer } from './ogg-opus-header-parser';
test('parseHeader_classic', (t) => {
    const expected = {
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
        headerLength: 229,
    };
    t.deepEqual(parseHeader(__dirname + '/testfiles/testfile.classicopusheader', false), expected);
});
test('parseHeader_custom', (t) => {
    const expected = {
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
    t.deepEqual(parseHeader(__dirname + '/testfiles/testfile.opusheader', true), expected);
});
test('parseHeaderFromBuffer_classic', (t) => {
    const expected = {
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
        headerLength: 229,
    };
    const fileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.classicopusheader');
    t.deepEqual(parseHeaderFromBuffer(fileBuffer, false), expected);
});
test('parseHeaderFromBuffer_custom', (t) => {
    const expected = {
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
    const fileBuffer = fs.readFileSync(__dirname + '/testfiles/testfile.opusheader');
    t.deepEqual(parseHeaderFromBuffer(fileBuffer, true), expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLW9wdXMtaGVhZGVyLXBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vZ2ctb3B1cy1oZWFkZXItcGFyc2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFFekIsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFFSCxXQUFXLEVBQ1gscUJBQXFCLEVBQ3hCLE1BQU0sMEJBQTBCLENBQUM7QUFFbEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDOUIsTUFBTSxRQUFRLEdBQWtCO1FBQzVCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsY0FBYyxFQUFFLENBQUM7UUFDakIsT0FBTyxFQUFFLEdBQUc7UUFDWixVQUFVLEVBQUUsS0FBSztRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLGNBQWMsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxRQUFRLEVBQUU7WUFDTixNQUFNLEVBQUUsZUFBZTtZQUN2QixRQUFRLEVBQUUsQ0FBQyxnQ0FBZ0M7Z0JBQ3ZDLG9DQUFvQztnQkFDcEMsNkJBQTZCO2dCQUM3Qix3QkFBd0I7Z0JBQ3hCLCtCQUErQjtnQkFDL0IsaUJBQWlCLENBQUM7U0FDekI7UUFDRCxZQUFZLEVBQUUsR0FBRztLQUNwQixDQUFDO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQ25CLFNBQVMsR0FBRyx1Q0FBdUMsRUFBRSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMvRSxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQzdCLE1BQU0sUUFBUSxHQUFr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