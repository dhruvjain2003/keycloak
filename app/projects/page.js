"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 lg:px-20">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">
        Explore Our Projects
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Showing {projects.length} project{projects.length !== 1 && "s"}
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6"
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-3">
                <Briefcase size={20} />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
            </div>

            <p className="text-gray-600 text-sm mb-4">{p.description}</p>

            <Link
              href={`/projects/${p.id}`}
              className="inline-block mt-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
            >
              View Details →
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}
