import re

with open('index.html', 'r') as f:
    text = f.read()

# Remove glow-card class
text = text.replace(' glow-card', '')

# Remove iso-server blocks
iso_pattern = r'\s*<div class="iso-server">\s*<div class="iso-face iso-top"></div>\s*<div class="iso-face iso-left"></div>\s*<div class="iso-face iso-right"></div>\s*</div>'
text = re.sub(iso_pattern, '', text)

with open('index.html', 'w') as f:
    f.write(text)

print("HTML cleaned successfully!")
