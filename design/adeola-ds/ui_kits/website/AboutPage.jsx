// ── About Page ──
window.AboutPage = function() {
  const bio = [
    "Adeola Ikuesan is a London-based singer-songwriter whose music exists in the quiet space between emotion and sound. Her voice — warm, textured, unflinching — has drawn comparisons to the great soul storytellers while remaining utterly her own.",
    "Growing up between Nigeria and the UK, Adeola's work reflects a rich cultural duality: the warmth of Lagos summers bleeding into cold London nights. Her debut EP is a collection of intimate confessions — love letters written and unsent, conversations that never happened.",
    "When she's not recording, Adeola performs at intimate venues across London and internationally, building a reputation for shows that leave rooms hushed and hearts full.",
  ];

  return React.createElement('div', { style: { paddingTop: 64 } },
    React.createElement('h1', { style: { fontFamily: 'Helvetica,Arial,sans-serif', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.025em', color: '#fff', fontSize: 'clamp(2.33rem,8vw,3.95rem)', margin: '0 0 48px' } }, 'About'),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' } },
      // Image placeholder
      React.createElement('img', {
        src: '../../assets/profile-photo.jpg',
        style: { aspectRatio: '3/4', objectFit: 'cover', width: '100%' },
        alt: 'Adeola',
      }),
      // Bio text
      React.createElement('div', null,
        React.createElement('p', { style: { fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 24 } }, 'ADEOLA IKUESAN'),
        bio.map((p, i) => React.createElement('p', {
          key: i, style: { color: 'rgba(255,255,255,0.7)', lineHeight: 1.625, marginBottom: 16, fontSize: '0.95rem' }
        }, p))
      )
    )
  );
};
