import React, { useCallback } from 'react';
import { Card, Group, Badge, Text, Divider, Image } from '@mantine/core';

function FridgeItemCard({ data }) {
  const { bought, exp, image, item, name, quantity, unit, user } = data;

  const getExpColor = useCallback(() => {
    const currentDate = new Date();
    const expirationDate = new Date(exp.seconds * 1000);

    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 3) {
      return "green";
    } else if (daysDifference >= 0) {
      return "yellow";
    } else {
      return "red";
    }
  }, [exp]);
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem'}}>
        <Image src={'https://spoonacular.com/cdn/ingredients_100x100/'+image} alt={name} height={70} width={80} style={{ marginRight: '1rem' }} />
        <div>
            <Text size="lg" weight={700}>{name}</Text>
            <Badge color="pink" variant="outline"> {quantity} {unit} </Badge>
        </div>
      </div>
      
      <Divider />

      <Group position="apart" mt="md" mb="xs">
        <Badge color="blue" variant="filled"> Bought: {new Date(bought.seconds * 1000).toLocaleDateString()} </Badge>
     
        <Badge color={getExpColor()} variant="filled"> Expires:{new Date(exp.seconds * 1000).toLocaleDateString()} </Badge>
      </Group>
    </Card>
  );
}

export default FridgeItemCard;
