"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Code from "@/components/Code";
import { nodejs, python } from "@/helpers/documentation-code";

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue="nodejs" className="w-full max-w-xl">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <Code language="javascript" code={nodejs} show animated={true} />
      </TabsContent>
      <TabsContent value="python">
        <Code language="python" code={python} show animated={true} />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
