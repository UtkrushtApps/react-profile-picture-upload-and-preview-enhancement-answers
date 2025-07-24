import React, { useRef, useState, useEffect } from 'react';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const DEFAULT_AVATAR = 'https://via.placeholder.com/150?text=Avatar';

function ProfilePicture() {
  const fileInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [error, setError] = useState('');
  const [objectUrl, setObjectUrl] = useState(null); // To track and cleanup

  useEffect(() => {
    // Cleanup object URL when component unmounts or when a new one is set
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please select a JPG, PNG, GIF, or WEBP image.');
      // Reset the preview (but keep what was previously set, not reset to default)
      return;
    }

    setError('');

    // Clean up any previous object URL
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    // Create new preview
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
    setObjectUrl(url);
  };

  const handleChooseClick = () => {
    fileInputRef.current.focus();
    fileInputRef.current.click();
  };

  return (
    <div style={{ maxWidth: 250, margin: '2rem auto', textAlign: 'center' }}>
      <img
        src={avatarUrl}
        alt="Profile avatar preview"
        style={{ width: 150, height: 150, borderRadius: '50%', objectFit: 'cover', background: '#eee' }}
        aria-live="polite"
      />
      <div style={{ margin: '1rem 0' }}>
        <button
          type="button"
          onClick={handleChooseClick}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: 4,
            background: '#1976d2',
            color: 'white',
            border: 'none',
          }}
          aria-label="Change profile picture"
        >
          Change Picture
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          aria-label="Profile image upload"
        />
      </div>
      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{ color: 'red', fontSize: '0.95rem' }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default ProfilePicture;
