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

export interface IValueProps{
    icon: string;
    name: string;
}
export interface ISocial extends ICommon, IValueProps {
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
    features: string[];
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
    id: number,
    title: string;
    percent: number;
    category?: string;
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

export interface IAchievement {
    id: number
    achieve: string;
    num: number;
    text: string;
    icon: string;
}

export interface IStats{
    value: string;
    label: string;
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
    achievements: IAchievement[];
    roles: string[];
    valueProps: IValueProps[];
    tags: string[];
    stats: IStats[];
}



export interface IMessageData {
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
}

