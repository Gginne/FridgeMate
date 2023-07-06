import { Avatar, Group, Text } from '@mantine/core';

export default function SelectItem (props){
    return(
        <Group noWrap>
            <Avatar src={'https://spoonacular.com/cdn/ingredients_100x100/' + props.image} />
            <Text size="sm">{props.label}</Text>
        </Group>   
    )
}