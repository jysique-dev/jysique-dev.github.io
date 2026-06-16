/* ════════════════════════════════════════════
   DATOS — edita solo esta sección
   ════════════════════════════════════════════ */

class Project {
  constructor({ num, name, desc, tags = [], url = null }) {
    this.num  = num;
    this.name = name;
    this.desc = desc;
    this.tags = tags;
    this.url  = url;
  }

  render() {
    const wrapper = this.url ? `<a href="${this.url}" target="_blank" rel="noopener" class="project-card reveal">` : `<div class="project-card reveal">`;
    const close   = this.url ? `</a>` : `</div>`;
    return `
      ${wrapper}
        <span class="project-num">${String(this.num).padStart(2, '0')}</span>
        <h3 class="project-name">${this.name}</h3>
        <p class="project-desc">${this.desc}</p>
        <div class="project-tags">
          ${this.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      ${close}`;
  }
}

class SkillGroup {
  constructor({ title, skills = [] }) {
    this.title  = title;
    this.skills = skills;
  }

  render() {
    return `
      <div class="reveal">
        <p class="skill-group-title">${this.title}</p>
        <ul class="skill-list">
          ${this.skills.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>`;
  }
}

class ContactLink {
  constructor({ icon, label, url }) {
    this.icon  = icon;
    this.label = label;
    this.url   = url;
  }
 
  render() {
    const external = !this.url.startsWith('mailto:');
    return `
      <a href="${this.url}" class="contact-link"
        ${external ? 'target="_blank" rel="noopener"' : ''}>
        <span class="icon">${this.icon}</span>
        <span>${this.label}</span>
      </a>`;
  }
}

/* ── Tus contactos ── */
const contacts = [
  new ContactLink({ icon: '✉', label: 'Email',     url: 'joseysique@gmail.com' }),
  new ContactLink({ icon: '⌥', label: 'GitHub',    url: 'https://github.com/jysique-dev' }),
  new ContactLink({ icon: '▣', label: 'LinkedIn',  url: 'https://www.linkedin.com/in/jose-ysique-neciosup-49525218a/' }),
  new ContactLink({ icon: '◈', label: 'Instagram', url: 'https://www.instagram.com/mad__forg/' }),
  new ContactLink({ icon: '✕', label: 'Twitter',   url: 'https://x.com/mad__forg' }),
];

/* ── Tus proyectos ── */
const projects = [
  /*
  new Project({
    num:  1,
    name: 'Nombre del Proyecto',
    desc: 'Descripción breve del proyecto. Qué resuelve, cómo está construido, qué lo hace especial.',
    tags: ['React', 'Node', 'Postgres'],
    url:  'https://github.com/tuusuario/proyecto-1',
  }),
  new Project({
    num:  2,
    name: 'Nombre del Proyecto',
    desc: 'Descripción breve del proyecto. Qué resuelve, cómo está construido, qué lo hace especial.',
    tags: ['Python', 'FastAPI', 'Redis'],
    url:  'https://github.com/tuusuario/proyecto-2',
  }),
  new Project({
    num:  3,
    name: 'Nombre del Proyecto',
    desc: 'Descripción breve del proyecto. Qué resuelve, cómo está construido, qué lo hace especial.',
    tags: ['TypeScript', 'Next.js'],
    url:  null,
  }),
  */
];

/* ── Tus habilidades ── */
const skillGroups = [
  new SkillGroup({
    title:  'Programming Languages',
    skills: ['C#', 'C++', 'Python', 'R', 'Js','PHP'],
  }),
  new SkillGroup({
    title:  'Sofware',
    skills: ['Unity3D' ,'Unreal', 'Visual Studio Code' , 'Visual Studio 2022', 'Office' , 'Latex' , 'SpringTools' , 'PostgreSQL', 'Microsoft SQL Server' , 'R Studio', 'Anaconda'],
  }),
  new SkillGroup({
    title:  'DevOps',
    skills: ['Git / GitHub', 'Docker'],
  }),
  new SkillGroup({
    title:  'Tools',
    skills: ['Phaser',  'Core', 'Notion' , 'Plastic', 'Maya 3D' ,'Photoshop' , 'Illustrator' , 'Trello'],
  }),
  new SkillGroup({
    title:  'Another',
    skills: ['IA', 'Testing', 'Agile / Scrum', 'Webs devs'],
  }),
];

/* ════════════════════════════════════════════
   RENDER
   ════════════════════════════════════════════ */

function mount() {
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map(p => p.render()).join('');
  }

  const skillsBlock = document.querySelector('.skills-block');
  if (skillsBlock) {
    skillsBlock.innerHTML = skillGroups.map(g => g.render()).join('');
  }

  const contactGrid = document.querySelector('.contact-grid');
  if (contactGrid) {
    contactGrid.innerHTML = contacts.map(c => c.render()).join('');
  }

  /* ── Año dinámico ── */
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) {
    eyebrow.textContent = `// Año Moche I — 700 d.C. ↔ ${new Date().getFullYear()}`;
  }

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Nav activo ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => navObserver.observe(s));
}

document.addEventListener('DOMContentLoaded', mount);