export interface IProject {
    id: number,
    imgSrc: string,
    imgTiny: string,
    type: string,
    title: string,
    desc: string,
    techStack: string[],
    vidUrl: string | null;
    srcCode: string | null;
    screenshots: string[];
    liveUrl: string | null;
}