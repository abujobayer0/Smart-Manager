"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CreateProjectData, Project } from "@/lib/types";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: CreateProjectData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isLoading,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectData>({
    name: project?.name || "",
    renderWorkerUrl: project?.renderWorkerUrl || "",
    renderBackendUrl: project?.renderBackendUrl || "",
    proxiedBackendUrl: project?.proxiedBackendUrl || "",
    proxiedWorkerUrl: project?.proxiedWorkerUrl || "",
    dashboardUrl: project?.dashboardUrl || "",
    proxiedDashboardUrl: project?.proxiedDashboardUrl || "",
    websiteUrl: project?.websiteUrl || "",
    dashboardBranch: project?.dashboardBranch || "",
    backendBranch: project?.backendBranch || "",
    workerBranch: project?.workerBranch || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange =
    (field: keyof CreateProjectData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {project ? "Edit Project" : "Add New Project"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Project name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="renderWorkerUrl">Worker URL</Label>
              <Input
                id="renderWorkerUrl"
                value={formData.renderWorkerUrl}
                onChange={handleChange("renderWorkerUrl")}
                placeholder="https://worker.example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="renderBackendUrl">Backend URL</Label>
              <Input
                id="renderBackendUrl"
                value={formData.renderBackendUrl}
                onChange={handleChange("renderBackendUrl")}
                placeholder="https://backend.example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proxiedBackendUrl">Proxied Backend URL</Label>
              <Input
                id="proxiedBackendUrl"
                value={formData.proxiedBackendUrl}
                onChange={handleChange("proxiedBackendUrl")}
                placeholder="https://api.example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proxiedWorkerUrl">Proxied Worker URL</Label>
              <Input
                id="proxiedWorkerUrl"
                value={formData.proxiedWorkerUrl}
                onChange={handleChange("proxiedWorkerUrl")}
                placeholder="https://worker-api.example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dashboardUrl">Dashboard URL</Label>
              <Input
                id="dashboardUrl"
                value={formData.dashboardUrl}
                onChange={handleChange("dashboardUrl")}
                placeholder="https://dashboard.example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proxiedDashboardUrl">Proxied Dashboard URL</Label>
              <Input
                id="proxiedDashboardUrl"
                value={formData.proxiedDashboardUrl}
                onChange={handleChange("proxiedDashboardUrl")}
                placeholder="https://app.example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange("websiteUrl")}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dashboardBranch">Dashboard Branch</Label>
              <Input
                id="dashboardBranch"
                value={formData.dashboardBranch}
                onChange={handleChange("dashboardBranch")}
                placeholder="Branch name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backendBranch">Backend Branch</Label>
              <Input
                id="backendBranch"
                value={formData.backendBranch}
                onChange={handleChange("backendBranch")}
                placeholder="Branch name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workerBranch">Worker Branch</Label>
              <Input
                id="workerBranch"
                value={formData.workerBranch}
                onChange={handleChange("workerBranch")}
                placeholder="Branch name"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading
                ? "Saving..."
                : project
                ? "Update Project"
                : "Create Project"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
