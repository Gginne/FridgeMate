import React, { useState } from 'react';
import { ActionIcon, Card, Space, Group, Badge, Text, Divider, Tooltip, Image } from '@mantine/core';
import { Edit, Trash } from 'react-feather'
import DeleteItemModal from './DeleteItemModal';
import EditItemModal from './EditItemModal';
import { getDaysDiff } from '../../utils/helpers';

function FridgeItemCard({ data }) {
  const { bought, exp, id, image, name, quantity, unit } = data;
  const [deleteItemOpen, setDeleteItemOpen] = useState(false)
  const [editItemOpen, setEditItemOpen] = useState(false)



  const getExpColor = (exp) => {
    const daysDiff = getDaysDiff(exp)

    if (daysDiff > 3) {
      return "green";
    } else if (daysDiff >= 0) {
      return "yellow";
    } else {
      return "red";
    }
  };
  
  return (
    <>
    <DeleteItemModal opened={deleteItemOpen} onClose={() => setDeleteItemOpen(false)} id={id} name={name}/>
    <EditItemModal opened={editItemOpen} onClose={() => setEditItemOpen(false)} data={data}/>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section pt='xs'>
        <Group position="right" >
          <Tooltip withArrow label="Edit item">
            <ActionIcon
              onClick={() => setEditItemOpen(true)}
            >
              <Edit />
            </ActionIcon>
          </Tooltip>
          <Tooltip withArrow label="Remove item">
              <ActionIcon 
                onClick={() => setDeleteItemOpen(true)}
                variant={getDaysDiff(exp) >= 0 ? 'subtle' : 'filled'} 
                color={getDaysDiff(exp) >= 0 ? 'gray' : 'red'}>
                <Trash />
              </ActionIcon>
            </Tooltip>
            <Space />
          </Group>
      </Card.Section>
      <Card.Section px='md'>
        <Group mb='sm'>
          <Image src={'https://spoonacular.com/cdn/ingredients_100x100/'+image} alt={name} height={70} width={80} style={{ marginRight: '1rem' }} />
            <div>
                <Text size="lg" weight={700}>{name}</Text>
                <Badge color="pink" variant="outline"> {quantity} {unit} </Badge>
            </div>
        </Group>
      </Card.Section>
      
      <Divider />

      <Group position="apart" mt="md" mb="xs">
        <Badge color="blue" variant="filled"> Bought: {new Date(bought.seconds * 1000).toLocaleDateString()} </Badge>
        <Badge color={getExpColor(exp)} variant="filled"> Expires:{new Date(exp.seconds * 1000).toLocaleDateString()} </Badge>
      </Group>
    </Card>
    </>
  );
}

export default FridgeItemCard;
