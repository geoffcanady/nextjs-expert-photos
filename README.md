![Node.js version](https://img.shields.io/badge/node-18.17.0-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14.1.1-black?style=flat&logo=next.js) ![React](https://img.shields.io/badge/React-18.0.0-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-007ACC?style=flat&logo=typescript&logoColor=white)

# IEP Expert Photos provocation

This is a camera app that provides realtime visual feedback for head and face positioning. It uses the [Human library](https://github.com/vladmandic/human) for capturing head rotation and hand movement and [Imgly](https://www.npmjs.com/package/@imgly/background-removal) for background removal

It's an attempt to explore how AI might help\
a) reduce rejected submissions.\
b) reduce manual editing often required of Expert submissions.\
c) provide a smoother onboarding experience.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App structure

```
├── out (static build)
├── src
│ ├── app
│ │ ├── components
│ │ ├── fonts
│ │ ├── lib
│ │ │ ├── config
│ │ │ ├── constants
│ │ │ ├── context
│ │ │ ├── hooks
│ │ │ ├── models
│ │ │ ├── types
│ │ │ ├── utils
│ │ ├── styles
│ │ ├── page.tsx (app root)
├── public (images)
```

### Component structure

```
<Home> // page.tsx
    <StyledAppContainer>
        <Header>
        <CameraProvider>
            <HumanProvider>
                <StepOne>
                {...otherSteps}
                <Camera>
            <Actions />
```

### Misc. Notes

- The Human library is loaded in the [human-context](https://github.intuit.com/gcanady/next-expert-photos/blob/master/src/app/lib/context/human-context.tsx).
- Hook for the detection logic is located in [useDetectAndDraw.js](https://github.intuit.com/gcanady/next-expert-photos/blob/master/src/app/lib/hooks/useDetectAndDraw.ts).
- The feedback logic for head rotation and centering is located in the [useGestureFeedback hook](https://github.intuit.com/gcanady/next-expert-photos/blob/master/src/app/lib/hooks/useGestureFeedback.ts), and the UI output is [CameraStep1](https://github.intuit.com/gcanady/next-expert-photos/blob/master/src/app/components/CameraSteps/CameraStep1.tsx#L133).
- Tracking models can be enabled/disabled in the [config file](https://github.intuit.com/gcanady/next-expert-photos/blob/master/src/app/lib/config/humanConfig.ts).
- To use the Imgly background removal module you'll most likely need to add these headers:

```
'Cross-Origin-Opener-Policy': 'same-origin',
'Cross-Origin-Embedder-Policy': 'require-corp'
```

## About Nextjs

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
