import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EmptyState = ({
  title = 'Sin resultados',
  message = 'No hay informacion para mostrar por ahora.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || <Text style={styles.iconText}>!</Text>}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {!!actionLabel && !!onAction && (
        <TouchableOpacity style={styles.button} onPress={onAction}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 36,
    backgroundColor: '#f3f4f6',
  },
  iconText: {
    color: '#6b7280',
    fontSize: 30,
    fontWeight: '800',
  },
  title: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  message: {
    maxWidth: 300,
    marginTop: 8,
    color: '#6b7280',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default EmptyState;
