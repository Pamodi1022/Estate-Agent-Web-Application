import React, { useEffect, useState } from 'react';

const Advertisements = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/properties/prop1.html') // Fetch relative to the public directory
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load HTML: ${response.statusText}`);
        }
        return response.text();
      })
      .then((data) => setHtmlContent(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Advertisements</h2>
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
};

export default Advertisements;
