# IEP Expert Photos provocation

This is a camera app that provides realtime visual feedback for head and face positioning. It uses the [Human library](https://github.com/vladmandic/human) for capturing head rotation and hand movement.

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

## About Nextjs

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
