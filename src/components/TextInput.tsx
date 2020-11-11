import React, { FunctionComponent, ReactElement } from 'react'
import InkTextInput from 'ink-text-input'
import { Box } from 'ink'

const noop = () => {}

const TextInput: FunctionComponent<{
  label: ReactElement
  value: string
  isChecked?: boolean
  placeholder?: string
  onChange?: (value: string) => void
  onSubmit?: (checked: string) => void
}> = function TextInput({
  label,
  isChecked = false,
  onChange = noop,
  onSubmit = noop,
  placeholder,
  value,
  ...rest
}) {
  return (
    <Box>
      <Box marginRight={1}>{label}</Box>

      <InkTextInput
        {...rest}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

export default TextInput
