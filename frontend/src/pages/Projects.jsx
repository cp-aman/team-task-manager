import { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const Projects = () => {

  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });


// FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const res = await API.get("/projects");

      setProjects(res.data);

    } catch (error) {

      console.log(error);
    }
  };


// HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


// CREATE PROJECT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/projects",
        formData
      );

      alert("Project created");

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create project"
      );
    }
  };


// INITIAL FETCH
  useEffect(() => {

    fetchProjects();

  }, []);


  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >

        <h1>
          Projects
        </h1>


        {/* ADMIN ONLY CREATE PROJECT */}

        {user?.role === "admin" && (

          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "30px",
              borderRadius: "10px",
            }}
          >

            <h2>Create Project</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                style={{
                  width: "300px",
                  padding: "10px",
                }}
              />

              <br /><br />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                style={{
                  width: "300px",
                  padding: "10px",
                }}
              />

              <br /><br />

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Create Project
              </button>

            </form>

          </div>
        )}


        {/* PROJECT LIST */}

        <div>

          {projects.length === 0 ? (

            <p>
              No projects found
            </p>

          ) : (

            projects.map((project) => (

              <div
                key={project._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "10px",
                }}
              >

                <h2>
                  {project.title}
                </h2>

                <p>
                  {project.description}
                </p>

                <p>
                  <strong>Admin:</strong>
                  {" "}
                  {project.createdBy?.name}
                </p>

                <p>
                  <strong>Members:</strong>
                  {" "}
                  {project.members.length}
                </p>

                <Link
                  to={`/projects/${project._id}`}
                  style={{
                    textDecoration: "none",
                    color: "blue",
                  }}
                >
                  Open Project
                </Link>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default Projects;