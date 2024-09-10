import { defaultPizzaImage } from '@/components/ProductListItem'
import products from '@assets/data/products'
import { PizzaSize, Product } from '@assets/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
import { useState } from 'react'
import Button from '@components/Button'
import { useCart } from '@/providers/CartProvider'
import { useRouter } from 'expo-router'

const sizes: PizzaSize[] = ['S','M','L','XL'];

const ProductDetailsScreen = () => {
    const {id} = useLocalSearchParams()

    const { addItem } = useCart()
    const router = useRouter()

    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M') 

    const product = products.find((item) => item.id.toString() === id)

    if(!product){
        return (
            <Text>Product not found</Text>
        )
    }

    const addToCart = () =>{
        if(!product) return;

        // console.warn("Adding to cart, size: ",selectedSize);

        addItem(product, selectedSize)
        router.push('/cart')
    } 

    return (
        <View style= {styles. container} >
            <Stack.Screen options={{title: product.name}} />
            
            <Image style = {styles.image} source= {{uri: product.image || defaultPizzaImage}} />

            <Text style = {{fontSize: 20}}>Select Size: </Text>
            <View style = {styles.sizes}>

            {
                sizes.map((size) => (
                <Pressable onPress = { () => {
                    setSelectedSize(size)
                    console.log("Selected Size: ",selectedSize);
                } } style = {[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]} key={size}>

                    <Text style = {[styles.sizeText,
                    {
                        color: selectedSize === size ? 'black' : 'gray',
                    }
                    ]}>{size}</Text>

                </Pressable>
                ))
            }
            
            </View>


            <Text style = {styles.price}>${product.price}</Text>
            <Button  onPress={addToCart} text="Add to cart" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
         width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 'auto',
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500'
    },
})

export default ProductDetailsScreen