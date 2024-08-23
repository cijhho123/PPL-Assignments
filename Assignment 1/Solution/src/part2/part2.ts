import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
// signature: countVowels(str)
// type: (string) => number
// purpose: returns the amount in vowels in the string
// pre-conditions: none.
// tests: countVowels(“aeiost”) == 4 ; countVowels(“”) == 0 ;
export const countVowels = (str: string): number => {
    return stringToArray(str.toLowerCase()).reduce((counter, curr) => ["a", "e", "i", "o", "u"].includes(curr) ? (counter + 1) : counter, 0);
}

/* Question 2 */
// signature: isPaired(str)
// type: (string) => boolean
// purpose: returns whether a string has correct matched parenthesis
// pre-conditions: none.
// tests: isPaired(“(a){}[](({}))”), !isPaired(“({)}”) 
export const isPaired = (str : string): boolean => {
    return isPairedRunnable([], stringToArray(str).filter(isParentheses));
}

// signature: isPairedRunnable(q, str)
// type: (string, string) => boolean
// purpose: recursive worker function for isPaired(). Checks str for correct parenthesis closure while q acts as a stack.
// pre-conditions: only called from isPairedRunnable or isPaired.
// tests: tested under isPaired. 
export const isPairedRunnable = (q : string[], str : string[]): boolean => {
        return str.length === 0 ? q.length === 0 :
        charValue(str[0]) > 0 ?  isPairedRunnable(q.concat([str[0]]), str.slice(1)) : 
        islegalPair(q[q.length - 1], str[0]) && isPairedRunnable(q.slice(0, q.length-1), str.slice(1)) 
    
}

// signature: isParentheses(str)
// type: (string) => boolean
// purpose: checks whether a string is a parenthesis of some kind
// pre-conditions: none
// tests: isParentheses(“(“), !isParentheses(“2”)
const isParentheses = (str : string): boolean => {
    return charValue(str) != 0;
}

// signature: islegalPair(s1, s2)
// type: (string, string) => boolean
// purpose: checks whether two given parenthesis are a closing and an opening match
// pre-conditions: isParentheses(s1), isParentheses(s2)
// tests: islegalPair(“{“,”}”), !islegalPair(“[“,”}”)
const islegalPair = (s1: string, s2: string): boolean => {
    return (charValue(s1) + charValue(s2)) == 0
}


// signature: charValue(s1)
// type: (string) => number
//purpose: returns a number which identifies the type of parenthesis. Returns 0 if s1 is not a parenthesis
// preconditions: none
// tests: charValue(“(“) == 1, charValue(“3”) == 0
const charValue = (s1 : string): number => {
    switch(s1) { 
        case "(": 
           return 1; 
        case ")": 
           return -1;
        case "[": 
           return 2;
        case "]": 
           return -2;
        case "{":
            return 3;
        case "}": 
            return -3;
        default: 
           return 0;
     } 
}

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

//signature: treeToSentence(t)
// type: (WordTree) => string
// purpose: returns the string formed out of a wordtree
// pre-conditions: none
// tests: treeToSentence({root: “asdf”; children: [{root: “hello”; children: []}]}) == “asdf hello”
export const treeToSentence = (t : WordTree): string =>{
    return t.children.reduce((acc : string, curr : WordTree) => acc + " " + treeToSentence(curr), t.root);
}


const t1: WordTree = {
    root: "Hello",
    children: [
    {
    root: "students",
    children: [
    {
    root: "how",
    children: []
    }
    ]
    },
    {
    root: "are",
    children: []
    },
    {
    root: "you?",
    children: []
    },
    ]
}

console.log(treeToSentence(t1));


