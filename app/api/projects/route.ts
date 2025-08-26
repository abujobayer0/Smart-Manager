import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { CreateProjectData } from "@/lib/types";
import { getServerSession } from "next-auth";
import authConfig from "@/auth.config";

export async function GET() {
  try {
    const session = await getServerSession(authConfig as any);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const client = await clientPromise;
    const db = client.db("projectmanager");
    const projects = await db
      .collection("projects")
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig as any);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body: CreateProjectData = await request.json();

    const client = await clientPromise;
    const db = client.db("projectmanager");

    const project = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(project);

    return NextResponse.json({ _id: result.insertedId, ...project });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
