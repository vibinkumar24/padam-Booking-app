import React from 'react';

const AutoGenerateEmail = () => {
  const generateEmail = () => {
    const recipient = "vibinpvi2001@gmail.com";
    const subject = "Subject of the email";
    const body = "This is the body of the email";

    // Construct the mailto URL
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the mailto link in a new tab
    window.open(mailto, '_blank');
  };

  return (
    <div>
      <button onClick={generateEmail}>Send Email</button>
    </div>
  );
};

export default AutoGenerateEmail;
