'use client';

import { Toaster } from "@pheralb/toast";
import { useTheme } from "next-themes";

export default function ToasterWrapper() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      theme={theme === 'dark' ? 'dark' : 'light'}
    />
  );
}
