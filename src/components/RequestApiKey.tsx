import React, { FormEvent, useState } from "react";
import { toast } from "@/components/ui/Toast";

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [api, setApiKey] = useState<string | null>(null);

  // const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsCreating(true);

  //   try {
  //     const generatedApiKey = await createApiKey();
  //     setApiKey(generatedApiKey);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       toast({
  //         title: "Error",
  //         message: err.message,
  //         type: "error",
  //       });
  //     }
  //   }
  // };

  return <div>RequestApiKey</div>;
};

export default RequestApiKey;
