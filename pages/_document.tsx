import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:image" content="https://blog.azerpas.com/assets/blog/first-post/cover.jpg"/>
          <meta property="og:image:type" content="image/png"/>
          <meta property="og:image:width" content="1024"/>
          <meta property="og:image:height" content="1024"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
