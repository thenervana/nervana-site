'use client';
import { useState } from "react";
import styles from "../page.module.css"; // Adjust import if CSS is elsewhere

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.footerNewsletter}>
      <span className={styles.footerNewsletterLabel}>Subscribe to our newsletter</span>
      <form className={styles.footerNewsletterForm} onSubmit={handleSubmit}>
        <input
          className={styles.footerInput}
          type="email"
          placeholder="Enter your email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.footerBtn} type="submit" aria-label="Subscribe">
          <span style={{ display: "inline-block", fontWeight: "600", fontSize: "1.2em" }}>
            &#8594;
          </span>
        </button>
      </form>
      {status === 'success' && <p className={styles.footerSuccessMsg}>You're subscribed!</p>}
      {status === 'error' && <p style={{ marginTop: '10px', color: 'red' }}>Something went wrong. Try again.</p>}
    </div>
  );
}
