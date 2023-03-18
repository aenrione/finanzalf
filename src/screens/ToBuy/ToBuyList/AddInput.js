import React, { useState } from 'react';
import styled from 'styled-components/native';
import Button from '@/CustomButton';

const ComponentContainer = styled.View`
  flex-direction: column;
  color: '#333';
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
`;

const Input = styled.TextInput`
  font-size: 20px;
  background-color: white;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export default function AddInput({ submitHandler }) {
  const [value, setValue] = useState('');
  const [price, setPrice] = useState('');

  const submit = function () {
    submitHandler({ title: value, price_amount: price });
    setValue('');
    setPrice('');
  };
  return (
    <ComponentContainer>
      <InputContainer>
        <Input
          placeholder="Item name"
          placeholderTextColor="#333"
          onChangeText={setValue}
          value={value}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="$ Price"
          placeholderTextColor="#333"
          onChangeText={setPrice}
          value={price}
        />
      </InputContainer>
      <Button text="Submit" onPress={submit} />
    </ComponentContainer>
  );
}
