"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Edit, Trash2, Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { toast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast({ title: "Copied", description: "Value copied to clipboard" });
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const ValueRow = ({
    label,
    value,
    href,
    copyKey,
  }: {
    label: string;
    value: string;
    href?: string;
    copyKey: string;
  }) => (
    <div className="flex items-center gap-2">
      <Badge
        variant={
          label === "Backend" ||
          label === "Worker" ||
          label === "Dashboard" ||
          label === "Website"
            ? "secondary"
            : "outline"
        }
      >
        {label}
      </Badge>
      <div className="flex items-center gap-1 min-w-0">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center gap-1 truncate max-w-[420px]"
            title={value}
          >
            <span className="truncate">{value}</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>
        ) : (
          <span
            className="text-sm text-foreground truncate max-w-[420px]"
            title={value}
          >
            {value}
          </span>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => handleCopy(value, copyKey)}
              >
                {copiedKey === copyKey ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-primary">
            {project.name}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(project._id!)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Updated {formatDate(project.updatedAt)}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Server URLs</h4>
          <div className="space-y-2">
            <ValueRow
              label="Worker"
              value={project.renderWorkerUrl}
              href={project.renderWorkerUrl}
              copyKey="renderWorkerUrl"
            />
            <ValueRow
              label="Backend"
              value={project.renderBackendUrl}
              href={project.renderBackendUrl}
              copyKey="renderBackendUrl"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-semibold text-sm">Proxied URLs</h4>
          <div className="space-y-2">
            <ValueRow
              label="Backend"
              value={project.proxiedBackendUrl}
              href={project.proxiedBackendUrl}
              copyKey="proxiedBackendUrl"
            />
            <ValueRow
              label="Worker"
              value={project.proxiedWorkerUrl}
              href={project.proxiedWorkerUrl}
              copyKey="proxiedWorkerUrl"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-semibold text-sm">Dashboard URLs</h4>
          <div className="space-y-2">
            <ValueRow
              label="Dashboard"
              value={project.dashboardUrl}
              href={project.dashboardUrl}
              copyKey="dashboardUrl"
            />
            <ValueRow
              label="Proxied Dashboard"
              value={project.proxiedDashboardUrl}
              href={project.proxiedDashboardUrl}
              copyKey="proxiedDashboardUrl"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-semibold text-sm">Website</h4>
          <div className="space-y-2">
            <ValueRow
              label="Website"
              value={project.websiteUrl}
              href={project.websiteUrl}
              copyKey="websiteUrl"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-semibold text-sm">Branches</h4>
          <div className="flex flex-col gap-2">
            <ValueRow
              label="Dashboard"
              value={project.dashboardBranch}
              copyKey="dashboardBranch"
            />
            <ValueRow
              label="Backend"
              value={project.backendBranch}
              copyKey="backendBranch"
            />
            <ValueRow
              label="Worker"
              value={project.workerBranch}
              copyKey="workerBranch"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
