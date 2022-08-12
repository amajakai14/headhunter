import React, { createContext, useContext } from 'react';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '../server/router/index';

type TQuery = keyof AppRouter['_def']['queries'];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;

// const UserContext = createContext<InferQueryOutput<'users.me'>>(null);

// function UserContextProvider({
//   children,
//   value,
// }: {
//   children: React.ReactNode;
//   value: InferQueryOutput<'users.me'>;
// }) {
//   return (
//     <UserContext.Provider value={value || null}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// const useUserContext = () => useContext(UserContext);

// export { useUserContext, UserContextProvider };
