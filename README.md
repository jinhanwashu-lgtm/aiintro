# AI Foundations: An Interactive Course

An interactive introduction to artificial intelligence for working professionals. Explore core ideas through concise lessons, worked examples, and browser-based experiments.

## Course agenda

The course is designed to be followed in order. It moves from the foundations of intelligent agents through search, uncertainty, language, and learning, then considers practical AI use at work.

1. **What is an intelligent agent?** — The Turing Test, PEAS descriptions, and task environments.
2. **Deciding and searching** — Reflex and goal-based agents, the 8-puzzle, and simulated annealing.
3. **Reasoning under uncertainty** — Bayes' rule, Markov chains, and Markov decision processes.
4. **Language and learning** — Ambiguity in language, neural networks, entropy, and decision trees.
5. **AI at work** — Using AI assistants effectively and an introduction to the Claude Certified Associate – Foundations syllabus.
6. **Appendices** — A formula reference and a 16-question self-assessment.

The chapters include interactive experiments, review questions, and worked examples. Progress is saved in the current browser.

## Get started

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your browser. The development server must remain running while you use the course.

## Production build

```sh
npm run build
npm run preview
```

## About the project

The course is built with React and Vite. Lesson content is in `src/content/`, styles are in `src/styles.css`, and the interactive course app is in `src/`. Browser-based exercise logic is in `public/course.js`.

## Acknowledgement

Queen Mary University of London is acknowledged as a reference for this course. This is an independent project and is not affiliated with or endorsed by the University.
