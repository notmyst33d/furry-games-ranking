import json
from jinja2 import Template

with open("data.json", "r") as f:
   data = json.loads(f.read())

with open("index.template.html", "r") as f:
   template = Template(f.read())

with open("index.html", "w") as f:
    f.write(template.render(data=data))

