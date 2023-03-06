# Props

- `apiKey?: string | undefined`
- `sessionToken?: string | undefined`
- `control?: [Object]`
- `style?: [Object]`
- `convoStarter?: string`
- `avatarImageUrl?: string`

## apiKey? string

*Adding the API KEY on the frontend is NOT recommended*

Use either `apiKey` or `sessionToken` - for production, use sessionToken

```javascript
  <FireChat apiKey="<YOUR API KEY>" />
```

## sessionToken? string

Use either `apiKey` or `sessionToken` - for production, use sessionToken

Use your **API KEY** in the backend to generate a sessionToken to be used on the frontend.

```javascript
  // EXAMPLE FRONTEND: app/chat.tsx
  const [ sessionToken, setSessionToken ] = useState()

  useEffect(() => {
    /* call custom API to fetch the session token from the backend 
        don't expose the API KEY on the frontend */
    
  }, [])

  <FireChat sesstionToken={sessionToken} />
```

```javascript
  // EXAMPLE BACKEND: pages/api/firechat.ts
  import type { NextApiRequest, NextApiResponse } from 'next'

  export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    return { sessionToken }
  }

  <FireChat sesstionToken={sessionToken} control={{open, setOpen}} />
```

## control? [Object]

Use this prop to control the open/close state of the chat. <br />
Adding this prop will also *hide* the FAB I've included for your, for your convenience!

- `open: boolean`
- `setOpen: (b: boolean) => void`

```javascript
  const [ open, setOpen ] = useState(false)

  <button onClick={() => { setOpen(!open) }}>click me!</button>
  <FireChat sesstionToken={sessionToken} control={{open, setOpen}} />
```

## style?: [Object]


Prop is used to change the color scheme of the chat. <br />
Please check out our [styles page](/docs/styles) for more details!

## convoStarter?: string

Optional: Set a Conversation starter when your user opens the chat.

```javascript
  <FireChat sesstionToken={sessionToken}
    convoStarter={"Welcome to 🔥 Chat! This is a testing implementation, please do NOT enter any personal (sensitive) info or profane text. You can add yourself to our discord server and view it at work!"}
  />
```

## avatarImageUrl?: string

Optional: customize your chat with an icon to represent your application / website

```javascript
  <FireChat sesstionToken={sessionToken}
    avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4" 
  />
```