"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { issueSchema } from "@/app/validationSchemas";
import dynamic from "next/dynamic";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";




// Disable SSR for loading MDE
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});




// or generate interface based on schema
type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}



export default function IssueForm ({ issue }: Props) {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);



  // handlers
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      if (issue) {
        await axios.post("/api/issues/" + issue.id, data);

      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues");

      console.log("Submitted");
      
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      setError("An unexpected error has occurred");
    }
  });

  
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <Button disabled={isLoading}>
          {issue ? "Update Issue" : "Submit new issue "}
          {isLoading && <Spinner></Spinner>}{" "}
        </Button>
      </form>
    </div>
  );
};


