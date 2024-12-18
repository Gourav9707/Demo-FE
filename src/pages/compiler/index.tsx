import React from "react";
import Box from "@/components/Box";
import ContentShell from "@/components/ContentShell";
// import Typography from "@/components/Typography";
import CodeEditor from "@/components/CodeEditor";
import Button from "@/components/Button";
import styles from "@/styles/pages/compiler/index.module.css";

const Home = () => {
  const [code, setCode] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleChange = (value: string) => {
    setCode(value);
  };

  const resetCompiler = () => {
    setCode("");
    setOutput("")
  }

  const runCode = async () => {
    try {
      const response = await fetch("/api/compiler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (!data?.success) throw new Error("unexpected Error");

      console.log(data);
      setOutput(data?.result || data.output.join(","));
    } catch (e) {
      console.log(e)
      setOutput("Error executing the code.");
    }
  };

  return (
    <ContentShell>
      <Box>
        <CodeEditor code={code} handleChange={handleChange} />
        <div className={styles.btnContainer}>
          <Button onClick={runCode}>Run</Button>
          <Button onClick={resetCompiler} color="redBtn">
            Reset
          </Button>
        </div>
        <section className={styles.outputContainer}>
          <pre>{output}</pre>
        </section>
      </Box>
    </ContentShell>
  );
};

export default Home;
