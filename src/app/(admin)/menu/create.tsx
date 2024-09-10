import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import React, { useState } from 'react';
import { View, Text , StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@assets/data/products';


const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const {id} = useLocalSearchParams()
    const isUpdating = !!id;

    // if(isUpdating){
    //   const product = products.find((item) => item.id.toString() === id)
    //   if(!product){
    //     return;
    //   }

    //   setName(product?.name)
    //   setPrice(product?.price.toString())
    //   setImage(product?.image)
    // }

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        setError('');

        if(!name){
            setError('Name is required')
            return false;
        }

        if(!price){
            setError('Price is required')
            return false;
        }

        if(isNaN(parseFloat(price))){
            setError('Price is not a number')
            return false;
        }

        return true;
    }

    const onCreate = () => {
        if(!validateInput()){
            return;
        }
        

        resetFields();
    }

    const onUpdate = () => {
      if(!validateInput()){
          return;
      }
      

      resetFields();
    }

    const onSubmit = () => {
      if(isUpdating){
        onUpdate()
      }else{
        onCreate()
      }
    }

    const onDelete = () => {
      
    }

    const confirmDelete = () => {
      Alert.alert("Confirm", 'Are you sure you want to delete this product', [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        }
      ])
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

  return (
    <View style = {styles.container}>
      <Stack.Screen options={{title: isUpdating ? "Update Product" : "Create Product"}} />

        <Image style = {styles.image} source = {{uri: image || defaultPizzaImage}} />

        <Text onPress={pickImage} style = {styles.textButton}>Select Image</Text>

      <Text style = {styles.label}>Name</Text>
      <TextInput value={name} onChangeText = {setName} placeholder='Name' style={styles.input} />

      <Text style = {styles.label}>Price ($)</Text>
      <TextInput value={price} onChangeText = {setPrice} placeholder='9.99' style={styles.input} keyboardType='numeric' />

      <Text style = {{color: 'red'}}>{error}</Text>
      <Button onPress = {onSubmit} text={isUpdating ? 'Update' : 'Create'} />

      {isUpdating && <Text onPress={confirmDelete} style = {styles.textButton} >Delete</Text>}

    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
      },
      image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
      },
      textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
      },
    
      input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
      },
      label: {
        color: 'gray',
        fontSize: 16,
      },
})


export default CreateProductScreen;