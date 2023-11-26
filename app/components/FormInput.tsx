import { Control, useController } from 'react-hook-form';
import { Input, Text, View } from 'native-base';

interface FormInput {
    name: string;
    control: Control<any, any>;
    mb?: string;
    type?: 'text' | 'password' | undefined;
    placeholder?: string;
}

export const FormInput = ({
    name,
    control,
    mb,
    type,
    placeholder,
}: FormInput) => {
    const { field, fieldState } = useController({ name, control });
    return (
        <View mb={mb}>
            <Input
                type={type}
                placeholder={placeholder}
                value={field.value}
                onChangeText={field.onChange}
            />
            {fieldState.error ? (
                <Text color="red.500" pt="10px" pb="10px">
                    {fieldState.error?.message}
                </Text>
            ) : null}
        </View>
    );
};
