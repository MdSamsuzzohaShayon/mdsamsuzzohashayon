import { IProject } from "@/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IProjectProps {
    works: IProject[];
    selectedWorkId: number;
}

function Project({ works, selectedWorkId }: IProjectProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [techStackEl, setTechStackEl] = useState<JSX.Element[]>([]);

    const findWork = works.find((w) => w.id === selectedWorkId);

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
        <div className="flex flex-col md:flex-row w-full gap-6 pt-4 md:h-screen">
            <div className="w-full md:w-5/12 flex flex-col">
                <motion.img
                    src={selectedImg || `/img/projects/${findWork.imgSrc}`}
                    alt={findWork.title}
                    className="h-60 md:h-full w-full object-cover rounded-lg shadow-lg"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="screenshots w-full overflow-x-scroll flex gap-2 mt-2">
                    {findWork.screenshots.map((imgSrc, index) => (
                        <motion.img
                            key={index}
                            src={`/img/projects/${imgSrc}`}
                            alt={`${findWork.title} screenshot ${index + 1}`}
                            className="h-16 w-16 rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => handleImageSelect(imgSrc)}
                            loading="lazy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full md:w-7/12 flex flex-col justify-between">
                <div>
                    <h3 className="capitalize text-4xl md:text-5xl font-bold text-gray-900">
                        {findWork.title}
                    </h3>
                    <p className="mt-4 text-gray-700">{findWork.desc}</p>
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
