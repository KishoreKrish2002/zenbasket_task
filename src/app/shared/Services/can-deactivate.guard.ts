import { CanDeactivateFn } from '@angular/router';

export const canDeactivateGuard: CanDeactivateFn<unknown> = (component: any, currentRoute, currentState, nextState) => {
  console.log("can deactivete: ", component.onDeactivate());
  if (!component.onDeactivate())
    return false;
  else
    return true;
};
