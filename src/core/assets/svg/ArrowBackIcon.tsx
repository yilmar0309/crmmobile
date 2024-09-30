import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {colorsLight} from '@/core/theme';

interface Props extends SvgProps {
  color?: string;
}

export const ArrowBackIcon = ({
  color = colorsLight.CONTENT_SECONDARY,
  ...props
}: Props) => (
  <Svg
    width={props.width ?? 20}
    height={props.height ?? 20}
    fill="none"
    {...props}
    viewBox="0 0 24 24">
    <Path
      fill={color}
      d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12q0-.2.063-.375T8.7 11.3l4.6-4.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7z"
    />
  </Svg>
);
