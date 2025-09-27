import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/course");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const deleteCourse = async (id) => {
    if (!authUser?.isAdmin) return alert("Admin only!");
    try {
      await axios.delete(`http://localhost:9000/api/course/${id}`, {
        headers: { Authorization: `Bearer ${authUser.token}` },
      });
      setCourses(courses.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Courses / Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p>{course.description}</p>
            {authUser?.isAdmin && (
              <button
                onClick={() => deleteCourse(course.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
