"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Database, Search, LogOut } from "lucide-react";
import { ProjectForm } from "@/components/project-form";
import { ProjectCard } from "@/components/project-card";
import { useToast } from "@/hooks/use-toast";
import type { Project, CreateProjectData } from "@/lib/types";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    }
  };

  const handleCreateProject = async (data: CreateProjectData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchProjects();
        setShowForm(false);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProject = async (data: CreateProjectData) => {
    if (!editingProject) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchProjects();
        setEditingProject(null);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        throw new Error("Failed to update project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProjects();
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProjects = normalizedQuery
    ? projects.filter((p) => {
        const haystack = [
          p.name,
          p.renderWorkerUrl,
          p.renderBackendUrl,
          p.proxiedBackendUrl,
          p.proxiedWorkerUrl,
          p.dashboardUrl,
          p.proxiedDashboardUrl,
          p.websiteUrl,
          p.dashboardBranch,
          p.backendBranch,
          p.workerBranch,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : projects;

  if (showForm || editingProject) {
    return (
      <div className="min-h-screen bg-background p-6">
        <ProjectForm
          project={editingProject || undefined}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
          onCancel={handleCancelForm}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8 gap-3">
          <div className="flex items-center gap-3">
            <Image src={"/logo.png"} alt="logo" width={52} height={52} />
            <div>
              <h1 className="text-3xl font-bold">Smart Manager</h1>
              <p className="text-muted-foreground">
                Manage your deployment URLs and branch information
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={() => signOut()}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first project to start managing your deployment
              information
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Your First Project
            </Button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-lg font-semibold mb-2">No results</h2>
            <p className="text-muted-foreground">
              Try a different search term or clear the search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
