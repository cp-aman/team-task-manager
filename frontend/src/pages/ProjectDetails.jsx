import {
  useContext,
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const ProjectDetails = () => {

  const { user } = useContext(AuthContext);

  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);

  const [project, setProject] = useState(null);

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "",
  });


// FETCH PROJECT
  const fetchProject = async () => {

    try {

      const res = await API.get("/projects");

      const currentProject = res.data.find(
        (p) => p._id === projectId
      );

      setProject(currentProject);

      if (
        currentProject &&
        currentProject.members.length > 0
      ) {

        setFormData((prev) => ({
          ...prev,
          assignedTo:
            currentProject.members[0]._id,
        }));
      }

    } catch (error) {

      console.log(error);
    }
  };


// FETCH TASKS
  const fetchTasks = async () => {

    try {

      const res = await API.get(
        `/tasks/project/${projectId}`
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };


// FETCH USERS
  const fetchUsers = async () => {

    try {

      const res = await API.get("/users");

      setUsers(res.data);

    } catch (error) {

      console.log(error);
    }
  };


// INITIAL LOAD
  useEffect(() => {

    fetchProject();

    fetchTasks();

    fetchUsers();

  }, []);


// HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


// CREATE TASK
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tasks", {
        ...formData,
        project: projectId,
      });

      alert("Task created");

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        assignedTo:
          project?.members[0]?._id || "",
      });

      fetchTasks();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed"
      );
    }
  };


// UPDATE TASK STATUS
  const updateStatus = async (
    taskId,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${taskId}`,
        { status }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };


// ADD MEMBER
  const addMember = async () => {

    try {

      await API.put(
        "/projects/add-member",
        {
          projectId,
          userId: selectedUser,
        }
      );

      alert("Member added");

      fetchProject();

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };


// REMOVE MEMBER
  const removeMember = async (userId) => {

    try {

      await API.put(
        "/projects/remove-member",
        {
          projectId,
          userId,
        }
      );

      alert("Member removed");

      fetchProject();

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };


  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: "20px",
        }}
      >

        <h1>
          {project?.title}
        </h1>

        <p>
          {project?.description}
        </p>

        <hr />


        {/* ADMIN ONLY TEAM MANAGEMENT */}

        {user?.role === "admin" && (

          <div
            style={{
              marginBottom: "30px",
            }}
          >

            <h2>
              Team Members
            </h2>

            <select
              value={selectedUser}
              onChange={(e) =>
                setSelectedUser(
                  e.target.value
                )
              }
              style={{
                padding: "10px",
              }}
            >

              <option value="">
                Select User
              </option>

              {users.map((user) => (

                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                  {" "}
                  ({user.email})
                </option>

              ))}

            </select>

            <button
              onClick={addMember}
              style={{
                marginLeft: "10px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Add Member
            </button>

            <br /><br />

            {project?.members.map((member) => (

              <div
                key={member._id}
                style={{
                  marginBottom: "10px",
                }}
              >

                {member.name}
                {" "}
                ({member.role})

                <button
                  onClick={() =>
                    removeMember(member._id)
                  }
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>

              </div>
            ))}

            <hr />

          </div>
        )}


        {/* ADMIN ONLY CREATE TASK */}

        {user?.role === "admin" && (

          <div
            style={{
              marginBottom: "30px",
            }}
          >

            <h2>
              Create Task
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="title"
                placeholder="Task Title"
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

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                style={{
                  padding: "10px",
                }}
              />

              <br /><br />

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  padding: "10px",
                }}
              >

                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

              </select>

              <br /><br />

              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                style={{
                  padding: "10px",
                }}
              >

                {project?.members.map((member) => (

                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>

                ))}

              </select>

              <br /><br />

              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Create Task
              </button>

            </form>

            <hr />

          </div>
        )}


        {/* TASKS */}

        <h2>
          Tasks
        </h2>

        {tasks.length === 0 ? (

          <p>
            No tasks found
          </p>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >

              <h3>
                {task.title}
              </h3>

              <p>
                {task.description}
              </p>

              <p>
                <strong>
                  Assigned To:
                </strong>
                {" "}
                {task.assignedTo?.name}
              </p>

              <p>
                <strong>
                  Priority:
                </strong>
                {" "}
                {task.priority}
              </p>

              <p>
                <strong>
                  Status:
                </strong>
                {" "}
                {task.status}
              </p>

              <button
                onClick={() =>
                  updateStatus(
                    task._id,
                    "todo"
                  )
                }
                style={{
                  marginRight: "10px",
                }}
              >
                Todo
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    task._id,
                    "in-progress"
                  )
                }
                style={{
                  marginRight: "10px",
                }}
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    task._id,
                    "done"
                  )
                }
              >
                Done
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ProjectDetails;