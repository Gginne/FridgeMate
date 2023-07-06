import { Avatar, Group, Text } from '@mantine/core';
import { forwardRef } from 'react';

const SelectItem = forwardRef(({image, label, ...others }, ref) => {
    return(
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={'https://spoonacular.com/cdn/ingredients_100x100/' + image} />
                <Text size="sm">{label}</Text>
            </Group>  
        </div>
    )
})

export default SelectItem