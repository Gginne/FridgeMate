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
    const [units, setUnits] = useState([]);
    const groceryReq = useApi('/food/ingredients/search')
    const [selectedItem, setSelectedItem] = useState(null)

    const searchData = async () => {
        console.log(searchValue)
        try {
            await groceryReq.fetchData({query: searchValue, metaInformation: 'true'})
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
            image: selectedItem.image,
            name: selectedItem.label,
            quantity: form.values.quantity,
            unit: form.values.unit,
            bought: form.values.boughtdate,
            exp: form.values.exp
          }
        try {
            await db.fridgeitems.add(data);
            await db.groceryitems.doc(String(selectedItem.value)).set({
                image: selectedItem.image,
                name: selectedItem.label
            });
            console.log(selectedItem)
            props.onClose()
            form.reset();
            setSearchValue('')
        } catch(err) {
            console.log(err)
        }
    }

    const handleSelect = (e) => {
        const item = items.find(item => item.label === e.target.value)
    
        if(item) {
            setUnits(item.possibleUnits)
            setSelectedItem(item)
            form.setFieldValue('unit', item.possibleUnits[0])
        } else {
            setUnits([])
        }
    }

    const handleResetForm = () => {
        form.reset()
        setSearchValue('')
        setUnits([])
        setSelectedItem(null)
    }

    const form = useForm({
        initialValues: {
          item: '',
          quantity: 0,
          unit: '',
          boughtdate: '',
          exp: '',
        },
        validate: {
            item: isNotEmpty(),
            quantity: (value) => (value <= 0 ? 'Quantity must be greater than 0' : null),
            unit: isNotEmpty(),
            boughtdate: isNotEmpty(),
            exp: isNotEmpty(),
        }
      });
    
    const items = useMemo(() => {
        if (groceryReq.data && groceryReq.data.results) 
            return groceryReq.data.results.map(({id, name, image, possibleUnits}) => ({value: id, label: name, image, possibleUnits}))
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
                            onSelect={handleSelect}
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
                            data={units}
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
                        <Group position="apart">
                            <Group>
                                <Button variant="outline" onClick={props.onClose}>Cancel</Button>
                                <Button variant="light" onClick={handleResetForm}>Clear form</Button>
                            </Group>
                            <Button type='submit'>Submit</Button>
                        </Group>
                    </Stack>
            </form>
            
        </Modal>
    )
}