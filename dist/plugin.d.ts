import { MinifyOptions } from 'terser';
export interface IUglifyOptions extends MinifyOptions {
    include?: string | RegExp;
    exclude?: string | RegExp;
}
declare function uglify(options?: IUglifyOptions): {
    name: string;
    transform(code: any, id: any): {
        code: string;
        map: string | import("source-map").RawSourceMap;
    };
};
export default uglify;
