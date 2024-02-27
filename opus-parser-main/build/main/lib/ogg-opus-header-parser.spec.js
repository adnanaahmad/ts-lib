"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const ava_1 = __importDefault(require("ava"));
const ogg_opus_header_parser_1 = require("./ogg-opus-header-parser");
ava_1.default('parseHeader_classic', (t) => {
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
    t.deepEqual(ogg_opus_header_parser_1.parseHeader(__dirname + '/testfiles/testfile.classicopusheader', false), expected);
});
ava_1.default('parseHeader_custom', (t) => {
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
    t.deepEqual(ogg_opus_header_parser_1.parseHeader(__dirname + '/testfiles/testfile.opusheader', true), expected);
});
ava_1.default('parseHeaderFromBuffer_classic', (t) => {
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
    t.deepEqual(ogg_opus_header_parser_1.parseHeaderFromBuffer(fileBuffer, false), expected);
});
ava_1.default('parseHeaderFromBuffer_custom', (t) => {
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
    t.deepEqual(ogg_opus_header_parser_1.parseHeaderFromBuffer(fileBuffer, true), expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2dnLW9wdXMtaGVhZGVyLXBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vZ2ctb3B1cy1oZWFkZXItcGFyc2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQXlCO0FBRXpCLDhDQUF1QjtBQUV2QixxRUFJa0M7QUFFbEMsYUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDOUIsTUFBTSxRQUFRLEdBQWtCO1FBQzVCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsY0FBYyxFQUFFLENBQUM7UUFDakIsT0FBTyxFQUFFLEdBQUc7UUFDWixVQUFVLEVBQUUsS0FBSztRQUNqQixVQUFVLEVBQUUsQ0FBQztRQUNiLGNBQWMsRUFBRTtZQUNaLE1BQU0sRUFBRSxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLE9BQU8sRUFBRSxFQUFFO1NBQ2Q7UUFDRCxRQUFRLEVBQUU7WUFDTixNQUFNLEVBQUUsZUFBZTtZQUN2QixRQUFRLEVBQUUsQ0FBQyxnQ0FBZ0M7Z0JBQ3ZDLG9DQUFvQztnQkFDcEMsNkJBQTZCO2dCQUM3Qix3QkFBd0I7Z0JBQ3hCLCtCQUErQjtnQkFDL0IsaUJBQWlCLENBQUM7U0FDekI7UUFDRCxZQUFZLEVBQUUsR0FBRztLQUNwQixDQUFDO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxvQ0FBVyxDQUNuQixTQUFTLEdBQUcsdUNBQXVDLEVBQUUsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDL0UsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtJQUM3QixNQUFNLFFBQVEsR0FBa0I7UUFDNUIsT0FBTyxFQUFFLENBQUM7UUFDVixjQUFjLEVBQUUsQ0FBQztRQUNqQixPQUFPLEVBQUUs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