import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { question } from "./Typs";

type myContextProp = {
  list: question[];
  setList: React.Dispatch<React.SetStateAction<question[]>>;
};
export const myContext = createContext<myContextProp | undefined>(undefined);

const Context = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<question[]>([]);
  const [question, setQuestion] = useState<question | null>(null);
  const [score, setScore] = useState<number>(0);

  

  const value = useMemo(() => {
    return { 
      list, setList,
      question, setQuestion,
      score, setScore,
    };
  }, [list]);

  return (
    <>
      <myContext.Provider value={value}>
        {children}
      </myContext.Provider>
    </>
  );
};

export default Context;
