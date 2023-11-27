import {
    Alert,
    CloseIcon,
    HStack,
    IconButton,
    Text,
    VStack,
    useToast,
} from 'native-base';

interface ToastProps {
    id: number;
    status?: 'error' | 'success' | 'warning' | 'info';
    variant:
        | 'solid'
        | 'outline'
        | (string & {})
        | 'subtle'
        | 'left-accent'
        | 'top-accent'
        | 'outline-light';
    title: string;
    description?: string;
    isClosable: boolean;
}

export const Toast = ({
    id,
    status,
    variant,
    title,
    description,
    isClosable,
    ...rest
}: ToastProps) => {
    const toast = useToast();
    return (
        <Alert
            maxWidth="100%"
            alignSelf="center"
            flexDirection="row"
            status={status ? status : 'info'}
            variant={variant}
            {...rest}
        >
            <VStack space={1} flexShrink={1} w="95%">
                <HStack
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text
                            fontSize="md"
                            fontWeight="medium"
                            flexShrink={1}
                            color={
                                variant === 'solid'
                                    ? 'lightText'
                                    : variant !== 'outline'
                                      ? 'darkText'
                                      : null
                            }
                        >
                            {title}
                        </Text>
                    </HStack>
                    {isClosable ? (
                        <IconButton
                            variant="unstyled"
                            icon={<CloseIcon size="3" />}
                            _icon={{
                                color:
                                    variant === 'solid'
                                        ? 'lightText'
                                        : 'darkText',
                            }}
                            onPress={() => toast.close(id)}
                        />
                    ) : null}
                </HStack>
                {description ? (
                    <Text
                        px="6"
                        color={
                            variant === 'solid'
                                ? 'lightText'
                                : variant !== 'outline'
                                  ? 'darkText'
                                  : null
                        }
                    >
                        {description}
                    </Text>
                ) : null}
            </VStack>
        </Alert>
    );
};
