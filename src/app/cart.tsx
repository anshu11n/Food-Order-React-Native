import React from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
    const {items, total} = useCart();

  return (
    <View>
      <FlatList data = {items} renderItem={({item}) => <CartListItem cartItem={item} />} 
      contentContainerStyle={{padding: 10, gap: 10}}
      />

      <Text style = {{ marginTop: 20, fontSize: 20, fontWeight: '500', marginLeft: 10}} >Total: ${total}</Text>
      <Button text = "Checkout" />

      {/* <Text>cart items: {items.length}</Text> */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;