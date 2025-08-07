"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FooterNewsletter from "./components/FooterNewsletter";
import "./globals.css";
import styles from "./page.module.css";

// Chatbot sequence for the chat UI
const chatSequence = [
  { side: "left", avatar: "/founder.JPG", alt: "Jay Gogad", text: "Hey, John", typing: true },
  { side: "right", avatar: "/client.png", alt: "Client", text: "Building a personal brand is overwhelming. I have been stuck.", typing: true },
  { side: "left", avatar: "/founder.JPG", alt: "Founder", text: "I know it is, so I built Nervana to simplify the process.", typing: true },
  { side: "right", avatar: "/client.png", alt: "Client", text: "Idk where to begin :(", typing: true },
  { side: "left", avatar: "/founder.JPG", alt: "Founder", text: "Start with booking a call with us.", typing: true },
  { side: "right", avatar: "/client.png", alt: "Client", text: "I already did that!", typing: true },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTyping, setShowTyping] = useState(chatSequence[0]?.typing);

  useEffect(() => {
    if (currentIndex >= chatSequence.length) return;
    if (chatSequence[currentIndex]?.typing) {
      setShowTyping(true);
      const typingDelay = 1200;
      const timer = setTimeout(() => {
        setShowTyping(false);
        setCurrentIndex((idx) => idx + 1);
      }, typingDelay);
      return () => clearTimeout(timer);
    } else {
      setShowTyping(false);
      const timer = setTimeout(() => {
        setCurrentIndex((idx) => idx + 1);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Typewriter effect for jackpot text
    const typeWriterEffect = () => {
      const jackpot = document.getElementById("jackpotText");
      const words = [
        "Start", "Script", "Shoot", "Create", "Edit", "Post", "Publish", "Scale", "Repeat", "Win"
      ];
      let currentWordIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;

      const type = () => {
        if (!jackpot) return;
        const currentWord = words[currentWordIndex];
        const visibleText = currentWord.slice(0, currentCharIndex);
        jackpot.textContent = visibleText;
        const typingSpeed = 160;
        const deletingSpeed = 90;
        const pauseTime = 1200;

        if (!isDeleting && currentCharIndex < currentWord.length) {
          currentCharIndex++;
          setTimeout(type, typingSpeed);
        } else if (isDeleting && currentCharIndex > 0) {
          currentCharIndex--;
          setTimeout(type, deletingSpeed);
        } else {
          isDeleting = !isDeleting;
          if (!isDeleting) currentWordIndex = (currentWordIndex + 1) % words.length;
          setTimeout(type, pauseTime);
        }
      };
      type();
    };
    typeWriterEffect();

    // Reveal sections on scroll
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll("." + styles.animate);
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 80;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add(styles.visible);
        }
      }
    };

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);

    // Header background on scroll
    const handleScroll = () => {
      const header = document.querySelector(`.${styles.navHeader}`);
      const banner = document.querySelector(`.${styles.bannerWrapper}`);
      const bannerHeight = banner ? banner.offsetHeight : 300;
      if (window.scrollY > bannerHeight - 60) {
        header.classList.add(styles.headerScrolled);
      } else {
        header.classList.remove(styles.headerScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", revealOnScroll);
      window.removeEventListener("load", revealOnScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollGallery(amount) {
    const gallery = document.getElementById("gallery");
    if (gallery) gallery.scrollLeft += amount;
  }

  return (
    <>
      {/* Hero Banner */}
      <div className={styles.bannerWrapper}>
        <Image
          src="/hero banner.jpg"
          alt="Nervana Website Banner"
          className={styles.bannerImage}
          width={1920}
          height={1080}
          priority
        />
        <div className={styles.bannerGradient}></div>

        {/* Navigation Header */}
        <header className={styles.navHeader}>
          <div className={styles.nav} role="navigation">
            <div className={styles.logo}>
              <Link href="#hero" className={styles.logo}>
                Nervana
              </Link>
            </div>
            <nav className={styles.menu} aria-label="Site navigation">
              <Link href="#hero">Home</Link>
              <Link href="#work">Work</Link>
              <Link href="#framework">Framework</Link>
              <Link href="#success">Success</Link>
              <Link
                href="https://calendly.com/jay-thenervana/call"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnPrimaryHeader}`}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </header>

        {/* Banner Text */}
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerTextBlock}>
            <div className={styles.bannerText}>
              You just need to{""}
              <span id="jackpotText" className={styles.jackpotEffect} aria-live="polite" aria-atomic="true">
                Script
              </span>
              <span className={styles.cursor}></span>
            </div>
            <h1 className={styles.heroHeading} style={{ fontSize: "3rem", textAlign: "center" }}>
              India's First AI Powered Personal Branding Company
            </h1>
            <p className={styles.heroSubtext} style={{ fontSize: "2.5rem", textAlign: "center" }}>
              From <strong>Invisible</strong> to <strong>In-Demand</strong> in just <strong>90 Mins</strong>
            </p>
            <Link 
             href="https://calendly.com/jay-thenervana/call"
             target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnPrimaryMain}`}
            >
  Book a Discovery Call
</Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.container} ${styles.animate}`}>
        <h2
          className={styles.center}
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#fff",
          }}
        >
          About Nervana
        </h2>
        <p
          className={styles.center}
          style={{
            margin: "0 auto",
            fontSize: "1.25rem",
            lineHeight: "1.8",
            color: "#ccc",
          }}
        >
          India’s first AI-powered personal branding engine for founders.
          At Nervana, we help growth-stage founders turn their personal brand into a lead-gen machine - without lifting a finger.<br /><br />
          Already doing decent? But leads aren’t consistent. Content feels like a chore. You’re invisible to the right people.
          That’s exactly where we come in.<br /><br />
          With our proprietary AI-led Trust Magnet Framework, we build and run a founder-led content system that makes the right audience follow, trust, and buy - before you ever get on a sales call.<br /><br />
          If you're serious about scaling credibility, content, and clients — Nervana was built for you.
        </p>
      </section>

      {/* Chat UI Section */}
      <section
        className={styles.chatLetterSection}
        style={{ position: "relative" }}
      >
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>Chat with our Founder</div>
          <div
            className={styles.chatCardBg}
            style={{
              borderRadius: "2.2rem",
              background: "linear-gradient(105deg,#162f26 80%,#00562c30 100%)",
              boxShadow: "0 6px 28px #03221536",
              padding: "2rem 1.1rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {chatSequence.map((msg, i) => {
              if (i >= currentIndex) return null;
              return (
                <div
                  key={i}
                  className={`${styles.chatRow} ${
                    msg.side === "left" ? styles.left : styles.right
                  }`}
                >
                  <Image
                    src={msg.avatar}
                    alt={msg.alt}
                    width={36}
                    height={36}
                    className={
                      msg.side === "left" ? styles.leftAvatar : styles.rightAvatar
                    }
                  />
                  <div className={styles.chatBubble}>{msg.text}</div>
                </div>
              );
            })}
            {showTyping && currentIndex < chatSequence.length && (
              <div
                className={`${styles.chatRow} ${
                  chatSequence[currentIndex].side === "left"
                    ? styles.left
                    : styles.right
                }`}
              >
                <Image
                  src={chatSequence[currentIndex].avatar}
                  alt={chatSequence[currentIndex].alt}
                  width={36}
                  height={36}
                  className={
                    chatSequence[currentIndex].side === "left"
                      ? styles.leftAvatar
                      : styles.rightAvatar
                  }
                />
                <div className={styles.chatTyping}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            {currentIndex >= chatSequence.length && (
              <div className={styles.chatSeen}>Seen ✔</div>
            )}
          </div>
        </div>
      </section>

      <div style={{ height: 56 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            padding: "0.9em 2.4em",
            background: "rgba(0,255,179,0.07)",
            color: "#00ffb3",
            fontWeight: 600,
            fontSize: "1.6rem",
            borderRadius: "1.2em",
            boxShadow: "0 3px 32px #1aeab540",
            textAlign: "center",
          }}
        >
          What are you still waiting for?
        </div>
      </div>

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Work Section */}
        <section
          id="work"
          className={`${styles.section} ${styles.container} ${styles.animate}`}
        >
          <h2 className={styles.center}>Are you one of these?</h2>
          <ul className={styles.cards}>
            <li className={styles.card}>
              <h3>Growth Stage Founders</h3>
              <p>Growth-stage founders hitting a plateau with inbound growth.</p>
            </li>
            <li className={styles.card}>
              <h3>Coaches & Consultants</h3>
              <p>Experts tired of chasing leads and ready to be in demand.</p>
            </li>
            <li className={styles.card}>
              <h3>Busy Founders</h3>
              <p>Founders who are fully dedicated to investing time on their company and can't invest much time in their personal brand</p>
            </li>
          </ul>
        </section>

        {/* Framework Section */}
        <section
          id="framework"
          className={`${styles.section} ${styles.container} ${styles.animate}`}
        >
          <h2 className={styles.center}>The Trust Magnet Framework</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>Positioning</h3>
              <p>Carve a brand around your sharpest insight and personal edge—stand out in the noise.</p>
            </div>
            <div className={styles.card}>
              <h3>Structure</h3>
              <p>Build systems that turn attention into trust, and trust into revenue.</p>
            </div>
            <div className={styles.card}>
              <h3>Consistency</h3>
              <p>Systemize storytelling calendars, content pipelines, and publishing for reliable performance.</p>
            </div>
          </div>
        </section>

        {/* Success Section */}
        <section
          id="success"
          className={`${styles.section} ${styles.container} ${styles.animate}`}
        >
          <h2 className={styles.center}>We&apos;ve Done the Damn Thing</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>Tandoor Vadapav</h3>
              <p>Turned offline retention into online attraction—footfall surged with organic storytelling.</p>
            </div>
            <div className={styles.card}>
              <h3>Real-Content Marketing</h3>
              <p>Revamped a legacy brand&apos;s digital front—cut lead costs and built mainstream credibility.</p>
            </div>
            <div className={styles.card}>
              <h3>Krish</h3>
              <p>Scaled a personal brand to 44K followers, primed for deeper, long-form content success.</p>
            </div>
          </div>

          {/* Success Gallery */}
          <div className={styles.section}>
            <h2 className={`${styles.center} ${styles.container} ${styles.animate}`}>Success Stories</h2>
            <p className={`${styles.container} ${styles.animate}`}>
              A snapshot of our real-world results — millions of organic views, viral content, and brands that became internet favorites. All built from scratch with strategy, soul, and zero paid ads.
            </p>
            &nbsp;
            <div className={styles.galleryWrapper}>
              <div className={styles.galleryClip}>
                <div className={styles.galleryScroll} id="gallery">
                  {[...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16)].map((_, i) => (
                    <Image
                      key={i}
                      src={`/SS${(i % 16) + 1}.png`}
                      alt={`Success story ${(i % 16) + 1}`}
                      width={360}
                      height={200}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.footerSection} ${styles.center} ${styles.animate}`}>
          <h1>Be one of the First to Join the AI Content Revolution! </h1>
          <Link
            href="https://calendly.com/jay-thenervana/call"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnPrimaryMain}`}
            style={{ marginTop: "4rem" }}
          >
            Book Your Call
          </Link>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className={styles.bigFooter}>
        <div className={styles.bigFooterContainer}>
          {/* Brand/Intro */}
          <div className={styles.footerCol}>
            <div className={styles.footerLogo}>Nervana</div>
            <div className={styles.footerDesc}>
              Transforming marketing with AI-powered content strategies that drive engagement, conversions, and business growth.
            </div>
            <div className={styles.footerSocials}>
              <a href="https://twitter.com/gogadjeh/" target="_blank" rel="noopener" aria-label="X / Twitter">
                {/* X / Twitter SVG */}
                <svg width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M22 3.01l-7.43 9.16L21.89 21h-3.16l-5.22-6.41L6.01 21H0l7.64-9.43L.36 3h3.22l4.83 5.94L15.19 3H22zm-4.8 15.41h1.76L4.09 4.43H2.25l14.95 14.42z"></path></svg>
              </a>
              <a href="https://linkedin.com/company/thenervana/" target="_blank" rel="noopener" aria-label="LinkedIn">
                {/* LinkedIn SVG */}
                <svg width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452H16.89V15.413s.029-1.692-2.031-1.692c-2.058 0-2.371 1.834-2.371 1.834v4.897h-3.557V9.313h3.413v1.527h.049a3.557 3.557 0 013.197-1.757c3.417 0 4.049 2.25 4.049 5.174v6.195zM5.337 7.433a2.066 2.066 0 11-.002-4.132 2.066 2.066 0 01.002 4.132zM7.118 20.452H3.556V9.313h3.562v11.139zM22.225 0H1.771C.792 0 0 .771 0 1.729v20.542C0 21.228.792 22 1.771 22h20.451C21.2 22 22 21.229 22 20.271V1.729C22 .772 21.2 0 20.225 0h.001z"></path></svg>
              </a>
              <a href="https://instagram.com/nervana.co/" target="_blank" rel="noopener" aria-label="Instagram">
                {/* Instagram SVG */}
                <svg width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M16.98 2H5.02A3.019 3.019 0 002 5.02v11.96A3.019 3.019 0 005.02 20h11.96A3.019 3.019 0 0020 16.98V5.02A3.019 3.019 0 0016.98 2zm1.248 14.98a1.25 1.25 0 01-1.248 1.248H5.02A1.25 1.25 0 013.772 16.98V5.02A1.25 1.25 0 015.02 3.772h11.96A1.25 1.25 0 0119.228 5.02v11.96zM11 6.835a4.165 4.165 0 100 8.33 4.165 4.165 0 000-8.33zm0 6.835a2.67 2.67 0 110-5.34 2.67 2.67 0 010 5.34zm5.2-6.97a1 1 0 11-2.001-.001A1 1 0 0116.2 6.7z"></path></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerCol}>
            <div className={styles.footerTitle}>Services</div>
            <ul className={styles.footerList}>
              <li>AI Content Creation</li>
              <li>Content Strategy</li>
              <li>Performance Analytics</li>
              <li>Automated Workflows</li>
              <li>Creative Design</li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerCol}>
            <div className={styles.footerTitle}>Company</div>
            <ul className={styles.footerList}>
              <Link href="#about"><li>About Us</li></Link>
              <Link href="#about"><li>Our Team</li></Link>
              <Link href="https://linkedin.com/company/thenervana/"><li>Careers</li></Link>
              <li>Blog</li>
              <Link href="#success"><li>Case Studies</li></Link>
            </ul>
          </div>

          {/* Contact/Newsletter */}
          <div className={styles.footerCol}>
            <div className={styles.footerTitle}>Contact</div>
            <div className={styles.footerContactItem}>
              <span role="img" aria-label="Mail" style={{marginRight: 6}}>📧</span>
              hello@thenervana.com
            </div>
            <div className={styles.footerContactItem}>
              <span role="img" aria-label="Phone" style={{marginRight: 6}}>📞</span>
              +91 738 565 2766
            </div>
            <div className={styles.footerContactItem}>
              <span role="img" aria-label="Location" style={{marginRight: 6}}>📍</span>
              Mumbai, India - 400104
            </div>
            <FooterNewsletter />
          </div>
        </div>
        {/* Bottom Footer Bar */}
        <div className={styles.footerBar}>
          <div>© 2024 Nervana. All rights reserved.</div>
          <div className={styles.footerLinksRow}>
            <span className={styles.footerLink}>Privacy Policy</span>
            <span className={styles.footerLink}>Terms of Service</span>
            <span className={styles.footerLink}>Cookie Policy</span>
          </div>
        </div>
      </footer>
    </>
  );
}