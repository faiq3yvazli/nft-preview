import type { Location } from 'react-router-dom';

export type WithBackgroundState<State = {}> = (State & { background?: Location }) | undefined;
