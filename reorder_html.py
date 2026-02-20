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
about = extract_section('about')
education = extract_section('education')
competencies = extract_section('competencies')
experience = extract_section('experience')
projects = extract_section('projects')
mindset = extract_section('mindset')
contact = extract_section('contact')

def update_tag(section, num, title):
    return re.sub(r'<span class="section-tag mono-font">.*?</span>', f'<span class="section-tag mono-font">{num} // {title}</span>', section)

about = update_tag(about, '02', 'PROFILE')
education = update_tag(education, '03', 'CREDENTIALS')
competencies = update_tag(competencies, '04', 'CAPABILITIES')
experience = update_tag(experience, '05', 'EXPERIENCE')
projects = update_tag(projects, '06', 'IMPLEMENTATION')
mindset = update_tag(mindset, '07', 'PHILOSOPHY')
contact = update_tag(contact, '08', 'CONNECT')

new_nav = """      <ul class="nav-links">
        <li><a href="#hero" class="nav-link active"><span class="nav-num">01.</span> Home</a></li>
        <li><a href="#about" class="nav-link"><span class="nav-num">02.</span> About</a></li>
        <li><a href="#education" class="nav-link"><span class="nav-num">03.</span> Education</a></li>
        <li><a href="#competencies" class="nav-link"><span class="nav-num">04.</span> Skills</a></li>
        <li><a href="#experience" class="nav-link"><span class="nav-num">05.</span> Experience</a></li>
        <li><a href="#projects" class="nav-link"><span class="nav-num">06.</span> Projects</a></li>
        <li><a href="#mindset" class="nav-link"><span class="nav-num">07.</span> Mindset</a></li>
        <li><a href="#contact" class="nav-link"><span class="nav-num">08.</span> Contact</a></li>
      </ul>"""

html = re.sub(r'<ul class="nav-links">.*?</ul>', new_nav, html, flags=re.DOTALL)

main_start = html.find('<main>') + len('<main>')
main_end = html.find('<footer class="footer">')

new_main_content = f"\n{hero}\n\n{about}\n\n{education}\n\n{competencies}\n\n{experience}\n\n{projects}\n\n{mindset}\n\n{contact}\n\n      "

new_html = html[:main_start] + new_main_content + html[main_end:]

with open('index.html', 'w') as f:
    f.write(new_html)

print("HTML reordered successfully!")
