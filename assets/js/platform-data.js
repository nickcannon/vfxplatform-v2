---
---
// Platform data generated from YAML at build time
const platformData = {
{% for file in site.data.platforms %}
  "{{ file[0] }}": {{ file[1] | jsonify }},
{% endfor %}
};

const componentMeta = {{ site.data.components | jsonify }};
