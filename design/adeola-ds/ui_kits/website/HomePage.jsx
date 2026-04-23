// ── Home Page ──
window.HomePage = function({ onNavigate }) {
  const bioQuote = "Singer-songwriter weaving warm R&B textures with raw, honest emotion — a sound entirely her own.";

  const videos = [
    { id: 1, title: 'LATEST VISUAL', sub: 'Director Cut · 2026' },
    { id: 2, title: 'LIVE SESSION', sub: 'Studio · 2025' },
    { id: 3, title: 'EP DOCUMENTARY', sub: 'Behind the Scenes · 2025' },
  ];

  const socials = ['INSTAGRAM', 'SPOTIFY', 'TIKTOK', 'YOUTUBE'];
  const [hovered, setHovered] = React.useState(null);

  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
    // Hero
    React.createElement('section', { style: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: 64 } },
      React.createElement('div', { style: { display: 'flex', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: '1rem', letterSpacing: '-0.025em', marginBottom: 4 } },
        React.createElement('span', null, 'SINGER'),
        React.createElement('span', null, '•'),
        React.createElement('span', null, 'SONGWRITER'),
      ),
      React.createElement('h1', { style: { fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.025em', color: '#fff', fontSize: 'clamp(2.33rem, 8vw, 3.95rem)', margin: '0 0 12px' } }, 'ADEOLA'),
      React.createElement(CTA, { text: 'EP OUT NOW', onClick: () => onNavigate('audio') }),
      // Ghost hero image (mix-blend-lighten)
      React.createElement('div', {
        style: { width: '100%', maxWidth: 380, marginTop: -60, alignSelf: 'center', position: 'relative', overflow: 'hidden' }
      },
        React.createElement('img', {
          src: '../../assets/hero-image.png',
          style: { width: '100%', display: 'block', mixBlendMode: 'lighten' },
          alt: 'Adeola',
        })
      )
    ),

    // Bio quote with floated profile photo
    React.createElement('section', { style: { paddingBottom: 24, position: 'relative' } },
      React.createElement('img', {
        src: '../../assets/profile-photo.jpg',
        style: { float: 'left', width: '40%', aspectRatio: '3/4', objectFit: 'cover', marginRight: 16, marginBottom: 8 },
        alt: 'Adeola portrait',
      }),
      React.createElement('p', {
        style: {
          fontSize: '1.4rem', fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.1,
          backgroundImage: 'linear-gradient(180deg, #ffcee5 0%, #ffcee5 50%, #002f6d 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          margin: 0,
        }
      }, bioQuote),
      React.createElement('div', { style: { clear: 'both' } })
    ),

    // Videos section
    React.createElement('section', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement('p', { style: { fontWeight: 700, fontSize: '3rem', letterSpacing: '0.1em', color: '#fff', margin: 0, lineHeight: 1 } }, 'VIDEOS'),
      // Featured
      React.createElement('div', {
        onClick: () => onNavigate('video'),
        style: { display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }
      },
        React.createElement('div', {
          style: { position: 'relative', aspectRatio: '16/9', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }
        },
          React.createElement('div', {
            style: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,206,229,0.06) 0%, rgba(0,47,109,0.4) 100%)' }
          }),
          React.createElement('div', {
            style: { width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }
          }, React.createElement(PlayTriangle, { size: 12, color: 'white' }))
        ),
        React.createElement('p', { style: { fontWeight: 700, fontSize: '1.2rem', letterSpacing: '0.05em', color: '#fff', margin: 0, textTransform: 'uppercase' } }, videos[0].title)
      ),
      React.createElement(CTA, { text: 'See all videos', onClick: () => onNavigate('video') }),
    ),

    // About card
    React.createElement('section', { style: { border: '1px solid #fff', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 } },
      React.createElement('p', { style: { fontWeight: 700, fontSize: '1.875rem', letterSpacing: '0.1em', color: '#fff', margin: 0, textTransform: 'uppercase' } }, 'ABOUT'),
      React.createElement('p', {
        style: {
          fontSize: '1rem', fontWeight: 500, letterSpacing: '0.025em', lineHeight: 1.375, margin: 0,
          backgroundImage: 'linear-gradient(180deg, #f6f6f6 0%, rgba(246,246,246,0) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }
      }, bioQuote),
      React.createElement(CTA, { text: 'See full bio', onClick: () => onNavigate('about') }),
    ),

    // Socials
    React.createElement('section', { style: { display: 'flex', flexDirection: 'column', gap: 24 } },
      React.createElement('div', { style: { borderTop: '1px solid #fff', paddingTop: 24, paddingBottom: 16, paddingLeft: 12 } },
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '12px 32px' } },
          socials.map(s => React.createElement('span', {
            key: s,
            style: { fontWeight: 700, fontSize: '1.125rem', letterSpacing: '0.1em', color: hovered === s ? 'rgba(255,255,255,0.7)' : '#fff', cursor: 'pointer', transition: 'color 0.2s' },
            onMouseEnter: () => setHovered(s),
            onMouseLeave: () => setHovered(null),
          }, s))
        )
      ),
      // ADE reflection footer
      React.createElement('div', { style: { position: 'relative', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' } },
        React.createElement('p', {
          style: { fontWeight: 700, fontSize: 'clamp(6rem,28vw,10rem)', lineHeight: 1, letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.08)', margin: 0, transform: 'scaleY(-1)', userSelect: 'none', position: 'absolute' }
        }, 'ADE'),
        React.createElement('p', {
          style: { fontWeight: 700, fontSize: 'clamp(6rem,28vw,10rem)', lineHeight: 1, letterSpacing: '-0.05em', color: '#fff', margin: 0, userSelect: 'none', position: 'absolute' }
        }, 'ADE'),
      ),
      React.createElement('div', { style: { textAlign: 'center', paddingBottom: 24 } },
        React.createElement('p', { style: { fontSize: '0.75rem', letterSpacing: '0.1em', color: '#fff', margin: 0 } }, 'cc. Adeola Ikuesan 2026')
      ),
    )
  );
};
