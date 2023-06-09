import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/LargeHeading";
import { Input } from "./ui/Input";
import { formatDistance } from "date-fns";
import ApiKeyOptions from "./ApiKeyOptions";
import Table from "./ui/Table";

const ApiDashboard = async () => {
  const userSession = await getServerSession(authOptions);
  if (!userSession) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: userSession.user.id,
    },
  });

  const activeApiKey = apiKeys.find((key) => key.enabled);

  if (!activeApiKey) return notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome back, {userSession.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Your API key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>

      <Paragraph className="text-center md:text-left mt-4 -mb-4">Your API history:</Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
