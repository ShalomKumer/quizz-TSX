export type question = {
    id:number
    type ?:string,
    difficulty:string,
    category:string,
    question:string,
    correct_answer:string,
    all_answers:string[],
    chosen_answers?: string[];
}