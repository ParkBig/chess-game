import { Global, css } from '@emotion/react';
import normalize from 'emotion-normalize';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          body {
            margin: 0;
            font-family: 'Shantell Sans', cursive;

            --color-grey-50: hsl(265, 55%, 96%);
            --color-grey-100: hsl(265, 19%, 88%);
            --color-grey-200: hsl(265, 7%, 70%);
            --color-grey-300: hsl(265, 6%, 66%);
            --color-grey-400: hsl(265, 4%, 57%);
            --color-grey-500: hsl(265, 3%, 53%);
            --color-grey-600: hsl(265, 4%, 42%);
            --color-grey-700: hsl(265, 4%, 31%);
            --color-grey-800: hsl(276, 5%, 20%);
            --color-grey-900: hsl(280, 5%, 13%);

            --color-primary-50: #c8b3ce;
            --color-primary-100: #a07aaa;
            --color-primary-200: #884c97;
            --color-primary-300: #843897;
            --color-primary-400: #732392;
            --color-primary-500: #5a097a;
            --color-primary-600: #480264;
            --color-primary-700: #3d0264;

            --color-green-100: #fff8de;
            --color-green-300: #84a7a1;
            --color-green-500: #99a98f;

            --color-success-100: #a2f0bc;
            --color-success-500: #12bd4b;

            --color-error-100: #f1acc9;
            --color-error-500: #a10c4a;

            --color-white-100: #eee2de;

            --size-1: 0.25rem;
            --size-2: 0.5rem;
            --size-3: 0.75rem;
            --size-4: 1rem;
            --size-5: 1.25rem;
            --size-6: 1.5rem;
            --size-7: 1.7rem;
            --size-8: 2rem;
            --size-9: 2.5rem;
            --size-10: 3rem;
            --size-14: 3.5rem;
            --size-16: 4rem;
            --size-20: 5rem;
            --size-40: 10rem;
            --size-41: 15rem;
          }
          * {
            box-sizing: border-box;
          }
        `}
      />
      {children}
    </>
  );
}
