"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Briefcase, Search, Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(results);
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md text-center">
          <p className="font-semibold mb-2">Failed to load projects</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            <span className="text-indigo-600">Explore</span> Our Projects
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            Discover our portfolio of innovative solutions and achievements
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="relative w-full sm:w-96 mb-4 sm:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center text-gray-600">
            <p className="mr-2">
              Showing{" "}
              <span className="font-semibold text-indigo-600">
                {filteredProjects.length}
              </span>{" "}
              project{filteredProjects.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4 flex items-center justify-center rounded-full bg-gray-50">
              <Briefcase size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search term"
                : "Check back soon for new projects"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg mr-4">
                      <Briefcase size={20} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                      {project.name}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="px-6 pb-6 pt-2 mt-auto">
                  <Link
                    href={`/projects/${project.id}`}
                    onClick={() =>
                      toast.success(`Viewing ${project.name}`, {
                        iconTheme: {
                          primary: "#4F46E5",
                          secondary: "#fff",
                        },
                      })
                    }
                    className="block w-full text-center font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
