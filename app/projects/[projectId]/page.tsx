import React from 'react';
import portfolio from '../../../data/portfolio.json';


interface IProjectPageProps {
    params: {
        projectId: string
    }
}

export async function generateStaticParams() {
    // const projects = await fetchProjects(); // You can fetch this data from an API or database
    
  
    // Generate static params for each project
    return portfolio.works.map(project => ({
      projectId: project.id.toString(), // Adjust this to your data structure
    }));
  }
  

// Showing projects like this -> https://www.jameswilliams.design/
// https://www.moritzpetersen.com/
function ProjectPage({ params }: IProjectPageProps) {
    return (
        <div>ProjectPage {params.projectId}</div>
    )
}

export default ProjectPage;