---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<ul>
  {% for post in site.posts %}
    <li>
            <div>
              <a  href="{{ post.url }}" >
                {{ post.title }}
              </a>
            </div>
            <div >{{ post.excerpt | strip_html | truncatewords:50 }}</div>
           <div>{{ post.date | date: "%d %B %Y" }}</div>
           
           <br/><br/>
    </li>
  {% endfor %}
</ul>