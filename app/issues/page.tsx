import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import delay from "delay";
import IssuesActions from "./IssuesActions";
import { StatusBadge } from "@/app/components";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";




interface Props {
  searchParams: { status: Status, page: string}
}


const IssuesPage = async function ({ searchParams}: Props) {

  // validate the status query before passing to prisma
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

  // pagination
  const page = parseInt(searchParams.page ) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany( {
    where: {
      status: status,
    },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where: { status : status}
  })

  await delay(2000);

  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-violet-600 hover:underline"
                >
                  {issue.title}
                </Link>

                <div className="block md:hidden">
                  <StatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <StatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
    </div>
  );
};

export const dynamic  = 'force-dynamic';
// export const revalidate  =  0;

export default IssuesPage;
