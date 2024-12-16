import React from "react";
import Box from "@/components/Box";
import ContentShell from "@/components/ContentShell";
// import Typography from "@/components/Typography";
import classNames from "classnames";
import dynamic from "next/dynamic";

// Dynamically import VideoChat with SSR disabled
const VideoChat = dynamic(() => import("@/components/VideoChat"), {
  ssr: false,
});

const FAQ = () => {
  return (
    <ContentShell>
      <Box>
        <VideoChat/>
      </Box>
    </ContentShell>
  );
};

export default FAQ;
