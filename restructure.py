import re

with open('index.html', 'r') as f:
    html = f.read()

def extract_section(id_name):
    pattern = rf'(<section id="{id_name}".*?</section>)'
    match = re.search(pattern, html, re.DOTALL)
    if match:
        return match.group(1)
    return ""

hero = extract_section('hero')
competencies = extract_section('competencies')
projects = extract_section('projects')
experience = extract_section('experience')
education = extract_section('education')
contact = extract_section('contact')

# Update Section Tags
def update_tag(section, num, title):
    return re.sub(r'<span class="section-tag mono-font">.*?</span>', f'<span class="section-tag mono-font">{num} // {title}</span>', section)

competencies = update_tag(competencies, '02', 'CAPABILITIES')
projects = update_tag(projects, '03', 'IMPLEMENTATION')
experience = update_tag(experience, '05', 'EXPERIENCE')
education = update_tag(education, '07', 'CREDENTIALS')
contact = update_tag(contact, '08', 'CONNECT')

mindset = """      <!-- Engineering Mindset Section -->
      <section id="mindset" class="section alt-bg">
        <div class="container border-top">
          <div class="section-header reveal">
            <span class="section-tag mono-font">04 // PHILOSOPHY</span>
            <h2 class="section-title">How I Approach <span class="gradient-text">Production Systems</span></h2>
          </div>
          <div class="mindset-grid dual-columns mt-4 reveal delay-1">
            <div class="mindset-intro">
               <p class="about-lead title-font">Engineering reliable systems requires more than tools—it requires discipline.</p>
               <div class="metrics-widget mt-4" style="max-width: 400px;">
                <div class="widget-title mono-font">System Reliability Trend</div>
                <svg class="line-chart" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
                  <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
                  <path d="M0 90 L30 80 L60 85 L90 50 L120 70 L150 40 L180 45 L210 20 L240 30 L270 10 L300 15" fill="none" stroke="var(--accent-secondary)" stroke-width="2" class="anim-line" />
                  <path d="M0 90 L30 80 L60 85 L90 50 L120 70 L150 40 L180 45 L210 20 L240 30 L270 10 L300 15 L300 100 L0 100 Z" fill="url(#chartGrad)" opacity="0.2" />
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="var(--accent-secondary)" />
                      <stop offset="100%" stop-color="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div class="mindset-points">
                <ul class="mindset-list">
                  <li><strong>Automation Over Manual Tasks:</strong> If I do it twice, I script it.</li>
                  <li><strong>Monitoring-First Approach:</strong> Systems must be observable prior to production.</li>
                  <li><strong>Infrastructure as Code:</strong> Immutable and version-controlled infrastructure.</li>
                  <li><strong>Security & Least Privilege:</strong> Secure by design, not as an afterthought.</li>
                  <li><strong>Documentation & SOPs:</strong> Clear runbooks for sustainable operations.</li>
                </ul>
            </div>
          </div>
        </div>
      </section>"""

about = """      <!-- About Section -->
      <section id="about" class="section">
        <div class="container border-top">
          <div class="section-header reveal">
            <span class="section-tag mono-font">06 // PROFILE</span>
            <h2 class="section-title">Career <span class="gradient-text">Journey</span></h2>
          </div>
          <div class="about-grid dual-columns mt-4">
            <div class="profile-container reveal">
              <img src="profile.jpg" alt="Gourav Shaw" class="profile-image">
            </div>
            <div class="about-text reveal delay-1">
              <p class="about-lead title-font" style="margin-bottom: 1.5rem;">From Enterprise Support to <span class="highlight">Cloud Operations</span>.</p>
              <p style="margin-bottom: 1rem; color: var(--text-secondary);">For over 4 years, I operated in enterprise technical support, deeply understanding how systems fail, how users interact with workloads, and the true cost of downtime. This foundation drives my approach to DevOps today.</p>
              <p style="color: var(--text-secondary);">Now, pursuing my MSc in Cloud and Enterprise Computing (Distinction), I focus on preventing those failures. My goal is to build reliable, scalable infrastructure where deployments are automated, infrastructure is codified, and every service is fully observable.</p>
            </div>
          </div>
        </div>
      </section>"""

# Find the <main> tag boundaries
main_start = html.find('<main>') + len('<main>')
main_end = html.find('<footer class="footer">')

new_main_content = f"\n{hero}\n\n{competencies}\n\n{projects}\n\n{mindset}\n\n{experience}\n\n{about}\n\n{education}\n\n{contact}\n\n      "

new_html = html[:main_start] + new_main_content + html[main_end:]

with open('index.html', 'w') as f:
    f.write(new_html)

print("HTML restructured successfully!")
