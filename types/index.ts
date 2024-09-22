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

export interface IBestSkill {
    id: number;
    name: string;
    icon: string;
}

export interface INavMenu extends ICommon {
    text: string;
}

export interface IFeature {
    id: number;
    icon: string;
    title: string;
    desc: string;
}

export interface IWork {
    id: number;
    imgSrc: string;
    imgTiny: string;
    type: string;
    title: string;
    desc: string;
    techStack: string[],
    vidUrl: string;
    srcCode: string;
    screenshots: string[],
    liveUrl: string;
}

export interface IEECommon {
    id: number,
    title: string;
    institution: string;
    year: string;
    desc: string;
}

export interface IEducation extends IEECommon {

    score: string;
}

export interface ISkill {
    id: 1,
    title: string;
    percent: number;
}

export interface IExperience extends IEECommon { }

export interface ITestimonial {
    id: number;
    client: string;
    project: string;
    platform: string;
    duration: string;
    comments: string;
    stars: number;
    clientImg: string;
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
    bestSkills: IBestSkill[];
    navMenus: INavMenu[];
    features: IFeature[];
    works: IWork[];
    education: IEducation[];
    skills: ISkill[];
    experience: IExperience[];
    testimonial: ITestimonial[];
}



export interface IMessageData {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

