import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import products from '@assets/data/products';
import ProductListItem from '@/components/ProductListItem';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';
 

export default function TabOneScreen() {
  return (
    <View>
      <FlatList data={products} renderItem={({item}) => <ProductListItem product = {item} />}
      numColumns={2}
      contentContainerStyle = {{gap: 10, padding: 10}}
      columnWrapperStyle= {{gap:10}}
      />
    </View>
  );
}