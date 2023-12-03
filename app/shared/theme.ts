import React from 'react';
import { extendTheme } from 'native-base';

export const theme = extendTheme({
    fontConfig: {
        DMSans: {
            100: {
                normal: 'DMSans-Thin',
                italic: 'DMSans-ThinItalic',
            },
            200: {
                normal: 'DMSans-ExtraLight',
                italic: 'DMSans-ExtraLightItalic',
            },
            300: {
                normal: 'DMSans-Light',
                italic: 'DMSans-LightItalic',
            },
            400: {
                normal: 'DMSans-Regular',
                italic: 'DMSans-Italic',
            },
            500: {
                normal: 'DMSans-Medium',
                italic: 'DMSans-MediumItalic',
            },
            600: {
                normal: 'DMSans-SemiBold',
                italic: 'DMSans-SemiBoldItalic',
            },
            700: {
                normal: 'DMSans-Bold',
                italic: 'DMSans-BoldItalic',
            },
            800: {
                normal: 'DMSans-ExtraBold',
                italic: 'DMSans-ExtraBoldItalic',
            },
            900: {
                normal: 'DMSans-Black',
                italic: 'DMSans-BlackItalic',
            },
        },
    },
    fonts: {
        heading: 'DMSans',
        body: 'DMSans',
        mono: 'DMSans',
    },
    colors: {
        primaryBlue: {
            200: '#d2ebff',
            400: '#1e9bff',
            500: '#0084ed',
            700: '#111d57',
        },
        primaryGray: {
            700: '#888eab',
        },
    },
    components: {
        FormControlLabel: {
            baseStyle: {
                _text: {
                    color: 'primaryBlue.700',
                    fontWeight: 500,
                },
            },
        },
        Input: {
            baseStyle: {
                color: 'primaryBlue.700',
                bg: 'primaryBlue.200',
                borderColor: 'primaryBlue.200',
                borderWidth: '2px',
                _focus: {
                    borderColor: 'primaryBlue.400',
                    backgroundColor: 'primaryBlue.200',
                },
            },
        },
        Button: {
            variants: {
                solid: {
                    bg: 'primaryBlue.400',
                    _pressed: {
                        bg: 'primaryBlue.500',
                    },
                },
            },
        },
        Spinner: {
            baseStyle: {
                color: 'primaryBlue.400',
            },
        },
        ScrollView: {
            baseStyle: {
                endFillColor: 'primaryBlue.200',
            },
        },
    },
});

type CustomThemeType = typeof theme;

declare module 'native-base' {
    interface ICustomTheme extends CustomThemeType {}
}
