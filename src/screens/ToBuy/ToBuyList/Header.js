import React from 'react';
import styled from 'styled-components/native';
import Amount from '@/CustomAmountItem';

export default function Header({ list }) {
  return (
    <ComponentContainer>
      <HeaderText>{list.title}</HeaderText>
      <Amount text="User Monthly Remaining" value={list.user_remaining} />
      <Amount text="Remaining to expend" value={list.expense_remaining} />
      <Amount text="Total in list" value={list.total} />
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding-right: 10%;
  padding-left: 10%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const HeaderText = styled.Text`
  align-items: center;
  text-align: center;
  color: black;
  margin-bottom: 10px;
  font-size: 30px;
`;
