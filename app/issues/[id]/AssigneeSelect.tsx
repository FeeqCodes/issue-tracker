"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";





export default function AssigneeSelect({ issue }: { issue: Issue }) {
  // we are now using react query for fetching our users data so we can cache the list of users on our client side
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  // State and effect fetching

  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };

  //   fetchUsers()
  // }, []);

  const handleAssigneeChange = async (userId:string) => {
    try {
      axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      });
      toast.success("Changed Successfully");
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

<<<<<<< HEAD
  const empty = ""
  return (
    <>
      <Select.Root
        defaultValue={issue?.assignedToUserId || empty}
=======

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
>>>>>>> 52c3bb2fbb34f46110cf264981fcf956da3313b8
        onValueChange={handleAssigneeChange}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={empty}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>

      {/*Toast Notification  */}
      <Toaster />
    </>
  );
}

// export default AssigneeSelect
