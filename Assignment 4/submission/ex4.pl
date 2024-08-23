/*
 * **********************************************
 * Printing result depth
 *
 * You can enlarge it, if needed.
 * **********************************************
 */
maximum_printing_depth(100).

:- current_prolog_flag(toplevel_print_options, A),
   (select(max_depth(_), A, B), ! ; A = B),
   maximum_printing_depth(MPD),
   set_prolog_flag(toplevel_print_options, [max_depth(MPD)|B]).

 

edge(a,b).
edge(a,c).
edge(c,b).
edge(c,a).


% Signature: path(Node1, Node2, Path)/3
% Purpose: Path is a path, denoted by a list of nodes, from Node1 to Node2.
path(X ,X, P) :- P = [X].
path(N1,N2, [N1 | [X | P]]) :- 
    edge(N1,X), 
    path(X, N2, [X | P]).



% Signature: cycle(Node, Cycle)/2
% Purpose: Cycle is a cyclic path, denoted a list of nodes, from Node1 to Node1.
cycle(N, C) :- 
    path(N, N, C).




% Signature: reverse(Graph1,Graph2)/2
% Purpose: The edges in Graph1 are reversed in Graph2

reverse([], []).
reverse(Tree1, Tree2) :-
    Tree1 = [[A,B] | T2],
    Tree2 = [[B,A] | T1],
    reverse(T1,T2).



% Signature: degree(Node, Graph, Degree)/3
% Purpose: Degree is the degree of node Node, denoted by a Church number (as defined in class)
degree(N1, [], zero).
degree(N1, [H | T], D) :-
    H = [N1, _],
    D = z(D2),
    degree(N1, T, D2).    
degree(N1, [H | T], D) :-
    H = [A, _],
    A \= N1,
    degree(N1, T, D).




