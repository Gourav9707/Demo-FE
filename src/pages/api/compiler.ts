// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { VM } from "vm2";

// type Data = {
//   name: string;
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { code } = req.body;
    const output: any[] = [];

    // Custom console to capture logs
    const customConsole = {
      log: (...args) => {
        output.push(args.join(" "));
      },
    };

    try {
      const vm = new VM({
        timeout: 1000, // 1 second timeout to prevent infinite loops
        sandbox: {
          console: customConsole, // Capture console.log
          output, // Pass output array to sandbox (optional)
        },
      });

      const result = vm.run(`
        "use strict";
        ${code}
      `);

      console.log(result, code);
      res.json({
        success: true,
        output: output, // Captured logs
        result: result !== undefined ? result : undefined, 
      });
    } catch (error) {
      //@ts-ignore
      res.status(400).json({ error: error?.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
