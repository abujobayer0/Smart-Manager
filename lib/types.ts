export interface Project {
  _id?: string;
  name: string;
  renderWorkerUrl: string;
  renderBackendUrl: string;
  proxiedBackendUrl: string;
  proxiedWorkerUrl: string;
  dashboardUrl: string;
  proxiedDashboardUrl: string;
  websiteUrl: string;
  dashboardBranch: string;
  backendBranch: string;
  workerBranch: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProjectData = Omit<
  Project,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateProjectData = Partial<CreateProjectData>;
