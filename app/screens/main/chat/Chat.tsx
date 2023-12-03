import {
    Box,
    Input,
    Image,
    ScrollView,
    IconButton,
    Icon,
    Text,
    HStack,
    VStack,
    Spinner,
} from 'native-base';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { DrawerList } from '../Workspace';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useUser } from '../../../api/useUser';
import { useMessages } from '../../../api/useMessages';
import { useHistory } from '../../../api/useHistory';
import UserChatItem from './UserChatItem';
import AssistantChatItem from './AssistantChatItem';
import { RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../../../api/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useEffect, useState } from 'react';
import { Message } from '../../../model';
import { ScrollView as RNScrollView } from 'react-native';
import { ScreenContainer } from '../../../components';

const DoctorIcon = require('../../../../assets/img/doctor.png');

type ChatProps = {
    route: RouteProp<DrawerList, 'Chat'>;
    navigation: DrawerNavigationProp<DrawerList, 'Chat'>;
};

interface ChatRequest {
    chatId: number | null;
    question: string;
}

const Chat: React.FC<ChatProps> = ({ route, navigation }) => {
    const chatId = route?.params?.chatId;
    const { data: user } = useUser();

    const { data: messages, isLoading, refetch } = useMessages(chatId);
    const { refetch: refetchHistory } = useHistory();

    const [question, setQuestion] = useState<string>('');
    const scrollViewRef = useRef<RNScrollView>(null);

    const [controlledMessages, setControlledMessages] = useState<
        Message[] | undefined
    >([]);

    const { mutate } = useMutation({
        mutationFn: (data: ChatRequest) => {
            return axios.post(API_URL.GET_ANSWER, data);
        },
        onSuccess: async result => {
            if (!chatId) {
                navigation.setParams({ chatId: result.data?.chatId });
                refetchHistory();
            }
            let title = route.params.name;
            if (title === 'New Chat') {
                if (title.length >= 42) {
                    title = title.slice(0, 40) + '...';
                }
                navigation.setOptions({ title });
            }
            refetch();
        },
    });

    useEffect(() => {
        setControlledMessages(messages);
    }, [messages]);

    const onSubmit = useCallback(
        (data: ChatRequest) => {
            mutate(data);
        },
        [mutate],
    );

    const handleContextChange = useCallback(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, []);
    const handleQuestionChange = useCallback(
        (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            setQuestion(e.nativeEvent.text);
        },
        [],
    );

    const handleSend = useCallback(() => {
        if (question && question !== '') {
            const data: ChatRequest = {
                chatId,
                question,
            };
            const tempMessage: Message = {
                question,
            };
            onSubmit(data);
            setQuestion('');
            setControlledMessages(controlledMessages => [
                ...(controlledMessages || []),
                tempMessage,
            ]);
        }
    }, [onSubmit, chatId, question]);

    return (
        <ScreenContainer>
            <VStack
                flex={1}
                justifyContent="flex-end"
                space={2}
                bgColor="green"
            >
                {controlledMessages && controlledMessages.length > 0 ? (
                    <ScrollView
                        ref={scrollViewRef}
                        px="10px"
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={handleContextChange}
                        endFillColor="primaryBlue.200"
                    >
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <VStack space={2} mt={2}>
                                {controlledMessages?.map((item, index) => {
                                    return (
                                        <VStack key={index} space={2}>
                                            <UserChatItem
                                                user={user}
                                                text={item.question}
                                                date={item.createdQuestionAt}
                                            />
                                            {item.answer ? (
                                                <AssistantChatItem
                                                    text={item.answer}
                                                    date={item.createdAnswerAt}
                                                />
                                            ) : (
                                                <Spinner size="lg" />
                                            )}
                                        </VStack>
                                    );
                                })}
                            </VStack>
                        )}
                    </ScrollView>
                ) : (
                    <VStack
                        flex={1}
                        alignContent="center"
                        alignSelf="center"
                        justifyContent="center"
                        height="100%"
                        justifyItems="center"
                        space={5}
                    >
                        <Image
                            source={DoctorIcon}
                            alt="Alternate Text"
                            size="xl"
                        />
                        <Text
                            textAlign="center"
                            fontSize="18px"
                            color="primaryBlue.700"
                        >
                            How can I help?
                        </Text>
                    </VStack>
                )}
                <HStack space={2} alignItems="center" px="20px" pb="20px">
                    <Input
                        flex={1}
                        value={question}
                        variant="outline"
                        placeholder="Type here..."
                        onChange={handleQuestionChange}
                    />
                    <IconButton
                        icon={
                            <Icon
                                as={MaterialIcons}
                                name="send"
                                size="sm"
                                color="white"
                            />
                        }
                        borderRadius="full"
                        bgColor="primaryBlue.400"
                        onPress={handleSend}
                    />
                </HStack>
            </VStack>
        </ScreenContainer>
    );
};

export default Chat;
