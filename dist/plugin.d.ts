import { Plugin } from "rollup";
import { MinifyOptions } from "terser";
export interface IUglifyOptions extends MinifyOptions {
    include?: string | RegExp;
    exclude?: string | RegExp;
    /** @default "renderChunk" */
    hook?: "renderChunk" | "transform";
}
declare function uglify(options?: IUglifyOptions): Plugin;
export { uglify };
export default uglify;
//# sourceMappingURL=plugin.d.ts.map