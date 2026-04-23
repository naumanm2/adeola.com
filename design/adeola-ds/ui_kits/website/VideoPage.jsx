// ── Video Page ──
window.VideoPage = function() {
  const videos = [
    { id: 1, title: 'LATEST VISUAL', sub: 'Director Cut · 2026', date: 'January 15, 2026', img: true },
    { id: 2, title: 'LIVE SESSION', sub: 'Studio · 2025', date: 'November 8, 2025', img: false },
    { id: 3, title: 'EP DOCUMENTARY', sub: 'BTS · 2025', date: 'September 3, 2025', img: false },
    { id: 4, title: 'ACOUSTIC SET', sub: 'Home Session · 2024', date: 'May 20, 2024', img: false },
  ];
  const [hovered, setHovered] = React.useState(null);

  return React.createElement('div', { style: { paddingTop: 64 } },
    React.createElement('h1', { style: { fontFamily: 'Helvetica,Arial,sans-serif', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.025em', color: '#fff', fontSize: 'clamp(2.33rem,8vw,3.95rem)', margin: '0 0 48px' } }, 'Video'),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 } },
      videos.map(v => React.createElement('div', {
        key: v.id,
        style: { display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' },
        onMouseEnter: () => setHovered(v.id),
        onMouseLeave: () => setHovered(null),
      },
        React.createElement('div', {
          style: { position: 'relative', aspectRatio: '16/9', overflow: 'hidden', opacity: hovered === v.id ? 0.7 : 1, transition: 'opacity 0.3s', background: '#0a1a6b' }
        },
          v.img && React.createElement('img', {
            src: '../../assets/video-thumbnail.png',
            style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
            alt: v.title,
          }),
          !v.img && React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,206,229,0.06) 0%,rgba(0,47,109,0.6) 100%)' } }),
          React.createElement('div', {
            style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
            React.createElement('div', {
              style: { width: 48, height: 48, borderRadius: '50%', background: hovered === v.id ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }
            }, React.createElement(PlayTriangle, { size: 12, color: 'white' }))
          )
        ),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
          React.createElement('p', { style: { fontWeight: 500, fontSize: '0.95rem', color: hovered === v.id ? 'rgba(255,255,255,0.7)' : '#fff', margin: 0, transition: 'color 0.2s' } }, v.title),
          React.createElement('p', { style: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 } }, v.sub),
          React.createElement('p', { style: { fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0 } }, v.date),
        )
      ))
    )
  );
};
