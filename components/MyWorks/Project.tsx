import { IProject } from "@/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

interface IProjectProps {
    works: IProject[];
    selectedWorkId: number;
}

function Project({ works, selectedWorkId }: IProjectProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [techStackEl, setTechStackEl] = useState<JSX.Element[]>([]);

    const findWork = works.find((w) => w.id === selectedWorkId);

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    // Update tech stack elements whenever the selected project changes
    useEffect(() => {
        if (findWork) {
            const techStack = findWork.techStack.map((tech, index) => (
                <p className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm" key={index}>
                    {tech}
                </p>
            ));
            setTechStackEl(techStack);
            setSelectedImg(`/img/projects/${findWork.imgSrc}`); // Set the initial selected image
        }
    }, [findWork]);

    // If no project is found, return null (or display a fallback UI)
    if (!findWork) {
        return <p className="text-center mt-4">Project not found</p>;
    }

    // Handle selecting screenshots for the main image
    const handleImageSelect = (imgSrc: string) => {
        setSelectedImg(`/img/projects/${imgSrc}`);
    };

    return (
        <div className="Project flex flex-col md:flex-row w-full gap-6 pt-4">
            <div className="w-full md:w-5/12 flex flex-col">
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {findWork.screenshots.map((imgSrc, index) => (
                        <a key={index} href={`/img/projects/${imgSrc}`}>
                            <img src={`/img/projects/${imgSrc}`} alt={imgSrc} />
                        </a>
                    ))}

                </LightGallery>
            </div>
            <div className="w-full md:w-7/12 flex flex-col">
                <div>
                    <h3 className="capitalize text-4xl md:text-5xl font-bold text-white">
                        {findWork.title}
                    </h3>
                    <p className="mt-4 text-white">{findWork.desc}</p>
                    <h4 className="uppercase text-rose-600 mt-8">Tech Stack</h4>
                    <div className="tech-stack-items flex gap-2 mt-4 flex-wrap">
                        {techStackEl}
                    </div>
                </div>
                <div className="actions mt-8 flex gap-4">
                    {findWork.vidUrl && (
                        <a
                            href={findWork.vidUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-rose-600 text-white capitalize px-4 py-2 rounded-full hover:bg-rose-700 transition-colors"
                        >
                            Preview
                        </a>
                    )}
                    {findWork.srcCode && (
                        <a
                            href={findWork.srcCode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-rose-600 text-white capitalize px-4 py-2 rounded-full hover:bg-rose-700 transition-colors"
                        >
                            Source Code
                        </a>
                    )}
                    {findWork.liveUrl && (
                        <a
                            href={findWork.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-rose-600 text-white capitalize px-4 py-2 rounded-full hover:bg-rose-700 transition-colors"
                        >
                            Test
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Project;
