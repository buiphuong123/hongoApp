// import { createRef } from 'react';

// export const navigationRef = createRef();
// export const isMountedRef = createRef();
// export const routeNameRef = createRef();

// const navigate = (name, params) => {
//   if (isMountedRef.current && navigationRef.current) {
//     return navigationRef.current.navigate(name, params);
//   } else {
//     console.error('!!!!not mounted yet!!!!!!!');
//   }
// };

// const reset = (name, params) => {
//   if (isMountedRef.current && navigationRef.current) {
//     return navigationRef.current.reset({
//       index: 0,
//       routes: [
//         {
//           name,
//           params,
//         },
//       ],
//     });
//   } else {
//     console.error('!!!!not mounted yet!!!!!!!');
//   }
// };

// export default {
//   navigate,
//   reset,
//   routeNameRef,
// };


import * as React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

// import {NavigationActions, StackActions} from '@react-navigation/native';

// let _navigator;

// function setTopLevelNavigator(navigatorRef) {
//     _navigator = navigatorRef;
// }

// function navigate(routeName, params) {
//     _navigator.dispatch(
//         NavigationActions.navigate({
//             routeName,
//             params,
//         })
//     );
// }

// function reset(routeName, params) {
//     const resetAction = StackActions.reset({
//         index: 0, actions: [NavigationActions.navigate({routeName, params})]
//     });
//     _navigator.dispatch(resetAction);
// }

// function pop(n = 1) {
//     const popAction = StackActions.pop({
//         n,
//     });

//     _navigator.dispatch(popAction);
// }

// export default {
//     navigate,
//     pop,
//     reset,
//     setTopLevelNavigator,
// };