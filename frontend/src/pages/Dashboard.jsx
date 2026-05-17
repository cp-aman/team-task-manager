import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

const Dashboard = () => {

  const [stats, setStats] = useState(null);


// FETCH DASHBOARD DATA
  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        "/dashboard"
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };


// INITIAL LOAD
  useEffect(() => {

    fetchDashboard();

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
          Dashboard
        </h1>

        {!stats ? (

          <p>
            Loading...
          </p>

        ) : (

          <div>

            {/* TOTAL TASKS */}

            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >

              <h2>
                Total Tasks
              </h2>

              <p>
                {stats.totalTasks}
              </p>

            </div>


            {/* TASK STATUS */}

            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >

              <h2>
                Tasks By Status
              </h2>

              <p>
                Todo:
                {" "}
                {stats.tasksByStatus.todo}
              </p>

              <p>
                In Progress:
                {" "}
                {stats.tasksByStatus.inProgress}
              </p>

              <p>
                Done:
                {" "}
                {stats.tasksByStatus.done}
              </p>

            </div>


            {/* OVERDUE */}

            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >

              <h2>
                Overdue Tasks
              </h2>

              <p>
                {stats.overdueTasks}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Dashboard;