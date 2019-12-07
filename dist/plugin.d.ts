import { MinifyOptions } from 'uglify-js';
export default function uglify(options?: MinifyOptions): {
    name: string;
    transform(code: any): {
        code: string;
        map: string;
    };
};
