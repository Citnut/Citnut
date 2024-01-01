import { createServer } from "http"
import { parse } from "url"
import { writeFileSync } from "fs"

const sv = createServer((rq, rs) => {
  rs.writeHead(200, { "Content-Type": "text/html" })
  const html = add => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Citnut</title>
          <style>
            body {
              margin: 0;
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }

            root {
              flex: 1;
              padding: 20px
            }

            footer {
              text-align: center;
            }
          </style>
        </head>
        <body>
            <root>
              <h1>thay đổi appstate</h1>
              ${add}
            </root>
        </body>
        <footer>
          <img src = "https://i.imgur.com/9eI0OzI.png" alt = "ft">
        </footer>
      </html>
    `
  let th = "/?appstate="
  if (rq.url.startsWith(th)) {
    try {
      writeFileSync("appstate.json", decodeURIComponent(parse(rq.url).path.slice(th.length)).split("+").join(""))
      rs.end(html(`<h1>done!</h1>`))
    } catch { console.log }
    return process.exit(0)
  }
  rs.end(html(`<form>
  <label for = "appstate">paste here:</label>
  <input type = "text" id = "appstate" name = "appstate">
  </form>`))

})
const port = process.env.port || 8080
sv.listen(port, () => {
  console.log(`server is running at localhost:${port}`)
})