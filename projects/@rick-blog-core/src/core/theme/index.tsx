import { useTheme } from '@/core/hooks/useTheme';
import { type ThemeMode } from '@/core/interface';
import { css, Global, type SerializedStyles } from '@emotion/react';
import { useEffect, type FC, type PropsWithChildren } from 'react';
import { AntdStyle } from './antd-style';

type ThemeType = {
  [key: string]: string;
  colorPrimaryBg: string;
  colorSecondaryBg: string;
  colorInverseBg: string;
  colorPrimaryBgHover: string;
  colorPrimaryText: string;
};

export const light: ThemeType = {
  colorPrimaryBg: '#e0e5ec',
  colorSecondaryBg: '#fff',
  colorInverseBg: '#000',
  colorPrimaryBgHover: '#fafafa',
  colorPrimaryText: '#16171a',
};

export const dark: ThemeType = {
  colorPrimaryBg: '#16171a',
  colorSecondaryBg: '#000',
  colorInverseBg: '#fff',
  colorPrimaryBgHover: '#303133',
  colorPrimaryText: '#c7c7c7',
};

export const themeConfig: Record<ThemeMode, ThemeType> = {
  light,
  dark,
};

export const Theme = () => {
  const { theme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute('class', theme);

    // depend on system them mode
    // const media = window.matchMedia('(prefers-color-scheme: dark)');

    // const onThemeChange = (e: MediaQueryListEvent) => {
    //   document.documentElement.setAttribute(
    //     'class',
    //     e.matches ? 'dark' : 'light',
    //   );
    // };

    // media.addEventListener('change', onThemeChange);

    // return () => {
    //   media.removeEventListener('change', onThemeChange);
    // };
  }, [theme]);

  // convenient to refer to variables in css / scss
  // use themeConfig in css in js
  return (
    <Global
      styles={css(
        css`
          :root {
            --body-font: ${fontFamily};
            --color-active: #bae0ff;
            --layout-content-height: ${contentHeight};

            --color-primary-bg: ${themeConfig[theme].colorPrimaryBg};
            --color-secondary-bg: ${themeConfig[theme].colorSecondaryBg};
            --color-inverse-bg: ${themeConfig[theme].colorInverseBg};
            --color-primary-bg-hover: ${themeConfig[theme].colorPrimaryBgHover};
            --color-primary-text: ${themeConfig[theme].colorPrimaryText};
          }
        `,
        AntdStyle,
      )}
    />
  );
};

export const contentHeight = '65vh';

export const fontFamily = import.meta.env.RICK_FONTFAMILY;
export const codeFontFamily = import.meta.env.RICK_CODE_FONTFAMILY;

export const ThemeWrapper: FC<
  PropsWithChildren<{ style?: SerializedStyles }>
> = ({ children, style }) => {
  const { theme } = useTheme();
  return (
    <div className={theme} css={style}>
      {children}
    </div>
  );
};
