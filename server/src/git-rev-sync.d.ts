declare module 'git-rev-sync' {
    export function short(filePath?: string, length?: number): string;
    export function long(filePath?: string): string;
    export function branch(filePath?: string): string;
    export function count(): number;
    export function date(): Date;
    export function isDirty(): boolean;
    export function isTagDirty(): boolean;
    export function message(): string;
    export function remoteUrl(): string;
    export function tag(markDirty?: any): string;
}
