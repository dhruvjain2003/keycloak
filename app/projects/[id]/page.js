"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          throw new Error("Project not found");
        }
        const data = await res.json();
        setProject(data.project);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="mx-auto px-6 lg:px-20 py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen">
      <Link
        href="/projects"
        className="text-white text-sm bg-indigo-600 border border-white hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-200 mb-6 inline-flex items-center"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow">
        Project Details
      </h1>

      <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 max-w-4xl mx-auto animation-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {project?.name || "N/A"}
        </h2>
        <p className="text-gray-600 text-md mb-6">{project?.description || "No description available"}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm">
          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">Summary</h3>
            <p>{project?.summary || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">Role</h3>
            <p>{project?.title || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">Responsibilities</h3>
            <p>{project?.responsibilty || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">Start Date</h3>
            <p>
              {project?.start_date
                ? new Date(project.start_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">End Date</h3>
            <p>
              {project?.end_date
                ? new Date(project.end_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
