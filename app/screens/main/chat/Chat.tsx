import {
    Input,
    ScrollView,
    IconButton,
    Icon,
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
import {
    useCallback,
    useRef,
    useEffect,
    useState,
    useLayoutEffect,
} from 'react';
import { Message } from '../../../model';
import { ScrollView as RNScrollView } from 'react-native';

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
            if (!title) {
                if (title.length >= 32) {
                    title = title.slice(0, 30) + '...';
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
    }, [onSubmit, chatId, question]);

    return (
        <VStack flex={1} justifyContent="flex-end" space={2}>
            <ScrollView
                ref={scrollViewRef}
                px="10px"
                showsVerticalScrollIndicator={false}
                onContentSizeChange={handleContextChange}
            >
                {isLoading ? (
                    <Spinner />
                ) : (
                    <VStack space={5}>
                        {controlledMessages?.map((item, index) => {
                            return (
                                <VStack key={index} space={5}>
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
            <HStack space={2} alignItems="center" px="20px" pb="20px">
                <Input
                    flex={1}
                    value={question}
                    variant="outline"
                    placeholder="Type here..."
                    borderColor="gray.700"
                    color="gray.700"
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
                    bgColor="primary.600"
                    onPress={handleSend}
                />
            </HStack>
        </VStack>
    );
};

export default Chat;
