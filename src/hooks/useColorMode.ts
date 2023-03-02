import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { useApplicationStore } from "../utils/store";

export const useColorMode = () => {
  const [colorMode, setColorMode] = useState("");

  const { darkMode } = useApplicationStore(
    (state) => ({
      darkMode: state.darkMode,
    }),
    shallow
  );

  useEffect(() => {
    if (darkMode) {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  }, [darkMode]);

  return { colorMode, setColorMode };
};
