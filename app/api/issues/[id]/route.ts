import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";




export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  // destructure the body
  const {title, description, assignedToUserId } = body

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // assigning a user
  if(assignedToUserId){
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId}
    })
    
    if(!user) {
      return NextResponse.json({error: "Invalid user"}, {status: 400})
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: title,
      description:  description,
      assignedToUserId: assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue);
}






// Delete Issue Endpoint

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Simulate a delay
  // await delay(2000);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    throw new Error("no issue found");
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });
  }

  const deleteIssue = await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json(deleteIssue);
}
