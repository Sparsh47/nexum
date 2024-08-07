"use client";

import { Terminal as XTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import socket from "@/lib/socket";
import "@xterm/xterm/css/xterm.css";

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (isRenderedRef.current) return;
    isRenderedRef.current = true;
    const terminal = new XTerminal({
      rows: 20,
      cursorBlink: true,
      fontFamily: "Ubuntu Mono",
      fontSize: 16,
    });

    terminal.open(terminalRef.current!);
    terminal.clear();

    terminal.onData((data) => {
      socket.emit("terminal:write", data);
    });

    socket.on("terminal:data", (data) => {
      terminal.write(data);
    });
  }, []);
  return <div ref={terminalRef} id="terminal"></div>;
};

export default Terminal;
