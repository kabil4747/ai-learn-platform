import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";

const AdminDashboard = () => {
  const { token } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [newQuiz, setNewQuiz] = useState({ title: "", course_id: "" });

  const headers = { Authorization: `Bearer ${token}` };

  // Fetch courses & quizzes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get(
          "http://localhost:9000/api/admin/courses",
          { headers }
        );
        setCourses(coursesRes.data);

        const quizzesRes = await axios.get(
          "http://localhost:9000/api/admin/quizzes",
          { headers }
        );
        setQuizzes(quizzesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  const addCourse = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/admin/courses",
        newCourse,
        { headers }
      );
      setCourses([...courses, res.data]);
      setNewCourse({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/admin/courses/${id}`, {
        headers,
      });
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const addQuiz = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/admin/quizzes",
        newQuiz,
        { headers }
      );
      setQuizzes([...quizzes, res.data]);
      setNewQuiz({ title: "", course_id: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/admin/quizzes/${id}`, {
        headers,
      });
      setQuizzes(quizzes.filter((q) => q.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Courses</h2>
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <button
          onClick={addCourse}
          className="bg-green-500 text-white px-2 rounded"
        >
          Add Course
        </button>
        <ul className="mt-2">
          {courses.map((c) => (
            <li key={c.id} className="flex justify-between mb-1">
              {c.title} - {c.description}
              <button
                onClick={() => deleteCourse(c.id)}
                className="text-red-500 ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Quizzes */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Quizzes</h2>
        <input
          type="text"
          placeholder="Title"
          value={newQuiz.title}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, title: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <input
          type="text"
          placeholder="Course ID"
          value={newQuiz.course_id}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, course_id: e.target.value })
          }
          className="border p-1 mr-2"
        />
        <button
          onClick={addQuiz}
          className="bg-green-500 text-white px-2 rounded"
        >
          Add Quiz
        </button>
        <ul className="mt-2">
          {quizzes.map((q) => (
            <li key={q.id} className="flex justify-between mb-1">
              {q.title} - Course {q.course_id}
              <button
                onClick={() => deleteQuiz(q.id)}
                className="text-red-500 ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
