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

interface ICommon {
    id: number;
    link: string;
}

export interface ISocial extends ICommon {
    icon: string;
}

export interface INavMenu extends ICommon {
    text: string;
}

export interface IPortfolioData {
    logo: string;
    heroImg: string;
    profession: string;
    contactMessage: string;
    email: string;
    videoResume: string;
    phone: string;
    contactImg: string;
    social: ISocial[];
    bestSkills: ISocial[];
    navMenus: INavMenu[];
}
