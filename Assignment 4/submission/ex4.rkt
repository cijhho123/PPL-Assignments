#lang racket

(provide (all-defined-out))

(define id (lambda (x) x))
(define cons-lzl cons)
(define empty-lzl? empty?)
(define empty-lzl '())
(define head car)
(define tail
  (lambda (lzl)
    ((cdr lzl))))

;;; Q1.a
; Signature: compose(f g)
; Type: [T1 -> T2] * [T2 -> T3]  -> [T1->T3]
; Purpose: given two unary functions return their composition, in the same order left to right
; test: ((compose - sqrt) 16) ==> -4
;       ((compose not not) true)==> true
(define compose
  (lambda (f g)
    (lambda (x)
       (g (f x)))))


; Signature: pipe(lst-fun)
; Type: [[T1 -> T2],[T2 -> T3]...[Tn-1 -> Tn]]  -> [T1->Tn]
; Purpose: Returns the composition of a given list of unary functions. For (pipe (list f1 f2 ... fn)), returns the composition fn(....(f1(x)))
; test: ((pipe (list sqrt - - number?)) 16)) ==> true
;       ((pipe (list sqrt - - number? not)) 16) ==> false
;       ((pipe (list sqrt add1 - )) 100) ==> -11
(define pipe
  (lambda (fs)  
    (if (empty? (cdr fs))
        (car fs)
        (compose (car fs) (pipe (cdr fs))))))


; signature: compose$(1st-fun, 2nd-fun, cont)
; type:       [T1 * [T2-> T3]] ->T3 * 
;             [T3 * [T4->T5]] -> T5 *
;             [[T1 * [T4->T5]] -> T5] -> [[T1 * [T5->T6]]-> T6]  ->
;             [T1 * [T6->T7]] -> T7

(define compose$  
  (lambda (f$ g$ con)
    (con (lambda (x con2)
            (g$ (f$ x id) con2)))
))


; Signature: pipe$(lst-fun,cont)
;          [
;         [T1 * [T2->T3] ] -> T3,
;         [T3 * [T4 -> T5] ] -> T5,
;         ...,
;         [T2n-1 * [T2n -> T2n+1]] -> T2n+1
;        ]
;        *
;       [[T1 * [T2n -> T2n+1]] -> T2n+1] -> 
;              [[T1 * [T2n+1 -> T2n+2]] -> T2n+2]
;      -> [T1 * [T2n+3 -> T2n+4]] -> T2n+4
; Purpose: Returns the composition of a given list of unry CPS functions. 
(define pipe$
  (lambda (lst-fun cont)
      (if (empty? (cdr lst-fun))
          (cont (car lst-fun))
          (pipe$ (cdr lst-fun) (lambda (res$) (cont (compose$ (car lst-fun) res$ id) )))
      )
  )
)

;(define pipe$
;  (lambda (lst-fun cont)
;    (lambda (x)
;      (if (empty? (cdr lst-fun))
;        (cont (car(lst-fun)))
;        (compose$ (car lst-fun) (pipe$ (cdr lst-fun) cont))
;      )
;    )
;  )
;)



;(compose$ ((lambda (res$) (pipe$(cdr lst-fun))) cont) (car lst-fun) id)


; (compose$((pipe$ (cdr lst-fun) cont) (car lst-fun) id))
;(lambda (f$) (compose (f$ (cdr lst-fun) cont) (car lst-fun) id))


;(isEmpty? cdr) => cont(car)
;else => compose$(pipe$(cdr(list), car(list), cont), id) 


;;; Q2a
; Signature: reduce1-lzl(reducer, init, lzl) 
; Type: [T2*T1 -> T2] * T2 * LzL<T1> -> T2
; Purpose: Returns the reduced value of the given lazy list
(define reduce1-lzl 
  (lambda (reducer init lzl)
    (if (empty-lzl? lzl)
      init
      (reduce1-lzl reducer (reducer init (car lzl)) ((cdr lzl)))
    )
  )
)  



;;; Q2b
; Signature: reduce2-lzl(reducer, init, lzl, n) 
; Type: [T2*T1 -> T2] * T2 * LzL<T1> * Number -> T2
; Purpose: Returns the reduced value of the first n items in the given lazy list
(define reduce2-lzl 
  (lambda (reducer init lzl n)
     (if (or (< n 1) (empty-lzl? lzl))
        init
        (reduce2-lzl reducer (reducer init (car lzl)) ((cdr lzl)) (- n 1))
     )
  )
)  

;;; Q2c
; Signature: reduce3-lzl(reducer, init, lzl) 
; Type: [T2 * T1 -> T2] * T2 * LzL<T1> -> Lzl<T2>
; Purpose: Returns the reduced values of the given lazy list items as a lazy list
(define reduce3-lzl 
  (lambda (reducer init lzl)
    (if (empty?  (cdr lzl))
     (reducer init (car lzl))
    (cons (reducer init (car lzl)) (lambda () 
                    (reduce3-lzl reducer (reducer init (car lzl)) ((cdr lzl))))))
  )
) 
 
;;; Q2e
; Signature: integers-steps-from(from,step) 
; Type: Number * Number -> Lzl<Number>
; Purpose: Returns a list of integers from 'from' with 'steps' jumps
(define integers-steps-from
  (lambda (from step)
      (cons from (lambda () (integers-steps-from (+ from step) step)))
  )
)

;; Signature: lzl-map(f, lz)
;; Type: [[T1 -> T2] * Lzl(T1) -> Lzl(T2)]
(define lzl-map
  (lambda (f lzl)
    (if (empty-lzl? lzl)
        lzl
        (cons-lzl (f (head lzl))
                       (lambda () (lzl-map f (tail lzl)))))))


(define numList1 ( integers-steps-from 1 4))
(define numList2 ( integers-steps-from 3 4))
(define doubleList (lambda (lzl1 lzl2)
      (cons (cons (car lzl1) (car lzl2)) (lambda () (doubleList ((cdr lzl1)) ((cdr lzl2)))))
))

(define denonimators (doubleList numList1 numList2))
(define pi-reducer (lambda (init next) ; expects two numbers in next in the form of (cons n m)
    (+ init (* 8 (/ 1 (* (car next) (cdr next)))))))


;;; Q2f
; Signature: generate-pi-approximations() 
; Type: Empty -> Lzl<Number>
; Purpose: Returns the approximations of pi as a lazy list
(define generate-pi-approximations (lambda ()
  (reduce3-lzl pi-reducer 0 denonimators)))
  