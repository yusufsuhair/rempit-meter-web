import { test } from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, SKIP, scoreFor, diagnose } from "./quiz.ts";

test("16 questions, 4 options each, the last option is always the heaviest (20)", () => {
  assert.equal(QUESTIONS.length, 16);
  for (const q of QUESTIONS) {
    assert.equal(q.options.length, 4);
    assert.equal(q.options[3].weight, 20);
    assert.equal(Math.max(...q.options.map((o) => o.weight)), 20);
  }
  assert.equal(QUESTIONS[0].prompt, "Awak tunggang tanpa helmet ke?");
});

test("no answers → 0, last option everywhere → 100", () => {
  assert.equal(scoreFor(QUESTIONS.map(() => null)), 0);
  assert.equal(scoreFor(QUESTIONS.map(() => 3)), 100);
  assert.equal(scoreFor(QUESTIONS.map(() => 0)), 0);
});

test("one max answer out of 16 is 6%", () => {
  const answers = QUESTIONS.map((_, i) => (i === 0 ? 3 : null));
  assert.equal(scoreFor(answers), Math.round((20 / 320) * 100));
});

test("skipped questions drop out of the maximum; skipping all gives 0 not NaN", () => {
  const answers = QUESTIONS.map((_, i) => (i === 0 ? 3 : SKIP));
  assert.equal(scoreFor(answers), 100);
  assert.equal(scoreFor(QUESTIONS.map(() => SKIP)), 0);
});

test("diagnosis bands", () => {
  assert.equal(diagnose(0).title, "Penunggang Baik");
  assert.equal(diagnose(30).title, "Penunggang Baik");
  assert.equal(diagnose(31).title, "Rempit Hujung Minggu");
  assert.equal(diagnose(70).title, "Rempit Hujung Minggu");
  assert.equal(diagnose(71).title, "Mat Rempit Bertauliah");
  assert.equal(diagnose(100).title, "Mat Rempit Bertauliah");
});
