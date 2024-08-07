This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



prisma 

1) prisma folder at root level --> prisma schema. --> make the model --->install the required shit by looking at the docs

2) pages folderr at the root level --> api --> auth --> [..nextauth].ts ---> google providers and shit

3) lisbs ---> prismadb.ts ----> best practice to instatiate prisma client

4)get the url

5)npx prisma db push ...you will get env variavle are loaded from .env



axios async await with router in the sependency array , two entries in data when chekcout..payment successful in stripe ..doesnot get updated with compelte and address when claikced on payment


figured it out..simple...npm run buid ..npm run start ..then do chekout ..check in the db ...only on entry will be there ..then do stripe login in command prompt ..then click payment..easy peasy


-----------------------------

-->nav bar 
firebase set up (dont forget ot pusblish rules)
update prisma schema for products

--> then write the api fpr adding products into the db (note : create an api end point imm after writing the prisma schema)


---> then work on add product form
