# EzhilPP

Clean and minimal personal blog and portfolio theme for Hugo. Forked from [Ezhil](https://github.com/vividvilla/ezhil).

## Demo

[View demo](https://ezhil-hugo.netlify.com/)

![Screenshot](images/screenshot-light.png "Ezhil light theme")
![Screenshot](images/screenshot-dark.png "Ezhil dark theme")

## Features

* Clean and minimal
* Dark mode (auto-detect from OS + manual toggle with persistence)
* Responsive
* Supports tags (with bordered pills and post count)
* Social media links
* Google Analytics integration
* Syntax highlighting
* Twitter cards and opengraph tags support
* Disqus and Giscus comments
* Hugo RSS feeds
* Custom CSS/JS
* Social media sharing buttons
* Default `og:image` and `twitter:image` values
* MermaidJS diagram support with pan-and-zoom
* **Logs section** - separate content type for short-form posts (TIL, notes, etc.)
* **Reading time** display on posts and logs
* **Last updated date** shown when content has been modified
* **Sticky header** with bottom border
* **Sticky heading breadcrumb trail** on post/log pages (tracks h2/h3 hierarchy)
* **Sticky footer** pushed to viewport bottom on short pages

## Installation

From your Hugo site run the following.

```sh
cd themes
git clone https://github.com/GLaDOS-418/ezhilpp.git
```

For more information read the [official setup guide](https://gohugo.io/overview/installing/) of Hugo.

## Configuration

```toml
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My personal blog"
theme = "ezhil"

copyright = "© Copyright notice"

# Enable syntax highlighting.
pygmentsstyle = "solarized-dark"
pygmentscodefences = true
pygmentscodefencesguesssyntax = true

# Your Google analytics code.
googleAnalytics = "UA-123-45"
# Your Disqus shortname.
disqusShortname = "localhost"

# Number of posts to show in recent posts list (Optional). Defaults to 10.
paginate = 10

# Number of characters to show in summary.
summaryLength = 20

[params]
    # Blog subtitle which appears below blog title. Supports markdown.
    subtitle = "Clean and minimal personal [blog theme for Hugo](https://github.com/GLaDOS-418/ezhilpp.git)"

    # Content types which are included in home page recent posts list.
    mainSections = ["posts"]

    # Number of recent logs to show on the homepage (Optional). Defaults to 5.
    # logsOnHomepage = 5

    # Content types which are excludes Disqus comments.
    disableCommentsTypes = ["page"]
    commentsApp = "giscus"

    # If social media links are enabled then enable this to fetch icons from CDN instead of hosted on your site.
    featherIconsCDN = true

    # Specify favicon (icons/i.png maps to static/icons/i.png). No favicon if not defined.
    favicon = "icons/myicon.png"

    # Switch to dark mode or auto detect mode from OS (Optional).
    # "auto" will follow OS preference, user can toggle manually (persisted in localStorage).
    # "dark" will force dark mode.
    mode = "auto" # "dark" or "auto"

    # Custom CSS added to default styles. Files added to `static` folder is copied as it is to
    # root by Hugo. For example if you have custom CSS file under `static/css/custom.css` then
    # you can specify custom css path as `css/custom.css`.
    customCSS = "css/custom.css"
    # Custom CSS added to dark mode style.
    customDarkCSS = "css/custom-dark.css"

    # Custom list of Javascript files to load. Just like custom CSS you can place js files under
    # `static/js` folder and specify path here as `js/script-name.js`. You can also specify full url,
    # for example you may want to include external JS library.
    customJS = ["js/abc.js", "js/xyz.js", "https://code.jquery.com/jquery-3.4.1.js"]

    # default value for og:image and twitter:image attributes of meta tags
    featureImage = "/images/feature.jpg"
    
# Main menu which appears below site header.
[[menu.main]]
name = "Home"
url = "/"
weight = 1

[[menu.main]]
name = "All posts"
url = "/posts"
weight = 2

[[menu.main]]
name = "Logs"
url = "/logs"
weight = 3

[[menu.main]]
name = "About"
url = "/about"
weight = 4

[[menu.main]]
name = "Tags"
url = "/tags"
weight = 5

# Social media links which shows up on site header.
# Uses feather icons for icons. You can [search icon names from here](https://feathericons.com/).
[[params.social]]
name = "Github"
icon = "github"
url = "https://github.com/GLaDOS-418/ezhilpp.git"

[[params.social]]
name = "Twitter"
icon = "twitter"
url = "https://twitter.com/gohugoio"

# Enable tags.
[taxonomies]
   tag = "tags"

# giscus config. visit https://giscus.app/ for more details 
# fill the configuration form and use values below
[giscus]
  repo="user/repo"
  repoId="repoid"
  category="Announcements"
  categoryId="DIC_kwDOCjJtEM4CXPX4"
  mapping="pathname"
  strict="1"
  reactionsInabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme="light_high_contrast"
  customTheme="giscus.css"
  lang="en"
  loading="lazy"
  crossorigin="anonymous"
```

## Content type

You can specify content type with field `type` in your content. For example static pages can be set as type `page` which are excluded from recent posts and all posts page. You can use site params `mainSections` and `disableCommentsTypes` to control which page types are excluded from recent posts and Disqus comments respectively.

```md
---
title: "About"
date: 2019-04-19T21:37:58+05:30
type: "page"
---

This is some static page where you can write about yourself.
```

## Disable Comments

You can disable Disqus site wide if you don't set `DisqusShortname` param in config.

You can also disable comments (disqus/giscus) from contents selectively or for all contents with certain content type. Use content field `comments` to disable comments from certain contents.

```md
---
title: "Content without comments"
date: 2019-04-19T21:37:58+05:30
comments: false
---

This is a content without comments.
```

You can also disable comments for certain content types by using site param `disableCommentsTypes`. You can check config section above for example.

## Social Media Sharing Buttons

See [hugo-share-buttons](https://github.com/Stals/hugo-share-buttons) for more information.

## Default `og:image` and `twitter:image`

If no `ogImage` or `twitterImage` tag is defined in the front-matter, the values fallback to the `featureImage` param from the site config.

See [this article](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/) for more information on `og:image`.

## Sample front-matter of a page
``` md
---
title: "page title"
description: "page description which also shows up as a short not on index page"
date: 2021-04-19T17:18:54+05:30
tags: [tag-1,tag-2]
ogImage: '/path/to/image/for/og_graph_image.jpg'
twitterImage: '/path/to/image/for/twitter_image.jpg'
draft: false
socialshare: true
---
```

## Shortcodes

- use `{{< toc >}}` anywhere in the markdown to render table of contents like:
```
# Outline
- header 1
    - inner header 1
- header 2
```

## SVG diagrams using MermaidJS
draw SVG diagrams using [MermaidJS]( https://mermaid.js.org/). Theme used is *'forest'*.
You can draw as many diagram as possible.

Pan-and-Zoom of these diagrams is enabled via [bumbu/svg-pan-zoom]( https://github.com/bumbu/svg-pan-zoom ),
since these features are neither supported by Hugo nor by MermaidJS ([#1860](https://github.com/mermaid-js/mermaid/issues/1860)).

Above two scripts are loaded only when there's at least one `mermaid` diagram.

Here's a sample diagram:

```
mermaid
---
title: Simple sample
---
stateDiagram-v2
    [*] --> Still
```

Here's how the above will look:

![mermaidjs-stateDiagram-screenshot](images/screenshot-mermaidjs-stateDiagram.png "sample mermaidjs statediagram")

## NOTE
- `<base>` tag is removed to fix the jump anchor links. See this issue: [#urls doesn't work with base href - Issue #811](https://github.com/gohugoio/hugo/issues/811)
- Removing `<base>` breaks the image links so a `render-image` hook is added to canonicalise the image link and fix the above issue.
- A `render-link` hook is **not** required since Hugo resolves internal links correctly via `.RelPermalink`. Only raw relative `.md` links (e.g. Obsidian-style `[text](other-post.md)`) would break, and those should be avoided in Hugo content.

## Logs Section

The theme supports a separate "Logs" content type for short-form posts (TIL, notes, snippets, etc.). Logs have their own list/single templates and appear in a dedicated "Recent logs" section on the homepage.

### Setup

1. Create `content/logs/` in your site
2. Add a menu entry in your site config:
```toml
[[menu.main]]
name = "Logs"
url = "/logs"
weight = 3
```
3. Create log entries using the archetype:
```sh
hugo new logs/my-first-log.md
```

### Front-matter

```md
---
title: "Something I learned today"
date: 2024-01-01
description: "A short description shown on the list page"
tags:
  - cpp
draft: false
socialshare: true
---
```

The homepage shows the latest 5 logs by default. Configure via `logsOnHomepage` param:
```toml
[params]
    logsOnHomepage = 10
```

Hugo auto-generates a separate RSS feed at `/logs/index.xml`. Tags are shared across posts and logs.

## Dark Mode Toggle

When `mode = "auto"`, the theme follows the OS color scheme preference on first visit. A toggle button (moon/sun icon) appears in the navigation bar, allowing users to manually switch between dark and light mode. The preference is persisted in `localStorage`.

The toggle cycles between dark and light. To reset to system default, clear `localStorage` or use browser devtools.

## Heading Breadcrumb Trail

On single post and log pages, a sticky breadcrumb trail appears below the header as you scroll. It tracks the current `h2`/`h3` heading hierarchy, showing the trail like:

```
Section > Subsection
```

Each breadcrumb item is clickable to jump to that heading. The trail disappears when scrolled back to the top.

## Credits

* [Ezhil](https://github.com/vividvilla/ezhil) - the original theme by Vivek R
* [Feather Icons](https://feathericons.com/) - for icons
* [Zen habits](https://zenhabits.net/) - for demo content
* [Giscus](https://giscus.app/) - for comments
* [MermaidJS](https://mermaid.js.org/) - for diagrams
* [hugo-share-buttons](https://github.com/Stals/hugo-share-buttons) - for social media share buttons
* [svg-pan-zoom](https://github.com/bumbu/svg-pan-zoom) - for pan-and-zoom of MermaidJS diagrams
