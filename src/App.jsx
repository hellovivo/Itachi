import React from 'react';

export default function App() {
  return (
    <main className="app">
      <header className="navbar">
        <h2>⚡ SHINOBI STREAM</h2>
        <button>Sign In</button>
      </header>

      <section className="hero">
        <p className="tag">THE WORLD OF ANIME</p>
        <h1>ENTER THE<br />SHINOBI WORLD</h1>
        <p>
          Discover anime, explore legendary stories,
          and stream your favourite episodes.
        </p>
        <button className="watch">Explore Anime</button>
      </section>

      <section className="content">
        <h2>Featured Anime</h2>
        <p>Your next anime adventure starts here.</p>
      </section>
    </main>
  );
}
