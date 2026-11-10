import { useEffect, useState } from 'react';

const COURSE_SCRIPT_ID = 'course-enhancements';

export default function useCourseEnhancements() {
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let scriptPromise = window.courseEnhancementsPromise;
    if (!scriptPromise) {
      const script = document.createElement('script');
      script.id = COURSE_SCRIPT_ID;
      script.src = `${import.meta.env.BASE_URL}course.js`;
      script.async = true;

      scriptPromise = new Promise((resolve, reject) => {
        script.addEventListener('load', resolve, { once: true });
        script.addEventListener(
          'error',
          () => reject(new Error('Could not load the course interactions.')),
          { once: true },
        );
        document.body.appendChild(script);
      });
      window.courseEnhancementsPromise = scriptPromise;
    }

    scriptPromise.then(() => setReady(true)).catch(setError);
  }, []);

  return { error, ready };
}
