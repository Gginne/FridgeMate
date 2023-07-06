import { ActionIcon, 
    Button, 
    Group, 
    Modal, 
    NativeSelect, 
    NumberInput, 
    Select, 
    Space, 
    Stack, 
    Text,
    TextInput } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import useApi from "../../hooks/useApi";
import React, { useMemo, useState }from "react";
import { Search } from 'react-feather'
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext"
import SelectItem from "./SelectItem"

export default function AddItemModal(props) {

    const { currentUser } = useAuth()
    const [searchValue, setSearchValue] = useState('');
    const groceryReq = useApi('/food/ingredients/search')

    const searchData = async () => {
        console.log(searchValue)
        try {
            await groceryReq.fetchData({query: searchValue})
        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var valid = form.validate()
        if(valid.hasErrors) {
            return
        }
        const data = {
            item: form.values.item,
            user: currentUser.uid,
            quantity: form.values.quantity,
            unit: form.values.unit,
            bought: form.values.boughtdate,
            exp: form.values.exp
          }
        try {
            await db.fridgeitems.add(data);
            props.onClose()
            form.reset();
            setSearchValue('')
        } catch(err) {
            console.log(err)
        }
    }

    const form = useForm({
        initialValues: {
          item: '',
          quantity: 0,
          unit: 'oz',
          boughtdate: '',
          exp: '',
        },
        validate: {
            item: isNotEmpty(),
            quantity: isNotEmpty(),
            unit: isNotEmpty(),
            boughtdate: isNotEmpty(),
            exp: isNotEmpty(),
        }
      });
    
    const items = useMemo(() => {
        if (groceryReq.data.results) return groceryReq.data.results.map(({id, name, image}) => ({value: id, label: name, image}))
        return []
    }, [groceryReq.data])

    return(
        <Modal 
            opened={props.opened} 
            onClose={props.onClose} 
            title="Add food item"
            >
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <Group position="apart" >
                            <TextInput
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.currentTarget.value)}
                            sx={{width: '85%'}}
                            placeholder="Strawberries"
                            label="Search"
                            description="Search for a food item"
                            withAsterisk
                            />
                            <Stack justify="flex-end">
                                <Space h='xl'/>
                                <ActionIcon variant="filled" onClick={searchData}>
                                    <Search />
                                </ActionIcon>
                            </Stack>
                        </Group>
                        {items && items.length > 0 && (
                            <Select 
                            label="Food item"
                            placeholder="Pick one"
                            data={items}
                            searchable
                            clearable
                            itemComponent={SelectItem}
                            dropdownComponent="div"
                            description="Select a food that best describes your item"
                            withAsterisk
                            {...form.getInputProps('item')}
                        >
                        </Select>
                        )}
                        {items.length === 0 && (
                            <Text>No items matched your search.</Text>
                        )}
                        <NumberInput
                            defaultValue={0}
                            placeholder="0"
                            label="Quantity"
                            precision={2}
                            min={0}
                            withAsterisk
                            disabled={!form.values.item}
                            {...form.getInputProps('quantity')}
                        />
                        <NativeSelect
                            data={['oz', 'grams', 'lbs', 'pints', 'quarts', 'gallons', ]}
                            label="Unit"
                            withAsterisk
                            disabled={!form.values.item}
                            {...form.getInputProps('unit')}
                        />
                        <DateInput 
                            label="Bought date" 
                            placeholder="Date input" 
                            withAsterisk
                            disabled={!form.values.item}
                            {...form.getInputProps('boughtdate')}
                        />
                        <DateInput 
                            label="Expiration date" 
                            placeholder="Date input" 
                            withAsterisk
                            disabled={!form.values.item}
                            {...form.getInputProps('exp')}
                        />
                        <Group position="right">
                            <Button type='submit'>Submit</Button>
                        </Group>
                    </Stack>
            </form>
            
        </Modal>
    )
}