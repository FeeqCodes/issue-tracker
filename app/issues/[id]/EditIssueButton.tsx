import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'



const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Box>
      <Button>
        <Pencil2Icon />
        <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
      </Button>
    </Box>
  );
};

export default EditIssueButton