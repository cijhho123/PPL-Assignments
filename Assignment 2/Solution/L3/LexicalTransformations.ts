import { makeBoolExp, ClassExp, ProcExp, Exp, Program, makeProcExp, makeVarDecl, makeIfExp, makeAppExp, makePrimOp, makeVarRef, CExp, makeStrExp, Binding, VarDecl, isClassExp, isAtomicExp, isCompoundExp, isProgram, makeDefineExp, makeBinding, makeProgram, makeClassExp, makeLitExp, makeLetExp } from "./L3-ast";
import { Result, makeFailure, makeOk, mapResult, bind, mapv } from "../shared/result";
import { isEmpty,   } from "ramda";
import { isBoolExp, isCExp, isLitExp, isNumExp, isPrimOp, isStrExp, isVarRef,
    isAppExp, isDefineExp, isIfExp, isLetExp, isProcExp, //addition
    IfExp, LetExp, parseL3Exp,  DefineExp, isBinding} from "./L3-ast";
import { Certificate } from "crypto";
import { allT } from "../shared/list";
import { makeClass, makeSymbolSExp } from "./L3-value";

/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp => {

    const makeMsgTestArray = (s: string):CExp[] => ([] as CExp[]).concat(makeVarRef("msg")).concat(makeLitExp(makeSymbolSExp(s)));
    const bindingListToIf = (bindings: Binding[]): CExp => 
            isEmpty(bindings)? makeBoolExp(false) :
            makeIfExp( makeAppExp(makePrimOp("eq?"), makeMsgTestArray(bindings[0].var.var)) , makeAppExp(bindings[0].val, []), bindingListToIf(bindings.slice(1)));
    const makeMenuProc = ():CExp[] => ([] as CExp[]).concat(makeProcExp( ([] as VarDecl[]).concat(makeVarDecl('msg')), 
                                            ([] as CExp[]).concat(bindingListToIf(exp.methods)))); 

    return makeProcExp(exp.fields, makeMenuProc() );
}

/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>
    isProgram(exp) ? bind(mapResult((exp: Exp) => lexTransformExp(exp), exp.exps), (arr)=> 
                                                    makeOk(makeProgram(arr))):
    lexTransformExp(exp);
    
    

const lexTransformExp = (exp: Exp): Result<Exp> => 
    isDefineExp(exp) ? bind(lexTransformCExp(exp.val), (a)=>  makeOk(makeDefineExp(exp.var, a))):
    lexTransformCExp(exp);




const lexTransformCExp = (exp: CExp): Result<CExp> => 
    isAtomicExp(exp) ? makeOk(exp):
     
    isLitExp(exp) ? makeOk(exp):
    isIfExp(exp) ? bind( lexTransformCExp(exp.test), (a1) => 
                            bind(lexTransformCExp(exp.then), (a2) => 
                                bind(lexTransformCExp(exp.alt), (a3) => makeOk(makeIfExp(a1,a2,a3))))) :
    isLetExp(exp) ?  bind(mapResult( (cexp: CExp) => lexTransformCExp(cexp), exp.body ), (arr1) => 
                            bind( mapResult((binding:Binding) => bind(lexTransformCExp(binding.val),(v) => 
                                                                makeOk(makeBinding(binding.var.var,v))), exp.bindings), 
                                    (bindings) => makeOk(makeLetExp(bindings, arr1)))) :
    isProcExp(exp) ? bind(mapResult( (cexp: CExp) => lexTransformCExp(cexp), exp.body ), 
                            (arr) => makeOk(makeProcExp(exp.args, arr)) ):
    isAppExp(exp) ? bind(mapResult( (cexp: CExp) => lexTransformCExp(cexp), exp.rands ), 
                            (arr) =>  bind(lexTransformCExp(exp.rator), (r) =>
                                             makeOk(makeAppExp(r, arr)) ))  :
    isClassExp(exp) ? bind(mapResult((binding:Binding) => bind(lexTransformCExp(binding.val),(v) => 
                                                                    makeOk(makeBinding(binding.var.var,v))), exp.methods), 
                                (bindings) => makeOk(class2proc(makeClassExp(exp.fields, bindings)))   ):   
    makeFailure("never");


