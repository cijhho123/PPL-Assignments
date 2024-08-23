"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var part2_1 = require("../../src/part2/part2");
describe("Assignment 1 Part 2", function () {
    describe("countVowels", function () {
        it("counts letters", function () {
            expect((0, part2_1.countVowels)("aaabbbb")).toEqual(3);
        });
        it("counts letters", function () {
            expect((0, part2_1.countVowels)("AaaBbbb")).toEqual(3);
        });
        it("counts letters", function () {
            expect((0, part2_1.countVowels)("ABbbaab")).toEqual(3);
        });
        it("counts letters", function () {
            expect((0, part2_1.countVowels)("I am robot")).toEqual(4);
        });
        it("counts letters", function () {
            expect((0, part2_1.countVowels)("abcABCaabbcc d")).toEqual(4);
        });
    });
    describe("isPaired", function () {
        it("returns true for a string with paired parens", function () {
            expect((0, part2_1.isPaired)("([{}])")).toBe(true);
        });
        it("returns true for a string with paired parens", function () {
            expect((0, part2_1.isPaired)("This is ([some]) {text}.")).toBe(true);
        });
        it("returns true for a string with paired parens", function () {
            expect((0, part2_1.isPaired)("No parens, no problems.")).toBe(true);
        });
        it("returns true for a string with paired parens", function () {
            expect((0, part2_1.isPaired)("[](){}")).toBe(true);
        });
        it("returns false when the parens are not paired", function () {
            expect((0, part2_1.isPaired)("(]")).toBe(false);
            expect((0, part2_1.isPaired)("This is ]some[ }text{")).toBe(false);
            expect((0, part2_1.isPaired)("(")).toBe(false);
            expect((0, part2_1.isPaired)(")(")).toBe(false);
            expect((0, part2_1.isPaired)("())")).toBe(false);
        });
    });
    describe("treeToSentence", function () {
        it("Represents a tree as a sentence", function () {
            var t1 = { root: "hello", children: [{ root: "world", children: [] }] };
            expect((0, part2_1.treeToSentence)(t1)).toBe("hello world");
        });
        it("Represents a tree as a sentence", function () {
            var t2 = { root: "hello", children: [{ root: "there", children: [] }, { root: "!", children: [] }] };
            expect((0, part2_1.treeToSentence)(t2)).toBe("hello there !");
        });
        it("Represents a tree as a sentence", function () {
            var t3 = { root: "hello", children: [{ root: "there", children: [{ root: "!", children: [] }] }] };
            expect((0, part2_1.treeToSentence)(t3)).toBe("hello there !");
        });
        it("Represents a tree as a sentence", function () {
            var t4 = { root: "hello", children: [] };
            expect((0, part2_1.treeToSentence)(t4)).toBe("hello");
        });
        it("Represents a tree as a sentence", function () {
            var t5 = { root: "", children: [] };
            expect((0, part2_1.treeToSentence)(t5)).toBe("");
        });
    });
});
