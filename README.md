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
  - input validation and pre-prosess. see below additional note about input
  - to make this contract page more interactable with user, use `state` `reducer`.
  - for production code, use mature framework such as `next.js` that uses typescript for type checking

demo:
![demo](./demo.gif)


## additional note about input
- input `input.json` has a `p` element above `ul` which warns 
```
app-index.js:32 Warning: validateDOMNesting(...): <ul> cannot appear as a descendant of <p>.
```
this can be further fixed by validtating input json and, in this case, either ignore that tree under `<p>` or change `<ul>` to `<span>` with the help of [Material UI](https://mui.com/material-ui/api/typography/)
```
<Typography component={'span'} variant={'body2'}>
```
- there's another minor point in input
```
{
"type": "p",
"text": " means a day (other than a Saturday, Sunday or public holiday) on which registered banks are open for business in "
},
{
"color": "rgb(250, 208, 0)",
"type": "mention",
"title": "Governing Law Jurisdiction",
"children": [
    {
    "text": "Auckland"
    }
],
"id": "Governing Law Jurisdiction",
"value": "Auckland"
},
```
in the above array, the first node is a paragraph `p`, forcing following text `Auckland` to be in a new line but the expected output says differently. i believe this is a minor mistake.

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