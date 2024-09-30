import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {LeadsStackRoutes} from '@/leads/routes';
import {ProspectStackRoutes} from '@/prospects/routes';

export enum RootStackRoutes {
  TABS_HOME = 'TABS_HOME',
}

export type RootStackParamList = {
  [RootStackRoutes.TABS_HOME]: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  [LeadsStackRoutes.LEADS]: undefined;
  [ProspectStackRoutes.PROSPECTS]: undefined;
};

export type TabsHomeScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
