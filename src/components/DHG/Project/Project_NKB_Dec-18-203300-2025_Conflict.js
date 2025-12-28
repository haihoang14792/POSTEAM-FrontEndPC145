import React, { useEffect, useState } from 'react';
import { fetchProjectDHGs } from '../../../services/strapiServices.js';
import { useNavigate } from 'react-router-dom';
import './Project.scss';

const Project = (props) => {
    const [projectDHGs, setProjectDHGs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProjectDHGs = async () => {
            try {
                const DHGsData = await fetchProjectDHGs();
                const sortedProjects = DHGsData.data.sort((a, b) => b.id - a.id);
                setProjectDHGs(sortedProjects);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        loadProjectDHGs();
    }, []);

    const handleCardClick = (storeId) => {
        navigate(`/dhg/store/${storeId}`, { state: { storeId } });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="project-container">
            <div className="container-project">
                <div className="container">
                    <ul className="project-dhg">
                        {projectDHGs
                            .filter((project) => project.attributes.Status) // Lọc dự án có Status là true
                            .map((project) => (
                                <li
                                    key={project.id}
                                    className={`project-item-${project.id}`}
                                    onClick={() => handleCardClick(project.attributes.StoreID)}
                                    style={{ cursor: 'pointer' }}
                                >
                                  {project.attributes.Logo?.data?.length > 0 && (
    <img
        src={`http://113.161.81.49:1337${project.attributes.Logo.data[0].attributes.url}`}
        alt={project.attributes.Customer}
        onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.png'; }}
    />
)}
                                    <div className="project-info">
                                        <h3 className="project-customer">{project.attributes.Customer}</h3>
                                        <p className="project-store">Store ID: {project.attributes.StoreID}</p>
                                        <p className="project-address">Địa chỉ: {project.attributes.Address}</p>
                                        <p className="project-detail">{project.attributes.Detail}</p>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Project;
