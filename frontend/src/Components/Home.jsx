import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal"; // optional lightweight modal library
import "react-responsive-modal/styles.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chartOpen, setChartOpen] = useState(false);
  const navigate = useNavigate();

  const { userData, setUserData, serverUrl } = useContext(UserDataContext);

  const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/vote/results`, {
        withCredentials: true,
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    socket.on("voteResultsUpdated", (data) => {
      setResults(data);
    });
    return () => socket.disconnect();
  }, []);

  const castVote = async (option) => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post(
        `${serverUrl}/api/vote/create-vote`,
        { Option: option },
        { withCredentials: true }
      );
      setMessage("✅ Vote recorded!");
      fetchResults(); // optional; socket already updates
    } catch (err) {
      const msg = err.response?.data?.message || "Vote failed";
      setMessage(` ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);
      setMessage("👋 Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setMessage(" Logout failed");
    }
  };

  const countFor = (option) =>
    results.find((r) => r.option === option)?.count || 0;

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-10">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">Real-Time Voting</h1>

      {message && (
        <p className="text-center mb-6 text-lg font-medium">{message}</p>
      )}

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setChartOpen(true)}
          className="px-6 py-2 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600"
        >
          View Chart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {OPTIONS.map((opt) => (
          <div
            key={opt}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-4">{opt}</h2>
            <p className="text-2xl font-bold text-indigo-600 mb-4">
              {countFor(opt)}
            </p>
            <button
              disabled={loading}
              onClick={() => castVote(opt)}
              className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 disabled:opacity-50"
            >
              {loading ? "Voting..." : "Vote"}
            </button>
          </div>
        ))}
      </div>

      {/* Chart Modal */}
      {chartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-none w-full h-full relative flex flex-col">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-red-500 font-bold text-xl z-10"
              onClick={() => setChartOpen(false)}
            >
              X
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">
              Voting Results
            </h2>

            <div className="flex-1 flex justify-center items-center">
              <ResponsiveContainer width="80%" height="80%">
                <PieChart>
                  <Pie
                    data={results}
                    dataKey="count"
                    nameKey="option"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {results.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
