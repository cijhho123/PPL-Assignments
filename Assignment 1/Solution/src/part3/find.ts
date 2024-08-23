import { is } from "ramda";
import { Result, makeFailure, makeOk, isFailure, isOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

// signature: findResult(pred, a)
// type: <T>((T) => boolean, T[]) => Result<T>
// purpose: finds the first item in a, testing the items with pred.
// item or failure is returned in a Result monad
// pre-condition: none
// tests: findResult((s) =>  s === 0, [1, 2 , 3, 4, 0]) == makeOk(0)
// findResult((s) =>  s === 0, [1, 2 , 3, 4,]) == makeFailure
export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T>  =>  {
    return a.reduce((acc: Result<T>, curr: T) => 
        (pred(curr) && isFailure(acc)) ? acc = makeOk(curr) : acc
    , makeFailure("No Item that satisfy the predicat was found!"));
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

// signature: returnSquaredIfFoundEven_v2(arr)
// type: (number[]) => Result<number>
// purpose: returns the first even number in a, squared. Wraps result in a Result nomad.
// pre-conditions: none
// tests: rSIFE_V2([1,2,3,4]) == makeOk(4) rSIFE_V2([1,3]) == makeFailure(...)
export const returnSquaredIfFoundEven_v2 = (arr : number[]): Result<number> => {
    return bind(findResult((x: number): boolean => x % 2 == 0, arr),
        (x: number) => makeOk(x * x));
}

// signature: returnSquaredIfFoundEven_v3(arr)
// type: (number[]) => number
// purpose: returns the first even number in a, squared. Returns -1 if not found
// pre-conditions: none
// tests: rSIFE_V2([1,2,3,4]) == 4 rSIFE_V2([1,3]) == -1
export const returnSquaredIfFoundEven_v3 = (arr : number[]): number => {
    return  either(findResult((x: number): boolean => x % 2 == 0, arr),
    (x: number) => x * x,
    () => -1);
}
