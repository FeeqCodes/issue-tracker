import prisma from "@/prisma/client"
import IssueForm from "../_components/IssueForm"
import { notFound } from "next/navigation"



interface Props{
  params: { id: string }
}

const EditIssuePage = async ( { params }: Props) => {

  const singleIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  })
  if(!singleIssue) notFound()

  return (
    <IssueForm issue={singleIssue} />
  )
}

export default EditIssuePage