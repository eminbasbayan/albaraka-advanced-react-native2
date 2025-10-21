import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  fullWitdh?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWitdh = false,
}) => {
  const primaryColor = '#2f95dc';
  const secondaryColor = '#6b7280';

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: primaryColor, borderWidth: 0 };
      case 'secondary':
        return { backgroundColor: secondaryColor, borderWidth: 0 };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: primaryColor,
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return primaryColor;
    }

    return '#ffffff';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        fullWitdh && styles.fullWitdh,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size={'small'} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  fullWitdh: {
    width: '100%',
  },
});

export default Button;
