import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { question } from "./Typs";
import { toast } from "react-toastify";

type myContextProp = {
  list: question[];
  setList: React.Dispatch<React.SetStateAction<question[]>>;
  question: question | null;
  setQuestion: React.Dispatch<React.SetStateAction<question | null>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: React.Dispatch<
    React.SetStateAction<"easy" | "medium" | "hard">
  >;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  fetchData: () => Promise<void>;
};

export const myContext = createContext<myContextProp | undefined>(undefined);

const Context = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<question[]>([]);
  const [question, setQuestion] = useState<question | null>(null);
  const [score, setScore] = useState<number>(0);

  const [num, setNum] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [category, setCategory] = useState<string>("27");
  const inFlightRef = useRef(false);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    console.log("list updated:", list);
  }, [list]);
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const fetchData = useCallback(async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      const params = new URLSearchParams();
      params.set("amount", String(num));
      params.set("difficulty", difficulty);
      params.set("type", "multiple");
      if (category && category.trim()) params.set("category", category.trim());

      let attempts = 0;

      while (true) {
        const res = await fetch(
          `https://opentdb.com/api.php?${params.toString()}`
        );

        if (res.status === 429) {
          attempts++;
          if (attempts > 3)
            throw new Error("Rate limited (429) - too many attempts");
          continue;
        }
        const data = await res.json();
        const results = Array.isArray(data?.results) ? data.results : [];

        const preList: question[] = results.map((q: any, index: number) => {
          const allAnswers = shuffleArray([
            q.correct_answer,
            ...q.incorrect_answers,
          ]);
          const creatQ: question = {
            id: index,
            type: q.type,
            difficulty: q.difficulty,
            category: q.category,
            question: q.question,
            correct_answer: q.correct_answer,
            all_answers: allAnswers,
            chosen_answers: [], 
            currect: false,
          };
          return creatQ;
        });

        setList(preList);
        setQuestion(preList[0] ?? null);
        break;
      }
      toast.success(`New Game`);
    } catch (err) {
      toast.error(`${err}`);
      console.log(`ERROR: ${err}`);
    } finally {
      inFlightRef.current = false;
    }
  }, [num, difficulty, category]);

  const value = useMemo<myContextProp>(() => {
    return {
      list,
      setList,
      question,
      setQuestion,
      score,
      setScore,
      num,
      setNum,
      difficulty,
      setDifficulty,
      category,
      setCategory,
      fetchData,
      answers,
      setAnswers,
    };
  }, [list, question, score, num, difficulty, category, fetchData]);

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
};

export default Context;
