import parse from 'html-react-parser';
import courseMarkup from '../content/course-content.html?raw';
import { courseActions } from '../lib/courseActions.js';

const courseContent = parse(courseMarkup);

function handleCourseClick(event) {
  const actionElement = event.target.closest('[data-action]');
  if (!actionElement || !event.currentTarget.contains(actionElement)) {
    return;
  }

  const action = courseActions[actionElement.dataset.action];
  if (action) {
    action(event, actionElement);
  }
}

export default function CourseContent({ ready }) {
  return (
    <div
      className="course-content"
      onClick={handleCourseClick}
      inert={!ready}
      aria-busy={!ready}
    >
      {courseContent}
    </div>
  );
}
