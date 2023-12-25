import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { StatusBadge } from "@/app/components";
import { Pencil2icon} from '@radix-ui/react-icons'
import delay from "delay";
import Link from "next/link";
import EditIssueButton from "./EditIssueButton";



/**
 * Todo
 * install @radix-ui/react-icons
 */




interface Props {
  params: { id: string };
}



const IssueDetailPage = async ({ params }: Props) => {
  // if(typeof params.id !== 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  await delay(2000);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="2" my="2">
          <StatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      {/* SRP: Single responsibility principle */}
      <EditIssueButton issueId={issue.id} />
    </Grid>
  );
};

export default IssueDetailPage;
