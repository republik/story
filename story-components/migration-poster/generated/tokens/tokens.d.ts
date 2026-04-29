/* eslint-disable */
export type Token = "colors.neutral.50" | "colors.neutral.950" | "colors.white" | "colors.transparent" | "colors.current" | "shadows.sm" | "sizes.24" | "sizes.full" | "sizes.viewportWidth" | "sizes.narrow" | "sizes.center" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "spacing.0" | "spacing.1" | "spacing.2" | "spacing.3" | "spacing.4" | "spacing.5" | "spacing.6" | "spacing.8" | "spacing.10" | "spacing.12" | "spacing.16" | "spacing.24" | "spacing.32" | "spacing.px" | "spacing.0.5" | "spacing.1.5" | "spacing.2.5" | "spacing.3.5" | "radii.full" | "fonts.republikSerif" | "fonts.rubis" | "fonts.gtAmericaStandard" | "fontWeights.regular" | "fontWeights.medium" | "fontWeights.bold" | "fontWeights.black" | "fontSizes.xs" | "fontSizes.s" | "fontSizes.base" | "fontSizes.l" | "fontSizes.xl" | "fontSizes.2xl" | "fontSizes.3xl" | "fontSizes.4xl" | "fontSizes.8xl" | "fontSizes.16xl" | "lineHeights.1" | "animations.spin" | "animations.slideUp" | "animations.slideDown" | "animations.fadeIn" | "animations.fadeOut" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "colors.text" | "colors.text.inverted" | "colors.text.white" | "colors.text.black" | "colors.text.marketingAccent" | "colors.contrast" | "colors.background" | "colors.background.marketing" | "colors.background.marketingAlt" | "colors.background.marketingAccent" | "colors.background.marketingAccentAlt" | "colors.pageBackground" | "colors.link" | "colors.primary" | "colors.primaryHover" | "colors.overlay" | "colors.error" | "colors.divider" | "colors.disabled" | "colors.textSoft" | "colors.hover" | "sizes.maxContentWidth" | "sizes.content.text" | "sizes.content.narrow" | "sizes.header.height" | "sizes.header.avatar" | "sizes.header.logoHeight" | "lineHeights.pageNav" | "spacing.4-6" | "spacing.4-8" | "spacing.8-16" | "spacing.16-32" | "spacing.32-64" | "spacing.header.height" | "spacing.header.avatarMargin" | "spacing.header.logoMargin" | "fontSizes.l-xl" | "spacing.-1" | "spacing.-2" | "spacing.-3" | "spacing.-4" | "spacing.-5" | "spacing.-6" | "spacing.-8" | "spacing.-10" | "spacing.-12" | "spacing.-16" | "spacing.-24" | "spacing.-32" | "spacing.-px" | "spacing.-0.5" | "spacing.-1.5" | "spacing.-2.5" | "spacing.-3.5" | "spacing.-4-6" | "spacing.-4-8" | "spacing.-8-16" | "spacing.-16-32" | "spacing.-32-64" | "spacing.header.-height" | "spacing.header.-avatarMargin" | "spacing.header.-logoMargin" | "colors.colorPalette.50" | "colors.colorPalette.950" | "colors.colorPalette" | "colors.colorPalette.inverted" | "colors.colorPalette.white" | "colors.colorPalette.black" | "colors.colorPalette.marketingAccent" | "colors.colorPalette.marketing" | "colors.colorPalette.marketingAlt" | "colors.colorPalette.marketingAccentAlt"

export type ColorPalette = "neutral" | "white" | "transparent" | "current" | "text" | "contrast" | "background" | "pageBackground" | "link" | "primary" | "primaryHover" | "overlay" | "error" | "divider" | "disabled" | "textSoft" | "hover"

export type ColorToken = "neutral.50" | "neutral.950" | "white" | "transparent" | "current" | "text" | "text.inverted" | "text.white" | "text.black" | "text.marketingAccent" | "contrast" | "background" | "background.marketing" | "background.marketingAlt" | "background.marketingAccent" | "background.marketingAccentAlt" | "pageBackground" | "link" | "primary" | "primaryHover" | "overlay" | "error" | "divider" | "disabled" | "textSoft" | "hover" | "colorPalette.50" | "colorPalette.950" | "colorPalette" | "colorPalette.inverted" | "colorPalette.white" | "colorPalette.black" | "colorPalette.marketingAccent" | "colorPalette.marketing" | "colorPalette.marketingAlt" | "colorPalette.marketingAccentAlt"

export type ShadowToken = "sm"

export type SizeToken = "24" | "full" | "viewportWidth" | "narrow" | "center" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "maxContentWidth" | "content.text" | "content.narrow" | "header.height" | "header.avatar" | "header.logoHeight"

export type SpacingToken = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "24" | "32" | "px" | "0.5" | "1.5" | "2.5" | "3.5" | "4-6" | "4-8" | "8-16" | "16-32" | "32-64" | "header.height" | "header.avatarMargin" | "header.logoMargin" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-8" | "-10" | "-12" | "-16" | "-24" | "-32" | "-px" | "-0.5" | "-1.5" | "-2.5" | "-3.5" | "-4-6" | "-4-8" | "-8-16" | "-16-32" | "-32-64" | "-header.height" | "-header.avatarMargin" | "-header.logoMargin"

export type RadiusToken = "full"

export type FontToken = "republikSerif" | "rubis" | "gtAmericaStandard"

export type FontWeightToken = "regular" | "medium" | "bold" | "black"

export type FontSizeToken = "xs" | "s" | "base" | "l" | "xl" | "2xl" | "3xl" | "4xl" | "8xl" | "16xl" | "l-xl"

export type LineHeightToken = "1" | "pageNav"

export type AnimationToken = "spin" | "slideUp" | "slideDown" | "fadeIn" | "fadeOut"

export type BreakpointToken = "sm" | "md" | "lg"

export type Tokens = {
		colors: ColorToken
		shadows: ShadowToken
		sizes: SizeToken
		spacing: SpacingToken
		radii: RadiusToken
		fonts: FontToken
		fontWeights: FontWeightToken
		fontSizes: FontSizeToken
		lineHeights: LineHeightToken
		animations: AnimationToken
		breakpoints: BreakpointToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"