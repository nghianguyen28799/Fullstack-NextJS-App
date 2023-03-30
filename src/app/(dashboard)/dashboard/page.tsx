import ApiDashboard from "@/components/ApiDashboard";
import RequestApiKey from "@/components/RequestApiKey";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

export const metaData: Metadata = {
  title: "Similarity API | Dashboard",
  description: "Free & open-source text similarity API",
};

const DashBoard = async () => {
  const userSession = await getServerSession(authOptions);

  if (!userSession) notFound();
  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: userSession.user.id,
      enabled: true,
    },
  });

  return (
    <div className="max-w-7xl mx-auto mt-16">{apiKey ? <ApiDashboard /> : <RequestApiKey />}</div>
  );
};

export default DashBoard;
