import { useEffect, useState } from "react"
import { getInitials, speakers } from "./data/speakers"

const autoplayDelay = 5200
const backgroundImage = "/assets/college-photo.jpg"
const collegeLogo = "/assets/college-logo.png"
const seminarTopic = "Latest Trends in Cyber Security and AI/ML"
const collegeName = "Maharani Lal Kunwari (P.G.) College, Balrampur"

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % speakers.length)
    }, autoplayDelay)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const activeSpeaker = speakers[activeIndex]

  const goToSlide = (index) => setActiveIndex(index)
  const showNext = () => setActiveIndex((current) => (current + 1) % speakers.length)
  const showPrevious = () =>
    setActiveIndex((current) => (current - 1 + speakers.length) % speakers.length)
  const togglePaused = () => setIsPaused((current) => !current)

  return (
    <main className="showcase-shell">
      <section
        className="carousel-stage"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(14, 28, 18, 0.58), rgba(19, 35, 24, 0.8)), url(${backgroundImage})`,
        }}
      >
        <div className="stage-overlay" />

        <header className="carousel-header">
          <div className="header-brand">
            <img src={collegeLogo} alt={`${collegeName} logo`} className="college-logo" />
          </div>
          <p className="seminar-label">National Seminar 2026</p>
          <h1>{seminarTopic}</h1>
          <p className="college-name">{collegeName}</p>
        </header>

        <section className="carousel-shell">
          <div className="side-controls side-controls-left">
            <button
              type="button"
              className="nav-arrow nav-arrow-left"
              onClick={showPrevious}
              aria-label="Previous speaker"
            >
              &lsaquo;
            </button>

            <button
              type="button"
              className="side-toggle"
              onClick={togglePaused}
              aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            >
              {isPaused ? "Play" : "Pause"}
            </button>
          </div>

          <article className="speaker-spotlight">
            <div className="spotlight-portrait">
              {activeSpeaker.image ? (
                <img
                  src={activeSpeaker.image}
                  alt={activeSpeaker.name}
                  style={
                    activeSpeaker.imagePosition
                      ? { objectPosition: activeSpeaker.imagePosition }
                      : undefined
                  }
                />
              ) : (
                <div className="portrait-fallback">{getInitials(activeSpeaker.name)}</div>
              )}
            </div>

            <div className="spotlight-content">
              <h2>{activeSpeaker.name}</h2>
              <p className="designation">{activeSpeaker.designation}</p>
              <p className="meta-line">{activeSpeaker.department}</p>
              <p className="meta-line">{activeSpeaker.institution}</p>
              <p className="meta-line">{activeSpeaker.location}</p>

              <div className="tag-row">
                {activeSpeaker.researchAreas.slice(0, 4).map((area) => (
                  <span key={area} className="tag">
                    {area}
                  </span>
                ))}
              </div>

              {activeSpeaker.experience?.length ? (
                <div className="highlights">
                  {activeSpeaker.experience.slice(0, 2).map((item) => (
                    <p key={item} className="highlight-item">
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}

              <a className="contact-link" href={`mailto:${activeSpeaker.email}`}>
                {activeSpeaker.email}
              </a>
            </div>
          </article>

          <button
            type="button"
            className="nav-arrow nav-arrow-right"
            onClick={showNext}
            aria-label="Next speaker"
          >
            &rsaquo;
          </button>

          <div className="carousel-dots" aria-label="Speaker navigation">
            {speakers.map((speaker, index) => (
              <button
                key={speaker.name}
                type="button"
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to speaker ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
