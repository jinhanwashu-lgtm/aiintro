function callCourseFunction(name, ...args) {
  const courseFunction = window[name];
  if (typeof courseFunction !== 'function') {
    throw new Error(`Course interaction "${name}" is not available yet.`);
  }

  courseFunction(...args);
}

export const courseActions = {
  'toggle-menu': () => document.getElementById('side').classList.toggle('open'),
  'toggle-theme': () => callCourseFunction('toggleTheme'),
  'open-help': () => document.getElementById('help').classList.add('on'),
  'dismiss-help-overlay': (event, overlay) => {
    if (event.target === overlay) {
      overlay.classList.remove('on');
    }
  },
  'close-help': () => document.getElementById('help').classList.remove('on'),
  'guess-machine-x': () => callCourseFunction('guessTT', 'X'),
  'guess-machine-y': () => callCourseFunction('guessTT', 'Y'),
  'reset-turing-test': () => callCourseFunction('resetTT'),
  'check-environment': () => callCourseFunction('checkEnv'),
  'reset-environment': () => callCourseFunction('resetEnv'),
  'select-reflex-agent': () => callCourseFunction('setAgent', 'reflex'),
  'select-goal-agent': () => callCourseFunction('setAgent', 'goal'),
  'run-agent-cycle': () => callCourseFunction('runAgent'),
  'undo-puzzle': () => callCourseFunction('pzUndo'),
  'reset-puzzle': () => callCourseFunction('pzReset'),
  'solve-puzzle': () => callCourseFunction('pzSolve'),
  'run-landscape': () => callCourseFunction('runLandscape'),
  'randomize-landscape': () => callCourseFunction('randomStart'),
  'reset-bayes': () => callCourseFunction('bayesReset'),
  'check-markov': () => callCourseFunction('checkMC'),
  'show-markov-answer': () => callCourseFunction('fillMC'),
  'reset-neuron': () => {
    document.getElementById('w').value = -1;
    document.getElementById('b').value = 0.5;
    callCourseFunction('neuron');
  },
  'reset-decision-tree': () => callCourseFunction('dtReset'),
  'reset-quiz': (_event, button) => callCourseFunction('quizResetAsk', button),
};
