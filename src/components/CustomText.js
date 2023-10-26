import React from 'react';
import { Text } from 'react-native';

const CustomText = ({
  children,
  color,
  weight,
  size,
  underline,
  align,
  style,
  ...rest
}) => {
  const textStyle = [
    color && `text-${color}`,
    weight && `font-${weight}`,
    size && `text-${size}`,
    underline && 'underline',
    align && `text-${align}`,
  ]

  return (
    <Text className={`${color && `text-${color}`},
    ${weight && `font-${weight}`},
    ${size && `text-${size}`},
    ${underline && 'underline'},
    ${align && `text-${align}`}`} {...rest}>
      {children}
    </Text>
  );
};

export default CustomText;
