# Album art WebComponent

Instead of having to know all different APIs for Artist and Album providers what about a webcomponent that does it for you?

```html
<!-- artist art -->
<album-art artist="the gathering"></album-art>
<!-- album art -->
<album-art artist="the gathering" album="home"></album-art>
```

Is all you need to fetch and display artist art for the awesome band `the gathering`. You can easily provide the width and height for the art by setting them in CSS

```css
album-art {
  width: 200px;
  height: 200px;
}
```

Yes it is that easy.

## Develop

```bash
npm run start
```

for a development build and

```bash
npm run build
```

to build a new distribution build.

## API keys

Add the following to your local `.env` file in order to use last.fm and fanart

```ruby
LASTFM_APIKEY=[your key]
LASTFM_SECRET=[your secret]
FANART_APIKEY=[your key]

### Add a new provider

TODO: the idea is that we, the community, can add new art providers which will be discovered during the build process and all of them will be used till a proper image is found. For now though, surprise me with a pull request
