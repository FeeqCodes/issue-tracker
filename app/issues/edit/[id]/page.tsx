import prisma from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    console.log("no issue");
    notFound();
  }

  return (
    <IssueForm issue={issue} />
    // <div>{issue.title}</div>
  );
};

export default EditIssuePage;
