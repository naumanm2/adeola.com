// ── Shows Page ──
window.ShowsPage = function() {
  const upcoming = [
    { id: 1, title: 'Venue Name', location: 'London, UK', date: '15/06/2026 20:00', live: true },
    { id: 2, title: 'Summer Festival', location: 'Lagos, NG', date: '22/07/2026 21:00', live: true },
  ];
  const past = [
    { id: 3, title: 'The Jazz Cafe', location: 'London, UK', date: '10/03/2025 19:30', live: false },
    { id: 4, title: 'Village Underground', location: 'London, UK', date: '08/11/2024 20:00', live: false },
    { id: 5, title: 'Phonox', location: 'London, UK', date: '22/08/2024 22:00', live: false },
  ];
  const totalCount = upcoming.length + past.length;
  const socials = ['INSTAGRAM','SPOTIFY','TIKTOK','YOUTUBE'];

  function ShowRow({ show, opacity }) {
    return React.createElement('div', {
      style: { padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.2)', opacity: opacity ?? 1 }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 24, width: '100%' } },
        React.createElement('p', { style: { flex: 1, fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2rem)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', margin: 0, lineHeight: 1.1 } }, show.title),
        React.createElement('div', { style: { flex: 1, display: 'flex', alignItems: 'center', gap: 12 } },
          React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 2 } },
            React.createElement('p', { style: { fontSize: '1rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', margin: 0 } }, show.location),
            React.createElement('p', { style: { fontSize: '1rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', margin: 0 } }, show.date),
          ),
          show.live && React.createElement(CTA, { text: 'Tickets', onClick: () => {} }),
        )
      )
    );
  }

  return React.createElement('div', null,
    // Hero
    React.createElement('div', { style: { paddingTop: 140 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' } },
        React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1 } },
          React.createElement('span', { style: { fontWeight: 700, fontSize: 'clamp(4rem,10vw,8rem)', color: '#fff', lineHeight: 1 } }, 'SHOWS'),
          React.createElement('span', { style: { fontWeight: 700, fontSize: '1.5rem', backgroundImage: 'linear-gradient(207deg, rgb(255,212,133) 6%, rgb(249,192,88) 88%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } }, `(${totalCount})`),
        ),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 20, color: '#fff' } },
          React.createElement('span', { style: { fontWeight: 500, fontSize: '1.5rem' } }, 'Explore'),
          React.createElement(PlayTriangle, { size: 11, color: 'white' }),
        ),
      ),
      // Reflection
      React.createElement('div', { style: { transform: 'scaleY(-1)', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden', height: 40 } },
        React.createElement('span', { style: { fontWeight: 700, fontSize: 'clamp(4rem,10vw,8rem)', display: 'block', backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 } }, 'SHOWS')
      ),
    ),

    React.createElement('div', { style: { height: 40 } }),

    // Intro — image + quote
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 48 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 8 } },
        React.createElement('img', {
          src: '../../assets/profile-photo.jpg',
          style: { flexShrink: 0, width: 171, height: 224, objectFit: 'cover' },
          alt: 'Adeola',
        }),
        React.createElement('p', { style: { flex: 1, fontWeight: 500, fontSize: 'clamp(1.5rem,4vw,2.5rem)', lineHeight: 0.88, color: '#fff', margin: 0 } },
          'Singer-songwriter weaving warm R&B textures with raw, honest emotion.'
        )
      )
    ),

    // Upcoming
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', padding: '12px 0', lineHeight: 1 } },
        React.createElement('span', { style: { fontWeight: 700, fontSize: '2.25rem', color: '#fff' } }, 'UPCOMING'),
        React.createElement('span', { style: { fontWeight: 700, fontSize: '1.2rem', color: '#fff' } }, `(${upcoming.length})`),
      ),
      upcoming.length > 0
        ? upcoming.map(s => React.createElement(ShowRow, { key: s.id, show: s }))
        : React.createElement('p', { style: { color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 20, margin: 0 } }, 'No upcoming shows at the moment.'),
    ),

    React.createElement('div', { style: { height: 48 } }),

    // Past
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 4, padding: '12px 0', lineHeight: 1 } },
        React.createElement('span', { style: { fontWeight: 700, fontSize: '2.25rem', color: '#fff', textTransform: 'uppercase' } }, 'Past'),
        React.createElement('span', { style: { fontWeight: 700, fontSize: '1.2rem', color: '#fff' } }, `(${past.length})`),
      ),
      past.map((s, i) => React.createElement(ShowRow, { key: s.id, show: s, opacity: [1, 0.8, 0.6, 0.4][i] ?? 0.3 })),
    ),

    React.createElement('div', { style: { height: 48 } }),

    // Footer
    React.createElement('div', { style: { borderTop: '1px solid #fff', paddingTop: 24, paddingBottom: 16, paddingLeft: 12 } },
      React.createElement('div', { style: { display: 'flex', gap: 24, fontWeight: 700, fontSize: '1.125rem', letterSpacing: '0.1em' } },
        socials.map(s => React.createElement('span', { key: s, style: { color: '#fff', cursor: 'pointer' } }, s))
      )
    ),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 40, overflow: 'hidden' } },
      React.createElement('span', { style: { fontWeight: 700, fontSize: 'clamp(3rem,14vw,14rem)', letterSpacing: '-0.02em', color: '#fff', lineHeight: 0.88, whiteSpace: 'nowrap' } }, 'ADEOLA'),
      React.createElement('div', { style: { transform: 'scaleY(-1)', width: '100%', overflow: 'hidden', height: 30 } },
        React.createElement('span', { style: { fontWeight: 700, fontSize: 'clamp(3rem,14vw,14rem)', letterSpacing: '-0.02em', display: 'block', backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 0.88 } }, 'ADEOLA')
      ),
      React.createElement('p', { style: { fontSize: '0.75rem', letterSpacing: '0.1em', color: '#fff', margin: '12px 0 24px' } }, 'cc. Adeola Ikuesan 2026'),
    ),
  );
};
