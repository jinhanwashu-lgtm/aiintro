# Introduction to Artificial Intelligence

A hands-on introduction to artificial intelligence for working professionals. Each topic is a short session built around a prediction, an experiment, and a practical application.

## Course agenda

The six chapters are designed to be followed in order:

1. **What is an intelligent agent?** — The Turing Test, PEAS descriptions, and task environments.
2. **Deciding and searching** — Reflex and goal-based agents, the 8-puzzle, and simulated annealing.
3. **Reasoning under uncertainty** — Bayes' rule, Markov chains, and Markov decision processes.
4. **Language and learning** — Ambiguity, neural networks, entropy, and decision trees.
5. **How language models work** — Next-word prediction, context, and errors and remedies.
6. **Working with Claude** — Prompting, evaluating output, choosing tools and models, workflows, Projects, governance, and troubleshooting.

The course includes 36 interactive experiments, review questions, practical tasks, a formula reference, a self-assessment, and further reading. Progress, quiz answers, and notes are saved in the current browser.

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

The course is built with React and Vite. Lesson markup is in `src/content/course-content.html`, styles are in `src/styles.css`, and browser-based exercise logic is in `public/course.js`. The React app mounts and coordinates the course in `src/`.

## Acknowledgement

Queen Mary University of London is acknowledged as a reference for this course. This is an independent project and is not affiliated with or endorsed by the University.
