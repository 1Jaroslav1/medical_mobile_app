import { Control, useController } from 'react-hook-form';
import { Box, FormControl, Input, WarningOutlineIcon } from 'native-base';

interface FormInput {
    label: string;
    name: string;
    control: Control<any, any>;
    mb?: string;
    type?: 'text' | 'password' | undefined;
    placeholder?: string;
}

export const FormInput = ({
    name,
    label,
    control,
    mb,
    type,
    placeholder,
}: FormInput) => {
    const { field, fieldState } = useController({ name, control });
    return (
        <Box mb={mb}>
            <FormControl isInvalid={fieldState.error != undefined}>
                <FormControl.Label>{label}</FormControl.Label>
                <Input
                    type={type}
                    placeholder={placeholder}
                    value={field.value}
                    onChangeText={field.onChange}
                />
                <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                >
                    {fieldState.error?.message}
                </FormControl.ErrorMessage>
            </FormControl>
        </Box>
    );
};
