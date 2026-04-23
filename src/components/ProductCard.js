import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

const ProductCard = ({
  name = 'Producto',
  description,
  price,
  image,
  category,
  onPress,
  onAddToCart,
  buttonLabel = 'Agregar',
}) => {
  const imageSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.imagePlaceholder}>IMG</Text>
        )}
      </View>

      <View style={styles.content}>
        {!!category && (
          <Text style={styles.category} numberOfLines={1}>
            {category}
          </Text>
        )}

        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        {!!description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={styles.price}>{price ?? '$0.00'}</Text>

          {!!onAddToCart && (
            <TouchableOpacity style={styles.button} onPress={onAddToCart}>
              <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  pressed: {
    opacity: 0.85,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '800',
  },
  content: {
    padding: 12,
  },
  category: {
    marginBottom: 4,
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  name: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
  },
  description: {
    marginTop: 6,
    color: '#6b7280',
    fontSize: 13,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 12,
  },
  price: {
    flex: 1,
    color: '#111827',
    fontSize: 16,
    fontWeight: '900',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#16a34a',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default ProductCard;
