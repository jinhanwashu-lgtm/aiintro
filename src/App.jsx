import CourseContent from './components/CourseContent.jsx';
import useCourseEnhancements from './hooks/useCourseEnhancements.js';

export default function App() {
  const { error: enhancementError, ready } = useCourseEnhancements();

  return (
    <>
      {enhancementError && (
        <p className="app-error" role="alert">
          Some interactive course features could not be loaded. Refresh the page
          to try again.
        </p>
      )}
      <CourseContent ready={ready} />
    </>
  );
}
