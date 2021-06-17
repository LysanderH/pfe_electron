import React, { useEffect, useState } from 'react';

export default function ErrorMessage() {
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFlash(null);
    }, 5000);
  }, []);

  return flash ? (
    <div>
      <p>Une erreur vient de se produire, veuillez réessayer.</p>
    </div>
  ) : (
    ''
  );
}
