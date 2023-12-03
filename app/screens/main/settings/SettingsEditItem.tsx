import { Box, FormControl, Input, Button, Pressable, Modal } from 'native-base';
import { TextInput } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

interface SettingsEditItemProps {
    type?: 'text' | 'password';
    label: string;
    value?: string;
    onSubmit?: (value: string) => void;
}

export default function SettingsEditItem({
    type,
    label,
    value: valueFromProps,
    onSubmit,
}: SettingsEditItemProps) {
    const initValue = type == 'password' ? '' : valueFromProps ?? ' ';
    const [value, setValue] = useState<string | undefined>(initValue);

    const [isOpen, setIsOpen] = useState(false);

    const handleTextChange = useCallback((text: string) => {
        setValue(text);
    }, []);

    const handleEditClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleSubmitClick = useCallback(() => {
        if (onSubmit && value) {
            onSubmit(value);
        }
        setIsOpen(false);
    }, [onSubmit, value]);

    const handleCancelClick = useCallback(() => {
        setIsOpen(false);
    }, [valueFromProps]);

    useEffect(() => {
        return () => {
            setValue('');
        };
    }, []);

    const modelHeader = `Edit ${label}`;
    return (
        <Box mx={2}>
            <FormControl
                p={2}
                borderWidth="2px"
                borderColor="gray.400"
                borderRadius="5px"
            >
                <FormControl.Label>{label}</FormControl.Label>
                <Pressable alignItems="center" onLongPress={handleEditClick}>
                    <Input
                        type={type}
                        value={valueFromProps}
                        width="100%"
                        isReadOnly={true}
                    />
                </Pressable>
            </FormControl>
            <Modal
                isOpen={isOpen}
                avoidKeyboard
                _overlay={{
                    useRNModal: false,
                    useRNModalOnAndroid: false,
                }}
            >
                <Modal.Content minWidth="350px">
                    <Modal.CloseButton onPress={handleCancelClick} />
                    <Modal.Header>{modelHeader}</Modal.Header>
                    <Modal.Body
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        h="100%"
                    >
                        <Input
                            type={type}
                            value={value}
                            onChangeText={handleTextChange}
                            width="100%"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={handleCancelClick}
                            >
                                Cancel
                            </Button>
                            <Button onPress={handleSubmitClick}>Save</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Box>
    );
}
