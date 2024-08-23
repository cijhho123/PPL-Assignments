# Principles of Programming Languages (PPL) Assignments

Assignments of the "Principles of Programming Languages" (PPL) course taught at the Computer Science Department of BGU.

The Assignments focuses on:
* Functional programing in JavaScript & TypeScript.
* Meta-programming: developing Interpreter, Parser, Type-checker & Type-Inference for L1-L7 (dialects of Scheme) with TypeScript.
* Logic Programming in Prolog.

BGU PPL Github repo can be found here: https://github.com/bguppl/interpreters
The course website can be viewed here: https://bguppl.github.io/interpreters/

# Course Syllabus
This course studies principles underlying the design of programming languages. It has four main objectives:

1. Learning principles of programming languages: elements of programming languages; abstraction means in programming languages; formal definition of programming languages – concrete syntax, abstract syntax, operational semantics; program correctness – type checking and type inference systems.
2. Describing program execution by studying evaluators: interpreters, transformers and compilers. 
3. Comparing programming paradigms: Functional programming, Logic programming and Imperative programming.
4. Learning principles of program design: Abstraction, contracts, modular architecture, testing.

The course is a mixture of theory and practice. Theoretical topics are supported by implemented software, and course assignments involve programming. The course interleaves two main threads:
 
(1) learning new programming techniques (functional programming, logic programming) using practical examples in JavaScript, TypeScript and Prolog; 

(2) learning meta-programming by developing parsers, interpreters, and program transformers (illustrated by a type inference system for functional programming). The course uses the Scheme language (Racket) and TypeScript for teaching the general theory and practice of language design and implementation. Meta-programming tools are developed to demonstrate the advantage of a formal definition of programming languages syntax and semantics to "reason about code". These software tools are also used as practical examples of good software design, using functional programming.

# Setting up the project
0. Download the repo and unzip it.
1. Open CMD and navigate to the assignment folder.
2. Run ```npm install``` to get all the dependency modules
3. To invoke the tests, run ```npm test```

# The Assignments
Eeach assignment contain a theoretical part as well as a coding part. For each assignment you can view the skeleton files (including test files), my solution, assignment document and theoretical solution.

## Assignment 1
This assignment involves practical exercises in functional programming using TypeScript and Scheme. Refactoring the code to follow functional paradigms, define complex types, and implement key operations on data structures.
The assignment also introduces the concept of monads.

## Assignment 2
This assignment focuses on extending the L3 language with object-oriented features. This includes updating the L3 parser and interpreter to handle class definitions and method calls. 

The assignment also requires converting class-based programs into procedure-based forms, and analyzing their evaluation and environment. It combines theoretical concepts in functional programming with practical implementation tasks.

## Assignment 3
This assignment focuses on enhancing the L5 language by introducing new types and type predicates to create L5v2. The assignment involves extending the language syntax to support basic types like any and never, and complex types such as union, intersection, and difference. 

Additionally, it requires implementing type predicates and updating type checking functions to accommodate these new features. This includes modifying existing syntax and functions to support type operations and predicates in the new L5v2 language.


## Assignment 4
This assignment is mainly focused on implementing CPS functions, working with lazy lists, and solve logic programming problems.

CPS Functions: Implement pipe$, a CPS-based function composition tool, and demonstrate its equivalence to standard pipe.

Lazy Lists: Develop procedures for reducing values in lazy lists, creating lazy lists with incremental reductions, and generating lazy approximations to π.

Logic Programming: Perform unification tasks, and implement pathfinding, edge reversal, and node degree calculations in directed graphs using Prolog.


# Credits
All the credits go to the PPL staff at the CS department - thank each and every one of you!
Special thanks to my lecturer Meni A. and teaching assistant Ariel G.