"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import styles from "./page.module.css";

const chatSequence = [
  { side: "left", avatar: "/founder.JPG", alt: "Jay Gogad", text: "Hey, John", typing: true },
  { side: "right", avatar: "/client.png", alt: "Client", text: "Building a brand is overwhelming. I&apos;ve been stuck.", typing: true },
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
                Book a Call
              </Link>
            </nav>
          </div>
        </header>

        <div className={styles.bannerOverlay}>
          <div className={styles.bannerTextBlock}>
            <div className={styles.bannerText}>
              You just need to{""}
              <span id="jackpotText" className={styles.jackpotEffect} aria-live="polite" aria-atomic="true">
                Script
              </span>
              <span className={styles.cursor}></span>
            </div>
            <h1 className={styles.heroHeading} style={{ fontSize: "3.2rem", textAlign: "center" }}>
              From Invisible to In Demand
            </h1>
            <p className={styles.heroSubtext} style={{ fontSize: "1.3rem", textAlign: "center" }}>
              We help founders turn their content into a client acquisition machine.
            </p>
            <Link href="https://calendly.com/jay-thenervana/call" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnPrimaryMain}`}>
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </div>

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
          At Nervana, we help founders turn their Personal Brand into a client acquisition machine. We typically work with growth-stage founders &mdash; already doing decently, but hitting a plateau with inbound growth.
          Our Trust Magnet Framework fixes that. We build you a sharp, founder-led content system that makes the right people follow, trust, and buy &mdash; before you even get on a sales call.
          If inconsistent customer acquisition/retention is your bottleneck, you&apos;re a damn good fit for what we do.
        </p>
      </section>

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

      <main id="main-content">
        <section
          id="work"
          className={`${styles.section} ${styles.container} ${styles.animate}`}
        >
          <h2 className={styles.center}>Are you one of these?</h2>
          <ul className={styles.cards}>
            <li className={styles.card}>
              <h3>₹5L–₹15L/mo Founders</h3>
              <p>Growth-stage founders hitting a plateau with inbound growth.</p>
            </li>
            <li className={styles.card}>
              <h3>Coaches & Consultants</h3>
              <p>Experts tired of chasing leads and ready to be in demand.</p>
            </li>
            <li className={styles.card}>
              <h3>SaaS Founders</h3>
              <p>Operators stuck in referral loops, seeking consistent inbound.</p>
            </li>
          </ul>
        </section>

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

          <div className={styles.section}>
  <h2 className={`${styles.center} ${styles.container} ${styles.animate}`}>Success Stories</h2>
  <p className={`${styles.container} ${styles.animate}`}>
    A snapshot of our real-world results — millions of organic views, viral content, and brands that became internet favorites. All built from scratch with strategy, soul, and zero paid ads.</p> 
    &nbsp;

  <div className={styles.galleryWrapper}>
    <div className={styles.galleryClip}>
      <div className={styles.galleryScroll} id="gallery">
        {[...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16), ...Array(16)].map((_, i) => (
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
          <h1>Turn your content into your strongest sales asset</h1>
          <Link
            href="https://calendly.com/jay-thenervana/call"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnPrimaryMain}`}
            style={{ marginTop: "4rem" }}                   > 
            Book Your Call
          </Link>
        </section>
      </main>

      <footer className={`${styles.footer} ${styles.center}`}>
        <p>
          Email: <a href="mailto:hello@thenervana.com">hello@thenervana.com</a> | Phone: <a href="tel:+917385652766">+91 738 565 2766</a>
        </p>
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#666" }}> 2025 Copyright The Nervana Co.</p>
      </footer>
    </>
  );
}