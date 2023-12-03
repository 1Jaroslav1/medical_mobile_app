import { ReactNode } from 'react';
import { Box } from 'native-base';

interface ScreenContainerProps {
    children: ReactNode;
}

export const ScreenContainer = ({ children }: ScreenContainerProps) => (
    <Box flex={1} bgColor="trueGray.50">
        {children}
    </Box>
);
