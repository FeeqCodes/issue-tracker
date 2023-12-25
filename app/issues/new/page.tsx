"use client";

import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createIssueSchema } from "@/app/validationSchemas";
import dynamic from "next/dynamic";
import { ErrorMessage, Spinner } from "@/app/components";



// Disable SSR for loading MDE
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// or generate interface based on schema
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // handlers
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      await axios.post("/api/issues", data);

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
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <Button disabled={isLoading}>
          Submit new issue {isLoading && <Spinner></Spinner>}{" "}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
