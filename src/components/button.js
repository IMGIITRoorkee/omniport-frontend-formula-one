import { Button as SemanticButton } from 'semantic-ui-react'
import withThemeColor from 'formula_one/src/utils/themeHOC'

/**
 * Use this Button if you want to use the theme colors
 * Made this component because button will be used a lot
 * because we will then have to use withThemeColor every time
 * create a button
 */

export default withThemeColor(SemanticButton)
