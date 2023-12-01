next.js based home project

## note
- use react context to figure out clause level. And together with a global map, figure out clause level-index/number. 
- `page.tsx` app entry point. 
- `app.js` app DOM root
- `render.js` render logic
    - `mention`s are managed by `state` and `context` logic so that an user update of value field for one `id` will re-render the contract and propogate updated values to all instances of same id, as required by the assignment.
- `event.js` event handling logic
- `context.js` for `context` 
- `utils.js` helpers for processing input
- further improvement: 
  - input revalidation
  - typescript for type checking

demo:
![demo](./demo.gif)


## run
### from cmd
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
### from vs code
set up `./vscode/launch.json` as following
```
{
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Next.js: debug server-side",
        "type": "node-terminal",
        "request": "launch",
        "command": "npm run dev"
      },
      {
        "name": "Next.js: debug client-side",
        "type": "chrome",
        "request": "launch",
        "url": "http://localhost:3000"
      },
      {
        "name": "Next.js: debug full stack",
        "type": "node-terminal",
        "request": "launch",
        "command": "npm run dev",
        "serverReadyAction": {
          "pattern": "- Local:.+(https?://.+)",
          "uriFormat": "%s",
          "action": "debugWithChrome"
        }
      }
    ]
  }
```
and do `ctrl + f5`